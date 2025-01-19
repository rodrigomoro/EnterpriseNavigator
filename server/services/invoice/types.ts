export interface InvoiceData {
  issuerId: number;
  recipientId: number;
  issueDate: Date;
  dueDate: Date;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
  }[];
}

export interface DigitalSignatureResult {
  signature: string;
  timestamp: Date;
}

export interface QRCodeData {
  invoiceNumber: string;
  aeatId: string;
  totalAmount: number;
  issueDate: string;
  verificationUrl: string;
}

export interface AEATSubmissionResult {
  success: boolean;
  responseCode?: string;
  responseMessage?: string;
  retryCount: number;
}
