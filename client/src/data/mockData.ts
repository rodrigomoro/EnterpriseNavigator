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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  isDirector: boolean;
  avatar: string;
  email: string;
  phone: string;
  bio: string;
  projects: string[];
  reportsTo?: string;
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    role: 'Founder & CEO',
    department: 'Executive',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    email: 'emily.johnson@company.com',
    phone: '+1 (555) 0101',
    bio: 'Founded the company in 2020. Previously led education technology initiatives at major enterprises.',
    projects: ['Strategic Planning', 'Company Vision 2025']
  },
  {
    id: '2',
    name: 'Andrea Leeland',
    role: 'CFO',
    department: 'Finance',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea',
    email: 'andrea.leeland@company.com',
    phone: '+1 (555) 0102',
    bio: 'Over 15 years of experience in financial management and strategic planning.',
    projects: ['Budget Planning', 'Financial Strategy'],
    reportsTo: '1'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    role: 'CTO',
    department: 'Technology',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    email: 'sarah.williams@company.com',
    phone: '+1 (555) 0103',
    bio: 'Tech leader with a focus on educational software and scalable systems.',
    projects: ['Tech Infrastructure', 'Digital Transformation'],
    reportsTo: '1'
  },
  {
    id: '4',
    name: 'Jessica Martinez',
    role: 'HR Director',
    department: 'Human Resources',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    email: 'jessica.martinez@company.com',
    phone: '+1 (555) 0104',
    bio: 'Specialized in organizational development and talent management.',
    projects: ['Employee Development', 'Culture Initiative'],
    reportsTo: '1'
  },
  {
    id: '5',
    name: 'Ethan Wilson',
    role: 'VP of Sales',
    department: 'Sales',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan',
    email: 'ethan.wilson@company.com',
    phone: '+1 (555) 0105',
    bio: 'Driving sales strategy and team development across regions.',
    projects: ['Sales Strategy', 'Market Expansion'],
    reportsTo: '1'
  },
  {
    id: '6',
    name: 'Mikkel Johanson',
    role: 'Account Manager',
    department: 'Sales',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikkel',
    email: 'mikkel.johanson@company.com',
    phone: '+1 (555) 0106',
    bio: 'Managing key client relationships and account growth.',
    projects: ['Client Success', 'Account Planning'],
    reportsTo: '5'
  },
  {
    id: '7',
    name: 'Frank Miles',
    role: 'Sales Manager',
    department: 'Sales',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
    email: 'frank.miles@company.com',
    phone: '+1 (555) 0107',
    bio: 'Leading the regional sales team and strategy implementation.',
    projects: ['Team Development', 'Sales Operations'],
    reportsTo: '5'
  },
  {
    id: '8',
    name: 'Dan Smith',
    role: 'Account Director',
    department: 'Sales',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dan',
    email: 'dan.smith@company.com',
    phone: '+1 (555) 0108',
    bio: 'Overseeing strategic accounts and partnership development.',
    projects: ['Strategic Accounts', 'Partnership Growth'],
    reportsTo: '5'
  },
  {
    id: '9',
    name: 'James McFin',
    role: 'Sales Analyst',
    department: 'Sales',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    email: 'james.mcfin@company.com',
    phone: '+1 (555) 0109',
    bio: 'Analyzing sales data and providing strategic insights.',
    projects: ['Sales Analytics', 'Performance Tracking'],
    reportsTo: '7'
  },
  {
    id: '10',
    name: 'Adele Pole',
    role: 'SDR',
    department: 'Sales',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adele',
    email: 'adele.pole@company.com',
    phone: '+1 (555) 0110',
    bio: 'Developing new business opportunities and lead generation.',
    projects: ['Lead Generation', 'Market Research'],
    reportsTo: '7'
  },
  {
    id: '11',
    name: 'Beth Moore',
    role: 'Inside Sales Rep',
    department: 'Sales',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beth',
    email: 'beth.moore@company.com',
    phone: '+1 (555) 0111',
    bio: 'Managing inside sales operations and customer relationships.',
    projects: ['Inside Sales', 'Customer Success'],
    reportsTo: '7'
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
    name: 'Data Analytics 2025',
    progress: 65,
    team: mockTeamMembers.slice(0, 2),
    director: mockTeamMembers[0],
    studentCount: 45,
    students: mockStudents
  },
  {
    id: '2',
    name: 'Cloud Computing',
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

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface CompetencyLevel {
  id: string;
  name: string;
  value: number;
  color: string;
}

export const mockSkills: Skill[] = [
  {
    id: 'skill-1',
    name: 'Project Management',
    category: 'Management',
    description: 'Ability to plan, execute and deliver projects effectively'
  },
  {
    id: 'skill-2',
    name: 'JavaScript',
    category: 'Technical',
    description: 'Proficiency in JavaScript programming language'
  },
  {
    id: 'skill-3',
    name: 'Communication',
    category: 'Soft Skills',
    description: 'Effective verbal and written communication'
  },
  {
    id: 'skill-4',
    name: 'Leadership',
    category: 'Management',
    description: 'Ability to lead and motivate teams'
  },
  {
    id: 'skill-5',
    name: 'Problem Solving',
    category: 'Technical',
    description: 'Analytical and problem-solving abilities'
  }
];

export const competencyLevels: CompetencyLevel[] = [
  {
    id: 'level-1',
    name: 'Novice',
    value: 1,
    color: 'bg-red-200 hover:bg-red-300'
  },
  {
    id: 'level-2',
    name: 'Advanced Beginner',
    value: 2,
    color: 'bg-orange-200 hover:bg-orange-300'
  },
  {
    id: 'level-3',
    name: 'Competent',
    value: 3,
    color: 'bg-yellow-200 hover:bg-yellow-300'
  },
  {
    id: 'level-4',
    name: 'Proficient',
    value: 4,
    color: 'bg-green-200 hover:bg-green-300'
  },
  {
    id: 'level-5',
    name: 'Expert',
    value: 5,
    color: 'bg-emerald-200 hover:bg-emerald-300'
  }
];