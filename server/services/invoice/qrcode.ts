import QRCode from 'qrcode';
import type { QRCodeData } from './types';

export class QRCodeService {
  private readonly baseVerificationUrl: string;

  constructor(baseVerificationUrl: string) {
    this.baseVerificationUrl = baseVerificationUrl;
  }

  async generateQRCode(data: QRCodeData): Promise<string> {
    try {
      // Create a URL-safe JSON string of the invoice data
      const qrData = {
        i: data.invoiceNumber,    // Invoice number
        a: data.aeatId,          // AEAT ID
        t: data.totalAmount,     // Total amount
        d: data.issueDate,       // Issue date
        u: `${this.baseVerificationUrl}/${data.invoiceNumber}` // Verification URL
      };

      // Generate QR code as base64 string
      const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
        type: 'svg',
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 200
      });

      return qrCodeDataUrl;
    } catch (error) {
      console.error('QR code generation failed:', error);
      throw error;
    }
  }
}
