import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  paymentInfo?: {
    method: string;
    referenceNumber?: string;
    selectedFees: Array<{
      name: string;
      amount: number;
    }>;
    totalAmount: number;
  };
  onDownload?: () => void;
  onEmail?: () => void;
}

export function ReceiptPreviewDialog({ 
  enrollment, 
  modules, 
  getGroupInfo, 
  paymentInfo,
  onDownload, 
  onEmail 
}: ReceiptPreviewDialogProps) {
  const modulesFees = enrollment.moduleAssignments.reduce((sum, assignment) => sum + 500, 0);

  return (
    <Dialog>
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

            <Card className="p-4">
              <h4 className="font-medium mb-3">Payment Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium">{paymentInfo?.method || 'Not specified'}</span>
                </div>
                {paymentInfo?.referenceNumber && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reference Number:</span>
                    <span className="font-medium">{paymentInfo.referenceNumber}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Date:</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>

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

            <Card className="p-4">
              <h4 className="font-medium mb-3">Fee Breakdown</h4>
              <div className="space-y-2">
                {paymentInfo?.selectedFees.map((fee, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{fee.name}</span>
                    <span className="font-medium">${fee.amount.toFixed(2)}</span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>${paymentInfo?.totalAmount.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-medium mb-2">Terms and Conditions</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>1. All fees are non-refundable unless otherwise stated in the institution's refund policy.</p>
                <p>2. This receipt is only valid with an authorized signature or digital verification.</p>
                <p>3. Any disputes regarding this receipt must be reported within 30 days of the issue date.</p>
                <p>4. This receipt serves as proof of payment for the listed educational services.</p>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}