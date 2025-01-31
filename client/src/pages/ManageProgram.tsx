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
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, X, ArrowLeft, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define module schema with new fields
const moduleSchema = z.object({
  name: z.string().min(1, "Module name is required"),
  description: z.string(),
  competencies: z.string().min(1, "Competencies are required"),
  tools: z.string().min(1, "Tools are required"),
  syllabus: z.string().min(1, "Syllabus is required"),
  hours: z.number().min(1, "Hours must be at least 1"),
  credits: z.number().min(1, "Credits must be at least 1"),
  costPerCredit: z.number().min(0, "Cost per credit must be non-negative"),
  teacherIds: z.array(z.string()).min(1, "At least one teacher is required"),
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
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Module Details</DialogTitle>
      <DialogDescription>
        View and edit detailed information about this module
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <FormField
        control={form.control}
        name={`modules.${moduleIndex}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <textarea
                {...field}
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
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
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
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
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
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
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[100px]"
                placeholder="Module syllabus"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </DialogContent>
);

const ModulesSection: React.FC<ModulesSectionProps> = ({ form, addModule, removeModule, teachers }) => (
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
              <div className="col-span-2">Hours</div>
              <div className="col-span-2">Credits</div>
              <div className="col-span-2">Cost/Credit</div>
              <div className="col-span-2">Teachers</div>
              <div className="col-span-1">Actions</div>
            </div>

            <ScrollArea className="h-[400px]">
              <div className="divide-y">
                {form.watch("modules")?.map((module: ModuleType, moduleIndex: number) => (
                  <div key={moduleIndex} className="p-3 grid grid-cols-12 gap-4 items-center hover:bg-muted/50">
                    <div className="col-span-3">
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
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                          teachers={teachers}
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

const formSchema = z.object({
  // Basic Information
  name: z.string().min(1, "Program name is required"),
  area: z.string().min(1, "Area is required"),
  type: z.string().min(1, "Program type is required"),
  durationHours: z.number().min(1, "Duration must be at least 1 hour"),
  modality: z.string().min(1, "Modality is required"),
  schedule: z.object({
    days: z.array(z.string()),
    startTime: z.string(),
    endTime: z.string(),
  }),
  directorIds: z.array(z.string()).min(1, "At least one director is required"),
  description: z.string().min(1, "Description is required"),
  prerequisites: z.string(),
  targetAudience: z.string().min(1, "Target audience is required"),
  objectives: z.string().min(1, "Objectives are required"),
  whyChoose: z.string(),
  careerOpportunities: z.string(),
  certifications: z.string(),
  modules: z.array(moduleSchema).min(1, "At least one module is required"),
  intakes: z.array(z.object({
    groups: z.array(z.object({
      name: z.string(),
      capacity: z.number(),
      costPerStudent: z.number(),
      teacherIds: z.array(z.string()),
      moduleIds: z.array(z.number()),
    }))
  }))
});

type FormValues = z.infer<typeof formSchema>;

export default function ManageProgram() {
  const [teachers] = useState(mockTeamMembers);
  const { isEdit } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      area: "",
      type: "",
      durationHours: 0,
      modality: "",
      schedule: {
        days: [],
        startTime: "",
        endTime: "",
      },
      directorIds: [],
      description: "",
      prerequisites: "",
      targetAudience: "",
      objectives: "",
      whyChoose: "",
      careerOpportunities: "",
      certifications: "",
      modules: [{
        name: "",
        description: "",
        competencies: "",
        tools: "",
        syllabus: "",
        hours: 0,
        credits: 0,
        costPerCredit: 0,
        teacherIds: [],
      }],
      intakes: [{groups: []}]
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
        teacherIds: []
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
    form.setValue("intakes", [...form.getValues("intakes"), { groups: [] }]);
  };
  const removeIntake = (index) => {
    const intakes = form.getValues("intakes");
    form.setValue("intakes", intakes.filter((_, i) => i !== index));
  };
  const addGroup = (intakeIndex) => {
    const intakes = form.getValues("intakes");
    intakes[intakeIndex].groups.push({
      name: "",
      capacity: 0,
      costPerStudent: 0,
      teacherIds: [],
      moduleIds: [],
    });
    form.setValue("intakes", intakes);
  };
  const removeGroup = (intakeIndex, groupIndex) => {
    const intakes = form.getValues("intakes");
    intakes[intakeIndex].groups = intakes[intakeIndex].groups.filter(
      (_, i) => i !== groupIndex
    );
    form.setValue("intakes", intakes);
  };


  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="container p-6 max-w-[1200px]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              {isEdit ? "Edit Program" : "Create Program"}
            </h1>
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
                <CardContent>
                  <FormSection title="Program Details">
                    <div className="grid grid-cols-2 gap-6">
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
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <textarea
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[200px]"
                                placeholder="Enter program description"
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

              <Card>
                <CardContent>
                  <FormSection title="Program Intakes">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Manage Intakes</h3>
                        <Button type="button" onClick={addIntake}>
                          Add Intake
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {(form.watch("intakes") || []).map((intake, intakeIndex) => (
                          <Card key={intakeIndex}>
                            <CardContent className="p-4 relative">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => removeIntake(intakeIndex)}
                              >
                                <X className="h-4 w-4" />
                              </Button>

                              <div className="space-y-4">
                                <Button type="button" onClick={() => addGroup(intakeIndex)}>
                                  Add Group
                                </Button>
                                <div className="space-y-4">
                                  {(form.watch(`intakes.${intakeIndex}.groups`) || []).map(
                                    (group, groupIndex) => (
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
                                                        const selectedOptions = Array.from(
                                                          e.target.selectedOptions
                                                        ).map((option) => option.value);
                                                        field.onChange(selectedOptions);
                                                      }}
                                                    >
                                                      {form.watch("modules")?.map((module, idx) => (
                                                        <option key={idx} value={idx}>
                                                          {module.name} ({module.credits} credits - ${
                                                            module.costPerCredit
                                                          }/credit)
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
                                    )
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </FormSection>
                </CardContent>
              </Card>

              <ModulesSection
                form={form}
                addModule={addModule}
                removeModule={removeModule}
                teachers={teachers}
              />

              <Card>
                <CardContent className="p-6">
                  <FormSection title="Career & Certifications">
                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="objectives"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Objectives/Training</FormLabel>
                            <FormControl>
                              <textarea
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[200px]"
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
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[200px]"
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
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[200px]"
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
                                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm min-h-[200px]"
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