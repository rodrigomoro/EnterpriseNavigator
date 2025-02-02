import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const preRegistrationSchema = z.object({
  studentId: z.string().min(1, 'Please select a student'),
  moduleIds: z.array(z.string()).min(1, 'Please select at least one module'),
  notes: z.string().optional(),
});

type PreRegistrationFormValues = z.infer<typeof preRegistrationSchema>;

interface PreRegistrationFormDialogProps {
  onPreRegister: (data: PreRegistrationFormValues) => void;
  trigger?: React.ReactNode;
}

export function PreRegistrationFormDialog({ 
  onPreRegister,
  trigger 
}: PreRegistrationFormDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<PreRegistrationFormValues>({
    resolver: zodResolver(preRegistrationSchema),
    defaultValues: {
      studentId: '',
      moduleIds: [],
      notes: '',
    },
  });

  const onSubmit = (data: PreRegistrationFormValues) => {
    onPreRegister(data);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">John Doe</SelectItem>
                      <SelectItem value="2">Jane Smith</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <div className="space-y-2">
                    {['1', '2', '3'].map((moduleId) => (
                      <div key={moduleId} className="flex items-center space-x-2">
                        <Checkbox
                          id={`module-${moduleId}`}
                          onCheckedChange={(checked) => {
                            const currentModules = form.getValues('moduleIds');
                            if (checked) {
                              form.setValue('moduleIds', [...currentModules, moduleId]);
                            } else {
                              form.setValue(
                                'moduleIds',
                                currentModules.filter((id) => id !== moduleId)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={`module-${moduleId}`}>
                          Module {moduleId}
                        </Label>
                      </div>
                    ))}
                  </div>
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
    </Dialog>
  );
}