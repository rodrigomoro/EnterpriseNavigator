import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from 'wouter';
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
import PeoplePicker from "@/components/ui/PeoplePicker";
import { FormSection } from "@/components/ui/FormSection";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, X, ArrowLeft, Pencil, Copy, Clipboard, ChevronDown, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { useRoute } from 'wouter';

// Constants for schedule
const WEEKDAYS = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
] as const;

// Constants
const PROGRAM_AREAS = [
  "Cloud Computing",
  "Cybersecurity",
  "Data Science",
  "Web Development",
  "Mobile Development",
  "DevOps",
  "Artificial Intelligence",
  "Blockchain",
];

const PROGRAM_TYPES = [
  "Master",
  "Bootcamp",
  "Certificate",
  "Diploma",
  "Short Course",
];

const MODALITIES = [
  "Online",
  "In Person",
  "Hybrid",
];

// Group status options
const GROUP_STATUS = [
  { value: "open", label: "Open for Enrollment" },
  { value: "closed", label: "Closed" },
  { value: "full", label: "Full" },
  { value: "waitlist", label: "Waitlist" },
  { value: "cancelled", label: "Cancelled" },
] as const;

// Module Schema and Components
const moduleSchema = z.object({
  name: z.string().min(1, "Module name is required"),
  description: z.string(),
  competencies: z.string().min(1, "Competencies are required"),
  tools: z.string().min(1, "Tools are required"),
  syllabus: z.string().min(1, "Syllabus is required"),
  hours: z.number().min(1, "Hours must be at least 1"),
  credits: z.number().min(1, "Credits must be at least 1"),
  costPerCredit: z.number().min(0, "Cost per credit must be non-negative"),
});

type ModuleType = z.infer<typeof moduleSchema>;

interface ModulesSectionProps {
  form: any;
  addModule: () => void;
  removeModule: (index: number) => void;
  teachers: any[];
}

const ModuleDetailsDialog: React.FC<{
  module: ModuleType;
  moduleIndex: number;
  form: any;
  teachers: any[];
}> = ({ module, moduleIndex, form, teachers }) => (
  <DialogContent className="max-w-4xl h-[90vh]">
    <DialogHeader className="px-6 py-4 border-b">
      <DialogTitle>Module Details</DialogTitle>
      <DialogDescription>
        View and edit detailed information about this module
      </DialogDescription>
    </DialogHeader>
    <ScrollArea className="px-6 py-4 h-[calc(90vh-8rem)]">
      <div className="grid gap-6">
        <FormField
          control={form.control}
          name={`modules.${moduleIndex}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[120px]"
                  placeholder="Module description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`modules.${moduleIndex}.competencies`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Competencies</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[120px]"
                  placeholder="Key competencies"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`modules.${moduleIndex}.tools`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tools</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[120px]"
                  placeholder="Required tools"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`modules.${moduleIndex}.syllabus`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Syllabus</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[120px]"
                  placeholder="Module syllabus"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </ScrollArea>
  </DialogContent>
);

const ModulesSection: React.FC<ModulesSectionProps> = ({ form, addModule, removeModule }) => (
  <Card>
    <CardContent className="p-6">
      <FormSection title="Program Modules">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Manage Modules</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addModule}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Module
            </Button>
          </div>

          <div className="border rounded-md">
            <div className="bg-muted/50 p-3 grid grid-cols-12 gap-4 text-sm font-medium">
              <div className="col-span-4">Module Name</div>
              <div className="col-span-2">Hours</div>
              <div className="col-span-2">Credits</div>
              <div className="col-span-3">Cost/Credit</div>
              <div className="col-span-1">Actions</div>
            </div>

            <ScrollArea className="h-[250px]">
              <div className="divide-y">
                {form.watch("modules")?.map((module: ModuleType, moduleIndex: number) => (
                  <div key={moduleIndex} className="p-3 grid grid-cols-12 gap-4 items-center hover:bg-muted/50">
                    <div className="col-span-4">
                      <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} className="bg-white" placeholder="Module name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.hours`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.credits`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.costPerCredit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                className="bg-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-1 flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <ModuleDetailsDialog
                          module={module}
                          moduleIndex={moduleIndex}
                          form={form}
                        />
                      </Dialog>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeModule(moduleIndex)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </FormSection>
    </CardContent>
  </Card>
);

// Program Details Dialog
const ProgramDetailsDialog: React.FC<{
  form: any;
}> = ({ form }) => (
  <DialogContent className="max-w-4xl h-[90vh]">
    <DialogHeader className="px-6 py-4 border-b">
      <DialogTitle>Career & Certifications</DialogTitle>
      <DialogDescription>
        Edit career opportunities and certification details
      </DialogDescription>
    </DialogHeader>
    <ScrollArea className="px-6 py-4 h-[calc(90vh-8rem)]">
      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="objectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objectives/Training</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[120px]"
                  placeholder="Enter program objectives"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whyChoose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why Choose This Course?</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[120px]"
                  placeholder="Enter reasons to choose this course"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="careerOpportunities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Career Opportunities</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[120px]"
                  placeholder="List career opportunities"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="certifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certifications Provided</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[120px]"
                  placeholder="List certifications provided"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </ScrollArea>
  </DialogContent>
);

// ScheduleSection Component
interface ScheduleProps {
  form: any;
  intakeIndex: number;
}

const ScheduleSection: React.FC<ScheduleProps> = ({ form, intakeIndex }) => {
  const [copiedSchedule, setCopiedSchedule] = useState<{
    startTime: string;
    endTime: string;
  } | null>(null);

  const { toast } = useToast();

  const copySchedule = (dayIndex: number) => {
    const day = form.watch(`intakes.${intakeIndex}.schedule.days.${dayIndex}`);
    setCopiedSchedule({
      startTime: day.startTime,
      endTime: day.endTime
    });
    toast({
      title: "Schedule copied",
      description: "You can now paste these hours to another day"
    });
  };

  const pasteSchedule = (dayIndex: number) => {
    if (!copiedSchedule) return;

    form.setValue(`intakes.${intakeIndex}.schedule.days.${dayIndex}.startTime`, copiedSchedule.startTime);
    form.setValue(`intakes.${intakeIndex}.schedule.days.${dayIndex}.endTime`, copiedSchedule.endTime);

    toast({
      title: "Schedule pasted",
      description: "Hours have been applied to this day"
    });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Schedule per Day</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WEEKDAYS.map((day, dayIndex) => (
          <div key={day.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
            <FormField
              control={form.control}
              name={`intakes.${intakeIndex}.schedule.days.${dayIndex}.enabled`}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!mt-0 font-medium min-w-[80px]">{day.label}</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex-1 grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name={`intakes.${intakeIndex}.schedule.days.${dayIndex}.startTime`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="h-8"
                        disabled={!form.watch(`intakes.${intakeIndex}.schedule.days.${dayIndex}.enabled`)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`intakes.${intakeIndex}.schedule.days.${dayIndex}.endTime`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        className="h-8"
                        disabled={!form.watch(`intakes.${intakeIndex}.schedule.days.${dayIndex}.enabled`)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => copySchedule(dayIndex)}
                className="h-8 w-8 p-0"
                disabled={!form.watch(`intakes.${intakeIndex}.schedule.days.${dayIndex}.enabled`)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => pasteSchedule(dayIndex)}
                className="h-8 w-8 p-0"
                disabled={!copiedSchedule || !form.watch(`intakes.${intakeIndex}.schedule.days.${dayIndex}.enabled`)}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Group Module-Teacher Mapping Component
interface GroupModuleTeacherProps {
  form: any;
  intakeIndex: number;
  groupIndex: number;
  teachers: any[];
  modules: any[];
}

const GroupModuleTeacher: React.FC<GroupModuleTeacherProps> = ({
  form,
  intakeIndex,
  groupIndex,
  teachers,
  modules
}) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Module Teachers</h4>
      <div className="border rounded-md">
        <div className="bg-muted/50 p-2 grid grid-cols-12 gap-2 text-sm font-medium">
          <div className="col-span-4">Module</div>
          <div className="col-span-8">Teachers</div>
        </div>
        <div className="divide-y">
          {modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="p-2 grid grid-cols-12 gap-2 items-center">
              <div className="col-span-4">
                <div className="font-medium">{module.name}</div>
                <div className="text-sm text-muted-foreground">
                  {module.credits} credits
                </div>
              </div>
              <div className="col-span-8">
                <FormField
                  control={form.control}
                  name={`intakes.${intakeIndex}.groups.${groupIndex}.moduleTeachers.${moduleIndex}.teacherIds`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PeoplePicker
                          people={teachers}
                          selectedIds={field.value}
                          onChange={field.onChange}
                          placeholder="Select teachers"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const formSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  area: z.string().min(1, "Area is required"),
  type: z.string().min(1, "Program type is required"),
  description: z.string().min(1, "Description is required"),
  directorIds: z.array(z.string()).min(1, "At least one director is required"),
  prerequisites: z.string(),
  targetAudience: z.string().min(1, "Target audience is required"),
  objectives: z.string().min(1, "Objectives are required"),
  whyChoose: z.string(),
  careerOpportunities: z.string(),
  certifications: z.string(),
  modules: z.array(moduleSchema.omit({ teacherIds: true })).min(1, "At least one module is required"),
  intakes: z.array(z.object({
    name: z.string(),
    modality: z.string().min(1, "Modality is required"),
    schedule: z.object({
      days: z.array(z.object({
        dayId: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        enabled: z.boolean()
      }))
    }),
    groups: z.array(z.object({
      name: z.string(),
      status: z.string().min(1, "Status is required"),
      capacity: z.number(),
      costPerStudent: z.number(),
      moduleTeachers: z.array(z.object({
        moduleId: z.string(),
        teacherIds: z.array(z.string())
      }))
    }))
  }))
});

type FormValues = z.infer<typeof formSchema>;

// Group Module-Teacher Mapping Component

export default function ManageProgram() {
  const [teachers] = useState(mockTeamMembers);
  const [, params] = useRoute("/programs/:id/edit");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = Boolean(params?.id);

  // Get the program data if in edit mode
  const program = isEdit ? mockProjects.find(p => p.id === params?.id) : null;

  // Managing the expanded state of intake and group sections
  const [isIntakeExpanded, setIsIntakeExpanded] = useState(false);
  const [isGroupExpanded, setIsGroupExpanded] = useState(false);

  const toggleIntake = () => setIsIntakeExpanded(!isIntakeExpanded);
  const toggleGroup = () => setIsGroupExpanded(!isGroupExpanded);

  // Calculate total duration from modules
  const calculateTotalDuration = (modules: any[]) => {
    return modules?.reduce((total, module) => total + (module.hours || 0), 0) || 0;
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: program?.name ?? "",
      area: program?.area ?? "",
      type: program?.type ?? "",
      directorIds: program?.director?.map(d => d.id) ?? [],
      description: program?.description ?? "",
      prerequisites: program?.prerequisites ?? "",
      targetAudience: program?.targetAudience ?? "",
      objectives: program?.objectives ?? "",
      whyChoose: program?.whyChoose ?? "",
      careerOpportunities: program?.careerOpportunities ?? "",
      certifications: program?.certifications ?? "",
      modules: program?.modules ?? [{
        name: "",
        description: "",
        competencies: "",
        tools: "",
        syllabus: "",
        hours: 0,
        credits: 0,
        costPerCredit: 0
      }],
      intakes: program?.intakes ?? [{
        name: "",
        modality: "",
        schedule: {
          days: WEEKDAYS.map(day => ({
            dayId: day.id,
            startTime: "",
            endTime: "",
            enabled: false
          }))
        },
        groups: []
      }]
    }
  });

  const addModule = () => {
    const currentModules = form.getValues("modules") || [];
    form.setValue("modules", [
      ...currentModules,
      {
        name: "",
        description: "",
        competencies: "",
        tools: "",
        syllabus: "",
        hours: 0,
        credits: 0,
        costPerCredit: 0,
      }
    ]);
  };

  const removeModule = (index: number) => {
    const currentModules = form.getValues("modules");
    form.setValue("modules", currentModules.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted:", data);
    toast({
      title: isEdit ? "Program Updated" : "Program Created",
      description: `Successfully ${isEdit ? "updated" : "created"} ${data.name}`,
    });
    navigate("/programs");
  };

  const directors = mockTeamMembers.filter(
    (member) => member.role === "Director",
  );

  const addIntake = () => {
    form.setValue("intakes", [...form.getValues("intakes"), {
      name: "",
      groups: [],
      modality: "",
      schedule: {
        days: WEEKDAYS.map(day => ({
          dayId: day.id,
          startTime: "",
          endTime: "",
          enabled: false
        }))
      }
    }]);
  };
  const removeIntake = (index: number) => {
    const intakes = form.getValues("intakes");
    form.setValue("intakes", intakes.filter((_, i) => i !== index));
  };
  const addGroup = (intakeIndex: number) => {
    const intakes = form.getValues("intakes");
    const modules = form.getValues("modules") || [];

    // Initialize moduleTeachers with empty arrays for teacherIds
    const moduleTeachers = modules.map((_, index) => ({
      moduleId: `${index}`,
      teacherIds: [] // Ensure teacherIds is always an empty array
    }));

    intakes[intakeIndex].groups.push({
      name: "",
      status: "",
      capacity: 0,
      costPerStudent: 0,
      moduleTeachers
    });

    form.setValue("intakes", intakes);
  };
  const removeGroup = (intakeIndex: number, groupIndex: number) => {
    const intakes = form.getValues("intakes");
    intakes[intakeIndex].groups = intakes[intakeIndex].groups.filter(
      (_, i) => i !== groupIndex
    );
    form.setValue("intakes", intakes);
  };

  const totalDuration = calculateTotalDuration(form.watch("modules"));

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">
                {isEdit ? "Edit Program" : "Create Program"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Total Duration: {totalDuration} hours
              </p>
            </div>
            <Link href="/programs">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <b>Program Details</b>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Pencil className="h-4 w-4" />
                          Career & Certifications
                        </Button>
                      </DialogTrigger>
                      <ProgramDetailsDialog form={form} />
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Program Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Area</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select area" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {PROGRAM_AREAS.map((area) => (
                                  <SelectItem key={area} value={area}>
                                    {area}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {PROGRAM_TYPES.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-3">
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
                                placeholder="Select directors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-12">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <textarea
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                                placeholder="Enter program description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ModulesSection
                form={form}
                addModule={addModule}
                removeModule={removeModule}
                teachers={teachers}
              />

              <Card>
                <CardContent>
                  <FormSection title="Program Intakes">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Manage Intakes</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addIntake}
                          className="mb-4"
                        >
                          Add Intake
                        </Button>
                      </div>
                      <div className="space-y-4" onClick={toggleIntake}>
                        {form.watch("intakes")?.map((intake, intakeIndex) => (
                          <Collapsible key={intakeIndex} className="border rounded-lg">
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 group">
                              <div className="flex items-center gap-2">
                                {isIntakeExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                <span className="font-medium">
                                  {intake.name || `Intake ${intakeIndex + 1}`}
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeIntake(intakeIndex);
                                }}
                                className="opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="p-4 pt-0">
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <FormField
                                    control={form.control}
                                    name={`intakes.${intakeIndex}.name`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                          <Input {...field} className="bg-white" placeholder="Enter intake name" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={form.control}
                                    name={`intakes.${intakeIndex}.modality`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Modality</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select modality" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {MODALITIES.map((modality) => (
                                              <SelectItem key={modality} value={modality}>
                                                {modality}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <ScheduleSection
                                  form={form}
                                  intakeIndex={intakeIndex}
                                />

                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium">Manage Groups</h4>
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

                                  <div className="space-y-4" onClick={toggleGroup}>
                                    {intake.groups?.map((group, groupIndex) => (
                                      <div key={groupIndex}>
                                        <Collapsible className="border rounded-lg">
                                          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 group">
                                            <div className="flex items-center gap-2">
                                              {isGroupExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                              <span className="font-medium">
                                                {group.name || `Group ${groupIndex + 1}`}
                                              </span>
                                            </div>
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                removeGroup(intakeIndex, groupIndex);
                                              }}
                                              className="opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                                            >
                                              <X className="h-4 w-4" />
                                            </Button>
                                          </CollapsibleTrigger>
                                          <CollapsibleContent className="p-4 pt-0">
                                            <div className="space-y-4">
                                              <div className="grid grid-cols-4 gap-4">
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

                                                <FormField
                                                  control={form.control}
                                                  name={`intakes.${intakeIndex}.groups.${groupIndex}.status`}
                                                  render={({ field }) => (
                                                    <FormItem>
                                                      <FormLabel>Status</FormLabel>
                                                      <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                          <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                          </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                          {GROUP_STATUS.map((status) => (
                                                            <SelectItem key={status.value} value={status.value}>
                                                              {status.label}
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

                                              <GroupModuleTeacher
                                                form={form}
                                                intakeIndex={intakeIndex}
                                                groupIndex={groupIndex}
                                                teachers={teachers}
                                                modules={form.watch("modules")}
                                              />
                                            </div>
                                          </CollapsibleContent>
                                        </Collapsible>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </div>
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