import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useParams } from "wouter";
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
import { mockTeamMembers, mockProjects } from "@/data/mockData";
import { FormSection } from "@/components/ui/FormSection";
import Sidebar from "@/components/Sidebar";
import UserAvatar from "@/components/UserAvatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Globe, AlertCircle, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PeoplePicker from "@/components/ui/PeoplePicker";
import { useEffect } from "react";

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

const formSchema = z.object({
  // Basic Information
  name: z.string().min(1, "Name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),

  // Additional Information
  birthDate: z.string().optional(),
  linkedinUrl: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  officeLocation: z.string().optional(),
  bio: z.string().optional(),
  notes: z.string().optional(),

  // Relations
  reportsTo: z.string().optional(),
  programIds: z.array(z.string()).optional(),

  // Start Date
  startDate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ManagePerson() {
  const params = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = params.id !== undefined;

  // Find person data if in edit mode
  const personData = isEdit
    ? mockTeamMembers.find((m) => m.id === params?.id)
    : null;
  const departments = Array.from(
    new Set(mockTeamMembers.map((member) => member.department))
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
      programIds: personData?.programIds ?? [],
      location: personData?.location ?? "",
      officeLocation: personData?.officeLocation ?? "",
      notes: personData?.notes ?? "",
      startDate: personData?.startDate ?? "",
      birthDate: personData?.birthDate ?? "",
      linkedinUrl: personData?.linkedinUrl ?? "",
      status: personData?.status ?? "Active",
      role: personData?.role ?? "",
    },
  });

  // Get the current role to determine status options
  const currentRole = form.watch('role');
  const roleCategory = currentRole === 'Student' ? 'Student' : 
                      (currentRole === 'Teacher' || currentRole === 'Director') ? 'Teacher' : 'Staff';
  const availableStatuses = statusOptions[roleCategory as keyof typeof statusOptions] || [];

  useEffect(() => {
    return () => {
      if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {});
        resizeObserver.disconnect();
      }
    };
  }, []);

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
      <Sidebar />

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

            <UserAvatar />
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
                            onValueChange={field.onChange}
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