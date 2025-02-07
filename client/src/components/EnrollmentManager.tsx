// Previous imports remain unchanged
import { ReceiptPreviewDialog } from './ReceiptPreviewDialog';
import { useToast } from '@/hooks/use-toast';

export const EnrollmentManager = () => {
  // Previous state and mock data remain unchanged
  const { toast } = useToast();

  const handleDownloadReceipt = () => {
    toast({
      title: "Receipt downloaded",
      description: "The receipt has been downloaded successfully.",
    });
  };

  const handleEmailReceipt = () => {
    toast({
      title: "Receipt sent",
      description: "The receipt has been sent to the student's email.",
    });
  };

  return (
    <div className="space-y-4">
      {/* Previous header section remains unchanged */}

      <ScrollArea className="h-[600px] pr-4">
        <div className="grid grid-cols-1 gap-4">
          {filteredEnrollments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {enrollments.length === 0 
                ? "No enrollments yet. Convert pre-registrations to see them here."
                : "No enrollments match your search criteria."}
            </div>
          ) : (
            filteredEnrollments.map((enrollment) => (
              <Card key={enrollment.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${enrollment.studentId}`} />
                      <AvatarFallback>{enrollment.studentName.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{enrollment.studentName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <ReceiptPreviewDialog
                    enrollment={enrollment}
                    modules={mockModuleCatalog}
                    getGroupInfo={getGroupInfo}
                    onDownload={handleDownloadReceipt}
                    onEmail={handleEmailReceipt}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {enrollment.moduleAssignments.map((assignment) => {
                    const module = mockModuleCatalog.find(m => m.id === assignment.moduleId);
                    const groupInfo = getGroupInfo(assignment.groupId);

                    return (
                      <div key={`${enrollment.id}-${assignment.moduleId}`} className="space-y-2">
                        <Badge variant="outline" className="truncate">
                          {module?.name}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {groupInfo.programName} - {groupInfo.intakeName} - {groupInfo.groupName}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
