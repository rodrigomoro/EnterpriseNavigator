import { useState } from 'react';
import { Link } from 'wouter';
import Sidebar from '@/components/Sidebar';
import PageTransition from '@/components/PageTransition';
import UserAvatar from '@/components/UserAvatar';
import QRCodeTracker from '@/components/QRCodeTracker';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { mockInvoices } from '@/data/mockInvoices';

export default function QRTrackingDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

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
                <h1 className="text-2xl font-bold">QR Code Tracking</h1>
                <p className="text-muted-foreground">Track and verify invoice authenticity</p>
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

              <div className="min-w-60 flex justify-end">
                <UserAvatar />
              </div>
            </div>
          </header>

          <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInvoices.map((invoice) => (
                <Link key={invoice.id} href={`/invoices/${invoice.id}`}>
                  <a className="block hover:opacity-90 transition-opacity">
                    <QRCodeTracker invoice={invoice} />
                  </a>
                </Link>
              ))}
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
