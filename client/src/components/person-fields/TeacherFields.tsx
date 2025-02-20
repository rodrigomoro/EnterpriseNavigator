import { FieldProps } from "./types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PeoplePicker from "@/components/ui/PeoplePicker";
import { mockPrograms } from "@/data/mockPrograms";

export const TeacherFields = ({ form }: FieldProps) => {
  const programOptions = mockPrograms.map(program => ({
    id: program.id,
    name: program.name,
    role: 'Program',
  }));

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="specializations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Specializations</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter specializations (comma-separated)"
                {...field}
                onChange={e => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                value={(field.value || []).join(', ')}
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="programIds"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Teaching Programs</FormLabel>
            <FormControl>
              <PeoplePicker
                people={programOptions}
                selectedIds={field.value || []}
                onChange={field.onChange}
                placeholder="Select programs to teach"
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
            <FormLabel>Certifications</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter certifications (comma-separated)"
                {...field}
                onChange={e => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                value={(field.value || []).join(', ')}
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
