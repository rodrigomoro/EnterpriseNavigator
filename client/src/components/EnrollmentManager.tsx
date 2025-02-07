// Imports for UI components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ReceiptPreviewDialog } from './ReceiptPreviewDialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

// Import mock data (in a real app, this would come from an API)
import { mockModuleCatalog } from '@/data/mockModules';

export const EnrollmentManager = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState<Date>();

  // Mock data for enrollments (in a real app, this would come from an API)
  const enrollments = [
    {
      id: "1",
      studentId: "ST001",
      studentName: "John Doe",
      enrolledAt: "2024-02-07T10:00:00Z",
      status: "Active",
      moduleAssignments: [
        { moduleId: "MOD1", groupId: "GRP1" },
        { moduleId: "MOD2", groupId: "GRP2" }
      ]
    },
    {
      id: "2",
      studentId: "ST002",
      studentName: "Jane Smith",
      enrolledAt: "2024-02-06T14:30:00Z",
      status: "Active",
      moduleAssignments: [
        { moduleId: "MOD3", groupId: "GRP3" },
        { moduleId: "MOD4", groupId: "GRP4" }
      ]
    },
    {
      id: "3",
      studentId: "ST003",
      studentName: "Michael Johnson",
      enrolledAt: "2024-02-05T09:15:00Z",
      status: "Pending",
      moduleAssignments: [
        { moduleId: "MOD1", groupId: "GRP1" },
        { moduleId: "MOD5", groupId: "GRP5" }
      ]
    },
    {
      id: "4",
      studentId: "ST004",
      studentName: "Sarah Williams",
      enrolledAt: "2024-02-04T16:45:00Z",
      status: "Completed",
      moduleAssignments: [
        { moduleId: "MOD2", groupId: "GRP2" },
        { moduleId: "MOD4", groupId: "GRP4" }
      ]
    },
    {
      id: "5",
      studentId: "ST005",
      studentName: "Robert Brown",
      enrolledAt: "2024-02-03T11:20:00Z",
      status: "Active",
      moduleAssignments: [
        { moduleId: "MOD3", groupId: "GRP3" },
        { moduleId: "MOD5", groupId: "GRP5" }
      ]
    }
  ];

  // Mock function to get group info (in a real app, this would come from an API)
  const getGroupInfo = (groupId: string) => {
    const groupInfoMap: { [key: string]: { programName: string; intakeName: string; groupName: string } } = {
      GRP1: { programName: "Web Development", intakeName: "Spring 2024", groupName: "Morning A" },
      GRP2: { programName: "Data Science", intakeName: "Spring 2024", groupName: "Evening B" },
      GRP3: { programName: "UI/UX Design", intakeName: "Winter 2024", groupName: "Afternoon C" },
      GRP4: { programName: "Mobile Development", intakeName: "Spring 2024", groupName: "Weekend D" },
      GRP5: { programName: "Cloud Computing", intakeName: "Winter 2024", groupName: "Evening E" }
    };
    return groupInfoMap[groupId] || { programName: "Unknown", intakeName: "Unknown", groupName: "Unknown" };
  };

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

  // Filter enrollments based on search query, status, and date
  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = enrollment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         enrollment.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter;
    const matchesDate = !dateFilter || new Date(enrollment.enrolledAt).toDateString() === dateFilter.toDateString();

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name or ID..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFilter ? format(dateFilter, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateFilter}
              onSelect={setDateFilter}
              initialFocus
            />
          </PopoverContent>
        </Popover>
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
                  <div className="flex items-center gap-4">
                    <Badge variant={
                      enrollment.status === 'Active' ? 'default' :
                      enrollment.status === 'Pending' ? 'secondary' :
                      'outline'
                    }>
                      {enrollment.status}
                    </Badge>
                    <ReceiptPreviewDialog
                      enrollment={enrollment}
                      modules={mockModuleCatalog}
                      getGroupInfo={getGroupInfo}
                      onDownload={handleDownloadReceipt}
                      onEmail={handleEmailReceipt}
                    />
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

export default EnrollmentManager;