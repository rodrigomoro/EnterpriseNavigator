import { type Language } from '@/lib/i18n/LanguageContext';

export type LocalizedStrings = Record<Language, string>;

export interface Skill {
  id: string;
  name: LocalizedStrings;
  category: LocalizedStrings;
  description: LocalizedStrings;
}

export interface CompetencyLevel {
  id: string;
  name: LocalizedStrings;
  value: number;
  color: string;
}

export interface Student {
  id: string;
  name: string;
  scores: {
    mathematics: number;
    science: number;
    programming: number;
  };
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: LocalizedStrings;
  department: LocalizedStrings;
  isDirector: boolean;
  avatar: string;
  email: string;
  phone: string;
  bio: LocalizedStrings;
  projects: string[];
  reportsTo?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: {
    name: LocalizedStrings;
    taxId: string;
    address: LocalizedStrings;
  };
  issueDate: string;
  dueDate: string;
  items: {
    description: LocalizedStrings;
    quantity: number;
    price: number;
    total: number;
  }[];
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  subtotal: number;
  tax: number;
  total: number;
  approvalFlow: {
    currentStep: number;
    steps: {
      id: number;
      name: string;
      status: 'pending' | 'approved' | 'rejected';
      approver: {
        id: string;
        name: string;
        role: string;
      };
      date?: string;
      comments?: string;
    }[];
  };
}
