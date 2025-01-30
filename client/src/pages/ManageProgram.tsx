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
import { ArrowLeft, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define group schema
const groupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  teacherIds: z.array(z.string()).min(1, "At least one teacher is required"),
  costPerStudent: z.number().min(0, "Cost per student must be non-negative"),
});

// Update intake schema to include groups
const intakeSchema = z.object({
  name: z.string().min(1, "Intake name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  maxStudents: z.number().min(1, "Maximum number of students is required"),
  status: z.enum(["Open", "Closed", "In Progress"]),
  groups: z.array(groupSchema).optional(),
});

const formSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  description: z.string(),
  progress: z.number().min(0).max(100),
  directorIds: z.array(z.string()).min(1, "At least one director is required"),
  intakes: z.array(intakeSchema).min(1, "At least one intake is required"),
});

type FormValues = z.infer<typeof formSchema>;
type IntakeFormValues = z.infer<typeof intakeSchema>;
type GroupFormValues = z.infer<typeof groupSchema>;

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
    (member) => member.role === "Teacher" || member.role === "Director",
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: programData?.name ?? "",
      description: programData?.description ?? "",
      progress: programData?.progress ?? 0,
      directorIds: programData ? [programData.director.id] : [],
      intakes: programData?.intakes ?? [{
        name: "Default Intake",
        startDate: "",
        endDate: "",
        maxStudents: 30,
        status: "Open",
        groups: []
      }],
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: isEdit ? "Program Updated" : "Program Created",
      description: `Successfully ${isEdit ? "updated" : "created"} ${data.name}`,
    });
    navigate("/programs");
  };

  const addIntake = () => {
    const currentIntakes = form.getValues("intakes") || [];
    form.setValue("intakes", [
      ...currentIntakes,
      {
        name: `Intake ${currentIntakes.length + 1}`,
        startDate: "",
        endDate: "",
        maxStudents: 30,
        status: "Open",
        groups: [],
      }
    ]);
  };

  const addGroup = (intakeIndex: number) => {
    const currentGroups = form.getValues(`intakes.${intakeIndex}.groups`) || [];
    form.setValue(`intakes.${intakeIndex}.groups`, [
      ...currentGroups,
      {
        name: `Group ${currentGroups.length + 1}`,
        capacity: 30,
        teacherIds: [],
        costPerStudent: 0,
      }
    ]);
  };

  const removeGroup = (intakeIndex: number, groupIndex: number) => {
    const currentGroups = form.getValues(`intakes.${intakeIndex}.groups`);
    if (currentGroups) {
      form.setValue(
        `intakes.${intakeIndex}.groups`,
        currentGroups.filter((_, i) => i !== groupIndex)
      );
    }
  };

  const removeIntake = (index: number) => {
    const currentIntakes = form.getValues("intakes");
    form.setValue("intakes", currentIntakes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="container p-6 max-w-[1200px]">
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
              {/* General Information - Full Width */}
              <Card>
                <CardContent className="p-6">
                  <FormSection title="General Information">
                    <div className="grid md:grid-cols-2 gap-6">
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
                      </div>

                      <div className="space-y-4">
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
                      </div>
                    </div>
                  </FormSection>
                </CardContent>
              </Card>

              {/* Intakes Management - Full Width */}
              <Card>
                <CardContent className="p-6">
                  <FormSection title="Program Intakes">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Manage Intakes</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addIntake}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add Intake
                        </Button>
                      </div>

                      <ScrollArea className="h-[600px] pr-4">
                        <div className="space-y-6">
                          {form.watch("intakes")?.map((intake, intakeIndex) => (
                            <Card key={intakeIndex}>
                              <CardContent className="p-6 relative">
                                {intakeIndex > 0 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => removeIntake(intakeIndex)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}

                                <div className="space-y-6">
                                  <FormField
                                    control={form.control}
                                    name={`intakes.${intakeIndex}.name`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Intake Name</FormLabel>
                                        <FormControl>
                                          <Input {...field} className="bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <div className="grid md:grid-cols-2 gap-4">
                                    <FormField
                                      control={form.control}
                                      name={`intakes.${intakeIndex}.startDate`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Start Date</FormLabel>
                                          <FormControl>
                                            <Input
                                              type="date"
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
                                      name={`intakes.${intakeIndex}.endDate`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>End Date</FormLabel>
                                          <FormControl>
                                            <Input
                                              type="date"
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
                                      name={`intakes.${intakeIndex}.maxStudents`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Max Students</FormLabel>
                                          <FormControl>
                                            <Input
                                              type="number"
                                              {...field}
                                              onChange={(e) =>
                                                field.onChange(parseInt(e.target.value))
                                              }
                                              className="bg-white"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <FormField
                                      control={form.control}
                                      name={`intakes.${intakeIndex}.status`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Status</FormLabel>
                                          <FormControl>
                                            <select
                                              {...field}
                                              className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
                                            >
                                              <option value="Open">Open</option>
                                              <option value="Closed">Closed</option>
                                              <option value="In Progress">
                                                In Progress
                                              </option>
                                            </select>
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>

                                  {/* Groups Section */}
                                  <div className="pt-4 border-t">
                                    <div className="flex justify-between items-center mb-4">
                                      <h4 className="text-sm font-medium">Groups</h4>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addGroup(intakeIndex)}
                                        className="gap-2"
                                      >
                                        <Plus className="h-4 w-4" />
                                        Add Group
                                      </Button>
                                    </div>

                                    <div className="space-y-4">
                                      {(form.watch(`intakes.${intakeIndex}.groups`) || []).map((group, groupIndex) => (
                                        <Card key={groupIndex}>
                                          <CardContent className="p-4 relative">
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              className="absolute top-2 right-2"
                                              onClick={() => removeGroup(intakeIndex, groupIndex)}
                                            >
                                              <X className="h-4 w-4" />
                                            </Button>

                                            <div className="space-y-4">
                                              <FormField
                                                control={form.control}
                                                name={`intakes.${intakeIndex}.groups.${groupIndex}.name`}
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormLabel>Group Name</FormLabel>
                                                    <FormControl>
                                                      <Input {...field} className="bg-white" />
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />

                                              <div className="grid md:grid-cols-2 gap-4">
                                                <FormField
                                                  control={form.control}
                                                  name={`intakes.${intakeIndex}.groups.${groupIndex}.capacity`}
                                                  render={({ field }) => (
                                                    <FormItem>
                                                      <FormLabel>Capacity</FormLabel>
                                                      <FormControl>
                                                        <Input
                                                          type="number"
                                                          {...field}
                                                          onChange={(e) =>
                                                            field.onChange(parseInt(e.target.value))
                                                          }
                                                          className="bg-white"
                                                        />
                                                      </FormControl>
                                                      <FormMessage />
                                                    </FormItem>
                                                  )}
                                                />

                                                <FormField
                                                  control={form.control}
                                                  name={`intakes.${intakeIndex}.groups.${groupIndex}.costPerStudent`}
                                                  render={({ field }) => (
                                                    <FormItem>
                                                      <FormLabel>Cost per Student</FormLabel>
                                                      <FormControl>
                                                        <Input
                                                          type="number"
                                                          {...field}
                                                          onChange={(e) =>
                                                            field.onChange(parseFloat(e.target.value))
                                                          }
                                                          className="bg-white"
                                                        />
                                                      </FormControl>
                                                      <FormMessage />
                                                    </FormItem>
                                                  )}
                                                />
                                              </div>

                                              <FormField
                                                control={form.control}
                                                name={`intakes.${intakeIndex}.groups.${groupIndex}.teacherIds`}
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormLabel>Group Teachers</FormLabel>
                                                    <FormControl>
                                                      <PeoplePicker
                                                        people={teachers}
                                                        selectedIds={field.value}
                                                        onChange={field.onChange}
                                                        placeholder="Select group teachers"
                                                      />
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />
                                            </div>
                                          </CardContent>
                                        </Card>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </FormSection>
                </CardContent>
              </Card>

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