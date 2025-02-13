import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, Mail, QrCode, Building2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  generateSEPAXML,
  downloadSEPAFile,
  generateInstallmentSEPAXMLs,
} from "@/lib/sepa";

interface ReceiptPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enrollment: {
    id: string;
    studentName: string;
    studentId: string;
    enrolledAt: string;
    moduleAssignments: Array<{
      moduleId: string;
      groupId: string;
      cost?: number;
    }>;
  };
  modules: any[];
  getGroupInfo: (groupId: string) => { programName: string; intakeName: string; groupName: string };
  paymentInfo?: {
    payers: Array<{
      type: string;
      name?: string;
      paymentMethod: string;
      referenceNumber?: string;
      coverageType: "percentage" | "amount";
      coverage: number;
      invoiceNumber?: string;
      paymentPlan?: "single" | "installments";
      installments?: number;
      bankAccount?: {
        mandateReference: string;
        accountHolder: string;
        iban: string;
        bic: string;
        mandateDate: string;
      };
    }>;
    selectedFees: Array<{
      name: string;
      amount: number;
    }>;
    totalAmount: number;
    paymentPlan?: "single" | "installments";
    numberOfInstallments?: number;
  };
  onDownload?: () => void;
  onEmail?: () => void;
}

export function ReceiptPreviewDialog({
  open,
  onOpenChange,
  enrollment,
  modules,
  getGroupInfo,
  paymentInfo,
  onDownload,
  onEmail,
}: ReceiptPreviewDialogProps) {
  const { toast } = useToast();
  const [generatedInvoices, setGeneratedInvoices] = useState<Record<number, string>>({});

  const formatPayerType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const calculateMonthlyPayment = (totalAmount: number, installments: number) => {
    return totalAmount / installments;
  };

  const handleGenerateInvoice = (payerIndex: number) => {
    const invoiceNumber = `INV-${Date.now()}-${payerIndex}`;
    setGeneratedInvoices((prev) => ({
      ...prev,
      [payerIndex]: invoiceNumber,
    }));
    toast({
      title: "Invoice Generated",
      description: `Invoice ${invoiceNumber} has been generated successfully.`,
    });
  };

  const handleDownloadSepaXml = async () => {
    if (!paymentInfo) return;
    // Define creditor details (update these as needed)
    const creditorId = "ES12ZZZ12345678";
    const creditorName = "Educational Institution";
    const creditorIBAN = "ES1234567890123456789012";
    const creditorBIC = "BANKESM1XXX";

    // Process each payer using Direct Debit
    for (const payer of paymentInfo.payers) {
      if (payer.paymentMethod === "direct_debit" && payer.bankAccount) {
        // Calculate the amount to be paid by this payer
        const paymentAmount =
          payer.coverageType === "percentage"
            ? (paymentInfo.totalAmount * payer.coverage) / 100
            : payer.coverage;

        // If the payment plan is installments, use the installment helper;
        // otherwise, generate and download a single SEPA XML file.
        if (
          paymentInfo.paymentPlan === "installments" &&
          paymentInfo.numberOfInstallments
        ) {
          // The helper will generate and download an XML file for each installment.
          generateInstallmentSEPAXMLs(
            creditorId,
            creditorName,
            creditorIBAN,
            creditorBIC,
            {
              iban: payer.bankAccount.iban,
              bic: payer.bankAccount.bic,
              accountHolder: payer.bankAccount.accountHolder,
              mandateReference: payer.bankAccount.mandateReference,
              mandateDate: payer.bankAccount.mandateDate,
            },
            {
              amount: paymentAmount,
              description: `Payment for ${enrollment.studentName}`,
              dueDate: new Date().toISOString().split("T")[0],
              totalInstallments: paymentInfo.numberOfInstallments,
            }
          );
        } else {
          const paymentData = {
            amount: paymentAmount,
            description: `Payment for ${enrollment.studentName}`,
            dueDate: new Date().toISOString().split("T")[0],
          };
          const xmlContent = generateSEPAXML(
            creditorId,
            creditorName,
            creditorIBAN,
            creditorBIC,
            {
              iban: payer.bankAccount.iban,
              bic: payer.bankAccount.bic,
              accountHolder: payer.bankAccount.accountHolder,
              mandateReference: payer.bankAccount.mandateReference,
              mandateDate: payer.bankAccount.mandateDate,
            },
            paymentData
          );
          downloadSEPAFile(
            xmlContent,
            `sepa-direct-debit-${payer.bankAccount.mandateReference}.xml`
          );
        }
      }
    }
    toast({
      title: "SEPA XML Downloaded",
      description: "The SEPA XML file(s) have been downloaded successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Receipt Preview</DialogTitle>
          <DialogDescription>
            Receipt for enrollment {enrollment.id}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(100vh-200px)] pr-6">
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b pb-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Educational Institution ERP
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    123 Education Street
                  </p>
                  <p className="text-sm text-muted-foreground">
                    contact@education.example
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <QrCode className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Receipt #{enrollment.id}</p>
                    <p className="text-sm text-muted-foreground">
                      Date:{" "}
                      {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student Name:</span>
                  <span className="font-medium">{enrollment.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student ID:</span>
                  <span className="font-medium">{enrollment.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Enrollment Date:
                  </span>
                  <span className="font-medium">
                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-4">
                <h4 className="font-medium mb-3">Enrolled Modules</h4>
                <div className="divide-y">
                  {enrollment.moduleAssignments.map((assignment, index) => {
                    const module = modules.find(
                      (m) => m.id === assignment.moduleId
                    );
                    const groupInfo = getGroupInfo(assignment.groupId);
                    const moduleCost = assignment.cost || 500;

                    return module ? (
                      <div key={index} className="py-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{module.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {groupInfo.programName} - {groupInfo.intakeName}
                            </p>
                            <Badge variant="outline" className="mt-1">
                              {groupInfo.groupName}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ${moduleCost.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Module fee
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-medium mb-3">Fee Breakdown</h4>
              <div className="space-y-2">
                {paymentInfo?.selectedFees.map((fee, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <span className="text-muted-foreground">
                        {fee.name}
                      </span>
                      {fee.name === "Tuition Fee" && (
                        <p className="text-sm text-muted-foreground">
                          {enrollment.moduleAssignments.length} modules - Variable costs
                        </p>
                      )}
                    </div>
                    <span className="font-medium">
                      ${fee.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>
                    ${paymentInfo?.totalAmount.toFixed(2) || "0.00"}
                  </span>
                </div>
                {paymentInfo?.paymentPlan === "installments" &&
                  paymentInfo.numberOfInstallments && (
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Payment Plan: Monthly Installments (
                        {paymentInfo.numberOfInstallments} months)
                      </p>
                      <p className="text-sm font-medium">
                        Monthly Payment: $
                        {calculateMonthlyPayment(
                          paymentInfo.totalAmount,
                          paymentInfo.numberOfInstallments
                        ).toFixed(2)}
                      </p>
                    </div>
                  )}
              </div>
            </Card>

            {/* Payment Source Section */}
            {paymentInfo?.payers.map((payer, index) => (
              <Card key={index} className="p-4">
                <h4 className="font-medium mb-3">
                  Payment Source #{index + 1}: {formatPayerType(payer.type)}
                  {payer.name && ` - ${payer.name}`}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Invoice Number:
                    </span>
                    {generatedInvoices[index] ? (
                      <span className="font-medium">
                        {generatedInvoices[index]}
                      </span>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateInvoice(index)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Generate Invoice
                      </Button>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Payment Method:
                    </span>
                    <span className="font-medium">
                      {payer.paymentMethod.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  {payer.referenceNumber && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Reference Number:
                      </span>
                      <span className="font-medium">
                        {payer.referenceNumber}
                      </span>
                    </div>
                  )}
                  {payer.paymentMethod === "direct_debit" &&
                    payer.bankAccount && (
                      <div className="border-t pt-2 mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            SEPA Mandate Reference:
                          </span>
                          <span className="font-medium">
                            {payer.bankAccount.mandateReference}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Account Holder:
                          </span>
                          <span className="font-medium">
                            {payer.bankAccount.accountHolder}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            IBAN:
                          </span>
                          <span className="font-medium">
                            {payer.bankAccount.iban}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            BIC/SWIFT:
                          </span>
                          <span className="font-medium">
                            {payer.bankAccount.bic}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Mandate Date:
                          </span>
                          <span className="font-medium">
                            {new Date(
                              payer.bankAccount.mandateDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Coverage:
                    </span>
                    <span className="font-medium">
                      {payer.coverageType === "percentage"
                        ? `${payer.coverage}%`
                        : `$${payer.coverage.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Amount Paid:
                    </span>
                    <span className="font-medium">
                      {(
                        payer.coverageType === "percentage"
                          ? (paymentInfo.totalAmount * payer.coverage) / 100
                          : payer.coverage
                      ).toFixed(2)}
                    </span>
                  </div>
                  {payer.paymentPlan === "installments" &&
                    payer.installments && (
                      <div className="border-t pt-2 mt-2">
                        <p className="text-sm text-muted-foreground">
                          Payment Plan: {payer.installments} monthly installments
                        </p>
                        <p className="text-sm font-medium">
                          Monthly Payment:{" "}
                          {(
                            payer.coverageType === "percentage"
                              ? (paymentInfo.totalAmount * payer.coverage) /
                                100 /
                                payer.installments
                              : payer.coverage / payer.installments
                          ).toFixed(2)}
                        </p>
                      </div>
                    )}
                </div>
              </Card>
            ))}

            <Card className="p-4">
              <h4 className="font-medium mb-2">Terms and Conditions</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  1. All fees are non-refundable unless otherwise stated in the institution's refund policy.
                </p>
                <p>
                  2. This receipt is only valid with an authorized signature or digital verification.
                </p>
                <p>
                  3. Any disputes regarding this receipt must be reported within 30 days of the issue date.
                </p>
                <p>
                  4. This receipt serves as proof of payment for the listed educational services.
                </p>
                {paymentInfo?.paymentPlan === "installments" && (
                  <p>
                    5. For installment plans, monthly payments are due on the same date each month as the initial payment.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" className="gap-2" onClick={onDownload}>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="gap-2" onClick={onEmail}>
            <Mail className="h-4 w-4" />
            Email Receipt
          </Button>
          {/* Render the SEPA XML download button if any payer uses direct debit */}
          {paymentInfo?.payers.some(
            (payer) => payer.paymentMethod === "direct_debit"
          ) && (
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleDownloadSepaXml}
            >
              <Download className="h-4 w-4" />
              Download SEPA XML
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReceiptPreviewDialog;
