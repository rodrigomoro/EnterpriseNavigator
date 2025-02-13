import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Plus, Search, Pencil, Trash2, LayoutGrid, List, Filter } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import UserAvatar from '@/components/UserAvatar';
import { Input } from '@/components/ui/input';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Sidebar from '@/components/Sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { mockPeople } from '@/data/mockPeople';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Status options based on role
const statusOptions = {
  Student: [
    'Enrolled',
    'Graduated',
    'Withdrawn',
    'Dismissed',
    'Deferred',
    'Alumni',
    'Suspended',
    'Prospective',
    'Pending Enrollment',
    'Audit',
    'Exchange',
    'Interning',
    'Dropped Out'
  ],
  Staff: [
    'Active',
    'Inactive',
    'Terminated',
    'On Probation',
    'Retired',
    'Contractual',
    'Resigned',
    'On Leave',
    'Suspended',
    'Pending Approval'
  ],
  Teacher: [
    'Active',
    'Inactive',
    'Retired',
    'Adjunct',
    'Visiting',
    'Probationary',
    'On Leave',
    'Suspended',
    'Resigned',
    'Contractual'
  ]
};

const departments = [
  'Executive',
  'Technology',
  'Mathematics',
  'Science',
  'Computer Science',
  'Finance',
  'Human Resources'
];

const roles = ['All', 'Student', 'Teacher', 'Staff', 'Program Director'];

// Add locations to the filters
const locationOptions = [
  'Madrid Campus',
  'Barcelona Campus',
  'Spain Remote',
  'Argentina Remote',
  'Mexico Remote',
  'Colombia Remote',
  'Chile Remote'
];

// Add status descriptions
const statusDescriptions: Record<string, Record<string, string>> = {
  Staff: {
    'Active': 'Currently employed and active in their role',
    'Inactive': 'Temporarily not working but still associated with the institution',
    'Terminated': 'Employment has ended permanently',
    'On Probation': 'Newly hired staff under evaluation',
    'Retired': 'Former staff who have retired but may still be part of the system',
    'Contractual': 'Working on a fixed-term contract',
    'Resigned': 'Staff who resigned but may still have outstanding formalities',
    'On Leave': 'On approved leave (medical, maternity, personal, etc.)',
    'Suspended': 'Temporarily barred from duties for disciplinary reasons',
    'Pending Approval': 'New staff awaiting HR or administrative approval'
  },
  Teacher: {
    'Active': 'Actively teaching and engaged in academic duties',
    'Inactive': 'Temporarily not teaching',
    'Retired': 'Former teacher who has retired',
    'Adjunct': 'External faculty teaching part-time or for specific courses',
    'Visiting': 'Guest or visiting faculty from another institution',
    'Probationary': 'New teacher under evaluation',
    'On Leave': 'On approved leave (personal, research, or study leave)',
    'Suspended': 'Temporarily barred from teaching for disciplinary reasons',
    'Resigned': 'Teacher who has resigned but still in the system',
    'Contractual': 'Temporary or fixed-term teaching staff'
  },
  Student: {
    'Enrolled': 'Actively attending classes and participating in programs',
    'Graduated': 'Successfully completed the academic program',
    'Withdrawn': 'Dropped out or withdrew from the program voluntarily',
    'Dismissed': 'Removed from the institution due to disciplinary or academic issues',
    'Deferred': 'Temporarily paused enrollment',
    'Alumni': 'Former student who has graduated and is now part of the alumni network',
    'Suspended': 'Temporarily barred from academic activities',
    'Prospective': 'Applied to the institution and awaiting confirmation',
    'Pending Enrollment': 'Admitted but not yet enrolled in classes',
    'Audit': 'Attending classes but not formally enrolled for credit',
    'Exchange': 'Participating in a student exchange program',
    'Interning': 'On internship as part of their program requirements',
    'Dropped Out': 'Left the institution without completing the program'
  }
};

// Function to get status description
const getStatusDescription = (role: string, status: string): string => {
  return statusDescriptions[role]?.[status] || status;
};

export default function People() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingPersonId, setDeletingPersonId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {});
        resizeObserver.disconnect();
      }
    };
  }, []);

  const handleDeletePerson = () => {
    if (!deletingPersonId) return;
    console.log('Deleting person:', deletingPersonId);
    setDeletingPersonId(null);
    toast({
      title: "Person removed",
      description: "The person has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleCardClick = (id: string) => {
    navigate(`/people/${id}`);
  };

  const handleEditClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/people/${id}/edit`);
  };

  const getStatusBadgeVariant = (role: string, status: string): "default" | "secondary" | "destructive" | "outline" => {
    if (role === 'Student') {
      switch (status) {
        case 'Enrolled':
        case 'Exchange':
        case 'Interning':
          return 'default';
        case 'Graduated':
        case 'Alumni':
          return 'outline';
        case 'Withdrawn':
        case 'Dismissed':
        case 'Dropped Out':
        case 'Suspended':
          return 'destructive';
        default:
          return 'secondary';
      }
    } else {
      switch (status) {
        case 'Active':
        case 'Contractual':
          return 'default';
        case 'Inactive':
        case 'On Leave':
        case 'Retired':
          return 'secondary';
        case 'Terminated':
        case 'Suspended':
        case 'Resigned':
          return 'destructive';
        default:
          return 'outline';
      }
    }
  };

  const filteredPeople = mockPeople.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         person.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === 'All' || person.role === selectedRole;
    const matchesDepartment = selectedDepartment === 'all' || person.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || person.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || person.location === selectedLocation;

    return matchesSearch && matchesRole && matchesDepartment && matchesStatus && matchesLocation;
  });

  // Helper function to get available statuses based on role
  const getAvailableStatuses = (role: string) => {
    if (role === 'All') {
      return [...new Set([
        ...statusOptions.Student,
        ...statusOptions.Staff,
        ...statusOptions.Teacher
      ])];
    }
    return statusOptions[role as keyof typeof statusOptions] || [];
  };

  const GridView = () => (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {filteredPeople.map((person) => (
        <motion.div
          key={person.id}
          variants={item}
          onClick={() => handleCardClick(person.id)}
        >
          <div className="relative group">
            <motion.div
              className="bg-card rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div className="flex-grow">
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                  <p className="text-sm text-muted-foreground">{person.department}</p>
                  <p className="text-sm text-muted-foreground">{person.location}</p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4">
                <TooltipProvider>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <Badge variant={getStatusBadgeVariant(person.role, person.status)}>
                        {person.status}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      align="end"
                      sideOffset={5}
                      alignOffset={-5}
                      className="max-w-[200px]"
                    >
                      <p>{getStatusDescription(person.role, person.status)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </motion.div>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={(e) => handleEditClick(e, person.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingPersonId(person.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const ListView = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredPeople.map((person) => (
          <TableRow
            key={person.id}
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => handleCardClick(person.id)}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                {person.name}
              </div>
            </TableCell>
            <TableCell>{person.role}</TableCell>
            <TableCell>{person.department}</TableCell>
            <TableCell>{person.location}</TableCell>
            <TableCell>
              <TooltipProvider>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <Badge variant={getStatusBadgeVariant(person.role, person.status)}>
                      {person.status}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top"
                    align="center"
                    sideOffset={5}
                    className="max-w-[200px]"
                  >
                    <p>{getStatusDescription(person.role, person.status)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={(e) => handleEditClick(e, person.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingPersonId(person.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <header>
            <div className="px-6 h-16 flex items-center justify-between gap-8 mb-6">
              <div>
                <h1 className="text-2xl font-bold">People Directory</h1>
                <p className="text-muted-foreground">View and manage all people</p>
              </div>

              <div className="flex-1 flex justify-center max-w-xl">
                <div className="relative w-full">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search people..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="min-w-[400px] flex justify-end items-center gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Role</h4>
                        <Select
                          value={selectedRole}
                          onValueChange={setSelectedRole}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map(role => (
                              <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Department</h4>
                        <Select
                          value={selectedDepartment}
                          onValueChange={setSelectedDepartment}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key="all-departments" value="all">All Departments</SelectItem>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Status</h4>
                        <Select
                          value={selectedStatus}
                          onValueChange={setSelectedStatus}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key="all-statuses" value="all">All Statuses</SelectItem>
                            {getAvailableStatuses(selectedRole).map(status => (
                              <TooltipProvider key={status}>
                                <Tooltip delayDuration={200}>
                                  <TooltipTrigger asChild>
                                    <SelectItem value={status}>{status}</SelectItem>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" align="end" sideOffset={5} alignOffset={-5} className="max-w-[200px]">
                                    <p>{getStatusDescription(selectedRole, status)}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Location</h4>
                        <Select
                          value={selectedLocation}
                          onValueChange={setSelectedLocation}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key="all-locations" value="all">All Locations</SelectItem>
                            {locationOptions.map(location => (
                              <SelectItem key={location} value={location}>{location}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={() => navigate("/people/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Person
                </Button>
                <UserAvatar />
              </div>
            </div>
          </header>

          <main className="p-6">
            <AnimatePresence>
              {viewMode === 'grid' ? <GridView /> : <ListView />}
            </AnimatePresence>
          </main>
        </PageTransition>
      </div>

      <DeleteConfirmationDialog
        open={deletingPersonId !== null}
        onOpenChange={(open) => !open && setDeletingPersonId(null)}
        onConfirm={handleDeletePerson}
        title="Delete Person"
        description="Are you sure you want to remove this person? This action cannot be undone."
      />
    </div>
  );
}