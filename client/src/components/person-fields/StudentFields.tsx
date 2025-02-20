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

export const StudentFields = ({ form }: FieldProps) => {
  const programOptions = mockPrograms.map(program => ({
    id: program.id,
    name: program.name,
    role: 'Program',
  }));

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Enrollment Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} className="bg-white" />
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
            <FormLabel>Enrolled Programs</FormLabel>
            <FormControl>
              <PeoplePicker
                people={programOptions}
                selectedIds={field.value || []}
                onChange={field.onChange}
                placeholder="Select programs to enroll in"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
