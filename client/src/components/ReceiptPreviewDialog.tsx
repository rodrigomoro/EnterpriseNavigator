import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Download, Mail, QrCode } from "lucide-react"

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
  const totalAmount = enrollment.moduleAssignments.reduce((sum, assignment) => {
    const groupInfo = getGroupInfo(assignment.groupId);
    // In a real app, we would get the actual cost from the group or program
    return sum + 500; // Mock cost per module
  }, 0);

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
          {/* Receipt Header */}
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h3 className="font-semibold text-lg">Educational Institution ERP</h3>
              <p className="text-sm text-muted-foreground">Receipt #{enrollment.id}</p>
              <p className="text-sm text-muted-foreground">
                Date: {new Date(enrollment.enrolledAt).toLocaleDateString()}
              </p>
            </div>
            <QrCode className="h-8 w-8 text-muted-foreground" />
          </div>

          {/* Student Information */}
          <div>
            <h4 className="font-medium mb-2">Student Information</h4>
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
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
          </div>

          {/* Enrolled Modules */}
          <div>
            <h4 className="font-medium mb-2">Enrolled Modules</h4>
            <Card>
              <div className="divide-y">
                {enrollment.moduleAssignments.map((assignment, index) => {
                  const module = modules.find(m => m.id === assignment.moduleId);
                  const groupInfo = getGroupInfo(assignment.groupId);
                  
                  return module ? (
                    <div key={index} className="p-4 flex justify-between items-start">
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
                        <p className="text-sm text-muted-foreground">Per module</p>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </Card>
          </div>

          {/* Total Amount */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total Amount</span>
              <span className="text-lg font-bold">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

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
