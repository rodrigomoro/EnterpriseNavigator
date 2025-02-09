import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, AlertCircle, CheckCircle2, XCircle, ArrowDown, ArrowUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { type DateRange } from "react-day-picker";
import { addDays } from "date-fns";
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
    type: string;
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

const referenceInfo = {
  DD: {
    label: 'Direct Debit',
    description: 'Automatically collected payments from student bank accounts'
  },
  TR: {
    label: 'Transfer',
    description: 'Bank transfers to vendors, teachers, or service providers'
  }
};

export function PaymentReconciliationManager({
  payments,
  onMarkReconciled
}: PaymentReconciliationManagerProps) {
  const [filter, setFilter] = useState<PaymentDirection | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const filteredPayments = payments.filter(p => {
    // Direction filter
    if (filter !== 'all' && p.direction !== filter) return false;

    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        p.reference.toLowerCase().includes(searchLower) ||
        p.source.description.toLowerCase().includes(searchLower) ||
        p.source.reference.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Date filter (only apply if dates are defined)
    if (dateRange?.from || dateRange?.to) {
      const paymentDate = new Date(p.date);
      if (dateRange.from && paymentDate < dateRange.from) return false;
      if (dateRange.to && paymentDate > dateRange.to) return false;
    }

    return true;
  });

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
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium mb-2">Payment Status Guide</p>
                        {Object.entries(statusInfo).map(([key, info]) => (
                          <div key={key} className="flex items-center gap-2 mb-2">
                            {info.icon}
                            <div>
                              <p className="font-medium">{info.label}</p>
                              <p className="text-sm text-muted-foreground">{info.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="font-medium mb-2">Reference Types</p>
                        {Object.entries(referenceInfo).map(([prefix, info]) => (
                          <div key={prefix} className="mb-2">
                            <p className="font-medium">{prefix} - {info.label}</p>
                            <p className="text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>
              Track and reconcile incoming and outgoing payments
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
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

              <div className="flex items-center gap-4 ml-auto">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, reference..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-[300px]"
                  />
                </div>
                <DatePickerWithRange
                  date={dateRange}
                  onDateChange={setDateRange}
                />
              </div>
            </div>

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
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="text-left">
                                {payment.reference}
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{payment.type === 'direct-debit' ? 'Direct Debit Payment' : 'Bank Transfer'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}