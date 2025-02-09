import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle2, XCircle, AlertTriangle, RefreshCcw } from "lucide-react";

// Types for payment statuses
type PaymentStatus = 'pending' | 'processed' | 'failed' | 'reconciled';

interface Payment {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  date: string;
  errorDetails?: string;
  type: 'direct-debit' | 'transfer';
}

interface PaymentReconciliationManagerProps {
  payments: Payment[];
  onRetryPayment: (paymentId: string) => Promise<void>;
  onMarkReconciled: (paymentId: string) => Promise<void>;
}

export function PaymentReconciliationManager({
  payments,
  onRetryPayment,
  onMarkReconciled
}: PaymentReconciliationManagerProps) {
  const [processing, setProcessing] = useState<string | null>(null);

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'processed':
        return <Badge variant="success">Processed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'reconciled':
        return <Badge className="bg-green-100 text-green-800">Reconciled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'processed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'reconciled':
        return <CheckCircle2 className="h-4 w-4 text-green-700" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleRetry = async (paymentId: string) => {
    setProcessing(paymentId);
    try {
      await onRetryPayment(paymentId);
    } finally {
      setProcessing(null);
    }
  };

  const handleReconcile = async (paymentId: string) => {
    setProcessing(paymentId);
    try {
      await onMarkReconciled(paymentId);
    } finally {
      setProcessing(null);
    }
  };

  const failedPayments = payments.filter(p => p.status === 'failed');

  return (
    <div className="space-y-6">
      {failedPayments.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {failedPayments.length} payment(s) require attention
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Payment Reconciliation</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5"
                >
                  <div className="flex items-start gap-4">
                    {getStatusIcon(payment.status)}
                    <div>
                      <div className="font-medium">
                        {payment.reference}
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {payment.amount} {payment.currency}
                      </div>
                      {payment.errorDetails && (
                        <div className="text-sm text-red-500 mt-1">
                          {payment.errorDetails}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(payment.status)}
                    {payment.status === 'failed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRetry(payment.id)}
                        disabled={processing === payment.id}
                      >
                        <RefreshCcw className="h-4 w-4 mr-1" />
                        Retry
                      </Button>
                    )}
                    {payment.status === 'processed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReconcile(payment.id)}
                        disabled={processing === payment.id}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Mark Reconciled
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
