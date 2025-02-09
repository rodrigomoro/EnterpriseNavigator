import { useState } from 'react';
import { BankFileProcessor } from '@/lib/bankFileProcessor';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Upload, Download, RefreshCw, FileText } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import { FileFormatGuideDialog } from '@/components/FileFormatGuideDialog';
import { BankStatementUploadDialog } from '@/components/BankStatementUploadDialog';
import { PaymentReconciliationManager } from '@/components/PaymentReconciliationManager';
import UserAvatar from "@/components/UserAvatar";

// File format descriptions and info
const fileFormatInfo = {
  norma19: {
    title: 'Norma 19 / SEPA XML - Direct Debit Orders',
    description: 'Used for submitting direct debit orders to the bank. The SEPA XML format is the modern equivalent of Norma 19, both are supported by most banks.',
    workflow: [
      'Generate SEPA XML from student enrollments (via Enrollment Manager)',
      'Upload generated file to your bank\'s website',
      'Bank processes direct debits',
      'Download Norma 43 from bank for reconciliation',
      'Upload Norma 43 here to update payment statuses'
    ],
    format: 'Both formats contain similar information: debtor details, account numbers, amounts, and due dates. SEPA XML is more detailed and follows the pain.008.001.02 schema.'
  },
  norma34: {
    title: 'Norma 34 - Transfer Orders',
    description: 'Used for issuing transfer payments to vendors, teachers, or service providers. Generate these files from the Financial Dashboard or Invoices section.',
    workflow: [
      'Generate transfer orders file from vendor invoices',
      'Upload the file to your bank\'s website',
      'Bank executes the transfers',
      'Download Norma 43 for reconciliation',
      'Upload Norma 43 here to update payment statuses'
    ],
    format: 'Structured text file containing transfer recipient details, amounts, and payment concepts'
  },
  norma43: {
    title: 'Norma 43 - Account Statements',
    description: 'Comprehensive bank account statements showing all transactions. Used for reconciliation and payment status tracking.',
    workflow: [
      'Download Norma 43 file from your bank\'s website',
      'Upload the file here for processing',
      'System automatically updates payment statuses',
      'View reconciliation results in Financial Dashboard'
    ],
    format: 'Contains detailed transaction records including dates, amounts, concepts, and reference numbers for both incoming (direct debits) and outgoing (transfers) transactions'
  }
};

// Mock data for testing the reconciliation interface
const mockPayments = [
  {
    id: '1',
    reference: 'DD-2024-001',
    amount: 500.00,
    currency: 'EUR',
    status: 'processed',
    date: '2024-02-09',
    type: 'direct-debit'
  },
  {
    id: '2',
    reference: 'DD-2024-002',
    amount: 750.00,
    currency: 'EUR',
    status: 'failed',
    date: '2024-02-09',
    errorDetails: 'Insufficient funds',
    type: 'direct-debit'
  },
  {
    id: '3',
    reference: 'TR-2024-001',
    amount: 1200.00,
    currency: 'EUR',
    status: 'reconciled',
    date: '2024-02-08',
    type: 'transfer'
  },
  {
    id: '4',
    reference: 'DD-2024-003',
    amount: 350.00,
    currency: 'EUR',
    status: 'pending',
    date: '2024-02-09',
    type: 'direct-debit'
  }
] as const;

export default function BankIntegration() {
  const [processedFile, setProcessedFile] = useState<any>(null);
  const [payments, setPayments] = useState(mockPayments);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      const processed = await BankFileProcessor.processUpload(file, 'norma43', {
        validateContent: true,
      });
      setProcessedFile(processed);

      // In a real implementation, this would update the payments based on the
      // reconciliation results from processing the Norma 43 file
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

  const handleRetryPayment = async (paymentId: string) => {
    // Simulate payment retry
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPayments(prev =>
      prev.map(p =>
        p.id === paymentId
          ? { ...p, status: 'processed' as const, errorDetails: undefined }
          : p
      )
    );
    toast({
      title: 'Payment Retried',
      description: 'Payment has been successfully retried',
    });
  };

  const handleMarkReconciled = async (paymentId: string) => {
    // Simulate reconciliation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPayments(prev =>
      prev.map(p =>
        p.id === paymentId
          ? { ...p, status: 'reconciled' as const }
          : p
      )
    );
    toast({
      title: 'Payment Reconciled',
      description: 'Payment has been marked as reconciled',
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <div className="container mx-auto py-6 space-y-6">
            <header className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Bank Integration</h2>
                <p className="text-muted-foreground">
                  Manage bank file uploads for payment processing and reconciliation.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FileFormatGuideDialog formats={fileFormatInfo} />
                <BankStatementUploadDialog 
                  onFileUpload={handleFileUpload}
                  processedFile={processedFile}
                />
                <UserAvatar />
              </div>
            </header>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This interface handles the reconciliation of payments through bank statement files (Norma 43).
                For generating payment files, use the Enrollment Manager (for student direct debits) or 
                Financial Dashboard (for vendor transfers).
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
                      Generate payment files from student records or invoices
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

              <PaymentReconciliationManager
                payments={payments}
                onRetryPayment={handleRetryPayment}
                onMarkReconciled={handleMarkReconciled}
              />
            </div>
          </div>
        </PageTransition>
      </div>
    </div>
  );
}