import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useParams } from "wouter";
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
import { queryClient } from "@/lib/queryClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useCallback, useEffect } from "react";
import PeoplePicker from "@/components/ui/PeoplePicker";

const formSchema = z.object({
  // Identity Provider Fields
  name: z.string().min(1, "Name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  email: z.string().email("Invalid email address"),
  location: z.string().min(1, "Location is required"),
  reportsTo: z.string().optional(),
  officeLocation: z.string().optional(),

  // Internal Fields
  role: z.string().min(1, "Role is required"),
  phone: z.string().min(1, "Phone number is required"),
  startDate: z.string().optional(),
  bio: z.string(),
  notes: z.string().optional(),
  programIds: z.array(z.string()).optional(),

  // Sync Settings
  syncEnabled: z.boolean().default(true),
  microsoftSync: z.boolean().default(true),
  googleSync: z.boolean().default(true),
  awsSync: z.boolean().default(false),
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
      syncEnabled: true,
      microsoftSync: true,
      googleSync: true,
      awsSync: false,
    },
  });

  // Memoized navigation handler
  const handleNavigate = useCallback(() => {
    // Reset form state before navigation
    form.reset();
    // Clear any related queries
    queryClient.removeQueries({ queryKey: ["/api/people"] });
    // Navigate
    navigate("/people");
  }, [form, navigate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      form.reset();
      queryClient.removeQueries({ queryKey: ["/api/people"] });
    };
  }, [form]);

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Form submitted:", data);
      toast({
        title: isEdit ? "Person Updated" : "Person Created",
        description: `Successfully ${isEdit ? "updated" : "created"} ${data.name}`,
      });
      handleNavigate();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  // If trying to edit a non-existent person, redirect to people list
  if (isEdit && !personData) {
    handleNavigate();
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
                  onClick={handleNavigate}
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
              <Tabs defaultValue="details" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="details">Person Details</TabsTrigger>
                  <TabsTrigger value="sync">Sync Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Identity Provider Information */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <div>
                            <CardTitle>Identity Information</CardTitle>
                            <CardDescription>
                              Synced with identity providers
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
                              <FormDescription className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                Synced with Microsoft Entra ID
                              </FormDescription>
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
                              <FormDescription className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                Synced with Microsoft Entra ID
                              </FormDescription>
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
                              <FormDescription className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                Synced with Microsoft Entra ID
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormDescription className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                Synced with Google Cloud Identity
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    {/* Internal Information */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4" />
                          <div>
                            <CardTitle>Internal Information</CardTitle>
                            <CardDescription>
                              Managed internally
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
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

                    {/* System Access & Programs */}
                    <Card>
                      <CardHeader>
                        <CardTitle>System Access</CardTitle>
                        <CardDescription>
                          Role and program assignments
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>System Role</FormLabel>
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
                                  <SelectItem value="Administrator">Administrator</SelectItem>
                                  <SelectItem value="Editor">Editor</SelectItem>
                                  <SelectItem value="Viewer">Viewer</SelectItem>
                                </SelectContent>
                              </Select>
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
                                  people={mockTeamMembers}
                                  selectedIds={field.value ? [field.value] : []}
                                  onChange={(ids) => field.onChange(ids[0] || "")}
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
                          name="programIds"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Associated Programs</FormLabel>
                              <FormControl>
                                <PeoplePicker
                                  people={mockProjects.map((p) => ({
                                    id: p.id,
                                    name: p.name,
                                    role: "Program",
                                  }))}
                                  selectedIds={field.value || []}
                                  onChange={field.onChange}
                                  placeholder="Select programs"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="sync">
                  <Card>
                    <CardHeader>
                      <CardTitle>Identity Provider Synchronization</CardTitle>
                      <CardDescription>
                        Configure how this person's data is synchronized with external systems
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Changes to synced fields will be overwritten during the next synchronization
                        </AlertDescription>
                      </Alert>

                      <FormField
                        control={form.control}
                        name="syncEnabled"
                        render={({ field }) => (
                          <div className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                              <FormLabel>Enable Synchronization</FormLabel>
                              <FormDescription>
                                Automatically sync data with identity providers
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </div>
                        )}
                      />

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="microsoftSync"
                          render={({ field }) => (
                            <div className="flex items-center justify-between space-x-2">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <FormLabel>Microsoft Entra ID</FormLabel>
                                  <Badge variant="outline">Primary</Badge>
                                </div>
                                <FormDescription>
                                  Sync name, job title, and department
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={!form.watch("syncEnabled")}
                                />
                              </FormControl>
                            </div>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="googleSync"
                          render={({ field }) => (
                            <div className="flex items-center justify-between space-x-2">
                              <div className="space-y-0.5">
                                <FormLabel>Google Cloud Identity</FormLabel>
                                <FormDescription>
                                  Sync email and calendar access
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={!form.watch("syncEnabled")}
                                />
                              </FormControl>
                            </div>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="awsSync"
                          render={({ field }) => (
                            <div className="flex items-center justify-between space-x-2">
                              <div className="space-y-0.5">
                                <FormLabel>AWS Cognito</FormLabel>
                                <FormDescription>
                                  Sync cloud resource access
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={!form.watch("syncEnabled")}
                                />
                              </FormControl>
                            </div>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleNavigate}
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