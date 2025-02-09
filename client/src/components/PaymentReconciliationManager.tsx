import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, AlertCircle, CheckCircle2, XCircle, ArrowDown, ArrowUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Types for payment statuses
type PaymentStatus = 'pending' | 'processed' | 'failed' | 'reconciled';
type PaymentType = 'direct-debit' | 'transfer';
type PaymentDirection = 'incoming' | 'outgoing';

interface Payment {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  date: string;
  errorDetails?: string;
  type: PaymentType;
  direction: PaymentDirection;
  source: {
    type: string; // 'enrollment' | 'invoice' | 'module'
    description: string;
    reference: string;
  };
}

interface PaymentReconciliationManagerProps {
  payments: Payment[];
  onMarkReconciled: (paymentId: string) => Promise<void>;
}

const statusInfo = {
  pending: {
    label: 'Pending',
    description: 'Initial state when payment is created',
    badge: <Badge variant="secondary">Pending</Badge>,
    icon: <AlertCircle className="h-4 w-4 text-yellow-500" />
  },
  processed: {
    label: 'Processed',
    description: 'Payment has been accepted by the bank',
    badge: <Badge variant="default">Processed</Badge>,
    icon: <CheckCircle2 className="h-4 w-4 text-blue-500" />
  },
  failed: {
    label: 'Failed',
    description: 'Payment was rejected by the bank or had insufficient funds',
    badge: <Badge variant="destructive">Failed</Badge>,
    icon: <XCircle className="h-4 w-4 text-red-500" />
  },
  reconciled: {
    label: 'Reconciled',
    description: 'Payment has cleared and been matched with bank statement',
    badge: <Badge className="bg-green-100 text-green-800">Reconciled</Badge>,
    icon: <CheckCircle2 className="h-4 w-4 text-green-700" />
  }
};

export function PaymentReconciliationManager({
  payments,
  onMarkReconciled
}: PaymentReconciliationManagerProps) {
  const [filter, setFilter] = useState<PaymentDirection | 'all'>('all');

  const filteredPayments = payments.filter(p => 
    filter === 'all' ? true : p.direction === filter
  );

  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const failedPayments = payments.filter(p => p.status === 'failed').length;

  return (
    <div className="space-y-6">
      {(pendingPayments > 0 || failedPayments > 0) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {pendingPayments > 0 && `${pendingPayments} pending payment(s)`}
            {pendingPayments > 0 && failedPayments > 0 && ' and '}
            {failedPayments > 0 && `${failedPayments} failed payment(s)`}
            {' require attention'}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              Payment Reconciliation
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="w-80">
                    <div className="space-y-2">
                      <p className="font-medium">Payment Status Guide</p>
                      {Object.entries(statusInfo).map(([key, info]) => (
                        <div key={key} className="flex items-center gap-2">
                          {info.icon}
                          <div>
                            <p className="font-medium">{info.label}</p>
                            <p className="text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>
              Track and reconcile incoming and outgoing payments
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge
              variant={filter === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter('all')}
            >
              All
            </Badge>
            <Badge
              variant={filter === 'incoming' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter('incoming')}
            >
              Incoming
            </Badge>
            <Badge
              variant={filter === 'outgoing' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter('outgoing')}
            >
              Outgoing
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5"
                >
                  <div className="flex items-start gap-4">
                    {payment.direction === 'incoming' ? (
                      <ArrowDown className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowUp className="h-4 w-4 text-blue-500" />
                    )}
                    <div className="space-y-1">
                      <div className="font-medium flex items-center gap-2">
                        {payment.reference}
                        <span className="text-sm font-normal text-muted-foreground">
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {payment.amount} {payment.currency}
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Source: </span>
                        {payment.source.type === 'enrollment' ? '👤 ' : payment.source.type === 'invoice' ? '📄 ' : '📚 '}
                        {payment.source.description}
                        <span className="text-muted-foreground ml-1">
                          ({payment.source.reference})
                        </span>
                      </div>
                      {payment.errorDetails && (
                        <div className="text-sm text-red-500 mt-1">
                          {payment.errorDetails}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {statusInfo[payment.status].badge}
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