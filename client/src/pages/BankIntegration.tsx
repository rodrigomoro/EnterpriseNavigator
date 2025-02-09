import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Upload, Download, RefreshCw, FileText, Network, Award, Building2 } from 'lucide-react';
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
    title: "Norma 19 / SEPA XML - Direct Debit Orders",
    description:
      "Used for submitting direct debit orders to the bank. The SEPA XML format is the modern equivalent of Norma 19, both are supported by most banks.",
    workflow: [
      "Generate SEPA XML from student enrollments (via Enrollment Manager)",
      "Upload generated file to your bank's website",
      "Bank processes direct debits",
      "Download Norma 43 from bank for reconciliation",
      "Upload Norma 43 here to update payment statuses",
    ],
    format:
      "Both formats contain similar information: debtor details, account numbers, amounts, and due dates. SEPA XML is more detailed and follows the pain.008.001.02 schema.",
  },
  norma34: {
    title: "Norma 34 - Transfer Orders",
    description:
      "Used for issuing transfer payments to vendors, teachers, or service providers. Generate these files from the Financial Dashboard or Invoices section.",
    workflow: [
      "Generate transfer orders file from vendor invoices",
      "Upload the file to your bank's website",
      "Bank executes the transfers",
      "Download Norma 43 for reconciliation",
      "Upload Norma 43 here to update payment statuses",
    ],
    format:
      "Structured text file containing transfer recipient details, amounts, and payment concepts",
  },
  norma43: {
    title: "Norma 43 - Account Statements",
    description:
      "Comprehensive bank account statements showing all transactions. Used for reconciliation and payment status tracking.",
    workflow: [
      "Download Norma 43 file from your bank's website",
      "Upload the file here for processing",
      "System automatically updates payment statuses",
      "View reconciliation results in Financial Dashboard",
    ],
    format:
      "Contains detailed transaction records including dates, amounts, concepts, and reference numbers for both incoming (direct debits) and outgoing (transfers) transactions",
  },
};

// Mock data for testing the reconciliation interface
const mockPayments = [
  {
    id: '1',
    reference: 'DD-2024-001',
    amount: 500.00,
    currency: 'EUR',
    status: 'processed' as const,
    date: '2024-02-09',
    type: 'direct-debit' as const,
    direction: 'incoming' as const,
    source: {
      type: 'enrollment',
      description: 'Mark Student - Full Stack Development Program',
      reference: 'ENR-2024-001'
    }
  },
  {
    id: '2',
    reference: 'DD-2024-002',
    amount: 750.00,
    currency: 'EUR',
    status: 'failed' as const,
    date: '2024-02-09',
    errorDetails: 'Insufficient funds',
    type: 'direct-debit' as const,
    direction: 'incoming' as const,
    source: {
      type: 'enrollment',
      description: 'Alice Johnson - Data Science Program',
      reference: 'ENR-2024-002'
    }
  },
  {
    id: '3',
    reference: 'TR-2024-001',
    amount: 1200.00,
    currency: 'EUR',
    status: 'reconciled' as const,
    date: '2024-02-08',
    type: 'transfer' as const,
    direction: 'outgoing' as const,
    source: {
      type: 'invoice',
      description: 'John Smith - Teaching Services',
      reference: 'INV-2024-001'
    }
  },
  {
    id: '4',
    reference: 'DD-2024-003',
    amount: 350.00,
    currency: 'EUR',
    status: 'pending' as const,
    date: '2024-02-09',
    type: 'direct-debit' as const,
    direction: 'incoming' as const,
    source: {
      type: 'module',
      description: 'Bob Wilson - Advanced Python Module',
      reference: 'MOD-2024-001'
    }
  }
] as const;

export default function BankIntegration() {
  const [processedFile, setProcessedFile] = useState<any>(null);
  const [payments, setPayments] = useState(mockPayments);
  const { toast } = useToast();

  const parseNorma43 = (content: string) => {
    try {
      const lines = content.split('\n');
      const transactions = [];
      let currentTransaction = null;

      for (const line of lines) {
        if (!line.trim()) continue;

        const recordType = line.substring(0, 2);

        switch (recordType) {
          case '11': // Header
            break;
          case '22': { // Transaction
            const date = line.substring(10, 18);
            const amount = parseInt(line.substring(28, 40)) / 100; // Convert cents to euros
            const isCredit = amount >= 0;
            const concept = line.substring(52).trim();

            transactions.push({
              date,
              amount: Math.abs(amount),
              isCredit,
              concept
            });
            break;
          }
          case '33': // Footer
            break;
          case '88': // EOF
            break;
          default:
            console.warn(`Unknown record type: ${recordType}`);
        }
      }

      return transactions;
    } catch (error) {
      console.error('Error parsing Norma 43 file:', error);
      throw new Error('Invalid Norma 43 file format');
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      // Read file content
      const content = await file.text();

      // Parse transactions from Norma 43 file
      const transactions = parseNorma43(content);

      // Track matches and updates
      let matchedCount = 0;
      let updatedCount = 0;

      // Update payment statuses based on matched transactions
      setPayments(prev => prev.map(payment => {
        // Find matching transaction by amount and date
        const matchingTransaction = transactions.find(t =>
          t.amount === payment.amount &&
          new Date(t.date).toISOString().substring(0, 10) === new Date(payment.date).toISOString().substring(0, 10)
        );

        if (matchingTransaction) {
          matchedCount++;
          // Only count as updated if status actually changes
          if (payment.status !== 'reconciled') {
            updatedCount++;
          }
          return {
            ...payment,
            status: 'reconciled' as const
          };
        }
        return payment;
      }));

      // Update processed file details with reconciliation metrics
      setProcessedFile({
        metadata: {
          filename: file.name,
          processedAt: new Date().toISOString(),
          recordCount: transactions.length,
          matchedCount,
          updatedCount,
          totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
          currency: 'EUR'
        },
        format: 'norma43',
        content: content
      });

      toast({
        title: 'File Processed Successfully',
        description: `Updated ${updatedCount} payment statuses from ${matchedCount} matched transactions`
      });
    } catch (error) {
      console.error('File processing error:', error);
      toast({
        title: 'Processing Error',
        description: error instanceof Error ? error.message : 'Failed to process file',
        variant: 'destructive'
      });
      throw error;
    }
  };

  const handleMarkReconciled = async (paymentId: string) => {
    setPayments(prev =>
      prev.map(p =>
        p.id === paymentId
          ? { ...p, status: 'reconciled' as const }
          : p
      )
    );
    toast({
      title: 'Payment Reconciled',
      description: 'Payment has been marked as reconciled'
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <div className="p-6">
            <header className="flex justify-between items-center gap-8 mb-6">
              <div className="min-w-60">
                <h1 className="text-2xl font-bold">Bank Integration</h1>
                <p className="text-muted-foreground">
                  Manage bank file uploads for payment processing and reconciliation.
                </p>
              </div>

              <div className="min-w-60 flex justify-end items-center gap-4">
                <FileFormatGuideDialog formats={fileFormatInfo} />
                <BankStatementUploadDialog
                  onFileUpload={handleFileUpload}
                  processedFile={processedFile}
                />
                <UserAvatar />
              </div>
            </header>

            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <p className="mb-2">
                  This interface handles payment reconciliation through bank statement files (Norma 43).
                  For generating payment files:
                </p>
                <ul className="list-disc list-inside">
                  <li>Use Enrollment Manager to generate SEPA XML files for student direct debits</li>
                  <li>Use Financial Dashboard to create Norma 34 files for vendor transfers</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
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
                onMarkReconciled={handleMarkReconciled}
              />
            </div>
          </div>
        </PageTransition>
      </div>
    </div>
  );
}