export const mockEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2025-01-08',
    time: '10:00 AM',
    priority: 'primary'
  },
  {
    id: '2',
    title: 'Project Review',
    date: '2025-01-08',
    time: '2:00 PM',
    priority: 'destructive'
  },
  {
    id: '3',
    title: 'Client Call',
    date: '2025-01-09',
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
    name: 'Market Research 2025',
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
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'signed' | 'submitted' | 'accepted';
  approvalWorkflow: {
    currentLevel: number;
    maxLevels: number;
    approvers: {
      level: number;
      role: string;
      status: 'pending' | 'approved' | 'rejected';
      userId?: string;
      timestamp?: string;
      comments?: string;
    }[];
  };
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
  auditTrail: {
    timestamp: string;
    action: 'created' | 'signed' | 'submitted' | 'verified' | 'status_changed' | 'approval_requested' | 'approved' | 'rejected';
    actor: string;
    details: string;
    level?: number;
  }[];
}

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    customer: {
      name: 'Tech Education S.L.',
      taxId: 'B12345678',
      address: 'Calle Principal 123, 28001 Madrid'
    },
    issueDate: '2025-01-15',
    dueDate: '2025-02-14',
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
    status: 'pending_approval',
    approvalWorkflow: {
      currentLevel: 1,
      maxLevels: 3,
      approvers: [
        {
          level: 1,
          role: 'Department Manager',
          status: 'pending'
        },
        {
          level: 2,
          role: 'Financial Controller',
          status: 'pending'
        },
        {
          level: 3,
          role: 'CFO',
          status: 'pending'
        }
      ]
    },
    signatureInfo: {},
    submissionInfo: {},
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-001',
    auditTrail: [
      {
        timestamp: '2025-01-15T10:00:00Z',
        action: 'created',
        actor: 'Dana R.',
        details: 'Invoice created'
      },
      {
        timestamp: '2025-01-15T10:30:00Z',
        action: 'approval_requested',
        actor: 'Dana R.',
        details: 'Approval requested from Department Manager',
        level: 1
      }
    ]
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-002',
    customer: {
      name: 'Educational Services Company',
      taxId: 'B87654321',
      address: 'Avenida Secundaria 456, 08001 Barcelona'
    },
    issueDate: '2025-01-18',
    dueDate: '2025-02-17',
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
    approvalWorkflow: {
      currentLevel: 3,
      maxLevels: 3,
      approvers: [
        {
          level: 1,
          role: 'Department Manager',
          status: 'approved',
          userId: 'DM123',
          timestamp: '2025-01-18T12:00:00Z',
          comments: 'Approved after budget review'
        },
        {
          level: 2,
          role: 'Financial Controller',
          status: 'approved',
          userId: 'FC456',
          timestamp: '2025-01-18T13:30:00Z',
          comments: 'Financial terms verified'
        },
        {
          level: 3,
          role: 'CFO',
          status: 'approved',
          userId: 'CFO789',
          timestamp: '2025-01-18T14:00:00Z',
          comments: 'Final approval granted'
        }
      ]
    },
    signatureInfo: {
      signedAt: '2025-01-18T14:20:00Z',
      signedBy: 'Dana R.'
    },
    submissionInfo: {
      submittedAt: '2025-01-18T14:25:00Z',
      verificationId: 'VF-2025-002-DEF',
      response: {
        status: 'pending'
      }
    },
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-002',
    auditTrail: [
      {
        timestamp: '2025-01-18T10:00:00Z',
        action: 'created',
        actor: 'Dana R.',
        details: 'Invoice created'
      },
      {
        timestamp: '2025-01-18T12:00:00Z',
        action: 'approved',
        actor: 'Department Manager',
        details: 'Level 1 approval granted',
        level: 1
      },
      {
        timestamp: '2025-01-18T13:30:00Z',
        action: 'approved',
        actor: 'Financial Controller',
        details: 'Level 2 approval granted',
        level: 2
      },
      {
        timestamp: '2025-01-18T14:00:00Z',
        action: 'approved',
        actor: 'CFO',
        details: 'Level 3 approval granted',
        level: 3
      },
      {
        timestamp: '2025-01-18T14:20:00Z',
        action: 'signed',
        actor: 'Dana R.',
        details: 'Digital signature applied'
      },
      {
        timestamp: '2025-01-18T14:25:00Z',
        action: 'submitted',
        actor: 'System',
        details: 'Submitted to VERIFACTU'
      }
    ]
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-003',
    customer: {
      name: 'Learning Center Institute',
      taxId: 'B98765432',
      address: 'Plaza Principal 789, 46001 Valencia'
    },
    issueDate: '2025-01-19',
    dueDate: '2025-02-18',
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
    status: 'rejected',
    approvalWorkflow: {
      currentLevel: 2,
      maxLevels: 3,
      approvers: [
        {
          level: 1,
          role: 'Department Manager',
          status: 'approved',
          userId: 'DM123',
          timestamp: '2025-01-19T11:00:00Z',
          comments: 'Initial approval granted'
        },
        {
          level: 2,
          role: 'Financial Controller',
          status: 'rejected',
          userId: 'FC456',
          timestamp: '2025-01-19T12:00:00Z',
          comments: 'Budget exceeded for this quarter'
        },
        {
          level: 3,
          role: 'CFO',
          status: 'pending'
        }
      ]
    },
    signatureInfo: {},
    submissionInfo: {},
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-003',
    auditTrail: [
      {
        timestamp: '2025-01-19T10:00:00Z',
        action: 'created',
        actor: 'Nancy W.',
        details: 'Invoice created'
      },
      {
        timestamp: '2025-01-19T11:00:00Z',
        action: 'approved',
        actor: 'Department Manager',
        details: 'Level 1 approval granted',
        level: 1
      },
      {
        timestamp: '2025-01-19T12:00:00Z',
        action: 'rejected',
        actor: 'Financial Controller',
        details: 'Level 2 approval rejected - Budget exceeded',
        level: 2
      }
    ]
  },
  {
    id: '4',
    invoiceNumber: 'INV-2025-004',
    customer: {
      name: 'Digital Learning Academy',
      taxId: 'B45678901',
      address: 'Avenida Principal 321, 41001 Sevilla'
    },
    issueDate: '2025-01-16',
    dueDate: '2025-02-15',
    items: [
      {
        description: 'Learning Management System - Annual License',
        quantity: 1,
        price: 4500,
        total: 4500
      },
      {
        description: 'Implementation Services',
        quantity: 1,
        price: 1500,
        total: 1500
      }
    ],
    totalAmount: 6000,
    status: 'accepted',
    approvalWorkflow: {
      currentLevel: 3,
      maxLevels: 3,
      approvers: [
        {
          level: 1,
          role: 'Department Manager',
          status: 'approved',
          userId: 'DM123',
          timestamp: '2025-01-16T11:00:00Z',
          comments: 'Approved - Strategic investment'
        },
        {
          level: 2,
          role: 'Financial Controller',
          status: 'approved',
          userId: 'FC456',
          timestamp: '2025-01-16T13:00:00Z',
          comments: 'Budget verified and approved'
        },
        {
          level: 3,
          role: 'CFO',
          status: 'approved',
          userId: 'CFO789',
          timestamp: '2025-01-16T14:30:00Z',
          comments: 'Final approval granted - High priority project'
        }
      ]
    },
    signatureInfo: {
      signedAt: '2025-01-16T15:00:00Z',
      signedBy: 'Dana R.'
    },
    submissionInfo: {
      submittedAt: '2025-01-16T15:05:00Z',
      verificationId: 'VF-2025-004-XYZ',
      response: {
        status: 'accepted',
        message: 'Invoice successfully verified and accepted by VERIFACTU'
      }
    },
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-004',
    auditTrail: [
      {
        timestamp: '2025-01-16T10:00:00Z',
        action: 'created',
        actor: 'Dana R.',
        details: 'Invoice created'
      },
      {
        timestamp: '2025-01-16T10:05:00Z',
        action: 'approval_requested',
        actor: 'Dana R.',
        details: 'Approval workflow initiated',
        level: 1
      },
      {
        timestamp: '2025-01-16T11:00:00Z',
        action: 'approved',
        actor: 'Department Manager',
        details: 'Level 1 approval granted',
        level: 1
      },
      {
        timestamp: '2025-01-16T13:00:00Z',
        action: 'approved',
        actor: 'Financial Controller',
        details: 'Level 2 approval granted',
        level: 2
      },
      {
        timestamp: '2025-01-16T14:30:00Z',
        action: 'approved',
        actor: 'CFO',
        details: 'Level 3 approval granted',
        level: 3
      },
      {
        timestamp: '2025-01-16T15:00:00Z',
        action: 'signed',
        actor: 'Dana R.',
        details: 'Digital signature applied'
      },
      {
        timestamp: '2025-01-16T15:05:00Z',
        action: 'submitted',
        actor: 'System',
        details: 'Submitted to VERIFACTU for verification'
      },
      {
        timestamp: '2025-01-16T15:10:00Z',
        action: 'verified',
        actor: 'VERIFACTU',
        details: 'Invoice verified and accepted by VERIFACTU'
      },
      {
        timestamp: '2025-01-16T15:11:00Z',
        action: 'status_changed',
        actor: 'System',
        details: 'Status updated to Accepted'
      }
    ]
  }
];