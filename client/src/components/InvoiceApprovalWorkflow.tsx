import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";
import type { Invoice } from "@/data/mockData";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ApprovalWorkflowProps {
  invoice: Invoice;
  onApprove?: (level: number, comments: string) => void;
  onReject?: (level: number, comments: string) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700'
};

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'approved':
      return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case 'rejected':
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Clock className="h-4 w-4 text-yellow-600" />;
  }
};

export default function InvoiceApprovalWorkflow({
  invoice,
  onApprove,
  onReject
}: ApprovalWorkflowProps) {
  const [comments, setComments] = useState('');
  const currentApprover = invoice.approvalWorkflow.approvers.find(
    a => a.level === invoice.approvalWorkflow.currentLevel
  );

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Approval Workflow</h3>
        
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-primary-foreground">
                  Approval Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block">
                  Level {invoice.approvalWorkflow.currentLevel} of {invoice.approvalWorkflow.maxLevels}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
              <div
                style={{
                  width: `${(invoice.approvalWorkflow.currentLevel / invoice.approvalWorkflow.maxLevels) * 100}%`
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
              />
            </div>
          </div>

          {/* Approval levels */}
          <div className="space-y-4">
            {invoice.approvalWorkflow.approvers.map((approver, index) => (
              <div key={approver.level} className="relative">
                {/* Connector line */}
                {index !== invoice.approvalWorkflow.approvers.length - 1 && (
                  <div className="absolute left-4 top-8 h-full w-0.5 bg-muted" />
                )}

                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background border">
                    <StatusIcon status={approver.status} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{approver.role}</p>
                        <p className="text-sm text-muted-foreground">Level {approver.level}</p>
                      </div>
                      <Badge className={statusColors[approver.status]}>
                        {approver.status.charAt(0).toUpperCase() + approver.status.slice(1)}
                      </Badge>
                    </div>

                    {approver.userId && (
                      <div className="mt-1 text-sm text-muted-foreground">
                        Processed by: {approver.userId}
                        {approver.timestamp && ` on ${new Date(approver.timestamp).toLocaleString()}`}
                      </div>
                    )}

                    {approver.comments && (
                      <div className="mt-2 text-sm bg-muted p-2 rounded">
                        {approver.comments}
                      </div>
                    )}

                    {/* Action buttons for current level */}
                    {approver.level === invoice.approvalWorkflow.currentLevel && 
                     approver.status === 'pending' && (
                      <div className="mt-4 space-y-4">
                        <Textarea
                          placeholder="Add your comments here..."
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => onReject?.(approver.level, comments)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button
                            className="w-full"
                            onClick={() => onApprove?.(approver.level, comments)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
