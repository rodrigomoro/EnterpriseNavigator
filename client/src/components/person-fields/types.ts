import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const personFormSchema = z.object({
  // Basic Information
  name: z.string().min(1, "Name is required"),
  displayName: z.string().optional(),
  givenName: z.string().optional(),
  middleName: z.string().optional(),
  surname: z.string().optional(),
  generation: z.string().optional(),
  title: z.string().optional(),
  nickName: z.string().optional(),

  // Role and Department
  role: z.string().min(1, "Role is required"),
  department: z.string().min(1, "Department is required"),
  status: z.string().min(1, "Status is required"),

  // Contact Information
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  mobilePhone: z.string().optional(),
  businessPhones: z.array(z.string()).optional(),
  homePhones: z.array(z.string()).optional(),
  imAddresses: z.array(z.string()).optional(),

  // Addresses
  location: z.string().min(1, "Location is required"),
  businessAddress: z.string().optional(),
  homeAddress: z.string().optional(),
  otherAddress: z.string().optional(),

  // Professional Details
  supervisorId: z.string().optional(),
  manager: z.string().optional(),
  assistantName: z.string().optional(),
  profession: z.string().optional(),
  officeLocation: z.string().optional(),
  companyName: z.string().optional(),
  businessHomePage: z.string().optional(),

  // Personal Details
  bio: z.string().optional(),
  birthday: z.string().optional(),
  personalNotes: z.string().optional(),
  spouseName: z.string().optional(),
  children: z.array(z.string()).optional(),

  // Academic Information
  startDate: z.string().optional(),
  programIds: z.array(z.string()).optional(),
  specializations: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),

  // System Fields
  fileAs: z.string().optional(),
  categories: z.array(z.string()).optional(),
  id: z.string().optional(),
  changeKey: z.string().optional(),
  createdDateTime: z.string().optional(),
  lastModifiedDateTime: z.string().optional(),
  parentFolderId: z.string().optional(),

  // Localization
  yomiCompanyName: z.string().optional(),
  yomiGivenName: z.string().optional(),
  yomiSurname: z.string().optional(),
});

export type PersonFormValues = z.infer<typeof personFormSchema>;

export interface FieldProps {
  form: UseFormReturn<PersonFormValues>;
}