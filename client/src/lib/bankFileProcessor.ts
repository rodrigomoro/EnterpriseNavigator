import { format } from 'date-fns';

interface BankFileProcessorOptions {
  encoding?: 'utf-8' | 'ascii' | 'iso-8859-1';
  validateContent?: boolean;
}

interface ProcessedBankFile {
  format: string;
  content: string;
  metadata: {
    filename: string;
    processedAt: string;
    recordCount?: number;
    totalAmount?: number;
    currency?: string;
  };
}

export class BankFileProcessor {
  private static readonly FORMATS = {
    norma19: {
      extension: '.txt',
      encoding: 'ascii' as const,
      validate: (content: string) => content.length > 0 && content.startsWith('51'),
    },
    norma34: {
      extension: '.txt',
      encoding: 'ascii' as const,
      validate: (content: string) => content.length > 0 && content.startsWith('34'),
    },
    norma43: {
      extension: '.asc',
      encoding: 'iso-8859-1' as const,
      validate: (content: string) => content.length > 0 && content.startsWith('11'),
    },
    sepa: {
      extension: '.xml',
      encoding: 'utf-8' as const,
      validate: (content: string) => content.includes('<?xml') && content.includes('pain.008.001.02'),
    },
  };

  static async processUpload(
    file: File,
    format: keyof typeof BankFileProcessor.FORMATS,
    options: BankFileProcessorOptions = {}
  ): Promise<ProcessedBankFile> {
    const formatConfig = this.FORMATS[format];
    if (!formatConfig) {
      throw new Error(`Unsupported file format: ${format}`);
    }

    // Validate file extension
    if (!file.name.toLowerCase().endsWith(formatConfig.extension)) {
      throw new Error(
        `Invalid file extension. Expected ${formatConfig.extension} for ${format} format`
      );
    }

    // Read file content
    const content = await file.text();

    // Validate content if required
    if (options.validateContent && !formatConfig.validate(content)) {
      throw new Error(`Invalid ${format} file content`);
    }

    // Process file based on format
    const metadata = await this.extractMetadata(content, format);

    return {
      format,
      content,
      metadata: {
        filename: file.name,
        processedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
        ...metadata,
      },
    };
  }

  private static async extractMetadata(
    content: string,
    format: keyof typeof BankFileProcessor.FORMATS
  ) {
    switch (format) {
      case 'norma19':
        return this.extractNorma19Metadata(content);
      case 'norma34':
        return this.extractNorma34Metadata(content);
      case 'norma43':
        return this.extractNorma43Metadata(content);
      case 'sepa':
        return this.extractSepaMetadata(content);
      default:
        return {};
    }
  }

  private static async extractNorma19Metadata(content: string) {
    // Extract header record (type 51)
    const lines = content.split('\n');
    const headerLine = lines.find(line => line.startsWith('51'));
    
    if (!headerLine) return {};

    return {
      recordCount: lines.length - 2, // Exclude header and footer
      totalAmount: parseFloat(headerLine.substring(66, 78)) / 100, // Amount in cents
      currency: 'EUR',
    };
  }

  private static async extractNorma34Metadata(content: string) {
    const lines = content.split('\n');
    const headerLine = lines.find(line => line.startsWith('34'));
    
    if (!headerLine) return {};

    return {
      recordCount: lines.length - 2,
      totalAmount: parseFloat(headerLine.substring(66, 78)) / 100,
      currency: 'EUR',
    };
  }

  private static async extractNorma43Metadata(content: string) {
    const lines = content.split('\n');
    const headerLine = lines.find(line => line.startsWith('11'));
    
    if (!headerLine) return {};

    return {
      recordCount: lines.length,
      currency: 'EUR',
    };
  }

  private static async extractSepaMetadata(content: string) {
    // Parse XML to extract basic metadata
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, 'text/xml');
    
    const nbOfTxs = xmlDoc.querySelector('NbOfTxs')?.textContent;
    const ctrlSum = xmlDoc.querySelector('CtrlSum')?.textContent;

    return {
      recordCount: nbOfTxs ? parseInt(nbOfTxs, 10) : undefined,
      totalAmount: ctrlSum ? parseFloat(ctrlSum) : undefined,
      currency: 'EUR',
    };
  }

  static generateDownloadFilename(format: string): string {
    const timestamp = format(new Date(), 'yyyyMMdd-HHmmss');
    const extension = this.FORMATS[format as keyof typeof BankFileProcessor.FORMATS]?.extension || '.txt';
    return `bank-file-${format}-${timestamp}${extension}`;
  }
}
