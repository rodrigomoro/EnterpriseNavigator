import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ReceiptPreviewDialog } from './ReceiptPreviewDialog';
import { ReceiptFormDialog } from './ReceiptFormDialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Search, Download, Mail } from 'lucide-react';
import { format } from 'date-fns';

// Import mock data (in a real app, this would come from an API)
import { mockModuleCatalog } from '@/data/mockModules';
import { Checkbox } from './ui/checkbox';

export const EnrollmentManager = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState<Date>();
  const [selectedEnrollments, setSelectedEnrollments] = useState<string[]>([]);
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);
  const [isBulkAction, setIsBulkAction] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);

  const availableFees = [
    { id: 'tuition', name: 'Tuition Fee', amount: selectedEnrollment?.moduleAssignments.reduce((sum, assignment) => sum + (assignment.cost || 500), 0) || 0 },
    { id: 'registration', name: 'Registration Fee', amount: 100 },
    { id: 'materials', name: 'Learning Materials', amount: 200 },
    { id: 'technology', name: 'Technology Fee', amount: 150 },
    { id: 'laboratory', name: 'Laboratory Fee', amount: 300 },
  ];

  // Mock completed payment info
  const getCompletedPaymentInfo = (enrollment: any) => {
    // Calculate the total tuition fee by summing module costs.
    const moduleTotal = enrollment?.moduleAssignments?.reduce(
      (sum: number, assignment: any) => sum + (assignment.cost || 500),
      0
    ) || 0;
  
    // Additional fixed fees.
    const additionalFees = {
      registration: 100,
      materials: 200,
      technology: 150,
      laboratory: 300,
    };
    const extraFeeTotal =
      additionalFees.registration +
      additionalFees.materials +
      additionalFees.technology +
      additionalFees.laboratory;
  
    // If the enrollment meets the condition for Direct Debit (for example, studentId "ST009"),
    // then return the Direct Debit payment information.
    if (enrollment.studentId === "ST009") {
      return {
        payers: [
          {
            type: "student",
            paymentMethod: "direct_debit",
            referenceNumber: `TXN-${Date.now()}`,
            coverageType: "percentage" as const,
            coverage: 100, // in this scenario, the student covers 100% via Direct Debit
            bankAccount: {
              iban: "DE89370400440532013000", // example valid IBAN
              bic: "COBADEFFXXX",            // example valid BIC/SWIFT
              accountHolder: enrollment.studentName,
              mandateReference: `MANDATE-${enrollment.studentId}-${format(new Date(), "yyyyMMdd")}`,
              mandateDate: format(new Date(), "yyyy-MM-dd"),
            },
          },
        ],
        selectedFees: [
          { id: "tuition", name: "Tuition Fee", amount: moduleTotal },
          { id: "registration", name: "Registration Fee", amount: additionalFees.registration },
          { id: "materials", name: "Learning Materials", amount: additionalFees.materials },
          { id: "technology", name: "Technology Fee", amount: additionalFees.technology },
          { id: "laboratory", name: "Laboratory Fee", amount: additionalFees.laboratory },
        ],
        totalAmount: moduleTotal + extraFeeTotal,
        paymentPlan: "installments" as const,
        numberOfInstallments: 12,
      };
    }

    if (enrollment.studentId === "ST010") {
      return {
        payers: [
          {
            type: "student",
            paymentMethod: "direct_debit",
            referenceNumber: `TXN-${Date.now()}`,
            coverageType: "percentage" as const,
            coverage: 100, // 100% of fees via direct debit
            bankAccount: {
              iban: "DE89370400440532013000", // Example valid IBAN
              bic: "COBADEFFXXX",              // Example valid BIC/SWIFT
              accountHolder: enrollment.studentName,
              mandateReference: `MANDATE-${enrollment.studentId}-${format(new Date(), "yyyyMMdd")}`,
              mandateDate: format(new Date(), "yyyy-MM-dd"),
            },
          },
        ],
        selectedFees: [
          { id: "tuition", name: "Tuition Fee", amount: moduleTotal },
          { id: "registration", name: "Registration Fee", amount: additionalFees.registration },
          { id: "materials", name: "Learning Materials", amount: additionalFees.materials },
          { id: "technology", name: "Technology Fee", amount: additionalFees.technology },
          { id: "laboratory", name: "Laboratory Fee", amount: additionalFees.laboratory },
        ],
        totalAmount: moduleTotal + extraFeeTotal,
        paymentPlan: "single" as const, // Single payment (no installments)
      };
    }
  
    // Otherwise, return the default payment information.
    return {
      payers: [
        {
          type: "student",
          paymentMethod: "credit_card",
          referenceNumber: `TXN-${Date.now()}`,
          coverageType: "percentage" as const,
          coverage: 60,
        },
        {
          type: "scholarship",
          name: "Merit Scholarship Program",
          paymentMethod: "bank_transfer",
          referenceNumber: `SCH-${Date.now()}`,
          coverageType: "percentage" as const,
          coverage: 40,
        },
      ],
      selectedFees: [
        { id: "tuition", name: "Tuition Fee", amount: moduleTotal },
        { id: "registration", name: "Registration Fee", amount: additionalFees.registration },
        { id: "materials", name: "Learning Materials", amount: additionalFees.materials },
        { id: "technology", name: "Technology Fee", amount: additionalFees.technology },
        { id: "laboratory", name: "Laboratory Fee", amount: additionalFees.laboratory },
      ],
      totalAmount: moduleTotal + extraFeeTotal,
      paymentPlan: "installments" as const,
      numberOfInstallments: 12,
    };
  };

  const handlePaymentSubmit = (data: {
    payers: Array<{
      type: string;
      name?: string;
      paymentMethod: string;
      referenceNumber?: string;
      coverageType: 'percentage' | 'amount';
      coverage: number;
      invoiceNumber?: string;
      paymentPlan?: 'single' | 'installments';
      installments?: number;
    }>;
    selectedFees: string[];
    totalAmount: number;
    paymentPlan: 'single' | 'installments';
    numberOfInstallments?: number;
  }) => {
    setPaymentInfo({
      payers: data.payers,
      selectedFees: availableFees.filter(fee => data.selectedFees.includes(fee.id)),
      totalAmount: data.totalAmount,
      paymentPlan: data.paymentPlan,
      numberOfInstallments: data.numberOfInstallments,
    });

    setPaymentFormOpen(false);
    setShowReceiptPreview(true);

    if (isBulkAction) {
      toast({
        title: "Bulk receipt generation started",
        description: `Generating receipts for ${selectedEnrollments.length} enrollments...`,
      });
    } else {
      toast({
        title: "Receipt generated",
        description: "The receipt has been generated successfully.",
      });
    }
  };

  const handleSingleReceiptAction = (enrollment: any) => {
    setSelectedEnrollment(enrollment);

    if (enrollment.status === 'Completed') {
      // For completed enrollments, show receipt preview directly
      setPaymentInfo(getCompletedPaymentInfo(enrollment));
      setShowReceiptPreview(true);
    } else {
      // For pending enrollments, show payment form first
      setIsBulkAction(false);
      setPaymentFormOpen(true);
    }
  };

  const handleBulkAction = (action: 'download' | 'email') => {
    // Filter only completed enrollments
    const completedEnrollments = selectedEnrollments.filter(id =>
      filteredEnrollments.find(e => e.id === id)?.status === 'Completed'
    );

    if (completedEnrollments.length === 0) {
      toast({
        title: "No completed enrollments selected",
        description: `Please select enrollments with 'Completed' status to ${action} receipts.`,
        variant: "destructive"
      });
      return;
    }

    // If some selected enrollments were pending, show a warning
    if (completedEnrollments.length < selectedEnrollments.length) {
      toast({
        title: "Some enrollments skipped",
        description: `Only processing ${completedEnrollments.length} completed enrollments. Pending enrollments were skipped.`,
      });
    }

    // Process only completed enrollments
    setSelectedEnrollments(completedEnrollments);
    setIsBulkAction(true);
    setPaymentInfo(getCompletedPaymentInfo(completedEnrollments[0])); // Pass the first enrollment for bulk action


    // In a real app, we would process the receipts here
    toast({
      title: `Receipts ${action === 'download' ? 'downloaded' : 'sent'}`,
      description: `Successfully ${action === 'download' ? 'downloaded' : 'sent'} ${completedEnrollments.length} receipts.`,
    });
  };
  

  const completedEnrollment = {
    id: "9",
    studentId: "ST009",
    studentName: "Alice Wonder",
    enrolledAt: "2024-03-01T09:00:00Z",
    status: "Completed",
    moduleAssignments: [
      { moduleId: "module-1", groupId: "GRP1", cost: 600 },
      { moduleId: "module-2", groupId: "GRP2", cost: 500 },
      { moduleId: "module-3", groupId: "GRP3", cost: 550 },
      { moduleId: "module-4", groupId: "GRP4", cost: 450 },
      { moduleId: "module-5", groupId: "GRP5", cost: 650 },
      { moduleId: "module-6", groupId: "GRP1", cost: 700 },
      { moduleId: "module-7", groupId: "GRP2", cost: 600 },
      { moduleId: "module-8", groupId: "GRP3", cost: 500 },
    ]
  };

  const completedEnrollmentSinglePayment = {
    id: "10",
    studentId: "ST010",
    studentName: "Bob Marley",
    enrolledAt: "2024-04-15T09:00:00Z",
    status: "Completed",
    moduleAssignments: [
      { moduleId: "module-9", groupId: "GRP4", cost: 800 },
      { moduleId: "module-10", groupId: "GRP5", cost: 700 },
      { moduleId: "module-11", groupId: "GRP1", cost: 900 },
    ]
  };

  const enrollments = [
    {
      id: "1",
      studentId: "ST001",
      studentName: "John Doe",
      enrolledAt: "2024-02-07T10:00:00Z",
      status: "Completed",
      moduleAssignments: [
        { moduleId: "module-1", groupId: "GRP1", cost: 600 },
        { moduleId: "module-2", groupId: "GRP2", cost: 450 }
      ]
    },
    {
      id: "2",
      studentId: "ST002",
      studentName: "Jane Smith",
      enrolledAt: "2024-02-06T14:30:00Z",
      status: "Completed",
      moduleAssignments: [
        { moduleId: "module-3", groupId: "GRP3", cost: 750 },
        { moduleId: "module-4", groupId: "GRP4", cost: 500 }
      ]
    },
    {
      id: "3",
      studentId: "ST003",
      studentName: "Michael Johnson",
      enrolledAt: "2024-02-05T09:15:00Z",
      status: "Pending",
      moduleAssignments: [
        { moduleId: "module-1", groupId: "GRP1", cost: 600 },
        { moduleId: "module-5", groupId: "GRP5", cost: 800 }
      ]
    },
    {
      id: "4",
      studentId: "ST004",
      studentName: "Sarah Williams",
      enrolledAt: "2024-02-04T16:45:00Z",
      status: "Completed",
      moduleAssignments: [
        { moduleId: "module-2", groupId: "GRP2", cost: 450 },
        { moduleId: "module-4", groupId: "GRP4", cost: 500 }
      ]
    },
    {
      id: "5",
      studentId: "ST005",
      studentName: "Robert Brown",
      enrolledAt: "2024-02-03T11:20:00Z",
      status: "Pending",
      moduleAssignments: [
        { moduleId: "module-3", groupId: "GRP3", cost: 750 },
        { moduleId: "module-5", groupId: "GRP5", cost: 800 }
      ]
    },
    {
      id: "6",
      studentId: "ST005",
      studentName: "Robert Brown",
      enrolledAt: "2024-02-03T11:20:00Z",
      status: "Pending",
      moduleAssignments: [
        { moduleId: "module-3", groupId: "GRP3", cost: 750 },
        { moduleId: "module-5", groupId: "GRP5", cost: 800 }
      ]
    },
    {
      id: "7",
      studentId: "ST005",
      studentName: "Robert Brown",
      enrolledAt: "2024-02-03T11:20:00Z",
      status: "Pending",
      moduleAssignments: [
        { moduleId: "module-3", groupId: "GRP3", cost: 750 },
        { moduleId: "module-5", groupId: "GRP5", cost: 800 }
      ]
    },
    {
      id: "8",
      studentId: "ST005",
      studentName: "Robert Brown",
      enrolledAt: "2024-02-03T11:20:00Z",
      status: "Pending",
      moduleAssignments: [
        { moduleId: "module-3", groupId: "GRP3", cost: 750 },
        { moduleId: "module-5", groupId: "GRP5", cost: 800 }
      ]
    },
    completedEnrollment,
    completedEnrollmentSinglePayment
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


  const toggleSelectAll = () => {
    if (selectedEnrollments.length === filteredEnrollments.length) {
      setSelectedEnrollments([]);
    } else {
      setSelectedEnrollments(filteredEnrollments.map(e => e.id));
    }
  };

  // Filter enrollments based on search query, status, and date
  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = enrollment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         enrollment.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter;
    const matchesDate = !dateFilter || new Date(enrollment.enrolledAt).toDateString() === dateFilter.toDateString();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const toggleEnrollmentSelection = (enrollmentId: string) => {
    setSelectedEnrollments(prev =>
      prev.includes(enrollmentId)
        ? prev.filter(id => id !== enrollmentId)
        : [...prev, enrollmentId]
    );
  };

  const getStatusVariant = (status: string) => {
    return status === 'Pending' ? 'secondary' : 'outline';
  };

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

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedEnrollments.length > 0 && selectedEnrollments.length === filteredEnrollments.length}
            onCheckedChange={toggleSelectAll}
            className="text-orange-500 border-gray-300 rounded data-[state=checked]:bg-orange-500 data-[state=checked]:text-white"
          />
          <span className="text-sm text-muted-foreground">Select All</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => handleBulkAction('download')}
          disabled={selectedEnrollments.length === 0}
        >
          <Download className="h-4 w-4" />
          Download All Receipts
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => handleBulkAction('email')}
          disabled={selectedEnrollments.length === 0}
        >
          <Mail className="h-4 w-4" />
          Email All Receipts
        </Button>
      </div>

      <ScrollArea className="h-[600px]">
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
                    <Checkbox
                      checked={selectedEnrollments.includes(enrollment.id)}
                      onCheckedChange={() => toggleEnrollmentSelection(enrollment.id)}
                    />
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
                    <Badge variant={getStatusVariant(enrollment.status)}>
                      {enrollment.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSingleReceiptAction(enrollment)}
                    >
                      Generate Receipt
                    </Button>
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
                          {assignment.cost ? ` - Cost: $${assignment.cost}` : ''}
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

      {/* Payment Form Dialog */}
      {paymentFormOpen && (
        <ReceiptFormDialog
          open={paymentFormOpen}
          onOpenChange={setPaymentFormOpen}
          onSubmit={handlePaymentSubmit}
          studentName={selectedEnrollment?.studentName}
          studentId={selectedEnrollment?.studentId} // Add this prop
          moduleAssignments={selectedEnrollment?.moduleAssignments}
          isBulkAction={isBulkAction}
          selectedEnrollments={isBulkAction ? selectedEnrollments : null}
          availableFees={availableFees}
        />
      )}

      {/* Receipt Preview Dialog */}
      {showReceiptPreview && selectedEnrollment && paymentInfo && (
        <ReceiptPreviewDialog
          open={showReceiptPreview}
          onOpenChange={setShowReceiptPreview}
          enrollment={selectedEnrollment}
          modules={mockModuleCatalog}
          getGroupInfo={getGroupInfo}
          paymentInfo={paymentInfo}
          onDownload={() => {
            toast({
              title: "Receipt downloaded",
              description: "The receipt has been downloaded successfully.",
            });
            setShowReceiptPreview(false);
          }}
          onEmail={() => {
            toast({
              title: "Receipt sent",
              description: "The receipt has been sent to the student's email.",
            });
            setShowReceiptPreview(false);
          }}
        />
      )}
    </div>
  );
};

export default EnrollmentManager;