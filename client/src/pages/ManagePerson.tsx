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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mockTeamMembers, mockProjects } from "@/data/mockData";
import { FormSection } from "@/components/ui/FormSection";
import Sidebar from "@/components/Sidebar";
import UserAvatar from "@/components/UserAvatar";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  bio: z.string(),
  reportsTo: z.string().optional(),
  programIds: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ManagePerson() {
  const params = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = params.id !== "new";

  // Find person data if in edit mode
  const personData = isEdit ? mockTeamMembers.find((m) => m.id === params?.id) : null;
  const departments = Array.from(new Set(mockTeamMembers.map((member) => member.department)));
  const potentialManagers = mockTeamMembers.filter((member) => member.role === "Director");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: personData?.name ?? "",
      role: personData?.role ?? "",
      department: personData?.department ?? "",
      email: personData?.email ?? "",
      phone: personData?.phone ?? "",
      bio: personData?.bio ?? "",
      reportsTo: personData?.reportsTo ?? "",
      programIds: [],
    },
  });

  // Cleanup effect for ResizeObserver
  useEffect(() => {
    return () => {
      // Clear any pending resize observations
      if (window.ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => {});
        resizeObserver.disconnect();
      }
    };
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      // In a real app, this would be an API call
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

  // If trying to edit a non-existent person, redirect to people list
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
                {/* Column 1: Basic Information */}
                <div className="space-y-6">
                  <FormSection title="General Information">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter name"
                                {...field}
                                className="bg-white"
                              />
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
                                <SelectItem value="Director">Director</SelectItem>
                                <SelectItem value="Teacher">Teacher</SelectItem>
                                <SelectItem value="Student">Student</SelectItem>
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
                    </div>
                  </FormSection>
                </div>

                {/* Column 2: Contact Information */}
                <div className="space-y-6">
                  <FormSection title="Contact Information">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter email"
                                {...field}
                                className="bg-white"
                              />
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
                              <Input
                                placeholder="Enter phone number"
                                {...field}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <textarea
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[120px]"
                                placeholder="Enter bio"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormSection>
                </div>

                {/* Column 3: Additional Information */}
                <div className="space-y-6">
                  <FormSection title="Additional Information">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="reportsTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reports To</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select manager" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {potentialManagers.map((manager) => (
                                  <SelectItem key={manager.id} value={manager.id}>
                                    {manager.name}
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
                        name="programIds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Associated Programs</FormLabel>
                            <Select
                              value={field.value?.[0] || ""}
                              onValueChange={(value) =>
                                field.onChange([value])
                              }
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select program" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {mockProjects.map((program) => (
                                  <SelectItem
                                    key={program.id}
                                    value={program.id}
                                  >
                                    {program.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormSection>
                </div>
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