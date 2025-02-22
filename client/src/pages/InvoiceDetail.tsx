import { useRoute, Link, useLocation } from "wouter";
import { ArrowLeft, FileCheck, Shield, Clock, CheckCircle2, XCircle, User, Settings, Send, Lock, Key, AlertTriangle, Download, FileText, Pencil, Trash2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import InvoiceApprovalWorkflow from "@/components/InvoiceApprovalWorkflow";
import { useToast } from "@/hooks/use-toast";
import { mockInvoices } from "@/data/mockInvoices";
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Status colors and action icons remain unchanged...

const statusColors = {
  draft: 'bg-muted text-muted-foreground',
  pending_approval: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  signed: 'bg-blue-100 text-blue-700',
  submitted: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-green-100 text-green-700',
  ready_to_send_to_verifactu: 'bg-yellow-100 text-yellow-700',
  verified_by_verifactu: 'bg-green-100 text-green-700'
} as const;

const actionIcons = {
  created: Settings,
  signed: FileCheck,
  submitted: Send,
  verified: Shield,
  status_changed: Clock,
  approval_requested: Send,
  approved: CheckCircle2,
  rejected: XCircle
} as const;

type ActionType = keyof typeof actionIcons;

const TimelineIcon = ({ action }: { action: ActionType }) => {
  const Icon = actionIcons[action];
  return Icon ? <Icon className="h-4 w-4 text-primary" /> : null;
};

export default function InvoiceDetail() {
  const [, params] = useRoute('/invoices/:id');
  const [, navigate] = useLocation();
  const invoice = mockInvoices.find(i => i.id === params?.id);
  const { toast } = useToast();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const handleApprove = (level: number, comments: string) => {
    toast({
      title: "Invoice Approved",
      description: `Level ${level} approval processed successfully.`,
    });
  };

  const handleReject = (level: number, comments: string) => {
    toast({
      title: "Invoice Rejected",
      description: `Level ${level} rejection processed with comments.`,
      variant: "destructive",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Downloading PDF",
      description: `Downloading invoice ${invoice.invoiceNumber}...`,
    });
  };

  const handleSendToVerifactu = () => {
    toast({
      title: "Sent to VERIFACTU",
      description: `Invoice ${invoice.invoiceNumber} has been submitted to VERIFACTU for verification.`,
    });
  };

  const handleCancelInvoice = () => {
    toast({
      title: "Invoice Cancelled",
      description: `Invoice ${invoice.invoiceNumber} has been cancelled.`,
    });
    setShowCancelDialog(false);
  };

  const handleMarkAsSentToClient = () => {
    toast({
      title: "Status Updated",
      description: `Invoice ${invoice.invoiceNumber} has been marked as sent to client.`,
    });
  };

  const handleGenerateNorma34 = (invoiceId: string) => {
    //Implementation to generate Norma 34 file.  Replace with actual logic.
    toast({
      title: "Generating Norma 34 File",
      description: `Generating Norma 34 file for invoice ${invoiceId}...`,
    });
  };

  const handleDelete = () => {
    toast({
      title: "Invoice Deleted",
      description: `Draft invoice ${invoice.invoiceNumber} has been deleted.`,
    });
    setShowDeleteDialog(false);
    navigate('/invoices');
  };

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

              <div className="flex items-center gap-4">
                {invoice.direction === 'outgoing' && (
                  <>
                    {invoice.status === 'draft' && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/invoices/${invoice.id}/edit`)}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit Invoice
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => setShowDeleteDialog(true)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Invoice
                        </Button>
                      </>
                    )}
                    {invoice.status === 'ready_to_send_to_verifactu' && (
                      <>
                        <Button
                          variant="destructive"
                          onClick={() => setShowCancelDialog(true)}
                        >
                          Cancel Invoice
                        </Button>
                        <Button onClick={handleSendToVerifactu}>
                          Send to VERIFACTU
                        </Button>
                      </>
                    )}
                    {invoice.status === 'verified_by_verifactu' && (
                      <Button onClick={handleMarkAsSentToClient}>
                        Mark as Sent to Client
                      </Button>
                    )}
                  </>
                )}
                <UserAvatar />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 space-y-6">
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
                        {invoice.status.split('_').map(word =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">
                          {invoice.direction === 'incoming' ? 'Issuer Information' : 'Customer Information'}
                        </h3>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium">
                            {invoice.direction === 'incoming' ? invoice.issuer.name : invoice.customer.name}
                          </p>
                          <p className="text-muted-foreground">
                            Tax ID: {invoice.direction === 'incoming' ? invoice.issuer.taxId : invoice.customer.taxId}
                          </p>
                          <p className="text-muted-foreground">
                            {invoice.direction === 'incoming'
                              ? `${invoice.issuer.address}, ${invoice.issuer.postalCode} ${invoice.issuer.city}`
                              : `${invoice.customer.address}, ${invoice.customer.postalCode} ${invoice.customer.city}`}
                          </p>
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

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Document Actions</h3>
                    <div className="flex gap-4">
                      <Button
                        className="flex-1"
                        variant="outline"
                        onClick={handleDownloadPDF}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoice PDF
                      </Button>
                      {invoice.direction === 'incoming' && (
                        <Button
                          className="flex-1"
                          variant="outline"
                          onClick={() => handleGenerateNorma34(invoice.id)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Generate SEPA Payment File
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {invoice.direction === 'incoming' && (
                  <InvoiceApprovalWorkflow
                    invoice={invoice}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                )}

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Audit Trail</h3>
                    <div className="space-y-6">
                      {invoice.auditTrail?.map((event, index) => (
                        <div key={index} className="relative pl-6">
                          {index !== invoice.auditTrail.length - 1 && (
                            <div className="absolute left-[11px] top-6 w-[2px] h-full bg-muted" />
                          )}

                          <div className="flex items-start gap-4">
                            <div className="absolute left-0 p-1 rounded-full bg-background border">
                              <TimelineIcon action={event.action as ActionType} />
                            </div>

                            <div className="flex-1 pt-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{event.details}</p>
                                <time className="text-sm text-muted-foreground">
                                  {new Date(event.timestamp).toLocaleString()}
                                </time>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <User className="h-3 w-3 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">{event.actor}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

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

                          <Separator />
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <Lock className="h-4 w-4" />
                              Encryption Details
                            </h4>
                            <div className="text-sm space-y-1">
                              <div className="flex items-center gap-2">
                                <Key className="h-3 w-3 text-primary" />
                                <span>RSA-4096 Digital Signature</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Shield className="h-3 w-3 text-primary" />
                                <span>SHA-256 Hash Algorithm</span>
                              </div>
                            </div>
                          </div>

                          <Separator />
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <FileCheck className="h-4 w-4" />
                              Certificate Information
                            </h4>
                            <div className="text-sm space-y-1">
                              <p>Issuer: Spanish Tax Authority (FNMT)</p>
                              <p>Valid Until: 31/12/2025</p>
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle2 className="h-3 w-3" />
                                <span>Certificate Valid</span>
                              </div>
                            </div>
                          </div>

                          <Separator />
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              Security Alerts
                            </h4>
                            <div className="text-sm space-y-1">
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle2 className="h-3 w-3" />
                                <span>No security issues detected</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-yellow-600">
                          <Clock className="h-5 w-5" />
                          <p>Pending Signature</p>
                        </div>
                      )}

                      <div className="pt-4">
                        {invoice.qrCode && (
                          <img
                            src={invoice.qrCode}
                            alt="Invoice QR Code"
                            className="w-32 h-32 mx-auto"
                          />
                        )}
                      </div>

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
                          <p className="text-sm text-muted-foreground">
                            {invoice.direction === 'outgoing' && invoice.status === 'ready_to_send_to_verifactu'
                              ? 'Ready to be submitted to VERIFACTU'
                              : invoice.direction === 'outgoing' && invoice.status === 'submitted_to_verifactu'
                              ? 'Verification in progress...'
                              : 'Not submitted to VERIFACTU'}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Draft Invoice</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this draft invoice? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    Delete Invoice
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cancel Invoice</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to cancel this invoice? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                    Go Back
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleCancelInvoice}
                  >
                    Yes, Cancel Invoice
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}