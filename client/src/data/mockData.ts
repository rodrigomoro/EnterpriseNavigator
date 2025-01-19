export const mockEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2024-04-08',
    time: '10:00 AM',
    priority: 'primary'
  },
  {
    id: '2',
    title: 'Project Review',
    date: '2024-04-08',
    time: '2:00 PM',
    priority: 'destructive'
  },
  {
    id: '3',
    title: 'Client Call',
    date: '2024-04-09',
    time: '11:30 AM',
    priority: 'orange'
  }
];

export const mockTeamMembers = [
  {
    id: '1',
    name: 'Dana R.',
    role: 'Project Manager',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dana'
  },
  {
    id: '2',
    name: 'Elon S.',
    role: 'Key Account Plann.',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elon'
  },
  {
    id: '3',
    name: 'Nancy W.',
    role: 'Account Manager',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nancy'
  },
  {
    id: '4',
    name: 'James M.',
    role: 'Digital Manager',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
  }
];

export const mockStudents = [
  {
    id: '1',
    name: 'John Smith',
    grade: '10th Grade',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: '2',
    name: 'Emily Brown',
    grade: '11th Grade',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    grade: '10th Grade',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
  },
  {
    id: '4',
    name: 'Sarah Davis',
    grade: '12th Grade',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  }
];

export const mockProjects = [
  {
    id: '1',
    name: 'Market Research 2024',
    progress: 65,
    team: mockTeamMembers.slice(0, 2),
    director: mockTeamMembers[0],
    studentCount: 45,
    students: mockStudents
  },
  {
    id: '2',
    name: 'SWOT Analysis',
    progress: 40,
    team: mockTeamMembers.slice(1, 3),
    director: mockTeamMembers[1],
    studentCount: 32,
    students: mockStudents.slice(1, 3)
  },
  {
    id: '3',
    name: 'Design Research',
    progress: 85,
    team: mockTeamMembers.slice(2, 4),
    director: mockTeamMembers[2],
    studentCount: 28,
    students: mockStudents.slice(2)
  }
];

export const mockTasks = [
  {
    id: '1',
    title: 'Finish monthly reporting',
    dueDate: 'Today',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    title: 'Report signing',
    dueDate: 'Today',
    priority: 'medium',
    completed: false
  },
  {
    id: '3',
    title: 'Market overview keynote',
    dueDate: 'Today',
    priority: 'high',
    completed: false
  }
];

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: {
    name: string;
    taxId: string;
    address: string;
  };
  issueDate: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  totalAmount: number;
  status: 'draft' | 'signed' | 'submitted' | 'accepted' | 'rejected';
  signatureInfo: {
    signedAt?: string;
    signedBy?: string;
  };
  submissionInfo: {
    submittedAt?: string;
    verificationId?: string;
    response?: {
      status: 'pending' | 'accepted' | 'rejected';
      message?: string;
    };
  };
  qrCode: string;
  pdfUrl?: string;
}

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    customer: {
      name: 'Tech Education S.L.',
      taxId: 'B12345678',
      address: 'Calle Principal 123, 28001 Madrid'
    },
    issueDate: '2024-01-15',
    dueDate: '2024-02-14',
    items: [
      {
        description: 'Educational Software License - Annual',
        quantity: 1,
        price: 1200,
        total: 1200
      },
      {
        description: 'Training Sessions',
        quantity: 5,
        price: 300,
        total: 1500
      }
    ],
    totalAmount: 2700,
    status: 'accepted',
    signatureInfo: {
      signedAt: '2024-01-15T10:30:00Z',
      signedBy: 'Dana R.'
    },
    submissionInfo: {
      submittedAt: '2024-01-15T10:35:00Z',
      verificationId: 'VF-2024-001-ABC',
      response: {
        status: 'accepted',
        message: 'Invoice verified and accepted'
      }
    },
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=INV-2024-001',
    pdfUrl: '/invoices/INV-2024-001.pdf'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    customer: {
      name: 'Educational Services Company',
      taxId: 'B87654321',
      address: 'Avenida Secundaria 456, 08001 Barcelona'
    },
    issueDate: '2024-01-18',
    dueDate: '2024-02-17',
    items: [
      {
        description: 'Curriculum Development Services',
        quantity: 1,
        price: 3500,
        total: 3500
      }
    ],
    totalAmount: 3500,
    status: 'submitted',
    signatureInfo: {
      signedAt: '2024-01-18T14:20:00Z',
      signedBy: 'Dana R.'
    },
    submissionInfo: {
      submittedAt: '2024-01-18T14:25:00Z',
      verificationId: 'VF-2024-002-DEF',
      response: {
        status: 'pending'
      }
    },
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=INV-2024-002'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    customer: {
      name: 'Learning Center Institute',
      taxId: 'B98765432',
      address: 'Plaza Principal 789, 46001 Valencia'
    },
    issueDate: '2024-01-19',
    dueDate: '2024-02-18',
    items: [
      {
        description: 'Student Management System - Monthly Fee',
        quantity: 1,
        price: 800,
        total: 800
      },
      {
        description: 'Setup Service',
        quantity: 1,
        price: 500,
        total: 500
      }
    ],
    totalAmount: 1300,
    status: 'draft',
    signatureInfo: {},
    submissionInfo: {},
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=INV-2024-003'
  }
];