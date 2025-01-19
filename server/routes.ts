import type { Express } from "express";
import { createServer, type Server } from "http";
import { InvoiceService } from "./services/invoice/invoice";
import { db } from "@db";
import { eq } from "drizzle-orm";
import { invoices } from "@db/schema";

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY environment variable is required");
}

const invoiceService = new InvoiceService(
  process.env.PRIVATE_KEY,
  process.env.VERIFICATION_BASE_URL || 'http://localhost:5000/verify',
  process.env.AEAT_ENDPOINT || 'https://aeat.test.es/api/v1/invoices',
  process.env.AEAT_API_KEY || 'test_key'
);

export function registerRoutes(app: Express): Server {
  // Create a new invoice
  app.post('/api/invoices', async (req, res) => {
    try {
      const invoice = await invoiceService.createInvoice(req.body);
      res.json(invoice);
    } catch (error) {
      console.error('Error creating invoice:', error);
      res.status(500).json({ error: 'Failed to create invoice' });
    }
  });

  // Get invoice details
  app.get('/api/invoices/:id', async (req, res) => {
    try {
      const invoice = await db.query.invoices.findFirst({
        where: eq(invoices.id, parseInt(req.params.id)),
        with: {
          items: true,
          submissions: true,
          issuer: true,
          recipient: true
        }
      });

      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }

      res.json(invoice);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      res.status(500).json({ error: 'Failed to fetch invoice' });
    }
  });

  // Get invoice PDF
  app.get('/api/invoices/:id/pdf', async (req, res) => {
    try {
      const pdfBuffer = await invoiceService.generatePDF(parseInt(req.params.id));

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=invoice-${req.params.id}.pdf`);
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ error: 'Failed to generate PDF' });
    }
  });

  // Verify invoice
  app.get('/verify/:invoiceNumber', async (req, res) => {
    try {
      const invoice = await db.query.invoices.findFirst({
        where: eq(invoices.invoiceNumber, req.params.invoiceNumber),
        with: {
          items: true,
          issuer: true,
          recipient: true
        }
      });

      if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found' });
      }

      // Return public verification information
      res.json({
        invoiceNumber: invoice.invoiceNumber,
        issueDate: invoice.issueDate,
        totalAmount: invoice.totalAmount,
        status: invoice.status,
        verificationId: invoice.aeatId
      });
    } catch (error) {
      console.error('Error verifying invoice:', error);
      res.status(500).json({ error: 'Failed to verify invoice' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}