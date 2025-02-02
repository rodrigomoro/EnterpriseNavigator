import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockPrograms } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ConversionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preRegistrations: Array<{
    id: string;
    studentId: string;
    studentName: string;
    modules: string[];
  }>;
  onConvert: (data: { 
    conversions: Array<{
      preRegistrationId: string;
      moduleAssignments: Array<{
        moduleId: string;
        groupId: string;
      }>;
    }>;
  }) => void;
}

export function ConversionDialog({
  open,
  onOpenChange,
  preRegistrations,
  onConvert,
}: ConversionDialogProps) {
  // Keep track of selected group for each student's module
  const [moduleAssignments, setModuleAssignments] = useState<
    Record<string, Record<string, string>>
  >({});

  // Get all available groups for each module
  const getGroupsForModule = (moduleId: string) => {
    const groups: Array<{ id: string; name: string; capacity: number; enrolled: number }> = [];

    mockPrograms.forEach(program => {
      program.intakes.forEach(intake => {
        intake.groups.forEach(group => {
          const moduleTeacher = group.moduleTeachers.find(mt => mt.moduleId === moduleId);
          if (moduleTeacher) {
            groups.push({
              id: group.id,
              name: `${program.name} - ${intake.name} - ${group.name}`,
              capacity: group.capacity,
              enrolled: group.studentIds.length,
            });
          }
        });
      });
    });

    return groups;
  };

  const handleConvert = () => {
    // Validate all students have all their modules assigned to groups
    const isComplete = preRegistrations.every(preReg =>
      preReg.modules.every(moduleId => 
        moduleAssignments[preReg.id]?.[moduleId]
      )
    );

    if (!isComplete) {
      // Show error using toast
      return;
    }

    onConvert({
      conversions: preRegistrations.map(preReg => ({
        preRegistrationId: preReg.id,
        moduleAssignments: Object.entries(moduleAssignments[preReg.id] || {}).map(
          ([moduleId, groupId]) => ({
            moduleId,
            groupId,
          })
        ),
      })),
    });
  };

  const handleGroupSelect = (preRegId: string, moduleId: string, groupId: string) => {
    setModuleAssignments(prev => ({
      ...prev,
      [preRegId]: {
        ...(prev[preRegId] || {}),
        [moduleId]: groupId,
      },
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Convert Pre-registrations to Enrollments</DialogTitle>
          <DialogDescription>
            Assign students to specific groups for each pre-registered module.
            {preRegistrations.length > 1 && 
              ` Converting ${preRegistrations.length} pre-registrations.`
            }
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[600px] mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
            {preRegistrations.map((preReg) => (
              <Card key={preReg.id} className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${preReg.studentId}`} />
                    <AvatarFallback>{preReg.studentName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{preReg.studentName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {preReg.modules.length} modules
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {preReg.modules.map((moduleId) => {
                    const groups = getGroupsForModule(moduleId);
                    const selectedGroupId = moduleAssignments[preReg.id]?.[moduleId];

                    return (
                      <div key={moduleId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{moduleId}</Badge>
                          {selectedGroupId && (
                            <Badge variant="secondary" className="ml-2">
                              Group Selected
                            </Badge>
                          )}
                        </div>
                        <Select
                          value={selectedGroupId}
                          onValueChange={(value) => 
                            handleGroupSelect(preReg.id, moduleId, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a group" />
                          </SelectTrigger>
                          <SelectContent>
                            {groups.map((group) => (
                              <SelectItem 
                                key={group.id} 
                                value={group.id}
                                disabled={group.enrolled >= group.capacity}
                              >
                                {group.name} ({group.enrolled}/{group.capacity})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConvert}>
            Convert to Enrollments
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}