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
import { ArrowLeft, Globe, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
              <div className="grid grid-cols-3 gap-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <div>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                          Personal and contact details
                        </CardDescription>
                      </div>
                    </div>
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
                          <FormDescription className="mt-1">
                            {currentStatus
                              ? getStatusDescription(roleCategory, currentStatus)
                              : "Select the current status for this person based on their role."}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <div>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>
                          Contact details and social profiles
                        </CardDescription>
                      </div>
                    </div>
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
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Role-specific Information */}
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
              </div>

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