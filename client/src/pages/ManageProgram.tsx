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
import PeoplePicker from "@/components/ui/PeoplePicker";
import { FormSection } from "@/components/ui/FormSection";
import Sidebar from "@/components/Sidebar";
import UserAvatar from "@/components/UserAvatar";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  description: z.string(),
  progress: z.number().min(0).max(100),
  directorIds: z.array(z.string()).min(1, "At least one director is required"),
  teacherIds: z.array(z.string()).min(1, "At least one teacher is required"),
  studentIds: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

export default function ManageProgram() {
  const params = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = params.id !== undefined;

  // Find program data if in edit mode
  const programData = isEdit
    ? mockProjects.find((p) => p.id === params?.id)
    : null;

  const directors = mockTeamMembers.filter(
    (member) => member.role === "Director",
  );
  const teachers = mockTeamMembers.filter(
    (member) => member.role === "Teacher",
  );
  const students = mockTeamMembers.filter(
    (member) => member.role === "Student",
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: programData?.name ?? "",
      description: programData?.description ?? "",
      progress: programData?.progress ?? 0,
      directorIds: programData ? [programData.director.id] : [],
      teacherIds: programData ? programData.team.map((t) => t.id) : [],
      studentIds: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    // In a real app, this would be an API call
    console.log("Form submitted:", data);
    toast({
      title: isEdit ? "Program Updated" : "Program Created",
      description: `Successfully ${isEdit ? "updated" : "created"} ${data.name}`,
    });
    navigate("/programs");
  };

  // If trying to edit a non-existent program, redirect to programs list
  if (isEdit && !programData) {
    navigate("/programs");
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
                <Link href="/programs">
                  <a className="flex items-center gap-1 hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Programs Directory
                  </a>
                </Link>
              </div>
              <h1 className="text-2xl font-bold">
                {isEdit ? "Edit Program" : "Create New Program"}
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
                            <FormLabel>Program Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter program name"
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
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <textarea
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[80px]"
                                placeholder="Enter program description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="progress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Progress (%)</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-4">
                                <Slider
                                  min={0}
                                  max={100}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={([value]) =>
                                    field.onChange(value)
                                  }
                                  className="flex-1"
                                />
                                <span className="text-sm font-medium w-12 text-right">
                                  {field.value}%
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormSection>
                </div>

                {/* Column 2: Directors & Teachers */}
                <div className="space-y-6">
                  <FormSection title="Directors & Teachers">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="directorIds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Program Directors</FormLabel>
                            <FormControl>
                              <PeoplePicker
                                people={directors}
                                selectedIds={field.value}
                                onChange={field.onChange}
                                placeholder="Select program directors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="teacherIds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Program Teachers</FormLabel>
                            <FormControl>
                              <PeoplePicker
                                people={teachers}
                                selectedIds={field.value}
                                onChange={field.onChange}
                                placeholder="Select program teachers"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormSection>
                </div>

                {/* Column 3: Students */}
                <div className="space-y-6">
                  <FormSection title="Students">
                    <FormField
                      control={form.control}
                      name="studentIds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Program Students</FormLabel>
                          <FormControl>
                            <PeoplePicker
                              people={students}
                              selectedIds={field.value}
                              onChange={field.onChange}
                              placeholder="Select program students"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormSection>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/programs")}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEdit ? "Save Changes" : "Create Program"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
