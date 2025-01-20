import { type Language } from '@/lib/i18n/LanguageContext';
import type { LocalizedStrings, TeamMember, Student, Invoice, Skill, CompetencyLevel } from '@/lib/types';

// Helper function to calculate average score
const calculateAverageScore = (students: Student[]) => {
  const totalScores = students.reduce((acc, student) => {
    const studentAvg = (student.scores.mathematics + student.scores.science + student.scores.programming) / 3;
    return acc + studentAvg;
  }, 0);
  return Math.round(totalScores / students.length);
};

// Mock events data
export const mockEvents = [
  {
    id: '1',
    title: {
      en: 'Team Meeting',
      es: 'Reunión de equipo'
    },
    date: '2025-01-08',
    time: '10:00 AM',
    priority: 'primary'
  },
  {
    id: '2',
    title: {
      en: 'Project Review',
      es: 'Revisión del proyecto'
    },
    date: '2025-01-08',
    time: '2:00 PM',
    priority: 'destructive'
  },
  {
    id: '3',
    title: {
      en: 'Client Call',
      es: 'Llamada con el cliente'
    },
    date: '2025-01-09',
    time: '11:30 AM',
    priority: 'orange'
  }
];

// Mock students data
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

// Mock team members data
export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    role: {
      en: 'Founder & CEO',
      es: 'Fundadora y CEO'
    },
    department: {
      en: 'Executive',
      es: 'Ejecutivo'
    },
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    email: 'emily.johnson@company.com',
    phone: '+1 (555) 0101',
    bio: {
      en: 'Founded the company in 2020. Previously led education technology initiatives at major enterprises.',
      es: 'Fundó la empresa en 2020. Anteriormente dirigió iniciativas de tecnología educativa en grandes empresas.'
    },
    projects: ['Computer Entreprenurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)']
  },
  {
    id: '2',
    name: 'Andrea Leeland',
    role: {
      en: 'CFO',
      es: 'Directora Financiera'
    },
    department: {
      en: 'Finance',
      es: 'Finanzas'
    },
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea',
    email: 'andrea.leeland@company.com',
    phone: '+1 (555) 0102',
    bio: {
      en: 'Over 15 years of experience in financial management and strategic planning.',
      es: 'Más de 15 años de experiencia en gestión financiera y planificación estratégica.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '1'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    role: {
      en: 'CTO',
      es: 'Directora de Tecnología'
    },
    department: {
      en: 'Technology',
      es: 'Tecnología'
    },
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    email: 'sarah.williams@company.com',
    phone: '+1 (555) 0103',
    bio: {
      en: 'Tech leader with a focus on educational software and scalable systems.',
      es: 'Líder tecnológica con enfoque en software educativo y sistemas escalables.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '1'
  },
  {
    id: '4',
    name: 'Jessica Martinez',
    role: {
      en: 'HR Director',
      es: 'Directora de RRHH'
    },
    department: {
      en: 'Human Resources',
      es: 'Recursos Humanos'
    },
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    email: 'jessica.martinez@company.com',
    phone: '+1 (555) 0104',
    bio: {
      en: 'Specialized in organizational development and talent management.',
      es: 'Especializada en desarrollo organizacional y gestión del talento.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '1'
  },
  {
    id: '5',
    name: 'Ethan Wilson',
    role: {
      en: 'VP of Sales',
      es: 'Vicepresidente de Ventas'
    },
    department: {
      en: 'Sales',
      es: 'Ventas'
    },
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan',
    email: 'ethan.wilson@company.com',
    phone: '+1 (555) 0105',
    bio: {
      en: 'Driving sales strategy and team development across regions.',
      es: 'Impulsando la estrategia de ventas y el desarrollo del equipo en todas las regiones.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '1'
  },
  {
    id: '6',
    name: 'Mikkel Johanson',
    role: {
      en: 'Account Manager',
      es: 'Gestor de Cuentas'
    },
    department: {
      en: 'Sales',
      es: 'Ventas'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikkel',
    email: 'mikkel.johanson@company.com',
    phone: '+1 (555) 0106',
    bio: {
      en: 'Managing key client relationships and account growth.',
      es: 'Gestionando las relaciones clave con los clientes y el crecimiento de las cuentas.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '5'
  },
  {
    id: '7',
    name: 'Frank Miles',
    role: {
      en: 'Sales Manager',
      es: 'Jefe de Ventas'
    },
    department: {
      en: 'Sales',
      es: 'Ventas'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
    email: 'frank.miles@company.com',
    phone: '+1 (555) 0107',
    bio: {
      en: 'Leading the regional sales team and strategy implementation.',
      es: 'Liderando el equipo de ventas regional y la implementación de la estrategia.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '5'
  },
  {
    id: '8',
    name: 'Dan Smith',
    role: {
      en: 'Account Director',
      es: 'Director de Cuentas'
    },
    department: {
      en: 'Sales',
      es: 'Ventas'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dan',
    email: 'dan.smith@company.com',
    phone: '+1 (555) 0108',
    bio: {
      en: 'Overseeing strategic accounts and partnership development.',
      es: 'Supervisando cuentas estratégicas y el desarrollo de asociaciones.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '5'
  },
  {
    id: '9',
    name: 'James McFin',
    role: {
      en: 'Sales Analyst',
      es: 'Analista de Ventas'
    },
    department: {
      en: 'Sales',
      es: 'Ventas'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    email: 'james.mcfin@company.com',
    phone: '+1 (555) 0109',
    bio: {
      en: 'Analyzing sales data and providing strategic insights.',
      es: 'Analizando datos de ventas y proporcionando información estratégica.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '7'
  },
  {
    id: '10',
    name: 'Adele Pole',
    role: {
      en: 'SDR',
      es: 'Representante de Ventas'
    },
    department: {
      en: 'Sales',
      es: 'Ventas'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adele',
    email: 'adele.pole@company.com',
    phone: '+1 (555) 0110',
    bio: {
      en: 'Developing new business opportunities and lead generation.',
      es: 'Desarrollando nuevas oportunidades de negocio y generación de leads.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '7'
  },
  {
    id: '11',
    name: 'Beth Moore',
    role: {
      en: 'Inside Sales Rep',
      es: 'Representante de Ventas Internas'
    },
    department: {
      en: 'Sales',
      es: 'Ventas'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beth',
    email: 'beth.moore@company.com',
    phone: '+1 (555) 0111',
    bio: {
      en: 'Managing inside sales operations and customer relationships.',
      es: 'Gestionando las operaciones de ventas internas y las relaciones con los clientes.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '7'
  },
  {
    id: '12',
    name: 'Richard Chen',
    role: {
      en: 'Teacher',
      es: 'Profesor'
    },
    department: {
      en: 'Science',
      es: 'Ciencias'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Richard',
    email: 'richard.chen@company.com',
    phone: '+1 (555) 0112',
    bio: {
      en: 'Experienced science educator with a focus on practical applications.',
      es: 'Educador científico experimentado con enfoque en aplicaciones prácticas.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '3'
  },
  {
    id: '13',
    name: 'Maria Garcia',
    role: {
      en: 'Teacher',
      es: 'Profesora'
    },
    department: {
      en: 'Mathematics',
      es: 'Matemáticas'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    email: 'maria.garcia@company.com',
    phone: '+1 (555) 0113',
    bio: {
      en: 'Mathematics specialist with expertise in advanced calculus.',
      es: 'Especialista en matemáticas con experiencia en cálculo avanzado.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '3'
  },
  {
    id: '14',
    name: 'David Kim',
    role: {
      en: 'Director',
      es: 'Director'
    },
    department: {
      en: 'Computer Science',
      es: 'Informática'
    },
    isDirector: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    email: 'david.kim@company.com',
    phone: '+1 (555) 0114',
    bio: {
      en: 'Leading computer science initiatives and curriculum development.',
      es: 'Liderando iniciativas de informática y desarrollo de currículos.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '1'
  },
  {
    id: '15',
    name: 'Sophie Anderson',
    role: {
      en: 'Teacher',
      es: 'Profesora'
    },
    department: {
      en: 'Computer Science',
      es: 'Informática'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
    email: 'sophie.anderson@company.com',
    phone: '+1 (555) 0115',
    bio: {
      en: 'Web development and software engineering instructor.',
      es: 'Instructora de desarrollo web e ingeniería de software.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '14'
  },
  {
    id: 'student-1',
    name: 'John Smith',
    role: {
      en: 'Student',
      es: 'Estudiante'
    },
    department: {
      en: 'Computer Science',
      es: 'Informática'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    email: 'john.smith@company.com',
    phone: '+1 (555) 0201',
    bio: {
      en: 'Computer Science student with interests in AI and machine learning.',
      es: 'Estudiante de informática con interés en IA y aprendizaje automático.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '14'
  },
  {
    id: 'student-2',
    name: 'Emily Brown',
    role: {
      en: 'Student',
      es: 'Estudiante'
    },
    department: {
      en: 'Mathematics',
      es: 'Matemáticas'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    email: 'emily.brown@company.com',
    phone: '+1 (555) 0202',
    bio: {
      en: 'Mathematics enthusiast focusing on data analysis.',
      es: 'Aficionado a las matemáticas que se centra en el análisis de datos.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '13'
  },
  {
    id: 'student-3',
    name: 'Michael Johnson',
    role: {
      en: 'Student',
      es: 'Estudiante'
    },
    department: {
      en: 'Computer Science',
      es: 'Informática'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    email: 'michael.johnson@company.com',
    phone: '+1 (555) 0203',
    bio: {
      en: 'Aspiring software developer with a passion for web technologies.',
      es: 'Aspirante a desarrollador de software con pasión por las tecnologías web.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '14'
  },
  {
    id: 'student-4',
    name: 'Sarah Davis',
    role: {
      en: 'Student',
      es: 'Estudiante'
    },
    department: {
      en: 'Science',
      es: 'Ciencias'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    email: 'sarah.davis@company.com',
    phone: '+1 (555) 0204',
    bio: {
      en: 'Research-oriented student focusing on data science applications.',
      es: 'Estudiante orientada a la investigación que se centra en las aplicaciones de la ciencia de datos.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '12'
  },
  {
    id: 'student-5',
    name: 'Alex Martinez',
    role: {
      en: 'Student',
      es: 'Estudiante'
    },
    department: {
      en: 'Computer Science',
      es: 'Informática'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    email: 'alex.martinez@company.com',
    phone: '+1 (555) 0205',
    bio: {
      en: 'Full-stack developer in training with focus on cloud technologies.',
      es: 'Desarrollador full-stack en formación con enfoque en tecnologías en la nube.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '15'
  },
  {
    id: 'student-6',
    name: 'Lisa Wang',
    role: {
      en: 'Student',
      es: 'Estudiante'
    },
    department: {
      en: 'Mathematics',
      es: 'Matemáticas'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    email: 'lisa.wang@company.com',
    phone: '+1 (555) 0206',
    bio: {
      en: 'Mathematics student specializing in statistical analysis.',
      es: 'Estudiante de matemáticas especializada en análisis estadístico.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '13'
  },
  {
    id: 'student-7',
    name: 'Daniel Lee',
    role: {
      en: 'Student',
      es: 'Estudiante'
    },
    department: {
      en: 'Computer Science',
      es: 'Informática'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
    email: 'daniel.lee@company.com',
    phone: '+1 (555) 0207',
    bio: {
      en: 'Passionate about cybersecurity and network infrastructure.',
      es: 'Apasionado por la ciberseguridad y la infraestructura de red.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '14'
  },
  {
    id: 'student-8',
    name: 'Rachel Chen',
    role: {
      en: 'Student',
      es: 'Estudiante'
    },
    department: {
      en: 'Science',
      es: 'Ciencias'
    },
    isDirector: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
    email: 'rachel.chen@company.com',
    phone: '+1 (555) 0208',
    bio: {
      en: 'Research assistant focusing on data analytics applications.',
      es: 'Asistente de investigación centrada en aplicaciones de análisis de datos.'
    },
    projects: ['Computer Entrepreneurship Bachelor (2409CEB1)', 'Bootcamp en Diseño UX/UI (2410BUXS)', 'Bootcamp en Cloud Computing & DevOps (2410BCCS)'],
    reportsTo: '12'
  }
];

// Mock projects data
export const mockProjects = [
  {
    id: '1',
    name: {
      en: 'Computer Entrepreneurship Bachelor (2409CEB1)',
      es: 'Licenciatura en Emprendimiento Informático (2409CEB1)'
    },
    progress: 65,
    team: mockTeamMembers.filter(m => ['1', '2', '12', '13'].includes(m.id)),
    director: mockTeamMembers[0],
    studentCount: 45,
    students: mockStudents.slice(0, 6),
    avgScore: calculateAverageScore(mockStudents.slice(0, 6)),
    description: {
      en: 'A comprehensive program designed to develop both technical and business skills.',
      es: 'Un programa integral diseñado para desarrollar habilidades técnicas y empresariales.'
    }
  },
  {
    id: '2',
    name: {
      en: 'Computer Entrepreneurship Bachelor (2309CEB2)',
      es: 'Licenciatura en Emprendimiento Informático (2309CEB2)'
    },
    progress: 40,
    team: mockTeamMembers.filter(m => ['14', '15'].includes(m.id)),
    director: mockTeamMembers[13],
    studentCount: 32,
    students: mockStudents.slice(6, 11),
    avgScore: calculateAverageScore(mockStudents.slice(6, 11)),
    description: {
      en: 'A comprehensive program designed to develop both technical and business skills.',
      es: 'Un programa integral diseñado para desarrollar habilidades técnicas y empresariales.'
    }
  },
  {
    id: '3',
    name: {
      en: 'Computer Entrepreneurship Bachelor (2209CEB3)',
      es: 'Licenciatura en Emprendimiento Informático (2209CEB3)'
    },
    progress: 85,
    team: mockTeamMembers.filter(m => ['3', '4'].includes(m.id)),
    director: mockTeamMembers[2],
    studentCount: 28,
    students: mockStudents.slice(11, 16),
    avgScore: calculateAverageScore(mockStudents.slice(11, 16)),
    description: {
      en: 'A comprehensive program designed to develop both technical and business skills.',
      es: 'Un programa integral diseñado para desarrollar habilidades técnicas y empresariales.'
    }
  },
  {
    id: '4',
    name: {
      en: 'Bootcamp en Diseño UX/UI (2410BUXS)',
      es: 'Bootcamp de Diseño UX/UI (2410BUXS)'
    },
    progress: 20,
    team: mockTeamMembers.filter(m => ['5', '6', '7', '8', '9', '10', '11'].includes(m.id)),
    director: mockTeamMembers[4],
    studentCount: 52,
    students: mockStudents.slice(16),
    avgScore: calculateAverageScore(mockStudents.slice(16)),
    description: {
      en: 'Intensive training in user experience and interface design.',
      es: 'Formación intensiva en diseño de experiencia de usuario e interfaz.'
    }
  },
  {
    id: '5',
    name: {
      en: 'Bootcamp en Cloud Computing & DevOps (2410BCCS)',
      es: 'Bootcamp de Cloud Computing & DevOps (2410BCCS)'
    },
    progress: 50,
    team: mockTeamMembers.filter(m => ['5', '6', '7', '8', '9', '10', '11'].includes(m.id)),
    director: mockTeamMembers[4],
    studentCount: 48,
    students: mockStudents.slice(16),
    avgScore: calculateAverageScore(mockStudents.slice(16)),
    description: {      en: 'Intensive training in cloud computing and DevOps.',
      es: 'Formación intensiva en computación en la nube y DevOps.'
    }
  },
  {
    id: '6',
    name: {
      en: 'Bootcamp en Cloud Computing & DevOps (2503BCCS)',
      es: 'Bootcamp de Cloud Computing & DevOps (2503BCCS)'
    },
    progress: 75,
    team: mockTeamMembers.filter(m => ['5', '6', '7', '8', '9', '10', '11'].includes(m.id)),
    director: mockTeamMembers[4],
    studentCount: 36,
    students: mockStudents.slice(16),
    avgScore: calculateAverageScore(mockStudents.slice(16)),
    description: {
      en: 'Intensive training in cloud computing and DevOps.',
      es: 'Formación intensiva en computación en la nube y DevOps.'
    }
  }
];

// Mock tasks data
export const mockTasks = [
  {
    id: '1',
    title: {
      en: 'Finish monthly reporting',
      es: 'Finalizar el informe mensual'
    },
    dueDate: 'Today',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    title: {
      en: 'Report signing',
      es: 'Firma del informe'
    },
    dueDate: 'Today',
    priority: 'medium',
    completed: false
  },
  {
    id: '3',
    title: {
      en: 'Market overview keynote',
      es: 'Presentación general del mercado'
    },
    dueDate: 'Today',
    priority: 'high',
    completed: false
  }
];

// Mock invoices data
export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    customer: {
      name: {
        en: 'Tech Education S.L.',
        es: 'Tech Education S.L.'
      },
      taxId: 'B12345678',
      address: {
        en: 'Calle Principal 123, 28001 Madrid',
        es: 'Calle Principal 123, 28001 Madrid'
      }
    },
    issueDate: '2025-01-15',
    dueDate: '2025-02-14',
    items: [
      {
        description: {
          en: 'Educational Software License - Annual',
          es: 'Licencia de software educativo - Anual'
        },
        quantity: 1,
        price: 1200,
        total: 1200
      },
      {
        description: {
          en: 'Training Sessions',
          es: 'Sesiones de formación'
        },
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
      name: {
        en: 'Educational Services Company',
        es: 'Compañía de Servicios Educativos'
      },
      taxId: 'B87654321',
      address: {
        en: 'Avenida Secundaria 456, 08001 Barcelona',
        es: 'Avenida Secundaria 456, 08001 Barcelona'
      }
    },
    issueDate: '2025-01-18',
    dueDate: '2025-02-17',
    items: [
      {
        description: {
          en: 'Curriculum Development Services',
          es: 'Servicios de desarrollo curricular'
        },
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
      name: {
        en: 'Learning Center Institute',
        es: 'Instituto del Centro de Aprendizaje'
      },
      taxId: 'B98765432',
      address: {
        en: 'Plaza Principal 789, 46001 Valencia',
        es: 'Plaza Principal 789, 46001 Valencia'
      }
    },
    issueDate: '2025-01-19',
    dueDate: '2025-02-18',
    items: [
      {
        description: {
          en: 'Student Management System - Monthly Fee',
          es: 'Sistema de gestión de estudiantes - Cuota mensual'
        },
        quantity: 1,
        price: 800,
        total: 800
      },
      {
        description: {
          en: 'Setup Service',
          es: 'Servicio de configuración'
        },
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
      name: {
        en: 'Digital Learning Academy',
        es: 'Academia de Aprendizaje Digital'
      },
      taxId: 'B45678901',
      address: {
        en: 'Avenida Principal 321, 41001 Sevilla',
        es: 'Avenida Principal 321, 41001 Sevilla'
      }
    },
    issueDate: '2025-01-16',
    dueDate: '2025-02-15',
    items: [
      {
        description: {
          en: 'Learning Management System - Annual License',
          es: 'Sistema de gestión del aprendizaje - Licencia anual'
        },
        quantity: 1,
        price: 4500,
        total: 4500
      },
      {
        description: {
          en: 'Implementation Services',
          es: 'Servicios de implementación'
        },
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

// Mock skills data
export const mockSkills: Skill[] = [
  {
    id: 'skill-1',
    name: {
      en: 'Project Management',
      es: 'Gestión de proyectos'
    },
    category: {
      en: 'Management',
      es: 'Gestión'
    },
    description: {
      en: 'Ability to plan, execute and deliver projects effectively',
      es: 'Capacidad para planificar, ejecutar y entregar proyectos de manera efectiva'
    }
  },
  {
    id: 'skill-2',
    name: {
      en: 'JavaScript',
      es: 'JavaScript'
    },
    category: {
      en: 'Technical',
      es: 'Técnico'
    },
    description: {
      en: 'Proficiency in JavaScript programming language',
      es: 'Dominio del lenguaje de programación JavaScript'
    }
  },
  {
    id: 'skill-3',
    name: {
      en: 'Communication',
      es: 'Comunicación'
    },
    category: {
      en: 'Soft Skills',
      es: 'Habilidades blandas'
    },
    description: {
      en: 'Effective verbal and written communication',
      es: 'Comunicación verbal y escrita efectiva'
    }
  },
  {
    id: 'skill-4',
    name: {
      en: 'Leadership',
      es: 'Liderazgo'
    },
    category: {
      en: 'Management',
      es: 'Gestión'
    },
    description: {
      en: 'Ability to lead and motivate teams',
      es: 'Capacidad para liderar y motivar equipos'
    }
  },
  {
    id: 'skill-5',
    name: {
      en: 'Problem Solving',
      es: 'Resolución de problemas'
    },
    category: {
      en: 'Technical',
      es: 'Técnico'
    },
    description: {
      en: 'Analytical and problem-solving abilities',
      es: 'Habilidades analíticas y de resolución de problemas'
    }
  }
];

// Competency levels
export const competencyLevels: CompetencyLevel[] = [
  {
    id: 'level-1',
    name: {
      en: 'Novice',
      es: 'Principiante'
    },
    value: 1,
    color: 'bg-red-200 hover:bg-red-300'
  },
  {
    id: 'level-2',
    name: {
      en: 'Advanced Beginner',
      es: 'Principiante avanzado'
    },
    value: 2,
    color: 'bg-orange-200 hover:bg-orange-300'
  },
  {
    id: 'level-3',
    name: {
      en: 'Competent',
      es: 'Competente'
    },
    value: 3,
    color: 'bg-yellow-200 hover:bg-yellow-300'
  },
  {
    id: 'level-4',
    name: {
      en: 'Proficient',
      es: 'Proficiente'
    },
    value: 4,
    color: 'bg-green-200 hover:bg-green-300'
  },
  {
    id: 'level-5',
    name: {
      en: 'Expert',
      es: 'Experto'
    },
    value: 5,
    color: 'bg-emerald-200 hover:bg-emerald-300'
  }
];

// Navigation labels
export const navigationLabels: Record<string, LocalizedStrings> = {
  home: {
    en: 'Home',
    es: 'Inicio'
  },
  programs: {
    en: 'Programs',
    es: 'Programas'
  },
  calendar: {
    en: 'Calendar',
    es: 'Calendario'
  },
  people: {
    en: 'People',
    es: 'Personas'
  },
  organization: {
    en: 'Organization',
    es: 'Organización'
  },
  skillsMatrix: {
    en: 'Skills Matrix',
    es: 'Matriz de Habilidades'
  },
  invoices: {
    en: 'Invoices',
    es: 'Facturas'
  },
  qrTracking: {
    en: 'QR Tracking',
    es: 'Seguimiento QR'
  },
  financial: {
    en: 'Financial',
    es: 'Finanzas'
  },
  analytics: {
    en: 'Analytics',
    es: 'Análisis'
  },
  settings: {
    en: 'Settings',
    es: 'Configuración'
  },
  logout: {
    en: 'Log out',
    es: 'Cerrar sesión'
  }
};