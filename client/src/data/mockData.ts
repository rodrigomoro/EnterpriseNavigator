interface Student {
  id: string;
  name: string;
  scores: {
    mathematics: number;
    science: number;
    programming: number;
  };
  avatar: string;
  enrollments: {
    programId: string;
    enrollmentDate: string;
    status: 'active' | 'completed' | 'dropped';
    progress: number;
  }[];
  certifications: {
    id: string;
    name: string;
    issueDate: string;
    expiryDate?: string;
    credentialUrl: string;
  }[];
  previousEducation?: {
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
  } | null;
}

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
  // Student specific fields
  enrollments?: {
    programId: string;
    enrollmentDate: string;
    status: 'active' | 'completed' | 'dropped';
    progress: number;
  }[];
  certifications?: {
    id: string;
    name: string;
    issueDate: string;
    expiryDate?: string;
    credentialUrl: string;
  }[];
  previousEducation?: {
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
  } | null;
}

const calculateAverageScore = (students: Student[]): number => {
  if (!students.length) return 0;
  const totalScores = students.reduce((acc, student) => {
    const studentAvg = (student.scores.mathematics + student.scores.science + student.scores.programming) / 3;
    return acc + studentAvg;
  }, 0);
  return Math.round(totalScores / students.length);
};

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'student-1',
    name: 'John Smith',
    role: 'Student',
    department: 'Computer Science',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    email: 'john.smith@company.com',
    phone: '+1 (555) 0201',
    bio: 'Passionate about web development and cloud technologies.',
    projects: ['1', '4'],
    reportsTo: '12',
    enrollments: [
      {
        programId: '1',
        enrollmentDate: '2024-09-15',
        status: 'active',
        progress: 65
      },
      {
        programId: '4',
        enrollmentDate: '2024-10-01',
        status: 'active',
        progress: 45
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Cloud Practitioner',
        issueDate: '2024-12-15',
        expiryDate: '2027-12-15',
        credentialUrl: 'https://aws.amazon.com/verification/12345'
      }
    ],
    previousEducation: {
      institution: 'State University',
      degree: 'Bachelor',
      field: 'Computer Science',
      graduationYear: '2023'
    }
  },
  {
    id: 'student-2',
    name: 'Emily Johnson',
    role: 'Student',
    department: 'Design',
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    email: 'emily.johnson@company.com',
    phone: '+1 (555) 0202',
    bio: 'Creative designer with a focus on user experience.',
    projects: ['2'],
    reportsTo: '13',
    enrollments: [
      {
        programId: '2',
        enrollmentDate: '2024-08-01',
        status: 'active',
        progress: 78
      }
    ],
    certifications: [
      {
        id: 'cert-2',
        name: 'Google UX Design',
        issueDate: '2024-11-20',
        credentialUrl: 'https://coursera.org/verify/GOOGUX12345'
      }
    ],
    previousEducation: {
      institution: 'Tech Institute',
      degree: 'Associate',
      field: 'Digital Design',
      graduationYear: '2023'
    }
  }
];

export const mockStudents: Student[] = mockTeamMembers
  .filter(member => member.role === 'Student')
  .map(member => ({
    id: member.id,
    name: member.name,
    scores: {
      mathematics: 85,
      science: 90,
      programming: 88
    },
    avatar: member.avatar,
    enrollments: member.enrollments || [],
    certifications: member.certifications || [],
    previousEducation: member.previousEducation
  }));

export const mockProjects = [
  {
    id: '1',
    name: 'Computer Programming Fundamentals',
    description: 'Introduction to computer programming concepts and practices.',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    status: 'active',
    progress: 65,
    department: 'Computer Science',
    budget: 15000,
    team: ['student-1', 'student-2', 'student-3']
  },
  {
    id: '2',
    name: 'Advanced Mathematics',
    description: 'Advanced mathematical concepts and problem-solving techniques.',
    startDate: '2024-03-01',
    endDate: '2024-06-01',
    status: 'active',
    progress: 45,
    department: 'Mathematics',
    budget: 12000,
    team: ['student-4', 'student-5']
  }
];

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
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
    name: 'React Development',
    category: 'Development',
    description: 'Expert in React.js and related technologies'
  },
  {
    id: 'skill-3',
    name: 'Data Analysis',
    category: 'Analytics',
    description: 'Experience with data analysis and visualization tools'
  }
];

export const mockColors = [
  {
    id: 'color-1',
    name: 'Red',
    value: 'red',
    color: 'bg-red-200 hover:bg-red-300'
  },
  {
    id: 'color-2',
    name: 'Blue',
    value: 'blue',
    color: 'bg-blue-200 hover:bg-blue-300'
  },
  {
    id: 'color-3',
    name: 'Green',
    value: 'green',
    color: 'bg-emerald-200 hover:bg-emerald-300'
  }
];