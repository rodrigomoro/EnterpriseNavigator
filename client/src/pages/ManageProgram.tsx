import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Define module schema
const moduleSchema = z.object({
  name: z.string().min(1, "Module name is required"),
  description: z.string(),
  credits: z.number().min(1, "Credits must be at least 1"),
  costPerCredit: z.number().min(0, "Cost per credit must be non-negative"),
  teacherIds: z.array(z.string()).min(1, "At least one teacher is required"),
});

// Define schedule schema
const scheduleSchema = z.object({
  days: z.array(z.string()),
  startTime: z.string(),
  endTime: z.string(),
});

const intakeSchema = z.object({
  name: z.string().min(1, "Intake name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  maxStudents: z.number().min(1, "Maximum number of students is required"),
  status: z.enum(["Open", "Closed", "In Progress"]),
  groups: z.array(z.object({
    name: z.string().min(1, "Group name is required"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    teacherIds: z.array(z.string()).min(1, "At least one teacher is required"),
    moduleIds: z.array(z.string()).min(1, "At least one module is required"),
    costPerStudent: z.number().min(0, "Cost per student must be non-negative"),
  })).optional(),
});

const formSchema = z.object({
  // Basic Information
  name: z.string().min(1, "Program name is required"),
  area: z.string().min(1, "Area is required"),
  type: z.string().min(1, "Program type is required"),
  durationHours: z.number().min(1, "Duration must be at least 1 hour"),
  modality: z.string().min(1, "Modality is required"),
  schedule: scheduleSchema,

  // Leadership
  directorIds: z.array(z.string()).min(1, "At least one director is required"),

  // Program Details
  description: z.string().min(1, "Description is required"),
  prerequisites: z.string(),
  targetAudience: z.string().min(1, "Target audience is required"),

  // Career & Certifications
  objectives: z.string().min(1, "Objectives are required"),
  whyChoose: z.string(),
  careerOpportunities: z.string(),
  certifications: z.string(),

  // Modules and Progress
  progress: z.number().min(0).max(100),
  modules: z.array(moduleSchema).min(1, "At least one module is required"),
  intakes: z.array(intakeSchema).min(1, "At least one intake is required"),
});

export default function ManageProgram() {
  const params = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isEdit = params.id !== undefined;

  const programData = isEdit
    ? mockProjects.find((p) => p.id === params?.id)
    : null;

  const directors = mockTeamMembers.filter(
    (member) => member.role === "Director",
  );
  const teachers = mockTeamMembers.filter(
    (member) => member.role === "Teacher" || member.role === "Director",
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Basic Information
      name: programData?.name ?? "",
      area: programData?.area ?? "",
      type: programData?.type ?? "",
      durationHours: programData?.durationHours ?? 0,
      modality: programData?.modality ?? "",
      schedule: programData?.schedule ?? {
        days: [],
        startTime: "",
        endTime: "",
      },

      // Leadership
      directorIds: programData ? [programData.director.id] : [],

      // Program Details
      description: programData?.description ?? "",
      prerequisites: programData?.prerequisites ?? "",
      targetAudience: programData?.targetAudience ?? "",

      // Career & Certifications
      objectives: programData?.objectives ?? "",
      whyChoose: programData?.whyChoose ?? "",
      careerOpportunities: programData?.careerOpportunities ?? "",
      certifications: programData?.certifications ?? "",

      // Progress and Other Data
      progress: programData?.progress ?? 0,
      modules: programData?.modules ?? [{
        name: "",
        description: "",
        credits: 1,
        costPerCredit: 0,
        teacherIds: []
      }],
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
    toast({
      title: isEdit ? "Program Updated" : "Program Created",
      description: `Successfully ${isEdit ? "updated" : "created"} ${data.name}`,
    });
    navigate("/programs");
  };

  const addModule = () => {
    const currentModules = form.getValues("modules") || [];
    form.setValue("modules", [
      ...currentModules,
      {
        name: "",
        description: "",
        credits: 1,
        costPerCredit: 0,
        teacherIds: []
      }
    ]);
  };

  const removeModule = (index: number) => {
    const currentModules = form.getValues("modules");
    form.setValue("modules", currentModules.filter((_, i) => i !== index));
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
        moduleIds: [],
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

  const weekDays = [
    { label: "Monday", value: "MON" },
    { label: "Tuesday", value: "TUE" },
    { label: "Wednesday", value: "WED" },
    { label: "Thursday", value: "THU" },
    { label: "Friday", value: "FRI" },
    { label: "Saturday", value: "SAT" },
    { label: "Sunday", value: "SUN" },
  ];

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
              {/* Basic Information */}
              <Card>
                <CardContent className="p-6">
                  <FormSection title="Basic Information">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Program Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter program name" {...field} className="bg-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

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
                                  <SelectItem value="cloud">Cloud Computing</SelectItem>
                                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                                  <SelectItem value="data">Data Science</SelectItem>
                                  <SelectItem value="development">Software Development</SelectItem>
                                  <SelectItem value="ai">Artificial Intelligence</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Program Type</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="master">Master</SelectItem>
                                  <SelectItem value="bootcamp">Bootcamp</SelectItem>
                                  <SelectItem value="course">Course</SelectItem>
                                  <SelectItem value="certification">Certification Program</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="durationHours"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration (hours)</FormLabel>
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

                        <FormField
                          control={form.control}
                          name="modality"
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
                                  <SelectItem value="online">Online</SelectItem>
                                  <SelectItem value="inperson">In Person</SelectItem>
                                  <SelectItem value="hybrid">Hybrid</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-4">
                          <FormLabel>Schedule</FormLabel>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="schedule.days"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Days</FormLabel>
                                  <div className="flex flex-wrap gap-2">
                                    {weekDays.map((day) => (
                                      <FormField
                                        key={day.value}
                                        control={form.control}
                                        name="schedule.days"
                                        render={({ field }) => (
                                          <FormItem
                                            key={day.value}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(day.value)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...field.value, day.value])
                                                    : field.onChange(
                                                        field.value?.filter((value) => value !== day.value)
                                                      )
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">
                                              {day.label}
                                            </FormLabel>
                                          </FormItem>
                                        )}
                                      />
                                    ))}
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="schedule.startTime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Time</FormLabel>
                                  <FormControl>
                                    <Input type="time" {...field} className="bg-white" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="schedule.endTime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Time</FormLabel>
                                  <FormControl>
                                    <Input type="time" {...field} className="bg-white" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormSection>
                </CardContent>
              </Card>

              {/* Leadership */}
              <Card>
                <CardContent className="p-6">
                  <FormSection title="Leadership">
                    <FormField
                      control={form.control}
                      name="directorIds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Program Director</FormLabel>
                          <FormControl>
                            <PeoplePicker
                              people={directors}
                              selectedIds={field.value}
                              onChange={field.onChange}
                              placeholder="Select program director"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormSection>
                </CardContent>
              </Card>

              {/* Program Details */}
              <Card>
                <CardContent className="p-6">
                  <FormSection title="Program Details">
                    <div className="space-y-4">
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

                      <FormField
                        control={form.control}
                        name="prerequisites"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prerequisites</FormLabel>
                            <FormControl>
                              <textarea
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                                placeholder="Enter program prerequisites"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="targetAudience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Who is it for?</FormLabel>
                            <FormControl>
                              <textarea
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                                placeholder="Describe the target audience"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormSection>
                </CardContent>
              </Card>

              {/* Career & Certifications */}
              <Card>
                <CardContent className="p-6">
                  <FormSection title="Career & Certifications">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="objectives"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Objectives/Training</FormLabel>
                            <FormControl>
                              <textarea
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                                placeholder="Enter program objectives"
                                {...field}
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
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                                placeholder="Enter reasons to choose this course"
                                {...field}
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
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                                placeholder="List career opportunities"
                                {...field}
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
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                                placeholder="List certifications provided"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormSection>
                </CardContent>
              </Card>

              {/* Modules Management - Full Width */}
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
                          <div className="col-span-3">Module Name</div>
                          <div className="col-span-3">Description</div>
                          <div className="col-span-1">Credits</div>
                          <div className="col-span-2">Cost/Credit</div>
                          <div className="col-span-2">Teachers</div>
                          <div className="col-span-1"></div>
                        </div>

                        <ScrollArea className="h-[400px]">
                          <div className="divide-y">
                            {form.watch("modules")?.map((module, moduleIndex) => (
                              <div key={moduleIndex} className="p-3 grid grid-cols-12 gap-4 items-center hover:bg-muted/50">
                                <div className="col-span-3">
                                  <FormField
                                    control={form.control}
                                    name={`modules.${moduleIndex}.name`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input {...field} className="bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <div className="col-span-3">
                                  <FormField
                                    control={form.control}
                                    name={`modules.${moduleIndex}.description`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input {...field} className="bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <div className="col-span-1">
                                  <FormField
                                    control={form.control}
                                    name={`modules.${moduleIndex}.credits`}
                                    render={({ field }) => (
                                      <FormItem>
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
                                </div>

                                <div className="col-span-2">
                                  <FormField
                                    control={form.control}
                                    name={`modules.${moduleIndex}.costPerCredit`}
                                    render={({ field }) => (
                                      <FormItem>
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

                                <div className="col-span-2">
                                  <FormField
                                    control={form.control}
                                    name={`modules.${moduleIndex}.teacherIds`}
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

                                <div className="col-span-1 flex justify-end">
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

                                              <FormField
                                                control={form.control}
                                                name={`intakes.${intakeIndex}.groups.${groupIndex}.moduleIds`}
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormLabel>Group Modules</FormLabel>
                                                    <FormControl>
                                                      <select
                                                        multiple
                                                        {...field}
                                                        className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                                                        value={field.value}
                                                        onChange={(e) => {
                                                          const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                                                          field.onChange(selectedOptions);
                                                        }}
                                                      >
                                                        {form.watch('modules')?.map((module, idx) => (
                                                          <option key={idx} value={idx}>
                                                            {module.name} ({module.credits} credits - ${module.costPerCredit}/credit)
                                                          </option>
                                                        ))}
                                                      </select>
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
                  variant="outline"
                  onClick={() => navigate("/programs")}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEdit ? "Update Program" : "Create Program"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}