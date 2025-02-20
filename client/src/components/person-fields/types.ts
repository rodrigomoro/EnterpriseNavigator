import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const personFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  status: z.string().min(1, "Status is required"),
  location: z.string().min(1, "Location is required"),
  supervisorId: z.string().optional(),
  bio: z.string().optional(),
  startDate: z.string().optional(),
  programIds: z.array(z.string()).optional(),  // For enrollment or teaching assignments
  specializations: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
});

export type PersonFormValues = z.infer<typeof personFormSchema>;

export interface FieldProps {
  form: UseFormReturn<PersonFormValues>;
}
