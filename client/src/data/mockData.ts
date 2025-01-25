import { z } from "zod";

// Update the TeamMember interface to include location
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

// Add location options
export const locations = [
  'Madrid Campus',
  'Barcelona Campus',
  'Spain Remote',
  'Argentina Remote',
  'Mexico Remote',
  'Colombia Remote',
  'Chile Remote'
];

// Add departments
export const departments = [
  'Executive',
  'Technology',
  'Mathematics',
  'Science',
  'Computer Science',
  'Finance',
  'Human Resources'
];

// Status options based on role
export const statusOptions = {
  Student: [
    'Enrolled',
    'Graduated',
    'Withdrawn',
    'Dismissed',
    'Deferred',
    'Alumni',
    'Suspended',
    'Prospective',
    'Pending Enrollment',
    'Audit',
    'Exchange',
    'Interning',
    'Dropped Out'
  ],
  Staff: [
    'Active',
    'Inactive',
    'Terminated',
    'On Probation',
    'Retired',
    'Contractual',
    'Resigned',
    'On Leave',
    'Suspended',
    'Pending Approval'
  ],
  Teacher: [
    'Active',
    'Inactive',
    'Retired',
    'Adjunct',
    'Visiting',
    'Probationary',
    'On Leave',
    'Suspended',
    'Resigned',
    'Contractual'
  ]
};

// Initial team members array with staff and faculty
const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    role: 'Director',
    department: 'Executive',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    email: 'emily.johnson@company.com',
    phone: '+1 (555) 0101',
    bio: 'Founded the company in 2020. Previously led education technology initiatives at major enterprises.',
    projects: ['Computer Entreprenurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '2',
    name: 'Andrea Leeland',
    role: 'Staff',
    department: 'Finance',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea',
    email: 'andrea.leeland@company.com',
    phone: '+1 (555) 0102',
    bio: 'Over 15 years of experience in financial management and strategic planning.',
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '1',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    role: 'Teacher',
    department: 'Technology',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    email: 'sarah.williams@company.com',
    phone: '+1 (555) 0103',
    bio: 'Tech leader with a focus on educational software and scalable systems.',
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '1',
    status: 'On Leave',
    location: 'Barcelona Campus'
  },
  {
    id: '4',
    name: 'Jessica Martinez',
    role: 'Staff',
    department: 'Human Resources',
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    email: 'jessica.martinez@company.com',
    phone: '+1 (555) 0104',
    bio: 'Specialized in organizational development and talent management.',
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '1',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '12',
    name: 'Richard Chen',
    role: 'Teacher',
    department: 'Science',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Richard',
    email: 'richard.chen@company.com',
    phone: '+1 (555) 0112',
    bio: 'Experienced science educator with a focus on practical applications.',
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '3',
    status: 'Active',
    location: 'Barcelona Campus'
  },
  {
    id: '13',
    name: 'Maria Garcia',
    role: 'Teacher',
    department: 'Mathematics',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    email: 'maria.garcia@company.com',
    phone: '+1 (555) 0113',
    bio: 'Mathematics specialist with expertise in advanced calculus.',
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '3',
    status: 'Inactive',
    location: 'Barcelona Campus'
  },
  {
    id: '14',
    name: 'Robert Chen',
    role: 'Staff',
    department: 'Finance',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    email: 'robert.chen@company.com',
    phone: '+1 (555) 0114',
    bio: 'Senior Financial Analyst with expertise in educational budgeting.',
    projects: [],
    reportsTo: '2',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '15',
    name: 'Patricia Wong',
    role: 'Staff',
    department: 'Human Resources',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
    email: 'patricia.wong@company.com',
    phone: '+1 (555) 0115',
    bio: 'HR Specialist focusing on talent acquisition and development.',
    projects: [],
    reportsTo: '4',
    status: 'On Leave',
    location: 'Madrid Campus'
  },
  {
    id: '16',
    name: 'Marcus Johnson',
    role: 'Staff',
    department: 'Technology',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    email: 'marcus.johnson@company.com',
    phone: '+1 (555) 0116',
    bio: 'IT Support Specialist managing educational technology infrastructure.',
    projects: [],
    reportsTo: '3',
    status: 'Active',
    location: 'Barcelona Campus'
  },
  {
    id: '17',
    name: 'Linda Martinez',
    role: 'Staff',
    department: 'Executive',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linda',
    email: 'linda.martinez@company.com',
    phone: '+1 (555) 0117',
    bio: 'Executive Assistant to the CEO.',
    projects: [],
    reportsTo: '1',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '18',
    name: 'David Wilson',
    role: 'Staff',
    department: 'Finance',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    email: 'david.wilson@company.com',
    phone: '+1 (555) 0118',
    bio: 'Accounts Payable Specialist.',
    projects: [],
    reportsTo: '2',
    status: 'Terminated',
    location: 'Madrid Campus'
  },
  {
    id: '19',
    name: 'Sarah Lee',
    role: 'Staff',
    department: 'Human Resources',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahL',
    email: 'sarah.lee@company.com',
    phone: '+1 (555) 0119',
    bio: 'Benefits Coordinator managing employee wellness programs.',
    projects: [],
    reportsTo: '4',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '20',
    name: 'James Taylor',
    role: 'Staff',
    department: 'Technology',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    email: 'james.taylor@company.com',
    phone: '+1 (555) 0120',
    bio: 'Systems Administrator maintaining educational platforms.',
    projects: [],
    reportsTo: '3',
    status: 'Probationary',
    location: 'Barcelona Campus'
  },
  {
    id: '21',
    name: 'Emma Davis',
    role: 'Staff',
    department: 'Finance',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    email: 'emma.davis@company.com',
    phone: '+1 (555) 0121',
    bio: 'Financial Operations Analyst.',
    projects: [],
    reportsTo: '2',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '22',
    name: 'Michael Brown',
    role: 'Staff',
    department: 'Human Resources',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    email: 'michael.brown@company.com',
    phone: '+1 (555) 0122',
    bio: 'Training and Development Coordinator.',
    projects: [],
    reportsTo: '4',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '23',
    name: 'Jennifer White',
    role: 'Staff',
    department: 'Executive',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    email: 'jennifer.white@company.com',
    phone: '+1 (555) 0123',
    bio: 'Administrative Coordinator for executive office.',
    projects: [],
    reportsTo: '1',
    status: 'Resigned',
    location: 'Madrid Campus'
  },
  {
    id: '24',
    name: 'Carlos Rodriguez',
    role: 'Staff',
    department: 'Technology',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    email: 'carlos.rodriguez@company.com',
    phone: '+1 (555) 0124',
    bio: 'Network Security Specialist.',
    projects: [],
    reportsTo: '3',
    status: 'Active',
    location: 'Barcelona Campus'
  },
  {
    id: '25',
    name: 'Sophia Zhang',
    role: 'Staff',
    department: 'Finance',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
    email: 'sophia.zhang@company.com',
    phone: '+1 (555) 0125',
    bio: 'Financial Risk Analyst.',
    projects: [],
    reportsTo: '2',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '26',
    name: 'William Park',
    role: 'Staff',
    department: 'Human Resources',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=William',
    email: 'william.park@company.com',
    phone: '+1 (555) 0126',
    bio: 'Employee Relations Specialist.',
    projects: [],
    reportsTo: '4',
    status: 'On Probation',
    location: 'Madrid Campus'
  },
  {
    id: '27',
    name: 'Isabella Garcia',
    role: 'Staff',
    department: 'Technology',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella',
    email: 'isabella.garcia@company.com',
    phone: '+1 (555) 0127',
    bio: 'Software Development Lead.',
    projects: [],
    reportsTo: '3',
    status: 'Active',
    location: 'Barcelona Campus'
  },
  {
    id: '28',
    name: 'Nathan Wright',
    role: 'Staff',
    department: 'Finance',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nathan',
    email: 'nathan.wright@company.com',
    phone: '+1 (555) 0128',
    bio: 'Budget Planning Specialist.',
    projects: [],
    reportsTo: '2',
    status: 'Contractual',
    location: 'Madrid Campus'
  },
  {
    id: '29',
    name: 'Oliver Chen',
    role: 'Staff',
    department: 'Executive',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
    email: 'oliver.chen@company.com',
    phone: '+1 (555) 0129',
    bio: 'Strategic Planning Coordinator.',
    projects: [],
    reportsTo: '1',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '30',
    name: 'Ava Thompson',
    role: 'Staff',
    department: 'Human Resources',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ava',
    email: 'ava.thompson@company.com',
    phone: '+1 (555) 0130',
    bio: 'Recruitment Specialist.',
    projects: [],
    reportsTo: '4',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '31',
    name: 'Lucas Kim',
    role: 'Staff',
    department: 'Technology',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    email: 'lucas.kim@company.com',
    phone: '+1 (555) 0131',
    bio: 'Cloud Infrastructure Engineer.',
    projects: [],
    reportsTo: '3',
    status: 'Active',
    location: 'Barcelona Campus'
  },
  {
    id: '32',
    name: 'Mia Patel',
    role: 'Staff',
    department: 'Finance',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia',
    email: 'mia.patel@company.com',
    phone: '+1 (555) 0132',
    bio: 'Compliance Officer.',
    projects: [],
    reportsTo: '2',
    status: 'On Leave',
    location: 'Madrid Campus'
  },
  {
    id: '33',
    name: 'Ethan Cooper',
    role: 'Staff',
    department: 'Human Resources',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan',
    email: 'ethan.cooper@company.com',
    phone: '+1 (555) 0133',
    bio: 'Training Program Developer.',
    projects: [],
    reportsTo: '4',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '34',
    name: 'Charlotte Lee',
    role: 'Staff',
    department: 'Technology',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte',
    email: 'charlotte.lee@company.com',
    phone: '+1 (555) 0134',
    bio: 'Quality Assurance Lead.',
    projects: [],
    reportsTo: '3',
    status: 'Active',
    location: 'Barcelona Campus'
  },
  {
    id: '35',
    name: 'Benjamin Wilson',
    role: 'Staff',
    department: 'Finance',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin',
    email: 'benjamin.wilson@company.com',
    phone: '+1 (555) 0135',
    bio: 'Investment Analyst.',
    projects: [],
    reportsTo: '2',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '36',
    name: 'Victoria Martinez',
    role: 'Staff',
    department: 'Executive',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria',
    email: 'victoria.martinez@company.com',
    phone: '+1 (555) 0136',
    bio: 'Corporate Communications Manager.',
    projects: [],
    reportsTo: '1',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '37',
    name: 'Henry Taylor',
    role: 'Staff',
    department: 'Human Resources',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Henry',
    email: 'henry.taylor@company.com',
    phone: '+1 (555) 0137',
    bio: 'Employee Engagement Specialist.',
    projects: [],
    reportsTo: '4',
    status: 'On Leave',
    location: 'Madrid Campus'
  },
  {
    id: '38',
    name: 'Scarlett Wong',
    role: 'Staff',
    department: 'Technology',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Scarlett',
    email: 'scarlett.wong@company.com',
    phone: '+1 (555) 0138',
    bio: 'Data Center Operations Manager.',
    projects: [],
    reportsTo: '3',
    status: 'Active',
    location: 'Barcelona Campus'
  },
  {
    id: '39',
    name: 'Sebastian Ross',
    role: 'Staff',
    department: 'Finance',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian',
    email: 'sebastian.ross@company.com',
    phone: '+1 (555) 0139',
    bio: 'Treasury Analyst.',
    projects: [],
    reportsTo: '2',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '40',
    name: 'Zoe Anderson',
    role: 'Staff',
    department: 'Human Resources',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
    email: 'zoe.anderson@company.com',
    phone: '+1 (555) 0140',
    bio: 'Diversity and Inclusion Coordinator.',
    projects: [],
    reportsTo: '4',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '41',
    name: 'Christopher Lee',
    role: 'Staff',
    department: 'Technology',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher',
    email: 'christopher.lee@company.com',
    phone: '+1 (555) 0141',
    bio: 'Information Security Analyst.',
    projects: [],
    reportsTo: '3',
    status: 'Active',
    location: 'Barcelona Campus'
  },
  {
    id: '42',
    name: 'Madison Clark',
    role: 'Staff',
    department: 'Finance',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Madison',
    email: 'madison.clark@company.com',
    phone: '+1 (555) 0142',
    bio: 'Accounting Operations Manager.',
    projects: [],
    reportsTo: '2',
    status: 'Active',
    location: 'Madrid Campus'
  },
  {
    id: '43',
    name: 'Gabriel Santos',
    role: 'Staff',
    department: 'Executive',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel',
    email: 'gabriel.santos@company.com',
    phone: '+1 (555) 0143',
    bio: 'Business Development Coordinator.',
    projects: [],
    reportsTo: '1',
    status: 'Probationary',
    location: 'Madrid Campus'
  },
  {
    id: 'student-1',
    name: 'John Smith',
    role: 'Student',
    department: 'Computer Science',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    email: 'john.smith@company.com',
    phone: '+1 (555) 0201',
    bio: 'Computer Science student with interests in AI and machine learning.',
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '14',
    status: 'Enrolled',
    location: 'Madrid Campus'
  },
  {
    id: 'student-2',
    name: 'Emily Brown',
    role: 'Student',
    department: 'Mathematics',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    email: 'emily.brown@company.com',
    phone: '+1 (555) 0202',
    bio: 'Mathematics enthusiast focusing on data analysis.',
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '13',
    status: 'Graduated',
    location: 'Barcelona Campus'
  },
  {
    id: 'student-3',
    name: 'Michael Johnson',
    role: 'Student',
    department: 'Computer Science',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    email: 'michael.johnson@company.com',
    phone: '+1 (555) 0203',
    bio: 'Aspiring software developer with a passion for web technologies.',
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '14',
    status: 'Withdrawn',
    location: 'Madrid Campus'
  }
];

// Function to generate additional students
function generateStudents(startId: number, count: number): TeamMember[] {
  const studentDepartments = ['Computer Science', 'Mathematics', 'Science'];
  const statuses = statusOptions.Student;
  const names = [
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia',
    'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Sofia', 'Avery', 'Ella', 'Scarlett',
    'Grace', 'Victoria', 'Riley', 'Aria', 'Lily', 'Aurora', 'Zoey', 'Willow', 'Luna', 'Savannah',
    'Maya', 'Audrey', 'Brooklyn', 'Bella', 'Claire', 'Skylar', 'Lucy', 'Paisley', 'Everly',
    'Anna', 'Caroline', 'Genesis', 'Aaliyah', 'Kennedy', 'Kinsley', 'Allison', 'Gabriella', 'Alice',
    'Madelyn', 'Cora', 'Ruby', 'Eva', 'Serenity', 'Autumn', 'Adeline', 'Hailey', 'Gianna',
    'James', 'William', 'Oliver', 'Benjamin', 'Elijah', 'Lucas', 'Mason', 'Logan', 'Alexander', 'Ethan',
    'Jacob', 'Michael', 'Daniel', 'Henry', 'Jackson', 'Sebastian', 'Jack', 'Aiden', 'Owen',
    'Samuel', 'Matthew', 'Joseph', 'Levi', 'Mateo', 'David', 'John', 'Wyatt', 'Carter', 'Julian',
    'Luke', 'Grayson', 'Isaac', 'Jayden', 'Theodore', 'Gabriel', 'Anthony', 'Dylan', 'Leo',
    'Lincoln', 'Jaxon', 'Asher', 'Christopher', 'Josiah', 'Andrew', 'Thomas', 'Joshua', 'Ezra',
    'Hudson', 'Charles', 'Caleb', 'Isaiah', 'Ryan', 'Nathan', 'Adrian', 'Christian', 'Maverick'
  ];
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
    'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
    'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
  ];

  return Array.from({ length: count }, (_, i) => {
    const firstName = names[Math.floor(Math.random() * names.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department = studentDepartments[Math.floor(Math.random() * studentDepartments.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      id: `student-${startId + i}`,
      name: `${firstName} ${lastName}`,
      role: 'Student',
      department,
      isDirector: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      phone: `+1 (555) ${String(1000 + i).padStart(4, '0')}`,
      bio: `${department} student with focus on academic excellence.`,
      projects: ['Computer Entrepreneurship Bachelor (2409CEB1)'],
      reportsTo: '14',
      status,
      location
    };
  });
}

// Generate additional students
const additionalStudents = generateStudents(43, 200);

// Export the combined team members
export const mockTeamMembers: TeamMember[] = [
  ...initialTeamMembers,
  ...additionalStudents
];

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

export const mockProjects = [
  {
    id: '1',
    name: 'Computer Entreprenurship Bachelor (2409CEB1)',
    progress: 65,
    team: mockTeamMembers.filter(m => ['1', '2', '12', '13'].includes(m.id)),
    director: mockTeamMembers[0],
    studentCount: 45,
    students: mockStudents.slice(0, 6),
    avgScore: calculateAverageScore(mockStudents.slice(0, 6))
  },
  {
    id: '2',
    name: 'Computer Entreprenurship Bachelor (2309CEB2)',
    progress: 40,
    team: mockTeamMembers.filter(m => ['14', '15'].includes(m.id)),
    director: mockTeamMembers[13],
    studentCount: 32,
    students: mockStudents.slice(6, 11),
    avgScore: calculateAverageScore(mockStudents.slice(6, 11))
  },
  {
    id: '3',
    name: 'Computer Entreprenurship Bachelor (2209CEB3)',
    progress: 85,
    team: mockTeamMembers.filter(m => ['3', '4'].includes(m.id)),
    director: mockTeamMembers[2],
    studentCount: 28,
    students: mockStudents.slice(11, 16),
    avgScore: calculateAverageScore(mockStudents.slice(11, 16))
  },
  {
    id: '4',
    name: 'Bootcamp en Diseño UX/UI (2410BUXS)',
    progress: 20,
    team: mockTeamMembers.filter(m => ['5', '6', '7', '8', '9', '10', '11'].includes(m.id)),
    director: mockTeamMembers[4],
    studentCount: 52,
    students: mockStudents.slice(16),
    avgScore: calculateAverageScore(mockStudents.slice(16))
  },
  {
    id: '5',
    name: 'Bootcamp en Cloud Computing & DevOps (2410BCCS)',
    progress: 50,
    team: mockTeamMembers.filter(m => ['5', '6', '7', '8', '9', '10', '11'].includes(m.id)),
    director: mockTeamMembers[4],
    studentCount: 48,
    students: mockStudents.slice(16),
    avgScore: calculateAverageScore(mockStudents.slice(16))
  },
  {
    id: '6',
    name: 'Bootcamp en Cloud Computing & DevOps (2503BCCS)',
    progress: 75,
    team: mockTeamMembers.filter(m => ['5', '6', '7', '8', '9', '10', '11'].includes(m.id)),
    director: mockTeamMembers[4],
    studentCount: 36,
    students: mockStudents.slice(16),
    avgScore: calculateAverageScore(mockStudents.slice(16))
  }
];

export const mockTasks = [
  {
    id:'1',
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