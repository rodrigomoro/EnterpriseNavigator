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
  // Mock enrollments data
  const [enrollments] = useState<Enrollment[]>([
    {
      id: 'enrollment-1',
      studentId: 'student-1',
      studentName: 'Emma Thompson',
      moduleAssignments: [
        { moduleId: 'module-1', groupId: 'group-1' },
        { moduleId: 'module-2', groupId: 'group-2' },
        { moduleId: 'module-3', groupId: 'group-3' }
      ],
      enrolledAt: '2025-02-01T14:30:00Z'
    },
    {
      id: 'enrollment-2',
      studentId: 'student-2',
      studentName: 'Michael Chen',
      moduleAssignments: [
        { moduleId: 'module-4', groupId: 'group-4' },
        { moduleId: 'module-5', groupId: 'group-5' }
      ],
      enrolledAt: '2025-02-01T15:45:00Z'
    },
    {
      id: 'enrollment-3',
      studentId: 'student-3',
      studentName: 'Sofia Rodriguez',
      moduleAssignments: [
        { moduleId: 'module-2', groupId: 'group-2' },
        { moduleId: 'module-6', groupId: 'group-6' },
        { moduleId: 'module-7', groupId: 'group-7' }
      ],
      enrolledAt: '2025-02-01T16:15:00Z'
    }
  ]);

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
        <div className="grid grid-cols-1 gap-4">
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