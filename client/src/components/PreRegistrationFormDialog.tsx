import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus } from 'lucide-react';
import PeoplePicker from '@/components/ui/PeoplePicker';
import { mockStudents, mockModules } from '@/data/mockPreRegistrationData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuickPersonFormDialog } from './QuickPersonFormDialog';
import { useToast } from '@/hooks/use-toast';

const preRegistrationSchema = z.object({
  studentId: z.string().min(1, 'Please select a student'),
  moduleIds: z.array(z.string()).min(1, 'Please select at least one module'),
  notes: z.string().optional(),
});

type PreRegistrationFormValues = z.infer<typeof preRegistrationSchema>;

interface PreRegistrationFormDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onPreRegister: (data: PreRegistrationFormValues & { timestamp: string }) => void;
  trigger?: React.ReactNode;
}

// Remove duplicates based on student ID
const uniqueStudents = Array.from(new Map(mockStudents.map(student => [student.id, student])).values());

export function PreRegistrationFormDialog({ 
  open,
  onOpenChange,
  onPreRegister,
  trigger 
}: PreRegistrationFormDialogProps) {
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [students, setStudents] = useState(uniqueStudents);
  const { toast } = useToast();

  const form = useForm<PreRegistrationFormValues>({
    resolver: zodResolver(preRegistrationSchema),
    defaultValues: {
      studentId: '',
      moduleIds: [],
      notes: '',
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const onSubmit = async (data: PreRegistrationFormValues) => {
    onPreRegister({
      ...data,
      timestamp: new Date().toISOString(),
    });
  };

  const handleQuickAdd = async (data: { name: string; email: string; phone: string }) => {
    // In a real application, this would make an API call to create the person
    const newStudent = {
      id: `temp-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'Student',
      isStudent: true,
    };

    setStudents(prev => [...prev, newStudent]);
    form.setValue('studentId', newStudent.id);
    setQuickAddOpen(false);

    toast({
      title: "Student Added",
      description: "New student has been added successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            New Pre-registration
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Pre-registration</DialogTitle>
          <DialogDescription>
            Create a new pre-registration for a student. This will reserve their place in the selected modules.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <div className="space-y-2">
                    <FormControl>
                      <PeoplePicker
                        people={students}
                        selectedIds={field.value ? [field.value] : []}
                        onChange={(ids) => field.onChange(ids[0] || '')}
                        placeholder="Select a student"
                        multiple={false}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setQuickAddOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Student
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="moduleIds"
              render={() => (
                <FormItem>
                  <FormLabel>Modules</FormLabel>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <div className="space-y-2">
                      {mockModules.map((module) => (
                        <div key={module?.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`module-${module?.id}`}
                            onCheckedChange={(checked) => {
                              const currentModules = form.getValues('moduleIds');
                              if (checked) {
                                if (module) {
                                  form.setValue('moduleIds', [...currentModules, module.id]);
                                }
                              } else {
                                form.setValue(
                                  'moduleIds',
                                  currentModules.filter((id) => id !== module?.id)
                                );
                              }
                            }}
                          />
                          <Label htmlFor={`module-${module?.id}`} className="flex-1">
                            {module?.name}
                            <span className="ml-2 text-xs text-muted-foreground">
                              ({module?.credits} credits)
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Add any additional notes" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Create Pre-registration</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>

      <QuickPersonFormDialog
        open={quickAddOpen}
        onOpenChange={setQuickAddOpen}
        onSubmit={handleQuickAdd}
      />
    </Dialog>
  );
}