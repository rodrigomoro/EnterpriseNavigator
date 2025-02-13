import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import PeoplePicker from "@/components/ui/PeoplePicker";
import { FormSection } from "@/components/ui/FormSection";
import { mockPeople } from "@/data/mockPeople";
import { mockPrograms } from "@/data/mockPrograms";

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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormValues) => void;
  initialData?: Partial<FormValues>;
  mode: 'create' | 'edit';
}

export default function PersonFormDialog({ open, onOpenChange, onSubmit, initialData, mode }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      role: initialData?.role ?? '',
      department: initialData?.department ?? '',
      isDirector: initialData?.isDirector ?? false,
      isTeacher: initialData?.isTeacher ?? false,
      isStudent: initialData?.isStudent ?? false,
      directorPrograms: initialData?.directorPrograms ?? [],
      teachingPrograms: initialData?.teachingPrograms ?? [],
      enrolledPrograms: initialData?.enrolledPrograms ?? [],
      email: initialData?.email ?? '',
      phone: initialData?.phone ?? '',
      bio: initialData?.bio ?? '',
      reportsTo: initialData?.reportsTo ?? '',
    },
  });

  const departments = Array.from(new Set(mockPeople.map(person => person.department)));
  const potentialManagers = mockPeople.filter(person => person.isDirector);
  const watchIsDirector = form.watch("isDirector");
  const watchIsTeacher = form.watch("isTeacher");
  const watchIsStudent = form.watch("isStudent");

  const programOptions = mockPrograms.map(program => ({
    id: program.id,
    name: program.name,
    role: 'Program',
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Add Person' : 'Edit Person'}</DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Add a new person to your organization.'
              : 'Update person details.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1">
            <div className="flex-1 overflow-y-auto px-6 py-4">
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
            </div>

            <DialogFooter className="px-6 py-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {mode === 'create' ? 'Add Person' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}