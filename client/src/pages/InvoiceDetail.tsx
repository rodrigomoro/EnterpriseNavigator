import { useRoute } from "wouter";
import { mockInvoices } from "@/data/mockData";
import { ArrowLeft, FileCheck, Shield, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "wouter";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const statusColors = {
  draft: 'bg-muted text-muted-foreground',
  signed: 'bg-blue-100 text-blue-700',
  submitted: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700'
} as const;

export default function InvoiceDetail() {
  const [, params] = useRoute('/invoices/:id');
  const invoice = mockInvoices.find(i => i.id === params?.id);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Link href="/invoices">
                    <a className="flex items-center gap-1 hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" />
                      Invoices
                    </a>
                  </Link>
                  <span>/</span>
                  <span className="text-foreground">{invoice.invoiceNumber}</span>
                </div>
                <h1 className="text-2xl font-bold">Invoice Details</h1>
              </div>

              <UserAvatar />
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - Invoice Details */}
              <div className="col-span-12 lg:col-span-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-semibold">{invoice.invoiceNumber}</h2>
                        <p className="text-muted-foreground">
                          Issue Date: {new Date(invoice.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={statusColors[invoice.status]}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Customer Information</h3>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium">{invoice.customer.name}</p>
                          <p className="text-muted-foreground">Tax ID: {invoice.customer.taxId}</p>
                          <p className="text-muted-foreground">{invoice.customer.address}</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">Items</h3>
                        <div className="space-y-2">
                          {invoice.items.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <div>
                                <p className="font-medium">{item.description}</p>
                                <p className="text-sm text-muted-foreground">
                                  Quantity: {item.quantity} × €{item.price}
                                </p>
                              </div>
                              <p className="font-medium">€{item.total}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <p className="font-medium">Total Amount</p>
                        <p className="text-xl font-bold">€{invoice.totalAmount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Digital Signature & Verification */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Digital Signature
                    </h3>

                    <div className="space-y-4">
                      {invoice.signatureInfo.signedAt ? (
                        <>
                          <div className="flex items-center gap-2 text-green-600">
                            <FileCheck className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Digitally Signed</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(invoice.signatureInfo.signedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm">
                            <p className="text-muted-foreground">Signed by:</p>
                            <p className="font-medium">{invoice.signatureInfo.signedBy}</p>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-yellow-600">
                          <Clock className="h-5 w-5" />
                          <p>Pending Signature</p>
                        </div>
                      )}

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-2">VERIFACTU Status</h4>
                        {invoice.submissionInfo.verificationId ? (
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Verification ID: {invoice.submissionInfo.verificationId}
                            </p>
                            <div className="flex items-center gap-2">
                              {invoice.submissionInfo.response?.status === 'accepted' ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              ) : invoice.submissionInfo.response?.status === 'rejected' ? (
                                <XCircle className="h-5 w-5 text-red-600" />
                              ) : (
                                <Clock className="h-5 w-5 text-yellow-600" />
                              )}
                              <p className="capitalize">
                                {invoice.submissionInfo.response?.status || 'Pending'}
                              </p>
                            </div>
                            {invoice.submissionInfo.response?.message && (
                              <p className="text-sm text-muted-foreground">
                                {invoice.submissionInfo.response.message}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Not submitted to VERIFACTU</p>
                        )}
                      </div>

                      <div className="pt-4">
                        {invoice.qrCode && (
                          <img
                            src={invoice.qrCode}
                            alt="Invoice QR Code"
                            className="w-32 h-32 mx-auto"
                          />
                        )}
                      </div>

                      {invoice.pdfUrl && (
                        <Button className="w-full" variant="outline">
                          Download PDF
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}