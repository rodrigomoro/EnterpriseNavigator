import { XMLBuilder, XMLParser } from 'xml2js';
import type { AEATSubmissionResult, InvoiceData } from './types';
import type { Invoice } from '@db/schema';

export class AEATService {
  private readonly endpoint: string;
  private readonly apiKey: string;
  private readonly xmlBuilder: XMLBuilder;
  private readonly xmlParser: XMLParser;

  constructor(endpoint: string, apiKey: string) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
    this.xmlBuilder = new XMLBuilder();
    this.xmlParser = new XMLParser();
  }

  private generateFactuRAEXML(invoice: Invoice): string {
    // Generate FactuRAE XML according to Spanish specifications
    const facturaeData = {
      Facturae: {
        FileHeader: {
          SchemaVersion: '3.2.2',
          Modality: 'I',
          InvoiceIssuerType: 'EM',
          Batch: {
            BatchIdentifier: invoice.invoiceNumber,
            InvoicesCount: 1,
            TotalInvoicesAmount: {
              TotalAmount: invoice.totalAmount
            },
            TotalOutstandingAmount: {
              TotalAmount: invoice.totalAmount
            },
            InvoiceCurrencyCode: 'EUR'
          }
        },
        Parties: {
          SellerParty: {
            TaxIdentification: {
              PersonTypeCode: 'J',
              ResidenceTypeCode: 'R',
              TaxIdentificationNumber: 'SELLER_TAX_ID'
            }
          },
          BuyerParty: {
            TaxIdentification: {
              PersonTypeCode: 'J',
              ResidenceTypeCode: 'R',
              TaxIdentificationNumber: 'BUYER_TAX_ID'
            }
          }
        },
        Invoices: {
          Invoice: {
            InvoiceHeader: {
              InvoiceNumber: invoice.invoiceNumber,
              InvoiceSeriesCode: 'ERP2024',
              InvoiceDocumentType: 'FC',
              InvoiceClass: 'OO'
            },
            InvoiceIssueData: {
              IssueDate: invoice.issueDate.toISOString().split('T')[0],
              InvoiceCurrencyCode: 'EUR',
              TaxCurrencyCode: 'EUR',
              LanguageName: 'es'
            }
          }
        }
      }
    };

    return this.xmlBuilder.buildObject(facturaeData);
  }

  async submitInvoice(invoice: Invoice): Promise<AEATSubmissionResult> {
    try {
      const xmlData = this.generateFactuRAEXML(invoice);
      
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: xmlData
      });

      if (!response.ok) {
        throw new Error(`AEAT submission failed: ${response.statusText}`);
      }

      const responseXML = await response.text();
      const responseData = await this.xmlParser.parseStringPromise(responseXML);

      return {
        success: true,
        responseCode: responseData.response.code,
        responseMessage: responseData.response.message,
        retryCount: 0
      };
    } catch (error) {
      console.error('AEAT submission error:', error);
      return {
        success: false,
        responseMessage: error instanceof Error ? error.message : 'Unknown error',
        retryCount: 0
      };
    }
  }
}
