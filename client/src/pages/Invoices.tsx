import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import Sidebar from '@/components/Sidebar';
import { mockInvoices } from '@/data/mockData';
import PageTransition from '@/components/PageTransition';
import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, FileCheck, Send, AlertTriangle, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const statusColors = {
  draft: 'bg-muted text-muted-foreground',
  signed: 'bg-blue-100 text-blue-700',
  submitted: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  pending_approval: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700'
} as const;

type InvoiceStatus = keyof typeof statusColors;

const StatusIcon = ({ status }: { status: InvoiceStatus }) => {
  const Icon = statusIcons[status];
  return Icon ? <Icon className="h-3 w-3 ml-1" /> : null;
};

const statusIcons = {
  draft: null,
  signed: FileCheck,
  submitted: Send,
  accepted: FileCheck,
  rejected: AlertTriangle,
  pending_approval: Send,
  approved: FileCheck
} as const;

export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [, navigate] = useLocation();

  const filteredInvoices = mockInvoices.filter(invoice => 
    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <header>
            <div className="px-6 h-16 flex items-center justify-between gap-8 mb-6">
              <div className="min-w-60">
                <h1 className="text-2xl font-bold">Electronic Invoices</h1>
                <p className="text-muted-foreground">Manage and track all invoices</p>
              </div>

              <div className="flex-1 flex justify-center max-w-xl">
                <div className="relative w-full">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="min-w-60 flex justify-end items-center gap-4">
                <Button onClick={() => navigate('/invoices/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
                <UserAvatar />
              </div>
            </div>
          </header>

          <main className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {filteredInvoices.map((invoice) => (
                <div key={invoice.id} className="relative group">
                  <Link href={`/invoices/${invoice.id}`}>
                    <a className="block">
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{invoice.invoiceNumber}</h3>
                              <Badge className={statusColors[invoice.status as InvoiceStatus]}>
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                <StatusIcon status={invoice.status as InvoiceStatus} />
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{invoice.customer.name}</p>
                          </div>

                          <div className="text-right mr-10">
                            <p className="font-semibold">€{invoice.totalAmount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">
                              Due: {new Date(invoice.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {invoice.submissionInfo.verificationId && (
                          <div className="mt-2 pt-2 border-t">
                            <p className="text-xs text-muted-foreground">
                              VERIFACTU ID: {invoice.submissionInfo.verificationId}
                            </p>
                          </div>
                        )}
                      </Card>
                    </a>
                  </Link>

                  {/* Edit button overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/invoices/${invoice.id}/edit`);
                      }}
                      className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}