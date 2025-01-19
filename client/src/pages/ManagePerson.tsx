import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useRoute } from "wouter";
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
import PeoplePicker from "@/components/ui/PeoplePicker";
import { FormSection } from "@/components/ui/FormSection";
import Sidebar from "@/components/Sidebar";
import UserAvatar from "@/components/UserAvatar";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  isDirector: z.boolean().default(false),
  isTeacher: z.boolean().default(false),
  isStudent: z.boolean().default(false),
  directorPrograms: z.array(z.string()).optional(),
  teachingPrograms: z.array(z.string()).optional(),
  enrolledPrograms: z.array(z.string()).optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  bio: z.string(),
  reportsTo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ManagePerson() {
  const [, params] = useRoute("/people/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = Boolean(params?.id);
  
  const person = isEdit ? mockTeamMembers.find(m => m.id === params?.id) : undefined;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: person ? {
      name: person.name,
      role: person.role,
      department: person.department,
      isDirector: person.isDirector,
      isTeacher: person.isTeacher,
      isStudent: person.isStudent,
      directorPrograms: person.directorPrograms,
      teachingPrograms: person.teachingPrograms,
      enrolledPrograms: person.enrolledPrograms,
      email: 'example@email.com', // Add these fields to your mock data
      phone: '123-456-7890',
      bio: person.bio ?? '',
      reportsTo: person.reportsTo,
    } : {
      name: '',
      role: '',
      department: '',
      isDirector: false,
      isTeacher: false,
      isStudent: false,
      directorPrograms: [],
      teachingPrograms: [],
      enrolledPrograms: [],
      email: '',
      phone: '',
      bio: '',
      reportsTo: '',
    },
  });

  const departments = Array.from(new Set(mockTeamMembers.map(member => member.department)));
  const potentialManagers = mockTeamMembers.filter(member => member.isDirector);
  const watchIsDirector = form.watch("isDirector");
  const watchIsTeacher = form.watch("isTeacher");
  const watchIsStudent = form.watch("isStudent");

  const programOptions = mockProjects.map(program => ({
    id: program.id,
    name: program.name,
    role: 'Program',
  }));

  const onSubmit = async (data: FormValues) => {
    // In a real app, this would be an API call
    console.log('Form submitted:', data);
    toast({
      title: isEdit ? "Person Updated" : "Person Created",
      description: `Successfully ${isEdit ? 'updated' : 'created'} ${data.name}`,
    });
    navigate("/people");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Link href="/people">
                  <a className="flex items-center gap-1 hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    People Directory
                  </a>
                </Link>
              </div>
              <h1 className="text-2xl font-bold">
                {isEdit ? `Edit ${person?.name}` : 'Add New Person'}
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
                              <Input placeholder="Enter name" {...field} className="bg-white" />
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
                            <FormControl>
                              <Input placeholder="Enter role" {...field} className="bg-white" />
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
                            <FormControl>
                              <select
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                                {...field}
                              >
                                <option value="">Select department</option>
                                {departments.map(dept => (
                                  <option key={dept} value={dept}>
                                    {dept}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormSection>

                  <FormSection title="Role Type">
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="isDirector"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="rounded border-input"
                                />
                              </FormControl>
                              <FormLabel className="!mt-0">Is Director</FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="isTeacher"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="rounded border-input"
                                />
                              </FormControl>
                              <FormLabel className="!mt-0">Is Teacher</FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="isStudent"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="rounded border-input"
                                />
                              </FormControl>
                              <FormLabel className="!mt-0">Is Student</FormLabel>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormSection>
                </div>

                {/* Column 2: Contact & Additional Info */}
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
                              <Input type="email" placeholder="Enter email" {...field} className="bg-white" />
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
                              <Input placeholder="Enter phone number" {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormSection>

                  <FormSection title="Additional Information">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="reportsTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reports To</FormLabel>
                            <FormControl>
                              <PeoplePicker
                                people={potentialManagers}
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

                {/* Column 3: Program Assignments */}
                <div className="space-y-6">
                  {(watchIsDirector || watchIsTeacher || watchIsStudent) && (
                    <FormSection title="Program Assignments">
                      <div className="space-y-4">
                        {watchIsDirector && (
                          <FormField
                            control={form.control}
                            name="directorPrograms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Directing Programs</FormLabel>
                                <FormControl>
                                  <PeoplePicker
                                    people={programOptions}
                                    selectedIds={field.value || []}
                                    onChange={field.onChange}
                                    placeholder="Select programs to direct"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {watchIsTeacher && (
                          <FormField
                            control={form.control}
                            name="teachingPrograms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Teaching Programs</FormLabel>
                                <FormControl>
                                  <PeoplePicker
                                    people={programOptions}
                                    selectedIds={field.value || []}
                                    onChange={field.onChange}
                                    placeholder="Select programs to teach"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {watchIsStudent && (
                          <FormField
                            control={form.control}
                            name="enrolledPrograms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Enrolled Programs</FormLabel>
                                <FormControl>
                                  <PeoplePicker
                                    people={programOptions}
                                    selectedIds={field.value || []}
                                    onChange={field.onChange}
                                    placeholder="Select programs to enroll in"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </FormSection>
                  )}
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
                  {isEdit ? 'Save Changes' : 'Create Person'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
