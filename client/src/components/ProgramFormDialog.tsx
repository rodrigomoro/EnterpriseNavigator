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
import { Slider } from "@/components/ui/slider";
import { mockTeamMembers, mockModuleCatalog } from "@/data/mockData";
import PeoplePicker from "@/components/ui/PeoplePicker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const moduleConfigSchema = z.object({
  moduleId: z.string(),
  syncHours: z.number().min(0, "Synchronous hours must be 0 or greater"),
  asyncHours: z.number().min(0, "Asynchronous hours must be 0 or greater"),
  credits: z.number().min(0, "Credits must be 0 or greater"),
});

const formSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  description: z.string(),
  progress: z.number().min(0).max(100),
  directorIds: z.array(z.string()).min(1, "At least one director is required"),
  teacherIds: z.array(z.string()).min(1, "At least one teacher is required"),
  studentIds: z.array(z.string()),
  moduleConfigs: z.array(moduleConfigSchema),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormValues) => void;
  initialData?: Partial<FormValues>;
  mode: 'create' | 'edit';
}

export default function ProgramFormDialog({ open, onOpenChange, onSubmit, initialData, mode }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      progress: initialData?.progress ?? 0,
      directorIds: initialData?.directorIds ?? [],
      teacherIds: initialData?.teacherIds ?? [],
      studentIds: initialData?.studentIds ?? [],
      moduleConfigs: initialData?.moduleConfigs ?? 
        mockModuleCatalog.map(module => ({
          moduleId: module.id,
          syncHours: 0,
          asyncHours: 0,
          credits: 0,
        })),
    },
  });

  const directors = mockTeamMembers.filter(member => member.role === 'Director');
  const teachers = mockTeamMembers.filter(member => member.role === 'Teacher');
  const students = mockTeamMembers.filter(member => member.role === 'Student');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create Program' : 'Edit Program'}</DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Add a new program to your organization.'
              : 'Update the program details.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1">
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
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
                        <FormItem className="bg-white p-4 rounded-lg border">
                          <FormLabel>Progress (%)</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Slider
                                min={0}
                                max={100}
                                step={1}
                                value={[field.value]}
                                onValueChange={([value]) => field.onChange(value)}
                                className="flex-1"
                              />
                              <span className="text-sm font-medium w-12 text-right">{field.value}%</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border space-y-4">
                      <FormField
                        control={form.control}
                        name="directorIds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Directors</FormLabel>
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
                            <FormLabel>Teachers</FormLabel>
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

                      <FormField
                        control={form.control}
                        name="studentIds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Students</FormLabel>
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
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Module Configuration</h3>
                  <div className="space-y-4">
                    {mockModuleCatalog.map((module, index) => (
                      <Card key={module.id} className="p-4">
                        <h4 className="font-medium mb-4">{module.name}</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`moduleConfigs.${index}.syncHours`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Synchronous Hours</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="0"
                                    {...field}
                                    onChange={e => field.onChange(Number(e.target.value))}
                                    className="bg-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`moduleConfigs.${index}.asyncHours`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Asynchronous Hours</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="0"
                                    {...field}
                                    onChange={e => field.onChange(Number(e.target.value))}
                                    className="bg-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`moduleConfigs.${index}.credits`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Credits</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="0"
                                    {...field}
                                    onChange={e => field.onChange(Number(e.target.value))}
                                    className="bg-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="px-6 py-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {mode === 'create' ? 'Create Program' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}