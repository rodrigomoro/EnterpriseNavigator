import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const baseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
  birthDate: z.string().optional(),
  linkedinUrl: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  officeLocation: z.string().optional(),
  bio: z.string().optional(),
  notes: z.string().optional(),
  reportsTo: z.string().optional(),
  programIds: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  assistantName: z.string().optional(),
  businessAddress: z.string().optional(),
  businessHomePage: z.string().optional(),
  businessPhones: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  changeKey: z.string().optional(),
  children: z.array(z.string()).optional(),
  companyName: z.string().optional(),
  createdDateTime: z.string().optional(),
  displayName: z.string().optional(),
  emailAddresses: z.array(z.string()).optional(),
  fileAs: z.string().optional(),
  generation: z.string().optional(),
  givenName: z.string().optional(),
  homeAddress: z.string().optional(),
  homePhones: z.array(z.string()).optional(),
  id: z.string().optional(),
  imAddresses: z.array(z.string()).optional(),
  initials: z.string().optional(),
  lastModifiedDateTime: z.string().optional(),
  manager: z.string().optional(),
  middleName: z.string().optional(),
  mobilePhone: z.string().optional(),
  nickName: z.string().optional(),
  otherAddress: z.string().optional(),
  parentFolderId: z.string().optional(),
  personalNotes: z.string().optional(),
  profession: z.string().optional(),
  spouseName: z.string().optional(),
  surname: z.string().optional(),
  title: z.string().optional(),
  yomiCompanyName: z.string().optional(),
  yomiGivenName: z.string().optional(),
  yomiSurname: z.string().optional(),
});

const integrationSchema = z.object({
  externalId: z.string().optional(),
  entraId: z.string().optional(),
  googleCloudId: z.string().optional(),
  crmIds: z.object({
    hubspot: z.string().optional(),
    salesforce: z.string().optional(),
    msDynamics: z.string().optional(),
  }).optional(),
});


const formSchema = baseSchema.merge(integrationSchema);
type FormValues = z.infer<typeof formSchema>;

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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: personData?.name ?? "",
      jobTitle: personData?.role ?? "",
      department: personData?.department ?? "",
      email: personData?.email ?? "",
      phone: personData?.phone ?? "",
      bio: personData?.bio ?? "",
      reportsTo: personData?.reportsTo ?? "",
      programIds: personData?.programs ?? [],
      location: personData?.location ?? "",
      officeLocation: personData?.location ?? "",
      notes: personData?.notes ?? "",
      startDate: personData?.startDate ?? "",
      birthDate: personData?.birthDate ?? "",
      linkedinUrl: personData?.linkedinUrl ?? "",
      status: personData?.status ?? "",
      role: personData?.role ?? "",
      assistantName: personData?.assistantName ?? "",
      businessAddress: personData?.businessAddress ?? "",
      businessHomePage: personData?.businessHomePage ?? "",
      businessPhones: personData?.businessPhones ?? [],
      categories: personData?.categories ?? [],
      changeKey: personData?.changeKey ?? "",
      children: personData?.children ?? [],
      companyName: personData?.companyName ?? "",
      createdDateTime: personData?.createdDateTime ?? "",
      displayName: personData?.displayName ?? "",
      emailAddresses: personData?.emailAddresses ?? [],
      fileAs: personData?.fileAs ?? "",
      generation: personData?.generation ?? "",
      givenName: personData?.givenName ?? "",
      homeAddress: personData?.homeAddress ?? "",
      homePhones: personData?.homePhones ?? [],
      id: personData?.id ?? "",
      imAddresses: personData?.imAddresses ?? [],
      initials: personData?.initials ?? "",
      lastModifiedDateTime: personData?.lastModifiedDateTime ?? "",
      manager: personData?.manager ?? "",
      middleName: personData?.middleName ?? "",
      mobilePhone: personData?.mobilePhone ?? "",
      nickName: personData?.nickName ?? "",
      otherAddress: personData?.otherAddress ?? "",
      parentFolderId: personData?.parentFolderId ?? "",
      personalNotes: personData?.personalNotes ?? "",
      profession: personData?.profession ?? "",
      spouseName: personData?.spouseName ?? "",
      surname: personData?.surname ?? "",
      title: personData?.title ?? "",
      yomiCompanyName: personData?.yomiCompanyName ?? "",
      yomiGivenName: personData?.yomiGivenName ?? "",
      yomiSurname: personData?.yomiSurname ?? "",
      externalId: personData?.externalId ?? "",
      entraId: personData?.entraId ?? "",
      googleCloudId: personData?.googleCloudId ?? "",
      crmIds: {
        hubspot: personData?.crmIds?.hubspot ?? "",
        salesforce: personData?.crmIds?.salesforce ?? "",
        msDynamics: personData?.crmIds?.msDynamics ?? "",
      },
    },
  });

  // Get the current role to determine status options
  const currentRole = form.watch('role');
  const currentStatus = form.watch('status');
  const roleCategory = currentRole === 'Student' ? 'Student' :
    (currentRole === 'Teacher' || currentRole === 'Director') ? 'Teacher' : 'Staff';
  const availableStatuses = statusOptions[roleCategory as keyof typeof statusOptions] || [];

  useEffect(() => {
    // Reset status when role changes
    if (currentRole) {
      form.setValue('status', '');
      setSelectedStatus('');
    }
  }, [currentRole, form]);

  const onSubmit = async (data: FormValues) => {
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
                              <SelectItem value="Director">Director</SelectItem>
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
                      name="reportsTo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reports To</FormLabel>
                          <FormControl>
                            <PeoplePicker
                              people={mockPeople.filter(p => p.isDirector || p.role === 'Staff')}
                              selectedIds={field.value ? [field.value] : []}
                              onChange={(ids) => field.onChange(ids[0] || '')}
                              placeholder="Select manager"
                              multiple={false}
                            />
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
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
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
                      name="linkedinUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://linkedin.com/in/username" />
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

                {/* Additional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>
                      Dates and other details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birth Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
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

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Internal Notes</FormLabel>
                          <FormControl>
                            <textarea
                              className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[120px]"
                              placeholder="Add internal notes..."
                              {...field}
                            />
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
                          <FormLabel>Assistant Name</FormLabel>
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
                      name="businessHomePage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Home Page</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="businessPhones"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Phones</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="categories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categories</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="changeKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Change Key</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="children"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Children</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                      name="createdDateTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Created Date Time</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emailAddresses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Addresses</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fileAs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>File As</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="generation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Generation</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                    <FormField
                      control={form.control}
                      name="homePhones"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Home Phones</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="imAddresses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IM Addresses</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="initials"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Initials</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Last Modified Date Time</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="manager"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Manager</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="middleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Middle Name</FormLabel>
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
                    <FormField
                      control={form.control}
                      name="nickName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nick Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="otherAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Other Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parentFolderId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent Folder ID</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profession</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="spouseName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Spouse Name</FormLabel>
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
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="yomiCompanyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yomi Company Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="yomiGivenName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yomi Given Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="yomiSurname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yomi Surname</FormLabel>
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

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="secondary"
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