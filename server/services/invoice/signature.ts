import { Crypto } from "@peculiar/x509";
import forge from "node-forge";
import type { DigitalSignatureResult } from "./types";

export class SignatureService {
  private readonly privateKey: string;

  constructor(privateKey: string) {
    this.privateKey = privateKey;
  }

  async signInvoice(invoiceData: string): Promise<DigitalSignatureResult> {
    // Create a SHA-256 hash of the invoice data
    const md = forge.md.sha256.create();
    md.update(invoiceData, 'utf8');

    // Sign the hash with the private key
    const privateKey = forge.pki.privateKeyFromPem(this.privateKey);
    const signature = privateKey.sign(md);
    
    // Convert the signature to base64
    const signatureBase64 = forge.util.encode64(signature);

    return {
      signature: signatureBase64,
      timestamp: new Date()
    };
  }

  async verifySignature(
    invoiceData: string,
    signature: string,
    publicKey: string
  ): Promise<boolean> {
    try {
      // Recreate the hash of the invoice data
      const md = forge.md.sha256.create();
      md.update(invoiceData, 'utf8');

      // Convert base64 signature back to binary
      const signatureBinary = forge.util.decode64(signature);

      // Verify the signature
      const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
      return publicKeyObj.verify(md.digest().bytes(), signatureBinary);
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  }
}
