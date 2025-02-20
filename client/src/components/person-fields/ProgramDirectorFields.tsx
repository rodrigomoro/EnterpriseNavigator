import { FieldProps } from "./types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import PeoplePicker from "@/components/ui/PeoplePicker";
import { mockPrograms } from "@/data/mockPrograms";

export const ProgramDirectorFields = ({ form }: FieldProps) => {
  const programOptions = mockPrograms.map(program => ({
    id: program.id,
    name: program.name,
    role: 'Program',
  }));

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="programIds"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Managed Programs</FormLabel>
            <FormControl>
              <PeoplePicker
                people={programOptions}
                selectedIds={field.value || []}
                onChange={field.onChange}
                placeholder="Select programs to manage"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
