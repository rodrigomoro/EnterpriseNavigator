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
import { Plus, Upload, Download, Mail, Search } from 'lucide-react';
import PeoplePicker from '@/components/ui/PeoplePicker';
import { mockStudents, mockModules } from '@/data/mockPreRegistrationData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuickPersonFormDialog } from './QuickPersonFormDialog';
import { useToast } from '@/hooks/use-toast';

const preRegistrationSchema = z.object({
  studentId: z.string().min(1, 'Please select a student'),
  moduleIds: z.array(z.string()).min(1, 'Please select at least one module'),
  notes: z.string().optional(),
  documents: z.array(z.object({
    type: z.string(),
    file: z.any(),
    description: z.string().optional(),
  })).optional(),
});

type PreRegistrationFormValues = z.infer<typeof preRegistrationSchema>;

interface PreRegistrationFormDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onPreRegister: (data: PreRegistrationFormValues & { timestamp: string }) => void;
  trigger?: React.ReactNode;
  initialData?: PreRegistrationFormValues;
  mode?: 'create' | 'edit';
}

// Remove duplicates based on student ID
const uniqueStudents = Array.from(new Map(mockStudents.map(student => [student.id, student])).values());

export function PreRegistrationFormDialog({ 
  open,
  onOpenChange,
  onPreRegister,
  trigger,
  initialData,
  mode = 'create'
}: PreRegistrationFormDialogProps) {
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [students, setStudents] = useState(uniqueStudents);
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [moduleSearch, setModuleSearch] = useState('');

  // Filter modules based on search query
  const filteredModules = mockModules.filter(module => {
    const searchLower = moduleSearch.toLowerCase();
    return (
      module.code?.toLowerCase().includes(searchLower) ||
      module.name?.toLowerCase().includes(searchLower)
    );
  });

  const form = useForm<PreRegistrationFormValues>({
    resolver: zodResolver(preRegistrationSchema),
    defaultValues: initialData || {
      studentId: '',
      moduleIds: [],
      notes: '',
      documents: [],
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
      setFiles([]);
    }
  }, [open, form]);

  const onSubmit = async (data: PreRegistrationFormValues) => {
    onPreRegister({
      ...data,
      timestamp: new Date().toISOString(),
    });
  };

  const handleQuickAdd = async (data: { name: string; email: string; phone: string }) => {
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

  const downloadPDF = () => {
    // TODO: Implement PDF generation and download
    toast({
      title: "PDF Download",
      description: "Pre-registration form has been downloaded.",
    });
  };

  const sendEmail = () => {
    // TODO: Implement email sending
    toast({
      title: "Email Sent",
      description: "Pre-registration form has been sent via email.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...newFiles]);
    form.setValue('documents', [...files, ...newFiles.map(file => ({type: file.type, file: file, description: ''}))])
  };

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'New Pre-registration' : 'Edit Pre-registration'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Create a new pre-registration for a student. This will reserve their place in the selected modules.'
              : 'Update the pre-registration details.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[600px] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
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
                  <div className="space-y-2">
                    <Label>Required Documents</Label>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label>Signed Pre-registration Form</Label>
                        <Input type="file" onChange={handleFileUpload} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Supporting Documents</Label>
                        <Input type="file" multiple onChange={handleFileUpload} />
                        <p className="text-sm text-muted-foreground">
                          Upload any additional documents (e.g., large family card, academic records)
                        </p>
                      </div>
                      {files.length > 0 && (
                        <div className="mt-2">
                          <Label>Uploaded Files:</Label>
                          <ul className="mt-1 space-y-1">
                            {files.map((file, index) => (
                              <li key={index} className="text-sm flex items-center justify-between">
                                <span className="truncate">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => downloadFile(file)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="moduleIds"
                    render={() => (
                      <FormItem>
                        <FormLabel>Modules</FormLabel>
                        <div className="space-y-2">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search modules by code or name..."
                              className="pl-8"
                              value={moduleSearch}
                              onChange={(e) => setModuleSearch(e.target.value)}
                            />
                          </div>
                          <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                            <div className="space-y-2">
                              {filteredModules.map((module) => (
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
                                    <span className="font-mono">{module?.code}</span> - {module?.name}
                                    <span className="ml-2 text-xs text-muted-foreground">
                                      ({module?.credits} credits)
                                    </span>
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2 pt-6">
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={downloadPDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button type="button" variant="outline" onClick={sendEmail}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send via Email
                  </Button>
                </div>
                <Button type="submit">
                  {mode === 'create' ? 'Create Pre-registration' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>

      <QuickPersonFormDialog
        open={quickAddOpen}
        onOpenChange={setQuickAddOpen}
        onSubmit={handleQuickAdd}
      />
    </Dialog>
  );
}