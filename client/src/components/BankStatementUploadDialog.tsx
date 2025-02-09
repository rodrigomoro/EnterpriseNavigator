import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from 'lucide-react';
import { BankFileInterface } from './BankFileInterface';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

interface BankStatementUploadDialogProps {
  onFileUpload: (file: File) => Promise<void>;
  processedFile: any | null;
}

export function BankStatementUploadDialog({ onFileUpload, processedFile }: BankStatementUploadDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelection = async (file: File) => {
    setSelectedFile(file);
  };

  const handleProcessFile = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      await onFileUpload(selectedFile);
      setShowDialog(false); // Close dialog after successful processing
    } finally {
      setIsProcessing(false);
      setSelectedFile(null);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
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
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              Norma 43 files are used to update payment statuses. Upload them regularly to:
              <ul className="list-disc list-inside mt-2">
                <li>Reconcile pending payments</li>
                <li>Identify failed transactions</li>
                <li>Update processed payments to reconciled status</li>
              </ul>
            </AlertDescription>
          </Alert>

          <BankFileInterface onFileUpload={handleFileSelection} />

          {selectedFile && !processedFile && (
            <div className="flex justify-end">
              <Button 
                onClick={handleProcessFile} 
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Process File"}
              </Button>
            </div>
          )}

          {processedFile && (
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Processed File Details</h3>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Reconciliation Summary</h4>
                    <div className="mt-2 space-y-2">
                      <p><span className="font-medium">Total Transactions:</span> {processedFile.metadata.recordCount}</p>
                      <p><span className="font-medium">Matched Payments:</span> {processedFile.metadata.matchedCount || 0}</p>
                      <p><span className="font-medium">Updated Statuses:</span> {processedFile.metadata.updatedCount || 0}</p>
                      <p><span className="font-medium">Total Amount:</span> {processedFile.metadata.totalAmount} {processedFile.metadata.currency}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">File Content Preview</h4>
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