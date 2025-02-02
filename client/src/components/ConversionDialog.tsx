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

interface ConversionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preRegistration: {
    id: string;
    studentId: string;
    studentName: string;
    modules: string[];
  };
  onConvert: (data: { 
    preRegistrationId: string;
    moduleAssignments: Array<{
      moduleId: string;
      groupId: string;
    }>;
  }) => void;
}

export function ConversionDialog({
  open,
  onOpenChange,
  preRegistration,
  onConvert,
}: ConversionDialogProps) {
  // Keep track of selected group for each module
  const [moduleAssignments, setModuleAssignments] = useState<Record<string, string>>({});

  // Get all available groups for each module
  const getGroupsForModule = (moduleId: string) => {
    const groups: Array<{ id: string; name: string; capacity: number; current: number }> = [];
    
    mockPrograms.forEach(program => {
      program.intakes.forEach(intake => {
        intake.groups.forEach(group => {
          const moduleTeacher = group.moduleTeachers.find(mt => mt.moduleId === moduleId);
          if (moduleTeacher) {
            groups.push({
              id: group.id,
              name: `${program.name} - ${intake.name} - ${group.name}`,
              capacity: group.capacity,
              current: group.currentStudents,
            });
          }
        });
      });
    });

    return groups;
  };

  const handleConvert = () => {
    // Validate all modules have groups assigned
    const isComplete = preRegistration.modules.every(
      moduleId => moduleAssignments[moduleId]
    );

    if (!isComplete) {
      // Show error using toast
      return;
    }

    onConvert({
      preRegistrationId: preRegistration.id,
      moduleAssignments: Object.entries(moduleAssignments).map(([moduleId, groupId]) => ({
        moduleId,
        groupId,
      })),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Convert Pre-registration to Enrollments</DialogTitle>
          <DialogDescription>
            Assign {preRegistration.studentName} to specific groups for each pre-registered module.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[400px] mt-4">
          <div className="space-y-4 pr-4">
            {preRegistration.modules.map((moduleId) => {
              const groups = getGroupsForModule(moduleId);
              
              return (
                <div key={moduleId} className="space-y-2">
                  <h4 className="font-medium">{moduleId}</h4>
                  <Select
                    value={moduleAssignments[moduleId]}
                    onValueChange={(value) =>
                      setModuleAssignments(prev => ({
                        ...prev,
                        [moduleId]: value,
                      }))
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
                          disabled={group.current >= group.capacity}
                        >
                          {group.name} ({group.current}/{group.capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            })}
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
