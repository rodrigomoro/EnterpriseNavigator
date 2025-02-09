import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { BankFileInterface } from './BankFileInterface';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface BankStatementUploadDialogProps {
  onFileUpload: (file: File) => Promise<void>;
  processedFile: any | null;
}

export function BankStatementUploadDialog({ onFileUpload, processedFile }: BankStatementUploadDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Bank Statement
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Bank Statement</DialogTitle>
          <DialogDescription>
            Upload Norma 43 bank statement files to reconcile payments and update statuses
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <BankFileInterface onFileUpload={onFileUpload} />

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
      </DialogContent>
    </Dialog>
  );
}

export default BankStatementUploadDialog;
