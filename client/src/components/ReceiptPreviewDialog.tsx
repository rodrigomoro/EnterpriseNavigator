import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download, Mail, QrCode, Building2 } from "lucide-react"

interface ReceiptPreviewDialogProps {
  enrollment: {
    id: string;
    studentName: string;
    studentId: string;
    enrolledAt: string;
    moduleAssignments: Array<{
      moduleId: string;
      groupId: string;
    }>;
  };
  modules: any[];
  getGroupInfo: (groupId: string) => { programName: string; intakeName: string; groupName: string };
  onDownload?: () => void;
  onEmail?: () => void;
}

export function ReceiptPreviewDialog({ enrollment, modules, getGroupInfo, onDownload, onEmail }: ReceiptPreviewDialogProps) {
  // Calculate fees (in a real app, these would come from the backend)
  const modulesFees = enrollment.moduleAssignments.reduce((sum, assignment) => sum + 500, 0);
  const materialsFee = 100;
  const registrationFee = 50;
  const totalAmount = modulesFees + materialsFee + registrationFee;

  // Mock payment status (in a real app, this would come from the backend)
  const paymentStatus = {
    status: "Paid",
    method: "Credit Card",
    transactionId: "TXN-2024-001",
    paidAt: new Date().toISOString(),
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Generate Receipt</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Receipt Preview</DialogTitle>
          <DialogDescription>
            Receipt for enrollment {enrollment.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Letterhead */}
          <div className="flex justify-between items-start border-b pb-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Educational Institution ERP</h3>
                <p className="text-sm text-muted-foreground">123 Education Street</p>
                <p className="text-sm text-muted-foreground">contact@education.example</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <QrCode className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Receipt #{enrollment.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Date: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Student Information */}
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
                <span className="text-muted-foreground">Enrollment Date:</span>
                <span className="font-medium">
                  {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Payment Status */}
          <Card className="p-4">
            <h4 className="font-medium mb-3">Payment Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={paymentStatus.status === "Paid" ? "default" : "secondary"}>
                  {paymentStatus.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-medium">{paymentStatus.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-medium">{paymentStatus.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Date:</span>
                <span className="font-medium">
                  {new Date(paymentStatus.paidAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Enrolled Modules */}
          <Card>
            <div className="p-4">
              <h4 className="font-medium mb-3">Enrolled Modules</h4>
              <div className="divide-y">
                {enrollment.moduleAssignments.map((assignment, index) => {
                  const module = modules.find(m => m.id === assignment.moduleId);
                  const groupInfo = getGroupInfo(assignment.groupId);

                  return module ? (
                    <div key={index} className="py-3 flex justify-between items-start">
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
                        <p className="font-medium">$500.00</p>
                        <p className="text-sm text-muted-foreground">Tuition fee</p>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </Card>

          {/* Fee Breakdown */}
          <Card className="p-4">
            <h4 className="font-medium mb-3">Fee Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Modules Tuition</span>
                <span className="font-medium">${modulesFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Materials Fee</span>
                <span className="font-medium">${materialsFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Registration Fee</span>
                <span className="font-medium">${registrationFee.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          {/* Terms and Conditions */}
          <Card className="p-4">
            <h4 className="font-medium mb-2">Terms and Conditions</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>1. All fees are non-refundable unless otherwise stated in the institution's refund policy.</p>
              <p>2. This receipt is only valid with an authorized signature or digital verification.</p>
              <p>3. Any disputes regarding this receipt must be reported within 30 days of the issue date.</p>
              <p>4. This receipt serves as proof of payment for the listed educational services.</p>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="gap-2" onClick={onDownload}>
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="gap-2" onClick={onEmail}>
              <Mail className="h-4 w-4" />
              Email Receipt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}