import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { mockModuleCatalog, mockPrograms } from '@/data/mockData';

interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  moduleAssignments: Array<{
    moduleId: string;
    groupId: string;
  }>;
  enrolledAt: string;
}

export const EnrollmentManager = () => {
  // In a real app, this would be fetched from an API
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const getGroupInfo = (groupId: string) => {
    let groupInfo = { programName: '', intakeName: '', groupName: '' };
    
    mockPrograms.some(program => 
      program.intakes.some(intake => 
        intake.groups.some(group => {
          if (group.id === groupId) {
            groupInfo = {
              programName: program.name,
              intakeName: intake.name,
              groupName: group.name,
            };
            return true;
          }
          return false;
        })
      )
    );

    return groupInfo;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Current Enrollments</h2>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {enrollments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No enrollments yet. Convert pre-registrations to see them here.
            </div>
          ) : (
            enrollments.map((enrollment) => (
              <Card key={enrollment.id} className="p-4">
                <div className="flex items-center gap-3 mb-4">
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
