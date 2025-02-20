import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useParams } from 'wouter';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Globe, Database, User, Building, Calendar, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockPeople } from '@/data/mockPeople';
import PeoplePicker from '@/components/ui/PeoplePicker';
import {
  StudentFields,
  TeacherFields,
  ProgramDirectorFields,
  StaffFields,
  personFormSchema,
  type PersonFormValues
} from '@/components/person-fields';

// Status descriptions for each role type
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
    'Adjunct': 'External faculty teaching part-time or specific courses',
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
  ]
};


export default function ManagePerson() {
  const params = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = params.id !== undefined;
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [activeTab, setActiveTab] = useState("basic");

  // Find person data if in edit mode
  const personData = isEdit
    ? mockPeople.find((m) => m.id === params?.id)
    : null;
  const departments = Array.from(
    new Set(mockPeople.map((person) => person.department))
  );

  const form = useForm<PersonFormValues>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      name: personData?.name ?? "",
      email: personData?.email ?? "",
      phone: personData?.phone ?? "",
      role: personData?.role ?? "",
      department: personData?.department ?? "",
      status: personData?.status ?? "",
      location: personData?.location ?? "",
      supervisorId: personData?.reportsTo ?? "",
      bio: personData?.bio ?? "",
      startDate: personData?.startDate ?? "",
      programIds: personData?.programs ?? [],
      specializations: personData?.specializations ?? [],
      certifications: personData?.certifications ?? [],
      givenName: personData?.givenName ?? "",
      surname: personData?.surname ?? "",
      birthday: personData?.birthday ?? "",
      mobilePhone: personData?.mobilePhone ?? "",
      businessAddress: personData?.businessAddress ?? "",
      homeAddress: personData?.homeAddress ?? "",
      companyName: personData?.companyName ?? "",
      businessHomePage: personData?.businessHomePage ?? "",
      assistantName: personData?.assistantName ?? "",
      officeLocation: personData?.officeLocation ?? "",
      personalNotes: personData?.personalNotes ?? "",
      createdDateTime: personData?.createdDateTime ?? "",
      lastModifiedDateTime: personData?.lastModifiedDateTime ?? "",
    },
  });

  // Get the current role to determine status options
  const currentRole = form.watch('role');
  const currentStatus = form.watch('status');
  const roleCategory = currentRole === 'Student' ? 'Student' :
    (currentRole === 'Teacher' || currentRole === 'Program Director') ? 'Teacher' : 'Staff';
  const availableStatuses = statusOptions[roleCategory as keyof typeof statusOptions] || [];

  useEffect(() => {
    // Reset status when role changes
    if (currentRole) {
      form.setValue('status', '');
      setSelectedStatus('');
    }
  }, [currentRole, form]);

  const renderRoleSpecificFields = () => {
    switch (currentRole) {
      case "Student":
        return <StudentFields form={form} />;
      case "Teacher":
        return <TeacherFields form={form} />;
      case "Program Director":
        return <ProgramDirectorFields form={form} />;
      case "Staff":
      default:
        return <StaffFields form={form} />;
    }
  };

  const onSubmit = async (data: PersonFormValues) => {
    try {
      console.log("Form submitted:", data);
      toast({
        title: isEdit ? "Person Updated" : "Person Created",
        description: `Successfully ${isEdit ? "updated" : "created"} ${data.name}`,
      });
      navigate("/people");
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isEdit && !personData) {
    navigate("/people");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Button
                  variant="ghost"
                  className="gap-1 p-0 hover:bg-transparent"
                  onClick={() => navigate("/people")}
                >
                  <ArrowLeft className="h-4 w-4" />
                  People Directory
                </Button>
              </div>
              <h1 className="text-2xl font-bold">
                {isEdit ? `Edit ${personData?.name}` : "Add New Person"}
              </h1>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basic" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Basic Info
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact
                  </TabsTrigger>
                  <TabsTrigger value="employment" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Employment
                  </TabsTrigger>
                  <TabsTrigger value="role" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Role Details
                  </TabsTrigger>
                  <TabsTrigger value="additional" className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Additional
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                          Basic personal details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Basic name fields */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="givenName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Given Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="surname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Surname</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="birthday"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Birthday</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Role Information</CardTitle>
                        <CardDescription>
                          Position and department details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Student">Student</SelectItem>
                                  <SelectItem value="Teacher">Teacher</SelectItem>
                                  <SelectItem value="Program Director">Program Director</SelectItem>
                                  <SelectItem value="Staff">Staff</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Department</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {departments.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                      {dept}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setSelectedStatus(value);
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableStatuses.map(status => (
                                    <SelectItem key={status} value={status}>
                                      {status}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                {currentStatus
                                  ? getStatusDescription(roleCategory, currentStatus)
                                  : "Select the current status for this person based on their role."}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>
                          Primary contact details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primary Phone</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="mobilePhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Phone</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Address Information</CardTitle>
                        <CardDescription>
                          Location and address details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primary Location</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="businessAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="homeAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Home Address</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="employment" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Professional Details</CardTitle>
                        <CardDescription>
                          Work-related information
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="supervisorId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reports To</FormLabel>
                              <FormControl>
                                <PeoplePicker
                                  people={mockPeople.filter(p => p.role === 'Program Director' || p.role === 'Staff')}
                                  selectedIds={field.value ? [field.value] : []}
                                  onChange={(ids) => field.onChange(ids[0] || '')}
                                  placeholder="Select supervisor"
                                  multiple={false}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="officeLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Office Location</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                        <CardDescription>
                          Organization details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="businessHomePage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Homepage</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="assistantName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assistant</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="role" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{currentRole || 'Role'} Information</CardTitle>
                      <CardDescription>
                        Role-specific details and assignments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {renderRoleSpecificFields()}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="additional" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Additional Information</CardTitle>
                        <CardDescription>
                          Other relevant details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <textarea
                                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                                  placeholder="Enter bio"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="personalNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Personal Notes</FormLabel>
                              <FormControl>
                                <textarea
                                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                                  placeholder="Enter personal notes"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>System Information</CardTitle>
                        <CardDescription>
                          System-related details
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ID</FormLabel>
                              <FormControl>
                                <Input {...field} disabled />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="createdDateTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Created Date</FormLabel>
                              <FormControl>
                                <Input {...field} disabled />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastModifiedDateTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Modified</FormLabel>
                              <FormControl>
                                <Input {...field} disabled />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/people")}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEdit ? "Save Changes" : "Create Person"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}