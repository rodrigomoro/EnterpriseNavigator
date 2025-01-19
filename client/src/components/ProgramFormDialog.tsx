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
import { mockTeamMembers } from "@/data/mockData";

const formSchema = z.object({
  name: z.string().min(1, "Program name is required"),
  description: z.string(),
  progress: z.number().min(0).max(100),
  directorIds: z.array(z.string()).min(1, "At least one director is required"),
  teacherIds: z.array(z.string()).min(1, "At least one teacher is required"),
  studentIds: z.array(z.string()),
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
    },
  });

  const directors = mockTeamMembers.filter(member => member.isDirector);
  const teachers = mockTeamMembers.filter(member => member.isTeacher);
  const students = mockTeamMembers.filter(member => member.isStudent);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create Program' : 'Edit Program'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Add a new program to your organization.' 
              : 'Update the program details.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 py-4">
              {/* Left Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter program name" {...field} />
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
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
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
                            onValueChange={([value]) => field.onChange(value)}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">{field.value}%</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column - People Assignments */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="directorIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Directors</FormLabel>
                      <FormControl>
                        <select
                          multiple
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
                          value={field.value}
                          onChange={(e) => {
                            const options = Array.from(e.target.selectedOptions);
                            field.onChange(options.map(option => option.value));
                          }}
                        >
                          {directors.map(director => (
                            <option key={director.id} value={director.id}>
                              {director.name} - {director.role}
                            </option>
                          ))}
                        </select>
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
                        <select
                          multiple
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
                          value={field.value}
                          onChange={(e) => {
                            const options = Array.from(e.target.selectedOptions);
                            field.onChange(options.map(option => option.value));
                          }}
                        >
                          {teachers.map(teacher => (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.name} - {teacher.role}
                            </option>
                          ))}
                        </select>
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
                        <select
                          multiple
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
                          value={field.value}
                          onChange={(e) => {
                            const options = Array.from(e.target.selectedOptions);
                            field.onChange(options.map(option => option.value));
                          }}
                        >
                          {students.map(student => (
                            <option key={student.id} value={student.id}>
                              {student.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
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