import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { mockModuleCatalog, mockPrograms } from '@/data/mockData';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Calendar, Filter, Search, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

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

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedModule, setSelectedModule] = useState<string>();
  const [selectedProgram, setSelectedProgram] = useState<string>();

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

  const uniquePrograms = Array.from(new Set(mockPrograms.map(p => p.name)));
  const uniqueModules = Array.from(new Set(mockModuleCatalog.map(m => m.id)));

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = enrollment.studentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = !selectedDate || 
      format(new Date(enrollment.enrolledAt), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

    const matchesModule = !selectedModule || 
      enrollment.moduleAssignments.some(ma => ma.moduleId === selectedModule);

    const matchesProgram = !selectedProgram || 
      enrollment.moduleAssignments.some(ma => {
        const groupInfo = getGroupInfo(ma.groupId);
        return groupInfo.programName === selectedProgram;
      });

    return matchesSearch && matchesDate && matchesModule && matchesProgram;
  });

  const clearFilters = () => {
    setSelectedDate(undefined);
    setSelectedModule(undefined);
    setSelectedProgram(undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Current Enrollments</h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                {selectedDate ? format(selectedDate, 'PP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by module" />
            </SelectTrigger>
            <SelectContent>
              {uniqueModules.map(moduleId => (
                <SelectItem key={moduleId} value={moduleId}>
                  {mockModuleCatalog.find(m => m.id === moduleId)?.name || moduleId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by program" />
            </SelectTrigger>
            <SelectContent>
              {uniquePrograms.map(program => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(selectedDate || selectedModule || selectedProgram) && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearFilters}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>

        {(selectedDate || selectedModule || selectedProgram) && (
          <div className="flex gap-2 flex-wrap">
            {selectedDate && (
              <Badge variant="secondary" className="gap-2">
                Date: {format(selectedDate, 'PP')}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedDate(undefined)}
                />
              </Badge>
            )}
            {selectedModule && (
              <Badge variant="secondary" className="gap-2">
                Module: {mockModuleCatalog.find(m => m.id === selectedModule)?.name}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedModule(undefined)}
                />
              </Badge>
            )}
            {selectedProgram && (
              <Badge variant="secondary" className="gap-2">
                Program: {selectedProgram}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setSelectedProgram(undefined)}
                />
              </Badge>
            )}
          </div>
        )}
      </div>

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