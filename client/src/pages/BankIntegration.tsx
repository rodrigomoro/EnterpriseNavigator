import { useState } from 'react';
import { BankFileInterface } from '@/components/BankFileInterface';
import { BankFileProcessor } from '@/lib/bankFileProcessor';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

export default function BankIntegration() {
  const [processedFile, setProcessedFile] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File, format: string) => {
    try {
      const processed = await BankFileProcessor.processUpload(file, format as any, {
        validateContent: true,
      });
      setProcessedFile(processed);
      
      // Here you would typically send the processed file to your backend
      // await uploadProcessedFile(processed);
      
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
      throw error; // Re-throw to be handled by the interface component
    }
  };

  const handleDownload = async (format: string) => {
    // TODO: Implement actual file download logic
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
          Upload and download bank files for payment processing and reconciliation.
        </p>
      </div>

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
    </div>
  );
}
