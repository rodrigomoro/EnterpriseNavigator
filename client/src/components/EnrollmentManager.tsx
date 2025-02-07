// Imports for UI components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ReceiptPreviewDialog } from './ReceiptPreviewDialog';
import { useToast } from '@/hooks/use-toast';

// Import mock data (in a real app, this would come from an API)
import { mockModuleCatalog } from '@/data/mockModules';

export const EnrollmentManager = () => {
  const { toast } = useToast();

  // Mock data for enrollments (in a real app, this would come from an API)
  const enrollments = [
    {
      id: "1",
      studentId: "ST001",
      studentName: "John Doe",
      enrolledAt: "2024-02-07T10:00:00Z",
      moduleAssignments: [
        { moduleId: "MOD1", groupId: "GRP1" },
        { moduleId: "MOD2", groupId: "GRP2" }
      ]
    },
    // Add more mock enrollments as needed
  ];

  // Mock function to get group info (in a real app, this would come from an API)
  const getGroupInfo = (groupId: string) => ({
    programName: "Web Development",
    intakeName: "Spring 2024",
    groupName: "Group A"
  });

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

  // Filter logic would go here in a real app
  const filteredEnrollments = enrollments;

  return (
    <div className="space-y-4">
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

export default EnrollmentManager;