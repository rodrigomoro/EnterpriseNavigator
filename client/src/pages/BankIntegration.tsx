import { useState } from 'react';
import { BankFileInterface } from '@/components/BankFileInterface';
import { BankFileProcessor } from '@/lib/bankFileProcessor';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Upload, Download, RefreshCw, FileText } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

// File format descriptions
const fileFormatInfo = {
  norma19: {
    title: 'Norma 19 - Direct Debit Orders',
    description: 'Used for submitting direct debit orders to the bank. This format allows educational institutions to collect payments directly from student bank accounts.',
    workflow: [
      'Generate SEPA direct debit file from student payments',
      'Upload file to bank for processing',
      'Bank processes direct debits',
      'Download Norma 43 for reconciliation'
    ],
    format: 'Fixed-length text file with header (type 51), individual orders, and footer records'
  },
  norma34: {
    title: 'Norma 34 - Transfer Orders',
    description: 'Used for issuing transfer payments. This format is typically used for refunds or payments to vendors.',
    workflow: [
      'Generate transfer orders file',
      'Upload to bank for processing',
      'Bank executes transfers',
      'Download Norma 43 for reconciliation'
    ],
    format: 'Text file with header (type 34), transfer records, and control totals'
  },
  norma43: {
    title: 'Norma 43 - Account Statements',
    description: 'Bank account statements showing all transactions. Used for reconciliation and payment tracking.',
    workflow: [
      'Download daily/weekly statements',
      'Process transactions',
      'Match against expected payments',
      'Update payment statuses'
    ],
    format: 'Account movements with detailed transaction information including dates, amounts, and concepts'
  },
  sepa: {
    title: 'SEPA XML - Direct Debit',
    description: 'XML-based format for SEPA (Single Euro Payments Area) direct debit orders. Modern alternative to Norma 19.',
    workflow: [
      'Generate XML file with payment details',
      'Submit to bank via online banking',
      'Track status through bank interface',
      'Reconcile using statement downloads'
    ],
    format: 'Standardized XML format following pain.008.001.02 schema'
  }
};

export default function BankIntegration() {
  const [processedFile, setProcessedFile] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File, format: string) => {
    try {
      const processed = await BankFileProcessor.processUpload(file, format as any, {
        validateContent: true,
      });
      setProcessedFile(processed);

      toast({
        title: 'File Processed Successfully',
        description: `Processed ${processed.metadata.recordCount || 0} records`,
      });
    } catch (error) {
      console.error('File processing error:', error);
      toast({
        title: 'Processing Error',
        description: error instanceof Error ? error.message : 'Failed to process file',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const handleDownload = async (format: string) => {
    const filename = BankFileProcessor.generateDownloadFilename(format);
    toast({
      title: 'Download Started',
      description: `Downloading ${filename}`,
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Bank Integration</h2>
        <p className="text-muted-foreground">
          Manage bank file uploads and downloads for payment processing and reconciliation.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This interface handles the upload and download of bank files for payment processing.
          Select the appropriate format based on your needs: Norma 19 for direct debits,
          Norma 34 for transfers, or Norma 43 for account statements.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Banking Workflow Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <Upload className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">1. File Generation</h4>
              <p className="text-sm text-muted-foreground">
                Generate payment files from student records
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">2. Bank Processing</h4>
              <p className="text-sm text-muted-foreground">
                Bank processes the payment orders
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <Download className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">3. Statement Download</h4>
              <p className="text-sm text-muted-foreground">
                Retrieve account statements (Norma 43)
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <RefreshCw className="h-8 w-8 mb-2 text-primary" />
              <h4 className="font-medium">4. Reconciliation</h4>
              <p className="text-sm text-muted-foreground">
                Match and update payment statuses
              </p>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="upload" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">File Upload/Download</TabsTrigger>
            <TabsTrigger value="formats">File Format Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <BankFileInterface
                onFileUpload={handleFileUpload}
                onDownload={handleDownload}
              />

              {processedFile && (
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">Processed File Details</h3>
                  <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Metadata</h4>
                        <div className="mt-2 space-y-2">
                          <p><span className="font-medium">Filename:</span> {processedFile.metadata.filename}</p>
                          <p><span className="font-medium">Format:</span> {processedFile.format.toUpperCase()}</p>
                          <p><span className="font-medium">Processed At:</span> {processedFile.metadata.processedAt}</p>
                          {processedFile.metadata.recordCount && (
                            <p><span className="font-medium">Record Count:</span> {processedFile.metadata.recordCount}</p>
                          )}
                          {processedFile.metadata.totalAmount && (
                            <p><span className="font-medium">Total Amount:</span> {processedFile.metadata.totalAmount} {processedFile.metadata.currency}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium">Content Preview</h4>
                        <pre className="mt-2 whitespace-pre-wrap break-all text-sm text-muted-foreground">
                          {processedFile.content.substring(0, 500)}
                          {processedFile.content.length > 500 && '...'}
                        </pre>
                      </div>
                    </div>
                  </ScrollArea>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="formats">
            <div className="grid gap-4">
              {Object.entries(fileFormatInfo).map(([key, info]) => (
                <Card key={key} className="p-6">
                  <h3 className="text-lg font-medium mb-2">{info.title}</h3>
                  <p className="text-muted-foreground mb-4">{info.description}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Workflow Steps</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {info.workflow.map((step, index) => (
                          <li key={index} className="text-muted-foreground">{step}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">File Format</h4>
                      <p className="text-sm text-muted-foreground">{info.format}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}