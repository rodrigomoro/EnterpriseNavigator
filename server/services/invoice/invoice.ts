import { v4 as uuidv4 } from 'uuid';
import PDFDocument from 'pdfkit';
import { db } from '@db';
import { invoices, invoiceItems, invoiceSubmissions } from '@db/schema';
import type { InvoiceData, QRCodeData } from './types';
import { SignatureService } from './signature';
import { QRCodeService } from './qrcode';
import { AEATService } from './aeat';
import { eq } from 'drizzle-orm';

export class InvoiceService {
  private readonly signatureService: SignatureService;
  private readonly qrCodeService: QRCodeService;
  private readonly aeatService: AEATService;

  constructor(
    privateKey: string,
    verificationBaseUrl: string,
    aeatEndpoint: string,
    aeatApiKey: string
  ) {
    this.signatureService = new SignatureService(privateKey);
    this.qrCodeService = new QRCodeService(verificationBaseUrl);
    this.aeatService = new AEATService(aeatEndpoint, aeatApiKey);
  }

  private async generateInvoiceNumber(): Promise<string> {
    const prefix = 'INV';
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  private calculateTotals(items: InvoiceData['items']) {
    return items.reduce((acc, item) => {
      const itemTotal = item.quantity * item.unitPrice;
      const taxAmount = itemTotal * (item.taxRate / 100);
      return {
        totalAmount: acc.totalAmount + itemTotal + taxAmount,
        taxAmount: acc.taxAmount + taxAmount
      };
    }, { totalAmount: 0, taxAmount: 0 });
  }

  async createInvoice(data: InvoiceData) {
    const invoiceNumber = await this.generateInvoiceNumber();
    const { totalAmount, taxAmount } = this.calculateTotals(data.items);
    const aeatId = uuidv4();

    // Create invoice record
    const [invoice] = await db.insert(invoices).values({
      invoiceNumber,
      aeatId,
      issuerId: data.issuerId,
      recipientId: data.recipientId,
      issueDate: data.issueDate,
      dueDate: data.dueDate,
      totalAmount,
      taxAmount,
      status: 'draft'
    }).returning();

    // Create invoice items
    await db.insert(invoiceItems).values(
      data.items.map(item => ({
        invoiceId: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        taxRate: item.taxRate,
        totalAmount: item.quantity * item.unitPrice * (1 + item.taxRate / 100)
      }))
    );

    // Generate QR code
    const qrCodeData: QRCodeData = {
      invoiceNumber,
      aeatId,
      totalAmount,
      issueDate: data.issueDate.toISOString(),
      verificationUrl: `/verify/${invoiceNumber}`
    };
    const qrCode = await this.qrCodeService.generateQRCode(qrCodeData);

    // Generate digital signature
    const signatureResult = await this.signatureService.signInvoice(
      JSON.stringify({ ...invoice, items: data.items })
    );

    // Update invoice with QR code and signature
    await db.update(invoices)
      .set({
        qrCode,
        digitalSignature: signatureResult.signature,
        signatureDate: signatureResult.timestamp,
        status: 'signed'
      })
      .where(eq(invoices.id, invoice.id));

    // Submit to AEAT
    const submission = await this.aeatService.submitInvoice(invoice);
    
    // Record submission attempt
    await db.insert(invoiceSubmissions).values({
      invoiceId: invoice.id,
      status: submission.success ? 'accepted' : 'rejected',
      responseCode: submission.responseCode,
      responseMessage: submission.responseMessage,
      retryCount: submission.retryCount
    });

    // Update invoice status based on submission result
    await db.update(invoices)
      .set({ status: submission.success ? 'submitted' : 'submission_failed' })
      .where(eq(invoices.id, invoice.id));

    return invoice;
  }

  async generatePDF(invoiceId: number): Promise<Buffer> {
    const invoice = await db.query.invoices.findFirst({
      where: eq(invoices.id, invoiceId),
      with: {
        items: true,
        issuer: true,
        recipient: true
      }
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    // Create PDF document
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => Buffer.concat(chunks));

    // Add content to PDF
    doc
      .fontSize(25)
      .text('INVOICE', { align: 'center' })
      .moveDown();

    doc
      .fontSize(12)
      .text(`Invoice Number: ${invoice.invoiceNumber}`)
      .text(`Date: ${invoice.issueDate.toLocaleDateString()}`)
      .text(`Due Date: ${invoice.dueDate.toLocaleDateString()}`)
      .moveDown();

    // Add QR code if available
    if (invoice.qrCode) {
      doc.image(Buffer.from(invoice.qrCode.split(',')[1], 'base64'), {
        fit: [100, 100],
        align: 'right'
      });
    }

    doc.end();

    return Buffer.concat(chunks);
  }
}
