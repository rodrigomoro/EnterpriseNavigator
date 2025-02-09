import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import Sidebar from '@/components/Sidebar';
import PageTransition from '@/components/PageTransition';
import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, FileCheck, Send, AlertTriangle, Pencil, Download, Filter, UploadCloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { mockInvoices } from '@/data/mockInvoices';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { type DateRange } from "react-day-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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

const paymentMethods = [
  { value: 'all', label: 'All Payment Methods' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'direct_debit', label: 'Direct Debit' },
  { value: 'credit_card', label: 'Credit Card' },
];

const statuses = [
  { value: 'all', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'pending_approval', label: 'Pending Approval' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'signed', label: 'Signed' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'accepted', label: 'Accepted' },
];

interface FilterDialogProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  paymentMethodFilter: string;
  setPaymentMethodFilter: (value: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

const FilterDialog = ({
  statusFilter,
  setStatusFilter,
  paymentMethodFilter,
  setPaymentMethodFilter,
  dateRange,
  setDateRange,
}: FilterDialogProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="gap-2">
        <Filter className="h-4 w-4" />
        Filters
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-80" align="end">
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Filter Invoices</h4>
          <p className="text-sm text-muted-foreground">
            Apply filters to narrow down the invoice list
          </p>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Payment Method</Label>
          <Select
            value={paymentMethodFilter}
            onValueChange={setPaymentMethodFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Date Range</Label>
          <DatePickerWithRange
            date={dateRange}
            onDateChange={setDateRange}
          />
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

interface RecognizedFields {
  invoiceNumber: string;
  date: string;
  provider: {
    name: string;
    taxId: string;
    address: string;
  };
  description: string;
  amount: number;
  taxes: number;
  totalWithTaxes: number;
}

const ImportInvoiceDialog = () => {
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [recognizedFields, setRecognizedFields] = useState<RecognizedFields | null>(null);

  const processFile = useCallback((file: File) => {
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      // Mock OCR data - in a real implementation, this would come from an OCR service
      setRecognizedFields({
        invoiceNumber: "INV-2025-001",
        date: "2025-02-09",
        provider: {
          name: "Tech Solutions Inc",
          taxId: "B12345678",
          address: "Calle Principal 123, Madrid"
        },
        description: "IT Equipment and Services",
        amount: 1000.00,
        taxes: 210.00,
        totalWithTaxes: 1210.00
      });
      toast({
        title: "PDF uploaded successfully",
        description: "Processing invoice data...",
      });
    }
  }, [toast]);

  const handleUpdateField = (
    field: keyof RecognizedFields | keyof RecognizedFields['provider'],
    value: string | number,
    isProvider = false
  ) => {
    if (!recognizedFields) return;

    setRecognizedFields(prev => {
      if (!prev) return prev;

      if (isProvider) {
        return {
          ...prev,
          provider: {
            ...prev.provider,
            [field]: value
          }
        };
      }

      // For amount and taxes, recalculate total
      if (field === 'amount' || field === 'taxes') {
        const newAmount = field === 'amount' ? Number(value) : prev.amount;
        const newTaxes = field === 'taxes' ? Number(value) : prev.taxes;
        return {
          ...prev,
          [field]: Number(value),
          totalWithTaxes: newAmount + newTaxes
        };
      }

      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleImport = () => {
    if (!recognizedFields) return;

    // Here you would send the recognized fields to your backend
    toast({
      title: "Invoice Imported",
      description: "Invoice has been successfully imported and is pending approval.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      processFile(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a PDF file",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UploadCloud className="h-4 w-4 mr-2" />
          Import Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Import Invoice</DialogTitle>
          <DialogDescription>
            Upload a PDF invoice to automatically extract its information
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4 pr-4">
            {!previewUrl && (
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragging ? 'border-primary bg-primary/10' : 'border-border'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pdf-upload"
                />
                <Label
                  htmlFor="pdf-upload"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <UploadCloud className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground">
                    PDF files only
                  </span>
                </Label>
              </div>
            )}

            {previewUrl && recognizedFields && (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Preview</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <iframe
                      src={previewUrl}
                      className="w-full h-[600px]"
                      title="PDF Preview"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Recognized Information</h3>
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label>Invoice Number</Label>
                        <Input
                          value={recognizedFields.invoiceNumber}
                          onChange={(e) => handleUpdateField('invoiceNumber', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <Separator />
                      <div>
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={recognizedFields.date}
                          onChange={(e) => handleUpdateField('date', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Provider Details</Label>
                        <div className="space-y-2">
                          <Input
                            placeholder="Name"
                            value={recognizedFields.provider.name}
                            onChange={(e) => handleUpdateField('name', e.target.value, true)}
                          />
                          <Input
                            placeholder="Tax ID"
                            value={recognizedFields.provider.taxId}
                            onChange={(e) => handleUpdateField('taxId', e.target.value, true)}
                          />
                          <Input
                            placeholder="Address"
                            value={recognizedFields.provider.address}
                            onChange={(e) => handleUpdateField('address', e.target.value, true)}
                          />
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={recognizedFields.description}
                          onChange={(e) => handleUpdateField('description', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div>
                          <Label>Amount</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={recognizedFields.amount}
                            onChange={(e) => handleUpdateField('amount', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Taxes</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={recognizedFields.taxes}
                            onChange={(e) => handleUpdateField('taxes', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Total with Taxes</Label>
                          <p className="text-sm font-medium mt-1">€{recognizedFields.totalWithTaxes.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Button onClick={handleImport} className="w-full">
                    Import Invoice
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

interface Invoice {
  id: string;
  invoiceNumber: string;
  direction: 'outgoing' | 'incoming';
  status: InvoiceStatus;
  customer?: { name: string };
  issuer?: { name: string };
  totalAmount: number;
  dueDate: string;
  paymentMethod?: string;
  bankInfo?: { bankName: string };
  submissionInfo?: { verificationId: string };
  pdfUrl?: string;
  issueDate: string;
}


export default function Invoices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'outgoing' | 'incoming'>(() => {
    const savedTab = sessionStorage.getItem('invoicesActiveTab');
    return (savedTab === 'incoming' || savedTab === 'outgoing') ? savedTab : 'outgoing';
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [location, navigate] = useLocation();
  const { toast } = useToast();

  const handleTabChange = (tab: string) => {
    const newTab = tab as 'outgoing' | 'incoming';
    setActiveTab(newTab);
    sessionStorage.setItem('invoicesActiveTab', newTab);
  };

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesType = invoice.direction === activeTab;
    if (!matchesType) return false;

    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (activeTab === 'outgoing' ? invoice.customer.name : invoice.issuer.name).toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (statusFilter !== 'all' && invoice.status !== statusFilter) return false;

    if (paymentMethodFilter !== 'all' && invoice.paymentMethod !== paymentMethodFilter) return false;

    if (dateRange?.from || dateRange?.to) {
      const issueDate = new Date(invoice.issueDate);
      if (dateRange.from && issueDate < dateRange.from) return false;
      if (dateRange.to && issueDate > dateRange.to) return false;
    }

    return true;
  });

  const handleGenerateNorma34 = (invoiceId?: string) => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03">
  <!-- Generated SEPA payment file for invoice ${invoiceId || 'batch'} -->
</Document>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sepa-payment-${invoiceId || 'batch'}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Norma 34 file generated",
      description: invoiceId
        ? `SEPA payment file generated for invoice ${invoiceId}`
        : "SEPA payment file generated for all pending payments",
    });
  };

  const handleDownloadPDF = (invoice: Invoice) => {
    if (!invoice.pdfUrl) {
      toast({
        title: "Error",
        description: "PDF file not available for this invoice",
        variant: "destructive",
      });
      return;
    }

    const dummyPdfContent = `%PDF-1.7
1 0 obj
<<Type/Catalog/Pages 2 0 R>>
endobj
2 0 obj
<<Type/Pages/Count 1/Kids[3 0 R]>>
endobj
3 0 obj
<<Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<<>>/Contents 4 0 R>>
endobj
4 0 obj
<<Length 51>>
stream
BT
/F1 12 Tf
72 712 Td
(Invoice ${invoice.invoiceNumber}) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000054 00000 n
0000000102 00000 n
0000000189 00000 n
trailer
<<Size 5/Root 1 0 R>>
startxref
287
%%EOF`;

    const blob = new Blob([dummyPdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoice.invoiceNumber}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Downloading PDF",
      description: `Downloading invoice ${invoice.invoiceNumber}...`,
    });
  };

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
                <FilterDialog
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  paymentMethodFilter={paymentMethodFilter}
                  setPaymentMethodFilter={setPaymentMethodFilter}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />

                {activeTab === 'incoming' ? (
                  <ImportInvoiceDialog />
                ) : (
                  <Button onClick={() => navigate('/invoices/new')}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Invoice
                  </Button>
                )}
                <UserAvatar />
              </div>
            </div>
          </header>

          <main className="p-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="outgoing">Outgoing Invoices</TabsTrigger>
                <TabsTrigger value="incoming">Incoming Invoices</TabsTrigger>
              </TabsList>
              <TabsContent value="outgoing">
                <div className="text-sm text-muted-foreground mb-4">
                  Manage invoices sent to students and educational institutions
                </div>
              </TabsContent>
              <TabsContent value="incoming">
                <div className="text-sm text-muted-foreground mb-4">
                  Track and process invoices from vendors, teachers, and service providers
                </div>
              </TabsContent>
            </Tabs>

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
                                {invoice.status.split('_').map(word =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
                                <StatusIcon status={invoice.status as InvoiceStatus} />
                              </Badge>
                              {invoice.direction === 'incoming' && (
                                <Badge variant="outline" className="ml-2">Vendor Invoice</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {invoice.direction === 'incoming' ? invoice.issuer.name : invoice.customer.name}
                            </p>
                          </div>

                          <div className="text-right mr-10">
                            <p className="font-semibold">€{invoice.totalAmount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">
                              Due: {new Date(invoice.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {invoice.submissionInfo.verificationId && (
                              <span>VERIFACTU ID: {invoice.submissionInfo.verificationId}</span>
                            )}
                            {invoice.paymentMethod && (
                              <span>Payment: {invoice.paymentMethod.replace('_', ' ').toUpperCase()}</span>
                            )}
                            {invoice.bankInfo && (
                              <span>Bank: {invoice.bankInfo.bankName}</span>
                            )}
                          </div>
                        </div>
                      </Card>
                    </a>
                  </Link>

                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDownloadPDF(invoice);
                      }}
                      className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
                    >
                      <Download className="h-4 w-4" />
                    </Button>

                    {invoice.direction === 'outgoing' ? (
                      invoice.status === 'draft' && (
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
                      )
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleGenerateNorma34(invoice.id);
                        }}
                        className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
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