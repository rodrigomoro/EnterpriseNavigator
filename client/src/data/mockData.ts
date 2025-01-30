import { z } from "zod";

// Base interfaces
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
  status: string;
  location: string;
}

export interface Credit {
  id: string;
  value: number;
  currency: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  credits: number;
  creditValue: Credit;
  teachers: TeamMember[];
  totalHours: number;
}

export interface Group {
  id: string;
  name: string;
  modules: Module[];
  teachers: TeamMember[];
  students: TeamMember[];
  maxCapacity: number;
  startDate: string;
  endDate: string;
  totalCost: number;
  totalRevenue: number;
}

export interface Intake {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  groups: Group[];
  status: 'upcoming' | 'ongoing' | 'completed';
  totalStudents: number;
}

export interface Program {
  id: string;
  name: string;
  description?: string;
  progress: number;
  intakes: Intake[];
  director: TeamMember;
  studentCount: number;
  students: TeamMember[];
  avgScore: number;
}

// Constants
export const locations = [
  'Madrid Campus',
  'Barcelona Campus',
  'Spain Remote',
  'Argentina Remote',
  'Mexico Remote',
  'Colombia Remote',
  'Chile Remote'
];

export const departments = [
  'Executive',
  'Technology',
  'Mathematics',
  'Science',
  'Computer Science',
  'Finance',
  'Human Resources',
  'Academic',
  'Admissions',
  'Marketing',
  'Sales'
];

export const statusOptions = {
  Student: [
    'Enrolled',
    'Graduated',
    'On Leave',
    'Withdrawn',
    'Academic Probation'
  ],
  Staff: [
    'Active',
    'On Leave',
    'Terminated',
    'Resigned',
    'Probationary',
    'Contractual'
  ],
  Location: [
    'Active',
    'Under Construction',
    'Closed',
    'Relocating'
  ]
};

// Initial team members (teachers and staff)
const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    role: 'Director',
    department: 'Academic',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    email: 'emily.johnson@company.com',
    phone: '+1 (555) 0101',
    bio: 'Program director with 10+ years of experience',
    projects: [],
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '2',
    name: 'David Anderson',
    role: 'Director',
    department: 'Academic',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    email: 'david.anderson@company.com',
    phone: '+1 (555) 0102',
    bio: 'Specialized in curriculum development',
    projects: [],
    status: 'Active',
    location: 'Barcelona Campus'
  },
  {
    id: '3',
    name: 'Maria Garcia',
    role: 'Teacher',
    department: 'Academic',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    email: 'maria.garcia@company.com',
    phone: '+1 (555) 0103',
    bio: 'Expert in programming fundamentals',
    projects: [],
    reportsTo: '1',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'Teacher',
    department: 'Academic',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    email: 'james.wilson@company.com',
    phone: '+1 (555) 0104',
    bio: 'Web development specialist',
    projects: [],
    reportsTo: '1',
    status: 'Active',
    location: 'Barcelona Campus'
  }
];

// Function to generate additional students
function generateStudents(startId: number, count: number): TeamMember[] {
  const studentDepartments = ['Computer Science', 'Mathematics', 'Science'];
  const names = [
    'John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava',
    'Benjamin', 'Isabella', 'Lucas', 'Mia', 'Henry', 'Charlotte', 'Alexander', 'Amelia'
  ];
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas'
  ];

  return Array.from({ length: count }, (_, i) => {
    const firstName = names[Math.floor(Math.random() * names.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department = studentDepartments[Math.floor(Math.random() * studentDepartments.length)];
    const status = statusOptions.Student[Math.floor(Math.random() * statusOptions.Student.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    return {
      id: `student-${startId + i}`,
      name: `${firstName} ${lastName}`,
      role: 'Student',
      department,
      isDirector: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      phone: `+1 (555) ${String(1000 + i).padStart(4, '0')}`,
      bio: `${department} student with focus on academic excellence`,
      projects: [],
      reportsTo: '1',
      status,
      location
    };
  });
}

// Generate students and combine with initial team members
const additionalStudents = generateStudents(5, 50);
export const mockTeamMembers: TeamMember[] = [...initialTeamMembers, ...additionalStudents];

// Create modules with assigned teachers
export const mockModules: Module[] = [
  {
    id: 'mod-1',
    name: 'Introduction to Programming',
    description: 'Foundation course in programming concepts',
    credits: 6,
    creditValue: {
      id: 'credit-1',
      value: 100,
      currency: 'EUR'
    },
    teachers: mockTeamMembers.filter(m => m.role === 'Teacher').slice(0, 2),
    totalHours: 48
  },
  {
    id: 'mod-2',
    name: 'Web Development Fundamentals',
    description: 'Basic web development technologies',
    credits: 4,
    creditValue: {
      id: 'credit-2',
      value: 100,
      currency: 'EUR'
    },
    teachers: mockTeamMembers.filter(m => m.role === 'Teacher').slice(1, 3),
    totalHours: 32
  },
  {
    id: 'mod-3',
    name: 'Data Structures and Algorithms',
    description: 'Advanced programming concepts',
    credits: 8,
    creditValue: {
      id: 'credit-3',
      value: 120,
      currency: 'EUR'
    },
    teachers: mockTeamMembers.filter(m => m.role === 'Teacher').slice(0, 3),
    totalHours: 64
  }
];

// Calculate financial metrics for groups
function calculateGroupFinancials(group: Omit<Group, 'totalCost' | 'totalRevenue'>) {
  const teacherCostPerHour = 50; // EUR per hour
  const totalHours = group.modules.reduce((acc, mod) => acc + mod.totalHours, 0);
  const teacherCosts = teacherCostPerHour * totalHours * group.teachers.length;

  const studentRevenue = group.students.reduce((acc, _) => {
    const moduleCosts = group.modules.reduce((moduleAcc, mod) =>
      moduleAcc + (mod.credits * mod.creditValue.value), 0);
    return acc + moduleCosts;
  }, 0);

  return {
    totalCost: teacherCosts,
    totalRevenue: studentRevenue
  };
}

// Create groups with assigned modules, teachers and students
export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Morning Group A',
    modules: [mockModules[0], mockModules[1]],
    teachers: mockTeamMembers.filter(m => m.role === 'Teacher').slice(0, 2),
    students: mockTeamMembers.filter(m => m.role === 'Student').slice(0, 20),
    maxCapacity: 25,
    startDate: '2025-02-01',
    endDate: '2025-06-30',
    ...calculateGroupFinancials({
      id: 'group-1',
      name: 'Morning Group A',
      modules: [mockModules[0], mockModules[1]],
      teachers: mockTeamMembers.filter(m => m.role === 'Teacher').slice(0, 2),
      students: mockTeamMembers.filter(m => m.role === 'Student').slice(0, 20),
      maxCapacity: 25,
      startDate: '2025-02-01',
      endDate: '2025-06-30'
    })
  },
  {
    id: 'group-2',
    name: 'Evening Group B',
    modules: [mockModules[0], mockModules[2]],
    teachers: mockTeamMembers.filter(m => m.role === 'Teacher').slice(1, 3),
    students: mockTeamMembers.filter(m => m.role === 'Student').slice(20, 35),
    maxCapacity: 25,
    startDate: '2025-02-01',
    endDate: '2025-06-30',
    ...calculateGroupFinancials({
      id: 'group-2',
      name: 'Evening Group B',
      modules: [mockModules[0], mockModules[2]],
      teachers: mockTeamMembers.filter(m => m.role === 'Teacher').slice(1, 3),
      students: mockTeamMembers.filter(m => m.role === 'Student').slice(20, 35),
      maxCapacity: 25,
      startDate: '2025-02-01',
      endDate: '2025-06-30'
    })
  }
];

// Create intakes with assigned groups
export const mockIntakes: Intake[] = [
  {
    id: 'intake-1',
    name: 'Spring 2025',
    startDate: '2025-02-01',
    endDate: '2025-06-30',
    groups: mockGroups,
    status: 'upcoming',
    totalStudents: mockGroups.reduce((acc, group) => acc + group.students.length, 0)
  },
  {
    id: 'intake-2',
    name: 'Fall 2025',
    startDate: '2025-09-01',
    endDate: '2026-01-31',
    groups: [],
    status: 'upcoming',
    totalStudents: 0
  }
];

// Create programs with assigned intakes and students
export const mockProjects: Program[] = [
  {
    id: '1',
    name: 'Computer Entrepreneurship Bachelor',
    description: 'Comprehensive program combining computer science and business skills',
    progress: 85,
    intakes: mockIntakes,
    director: mockTeamMembers[0],
    studentCount: mockIntakes.reduce((acc, intake) => acc + intake.totalStudents, 0),
    students: mockTeamMembers.filter(m => m.role === 'Student').slice(0, 45),
    avgScore: 88
  },
  {
    id: '2',
    name: 'Bootcamp en Diseño UX/UI',
    description: 'Intensive UX/UI design program',
    progress: 60,
    intakes: [mockIntakes[0]],
    director: mockTeamMembers[1],
    studentCount: mockIntakes[0].totalStudents,
    students: mockTeamMembers.filter(m => m.role === 'Student').slice(45, 75),
    avgScore: 92
  }
];


// Removed duplicate and unnecessary code blocks


//Student scores and other data
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

export const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'John Smith',
    scores: {
      mathematics: 85,
      science: 92,
      programming: 88
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: 'student-2',
    name: 'Emily Brown',
    scores: {
      mathematics: 95,
      science: 88,
      programming: 91
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
  },
  {
    id: 'student-3',
    name: 'Michael Johnson',
    scores: {
      mathematics: 78,
      science: 85,
      programming: 94
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
  },
  {
    id: 'student-4',
    name: 'Sarah Davis',
    scores: {
      mathematics: 92,
      science: 90,
      programming: 87
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: 'student-5',
    name: 'Alex Martinez',
    scores: {
      mathematics: 88,
      science: 91,
      programming: 85
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  },
  {
    id: 'student-6',
    name: 'Lisa Wang',
    scores: {
      mathematics: 94,
      science: 89,
      programming: 92
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
  },
  {
    id: 'student-7',
    name: 'Daniel Lee',
    scores: {
      mathematics: 91,
      science: 88,
      programming: 95
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel'
  },
  {
    id: 'student-8',
    name: 'Rachel Chen',
    scores: {
      mathematics: 89,
      science: 94,
      programming: 87
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel'
  },
  {
    id: 'student-9',
    name: 'Kevin Patel',
    scores: {
      mathematics: 83,
      science: 86,
      programming: 90
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin'
  },
  {
    id: 'student-10',
    name: 'Sofia Rodriguez',
    scores: {
      mathematics: 96,
      science: 92,
      programming: 89
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia'
  },
  {
    id: 'student-11',
    name: 'Ryan Thompson',
    scores: {
      mathematics: 87,
      science: 85,
      programming: 93
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan'
  },
  {
    id: 'student-12',
    name: 'Emma Wilson',
    scores: {
      mathematics: 92,
      science: 88,
      programming: 86
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
  },
  {
    id: 'student-13',
    name: 'Lucas Kim',
    scores: {
      mathematics: 90,
      science: 93,
      programming: 91
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas'
  },
  {
    id: 'student-14',
    name: 'Isabella Garcia',
    scores: {
      mathematics: 88,
      science: 91,
      programming: 94
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella'
  },
  {
    id: 'student-15',
    name: 'Nathan Wright',
    scores: {
      mathematics: 85,
      science: 89,
      programming: 92
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nathan'
  },
  {
    id: 'student-16',
    name: 'Olivia Chen',
    scores: {
      mathematics: 93,
      science: 90,
      programming: 88
    },
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia'
  }
];

const calculateAverageScore = (students: Student[]) => {
  const totalScores = students.reduce((acc, student) => {
    const studentAvg = (student.scores.mathematics + student.scores.science + student.scores.programming) / 3;
    return acc + studentAvg;
  }, 0);
  return Math.round(totalScores / students.length);
};


//Task Data
export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export const mockTasks: Task[] = [
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

//Invoice Data
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
        timestamp: '2025-01-19T1200:00Z',
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
      },{
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
        timestamp: ''2025-01-16T10:00:00Z',
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

//Skill and Competency Data
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
  {    id: 'skill-1',
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
    color: 'bg-yellow-200hover:bg-yellow-300'
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
export const statusOptions2 = {
    Student: ['Enrolled', 'Graduated', 'Withdrawn', 'Dismissed', 'Deferred', 'Alumni', 'Suspended', 'Prospective', 'Pending Enrollment', 'Audit', 'Exchange', 'Interning', 'Dropped Out'],
    Staff: ['Active', 'Inactive', 'Terminated', 'On Probation', 'Retired', 'Contractual', 'Resigned', 'On Leave', 'Suspended', 'Pending Approval'],
    Teacher: ['Active', 'Inactive', 'Retired', 'Adjunct', 'Visiting', 'Probationary', 'On Leave', 'Suspended', 'Resigned', 'Contractual']
};