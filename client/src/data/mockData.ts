// Update the TeamMember interface to include location
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  jobTitle: string;
  department: string;
  isDirector: boolean;
  avatar: string;
  email: string;
  phone: string;
  bio: string;
  programs: string[];
  reportsTo?: string;
  status: string;
  location: string;
}

// Add location options
export const locations = [
  "Madrid Campus",
  "Barcelona Campus",
  "Spain Remote",
  "Argentina Remote",
  "Mexico Remote",
  "Colombia Remote",
  "Chile Remote",
];

// Add departments
export const departments = [
  "Executive",
  "Technology",
  "Mathematics",
  "Science",
  "Computer Science",
  "Finance",
  "Human Resources",
];

// Status options based on role
export const statusOptions = {
  Student: [
    "Enrolled",
    "Graduated",
    "Withdrawn",
    "Dismissed",
    "Deferred",
    "Alumni",
    "Suspended",
    "Prospective",
    "Pending Enrollment",
    "Audit",
    "Exchange",
    "Interning",
    "Dropped Out",
  ],
  Staff: [
    "Active",
    "Inactive",
    "Terminated",
    "On Probation",
    "Retired",
    "Contractual",
    "Resigned",
    "On Leave",
    "Suspended",
    "Pending Approval",
  ],
  Teacher: [
    "Active",
    "Inactive",
    "Retired",
    "Adjunct",
    "Visiting",
    "Probationary",
    "On Leave",
    "Suspended",
    "Resigned",
    "Contractual",
  ],
};

// Initial team members array with staff and faculty
export const initialTeamMembers: TeamMember[] = [
  //
  // ──────────────────────────────────────────────
  // 1) CEO & Founder => staff-1
  // ──────────────────────────────────────────────
  {
    id: "staff-1",
    name: "Emily Johnson",
    jobTitle: "CEO & Founder", // Stays the same
    role: "Staff",
    department: "Executive",
    isDirector: true, // She is a director-level staff
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    email: "emily.johnson@company.com",
    phone: "+1 (555) 0101",
    bio: "Founded the institution in 2020. Previously led education technology initiatives at major enterprises.",
    programs: [
      "Computer Entreprenurship Bachelor (2409CEB1)",
      "Bootcamp en Diseño UX/UI (2410BUXS)",
      "Bootcamp en Cloud Computing & DevOps (2410BCCS)",
    ],
    // CEO => no reportsTo
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 2) CAO => staff-2 (Chief Academic Officer)
  // ──────────────────────────────────────────────
  {
    id: "staff-2",
    name: "David Anderson",
    jobTitle: "Chief Academic Officer",
    role: "Staff",
    department: "Academic",
    isDirector: true, // Still director-level, but belongs to staff
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    email: "david.anderson@company.com",
    phone: "+1 (555) 0100",
    bio: "Chief Academic Officer with over 20 years of experience in educational leadership.",
    programs: [],
    reportsTo: "staff-1", // Reports to CEO (staff-1)
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 3) CFO => staff-3
  // ──────────────────────────────────────────────
  {
    id: "staff-3",
    name: "Andrea Leeland",
    jobTitle: "CFO",
    role: "Staff",
    department: "Finance",
    isDirector: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea",
    email: "andrea.leeland@company.com",
    phone: "+1 (555) 0102",
    bio: "Over 15 years of experience in financial management and strategic planning.",
    programs: [
      "Computer Entrepreneurship Bachelor (2409CEB1)",
      "Bootcamp en Diseño UX/UI (2410BUXS)",
      "Bootcamp en Cloud Computing & DevOps (2410BCCS)",
    ],
    reportsTo: "staff-1", // CEO
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 4) CTO => staff-4
  // ──────────────────────────────────────────────
  {
    id: "staff-4",
    name: "Sarah Williams",
    jobTitle: "CTO",
    role: "Staff",
    department: "Technology",
    isDirector: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    email: "sarah.williams@company.com",
    phone: "+1 (555) 0103",
    bio: "Tech leader with a focus on educational software and scalable systems.",
    programs: [
      "Computer Entrepreneurship Bachelor (2409CEB1)",
      "Bootcamp en Diseño UX/UI (2410BUXS)",
      "Bootcamp en Cloud Computing & DevOps (2410BCCS)",
    ],
    reportsTo: "staff-1", // CEO
    status: "On Leave",
    location: "Barcelona Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 5) Admission Director => staff-5
  // ──────────────────────────────────────────────
  {
    id: "staff-5",
    name: "Jessica Martinez",
    jobTitle: "Admission Director",
    role: "Staff",
    department: "Admissions",
    isDirector: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    email: "jessica.martinez@company.com",
    phone: "+1 (555) 0104",
    bio: "Specialized in organizational development, now overseeing the admissions process.",
    programs: [
      "Computer Entrepreneurship Bachelor (2409CEB1)",
      "Bootcamp en Diseño UX/UI (2410BUXS)",
      "Bootcamp en Cloud Computing & DevOps (2410BCCS)",
    ],
    reportsTo: "staff-1", // CEO
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 8) Finance Staff => staff-6 (reports to CFO: staff-3)
  // ──────────────────────────────────────────────
  {
    id: "staff-6",
    name: "Robert Chen",
    jobTitle: "Finance Staff",
    role: "Staff",
    department: "Finance",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    email: "robert.chen@company.com",
    phone: "+1 (555) 0114",
    bio: "Senior Financial Analyst with expertise in educational budgeting.",
    programs: [],
    reportsTo: "staff-3", // CFO
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 9) HR Staff => staff-7 (reports to Admission Director: staff-5)
  // ──────────────────────────────────────────────
  {
    id: "staff-7",
    name: "Patricia Wong",
    jobTitle: "HR Staff",
    role: "Staff",
    department: "Human Resources",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia",
    email: "patricia.wong@company.com",
    phone: "+1 (555) 0115",
    bio: "HR Specialist focusing on talent acquisition and development.",
    programs: [],
    reportsTo: "staff-5",
    status: "On Leave",
    location: "Madrid Campus",
  },

  //
  // ───────────────────────────────────────────de�──
  // 10) Tech Staff => staff-8 (reports to CTO: staff-4)
  // ──────────────────────────────────────────────
  {
    id: "staff-8",
    name: "Marcus Johnson",
    jobTitle: "Tech Staff",
    role: "Staff",
    department: "Technology",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    email: "marcus.johnson@company.com",
    phone: "+1 (555) 0116",
    bio: "IT Support Specialist managing educational technology infrastructure.",
    programs: [],
    reportsTo: "staff-4",
    status: "Active",
    location: "Barcelona Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 11) Executive Staff => staff-9 (reports to CEO: staff-1)
  // ──────────────────────────────────────────────
  {
    id: "staff-9",
    name: "Linda Martinez",
    jobTitle: "Executive Staff",
    role: "Staff",
    department: "Executive",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda",
    email: "linda.martinez@company.com",
    phone: "+1 (555) 0117",
    bio: "Executive Assistant to the CEO.",
    programs: [],
    reportsTo: "staff-1",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 12) Finance Staff => staff-10 (Terminated)
  // ──────────────────────────────────────────────
  {
    id: "staff-10",
    name: "David Wilson",
    jobTitle: "Finance Staff",
    role: "Staff",
    department: "Finance",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    email: "david.wilson@company.com",
    phone: "+1 (555) 0118",
    bio: "Accounts Payable Specialist.",
    programs: [],
    reportsTo: "staff-3", // CFO
    status: "Terminated",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 13) HR Staff => staff-11 (reports to staff-5)
  // ──────────────────────────────────────────────
  {
    id: "staff-11",
    name: "Sarah Lee",
    jobTitle: "HR Staff",
    role: "Staff",
    department: "Human Resources",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahL",
    email: "sarah.lee@company.com",
    phone: "+1 (555) 0119",
    bio: "Benefits Coordinator managing employee wellness programs.",
    programs: [],
    reportsTo: "staff-5",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 14) Tech Staff => staff-12 (reports to staff-4)
  // ──────────────────────────────────────────────
  {
    id: "staff-12",
    name: "James Taylor",
    jobTitle: "Tech Staff",
    role: "Staff",
    department: "Technology",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    email: "james.taylor@company.com",
    phone: "+1 (555) 0120",
    bio: "Systems Administrator maintaining educational platforms.",
    programs: [],
    reportsTo: "staff-4",
    status: "Probationary",
    location: "Barcelona Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 15) Finance Staff => staff-13
  // ──────────────────────────────────────────────
  {
    id: "staff-13",
    name: "Emma Davis",
    jobTitle: "Finance Staff",
    role: "Staff",
    department: "Finance",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    email: "emma.davis@company.com",
    phone: "+1 (555) 0121",
    bio: "Financial Operations Analyst.",
    programs: [],
    reportsTo: "staff-3",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 16) HR Staff => staff-14 (reports to staff-5)
  // ──────────────────────────────────────────────
  {
    id: "staff-14",
    name: "Michael Brown",
    jobTitle: "HR Staff",
    role: "Staff",
    department: "Human Resources",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    email: "michael.brown@company.com",
    phone: "+1 (555) 0122",
    bio: "Training and Development Coordinator.",
    programs: [],
    reportsTo: "staff-5",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 17) Executive Staff => staff-15 (Resigned)
  // ──────────────────────────────────────────────
  {
    id: "staff-15",
    name: "Jennifer White",
    jobTitle: "Executive Staff",
    role: "Staff",
    department: "Executive",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    email: "jennifer.white@company.com",
    phone: "+1 (555) 0123",
    bio: "Administrative Coordinator for executive office.",
    programs: [],
    reportsTo: "staff-1",
    status: "Resigned",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 18) Tech Staff => staff-16 (reports to staff-4)
  // ──────────────────────────────────────────────
  {
    id: "staff-16",
    name: "Carlos Rodriguez",
    jobTitle: "Tech Staff",
    role: "Staff",
    department: "Technology",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    email: "carlos.rodriguez@company.com",
    phone: "+1 (555) 0124",
    bio: "Network Security Specialist.",
    programs: [],
    reportsTo: "staff-4",
    status: "Active",
    location: "Barcelona Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 19) Finance Staff => staff-17
  // ──────────────────────────────────────────────
  {
    id: "staff-17",
    name: "Sophia Zhang",
    jobTitle: "Finance Staff",
    role: "Staff",
    department: "Finance",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    email: "sophia.zhang@company.com",
    phone: "+1 (555) 0125",
    bio: "Financial Risk Analyst.",
    programs: [],
    reportsTo: "staff-3",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 20) HR Staff => staff-18
  // ──────────────────────────────────────────────
  {
    id: "staff-18",
    name: "William Park",
    jobTitle: "HR Staff",
    role: "Staff",
    department: "Human Resources",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=William",
    email: "william.park@company.com",
    phone: "+1 (555) 0126",
    bio: "Employee Relations Specialist.",
    programs: [],
    reportsTo: "staff-5",
    status: "On Probation",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 21) Tech Staff => staff-19
  // ──────────────────────────────────────────────
  {
    id: "staff-19",
    name: "Isabella Garcia",
    jobTitle: "Tech Staff",
    role: "Staff",
    department: "Technology",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
    email: "isabella.garcia@company.com",
    phone: "+1 (555) 0127",
    bio: "Software Development Lead.",
    programs: [],
    reportsTo: "staff-4",
    status: "Active",
    location: "Barcelona Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 22) Finance Staff => staff-20
  // ──────────────────────────────────────────────
  {
    id: "staff-20",
    name: "Nathan Wright",
    jobTitle: "Finance Staff",
    role: "Staff",
    department: "Finance",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nathan",
    email: "nathan.wright@company.com",
    phone: "+1 (555) 0128",
    bio: "Budget Planning Specialist.",
    programs: [],
    reportsTo: "staff-3",
    status: "Contractual",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 23) Executive Staff => staff-21
  // ──────────────────────────────────────────────
  {
    id: "staff-21",
    name: "Oliver Chen",
    jobTitle: "Executive Staff",
    role: "Staff",
    department: "Executive",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
    email: "oliver.chen@company.com",
    phone: "+1 (555) 0129",
    bio: "Strategic Planning Coordinator.",
    programs: [],
    reportsTo: "staff-1",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 24) HR Staff => staff-22
  // ──────────────────────────────────────────────
  {
    id: "staff-22",
    name: "Ava Thompson",
    jobTitle: "HR Staff",
    role: "Staff",
    department: "Human Resources",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
    email: "ava.thompson@company.com",
    phone: "+1 (555) 0130",
    bio: "Recruitment Specialist.",
    programs: [],
    reportsTo: "staff-5",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 25) Tech Staff => staff-23
  // ──────────────────────────────────────────────
  {
    id: "staff-23",
    name: "Lucas Kim",
    jobTitle: "Tech Staff",
    role: "Staff",
    department: "Technology",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    email: "lucas.kim@company.com",
    phone: "+1 (555) 0131",
    bio: "Cloud Infrastructure Engineer.",
    programs: [],
    reportsTo: "staff-4",
    status: "Active",
    location: "Barcelona Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 26) Finance Staff => staff-24
  // ──────────────────────────────────────────────
  {
    id: "staff-24",
    name: "Mia Patel",
    jobTitle: "Finance Staff",
    role: "Staff",
    department: "Finance",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
    email: "mia.patel@company.com",
    phone: "+1 (555) 0132",
    bio: "Compliance Officer.",
    programs: [],
    reportsTo: "staff-3",
    status: "On Leave",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 27) HR Staff => staff-25
  // ──────────────────────────────────────────────
  {
    id: "staff-25",
    name: "Ethan Cooper",
    jobTitle: "HR Staff",
    role: "Staff",
    department: "Human Resources",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    email: "ethan.cooper@company.com",
    phone: "+1 (555) 0133",
    bio: "Training Program Developer.",
    programs: [],
    reportsTo: "staff-5",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 28) Tech Staff => staff-26
  // ──────────────────────────────────────────────
  {
    id: "staff-26",
    name: "Charlotte Lee",
    jobTitle: "Tech Staff",
    role: "Staff",
    department: "Technology",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlotte",
    email: "charlotte.lee@company.com",
    phone: "+1 (555) 0134",
    bio: "Quality Assurance Lead.",
    programs: [],
    reportsTo: "staff-4",
    status: "Active",
    location: "Barcelona Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 29) Finance Staff => staff-27
  // ──────────────────────────────────────────────
  {
    id: "staff-27",
    name: "Benjamin Wilson",
    jobTitle: "Finance Staff",
    role: "Staff",
    department: "Finance",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin",
    email: "benjamin.wilson@company.com",
    phone: "+1 (555) 0135",
    bio: "Investment Analyst.",
    programs: [],
    reportsTo: "staff-3",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 30) Marketing Director => staff-28
  // ──────────────────────────────────────────────
  {
    id: "staff-28",
    name: "Victoria Martinez",
    jobTitle: "Marketing Director",
    role: "Staff",
    department: "Marketing",
    isDirector: true, // She is a director-level staff (not an academic program director)
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria",
    email: "victoria.martinez@company.com",
    phone: "+1 (555) 0136",
    bio: "Oversees all marketing and communications initiatives.",
    programs: [],
    reportsTo: "staff-1", // CEO
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 31) HR Staff => staff-29
  // ──────────────────────────────────────────────
  {
    id: "staff-29",
    name: "Henry Taylor",
    jobTitle: "HR Staff",
    role: "Staff",
    department: "Human Resources",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henry",
    email: "henry.taylor@company.com",
    phone: "+1 (555) 0137",
    bio: "Employee Engagement Specialist.",
    programs: [],
    reportsTo: "staff-5",
    status: "On Leave",
    location: "Madrid Campus",
  },

  //
  // ──────────────────────────────────────────────
  // 32) Tech Staff => staff-30
  // ──────────────────────────────────────────────
  {
    id: "staff-30",
    name: "Scarlett Wong",
    jobTitle: "Tech Staff",
    role: "Staff",
    department: "Technology",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Scarlett",
    email: "scarlett.wong@company.com",
    phone: "+1 (555) 0138",
    bio: "Data Center Operations Manager.",
    programs: [],
    reportsTo: "staff-4",
    status: "Active",
    location: "Barcelona Campus",
  },

  //
  // 33) Finance Staff => staff-31
  {
    id: "staff-31",
    name: "Sebastian Ross",
    jobTitle: "Finance Staff",
    role: "Staff",
    department: "Finance",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian",
    email: "sebastian.ross@company.com",
    phone: "+1 (555) 0139",
    bio: "Treasury Analyst.",
    programs: [],
    reportsTo: "staff-3",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // 34) HR Staff => staff-32
  {
    id: "staff-32",
    name: "Zoe Anderson",
    jobTitle: "HR Staff",
    role: "Staff",
    department: "Human Resources",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
    email: "zoe.anderson@company.com",
    phone: "+1 (555) 0140",
    bio: "Diversity and Inclusion Coordinator.",
    programs: [],
    reportsTo: "staff-5",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // 35) Tech Staff => staff-33
  {
    id: "staff-33",
    name: "Christopher Lee",
    jobTitle: "Tech Staff",
    role: "Staff",
    department: "Technology",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher",
    email: "christopher.lee@company.com",
    phone: "+1 (555) 0141",
    bio: "Information Security Analyst.",
    programs: [],
    reportsTo: "staff-4",
    status: "Active",
    location: "Barcelona Campus",
  },

  //
  // 36) Finance Staff => staff-34
  {
    id: "staff-34",
    name: "Madison Clark",
    jobTitle: "Finance Staff",
    role: "Staff",
    department: "Finance",
    isDirector: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Madison",
    email: "madison.clark@company.com",
    phone: "+1 (555) 0142",
    bio: "Accounting Operations Manager.",
    programs: [],
    reportsTo: "staff-3",
    status: "Active",
    location: "Madrid Campus",
  },

  //
  // 37) Sales Director => staff-35
  {
    id: "staff-35",
    name: "Gabriel Santos",
    jobTitle: "Sales Director",
    role: "Staff",
    department: "Sales",
    isDirector: true, // Director-level staff
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel",
    email: "gabriel.santos@company.com",
    phone: "+1 (555) 0143",
    bio: "Oversees business development and sales strategies.",
    programs: [],
    reportsTo: "staff-1", // CEO
    status: "Probationary",
    location: "Madrid Campus",
  },
  //
  // ──────────────────────────────────────────────
  // 6) Program Directors: Science, Computer Science, Mathematics
  //    Under CAO (staff-2)
  // ──────────────────────────────────────────────
  {
    id: "program-dir-1",
    name: "Richard Chen",
    role: "Program Director",
    jobTitle: "Science Program Director",
    department: "Academic",
    isDirector: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Richard",
    email: "richard.chen@company.com",
    phone: "+1 (555) 0112",
    bio: "Experienced science educator with a focus on practical applications.",
    programs: [
      "Computer Entrepreneurship Bachelor (2409CEB1)",
      "Bootcamp en Diseño UX/UI (2410BUXS)",
      "Bootcamp en Cloud Computing & DevOps (2410BCCS)",
    ],
    reportsTo: "staff-2", // The CAO
    status: "Active",
    location: "Barcelona Campus",
  },
  {
    id: "program-dir-2",
    name: "Karen Smith",
    role: "Program Director",
    jobTitle: "Science Program Director",
    department: "Academic",
    isDirector: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karen",
    email: "karen@company.com",
    phone: "+1 (555) 0112",
    bio: "Experienced computer science educator with a focus on practical applications.",
    programs: [
      "Computer Entrepreneurship Bachelor (2409CEB1)",
      "Bootcamp en Diseño UX/UI (2410BUXS)",
      "Bootcamp en Cloud Computing & DevOps (2410BCCS)",
    ],
    reportsTo: "staff-2", // The CAO
    status: "Active",
    location: "Barcelona Campus",
  },
  {
    id: "program-dir-3",
    name: "Michael Johnson",
    role: "Program Director",
    jobTitle: "Science Program Director",
    department: "Academic",
    isDirector: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    email: "michael@company.com",
    phone: "+1 (555) 0112",
    bio: "Experienced mathematics educator with a focus on practical applications.",
    programs: [
      "Computer Entrepreneurship Bachelor (2409CEB1)",
      "Bootcamp en Diseño UX/UI (2410BUXS)",
      "Bootcamp en Cloud Computing & DevOps (2410BCCS)",
    ],
    reportsTo: "staff-2", // The CAO
    status: "Active",
    location: "Barcelona Campus",
  },
];

function generateTeachers(startIndex: number, count: number): TeamMember[] {
  const teacherNames = [
    "Adam",
    "Brian",
    "Carla",
    "Diana",
    "Evelyn",
    "Francis",
    "Gina",
    "Hank",
    "Irene",
    "Jason",
    "Karla",
    "Louis",
    "Monica",
    "Neil",
    "Olga",
    "Peter",
    "Quincy",
    "Rita",
    "Steven",
    "Tina",
    "Ursula",
    "Victor",
    "Wendy",
    "Xavier",
    "Yvonne",
    "Zack",
    "Alice",
    "Brandon",
    "Cindy",
    "Derek",
    "Elena",
    "Frank",
    "Grace",
    "Harvey",
    "Ingrid",
    "Jonah",
    "Kelly",
    "Leo",
    "Marisol",
    "Nina",
  ];
  // ^ That’s exactly 40 names. Use as many or as few as you like

  const teacherCount = Math.min(count, teacherNames.length); // or keep it simpler

  return Array.from({ length: teacherCount }, (_, i) => {
    const index = i + startIndex; // e.g. teacher-3, teacher-4, ...
    const firstName = teacherNames[i];
    const lastName = "Teacher"; // or pick from another array
    const teacherId = `teacher-${index}`;

    return {
      id: teacherId,
      name: `${firstName} ${lastName}`,
      role: "Teacher",
      jobTitle: "Teacher",
      department: "Academic",
      isDirector: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      phone: `+1 (555) 0${100 + index}`, // Just a sample for uniqueness
      bio: `Teacher specializing in advanced topics of ${firstName}'s domain.`,
      programs: [],
      reportsTo: "program-dir-1", // or pick randomly if you have multiple Program Dirs
      status:
        statusOptions.Teacher[
          Math.floor(Math.random() * statusOptions.Teacher.length)
        ],
      location: locations[Math.floor(Math.random() * locations.length)],
    };
  });
}

// Function to generate additional students
function generateStudents(startIndex: number, count: number): TeamMember[] {
  const studentNames = [
    "Emma",
    "Liam",
    "Olivia",
    "Noah",
    "Ava",
    "Isabella",
    "Sophia",
    "Mia",
    "Charlotte",
    "Amelia",
    "Harper",
    "Evelyn",
    "Abigail",
    "Emily",
    "Elizabeth",
    "Sofia",
    "Avery",
    "Ella",
    "Scarlett",
    "Grace",
    "Victoria",
    "Riley",
    "Aria",
    "Lily",
    "Aurora",
    "Zoey",
    "Willow",
    "Luna",
    "Savannah",
    "Maya",
    "Audrey",
    "Brooklyn",
    "Bella",
    "Claire",
    "Skylar",
    "Lucy",
    "Paisley",
    "Everly",
    "Anna",
    "Caroline",
    "James",
    "William",
    "Oliver",
    "Benjamin",
    "Elijah",
    "Lucas",
    "Mason",
    "Logan",
    "Alexander",
    "Ethan",
    "Jacob",
    "Michael",
    "Daniel",
    "Henry",
    "Jackson",
    "Sebastian",
    "Jack",
    "Aiden",
    "Owen",
    "Samuel",
    "Matthew",
    "Joseph",
    "Levi",
    "Mateo",
    "David",
    "John",
    "Wyatt",
    "Carter",
    "Julian",
    "Luke",
    "Grayson",
    "Isaac",
    "Jayden",
    "Theodore",
    "Gabriel",
    "Anthony",
    "Dylan",
    "Leo",
    "Lincoln",
    "Jaxon",
    "Asher",
    "Christopher",
    "Josiah",
    "Andrew",
    "Thomas",
    "Joshua",
    "Ezra",
    "Hudson",
    "Charles",
    "Caleb",
    "Isaiah",
    "Ryan",
    "Nathan",
    "Adrian",
    "Christian",
    "Maverick",
    // ... etc. Add more if you want more variety
  ];
  const studentDepartments = ["Computer Science", "Mathematics", "Science"];

  return Array.from({ length: count }, (_, i) => {
    const index = i + startIndex; // e.g. 4..200
    // Just pick a random first name from the studentNames array:
    const firstName =
      studentNames[Math.floor(Math.random() * studentNames.length)];
    const lastName = "Student"; // or pick from a lastName array if you prefer
    const studentId = `student-${index}`;

    return {
      id: studentId,
      name: `${firstName} ${lastName}`,
      role: "Student",
      jobTitle: "Student",
      department:
        studentDepartments[
          Math.floor(Math.random() * studentDepartments.length)
        ],
      isDirector: false,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      phone: `+1 (555) 02${String(100 + i).padStart(2, "0")}`,
      bio: `A dedicated student in ${firstName}'s path.`,
      programs: [],
      // Pick who they "report to"; for example:
      reportsTo: "staff-6", // All students report to Robert Chen (finance) or any staff you want
      status:
        statusOptions.Student[
          Math.floor(Math.random() * statusOptions.Student.length)
        ],
      location: locations[Math.floor(Math.random() * locations.length)],
    };
  });
}

// Generate additional teachers
const additionalTeachers = generateTeachers(0, 38);
// Generate additional students
const additionalStudents = generateStudents(0, 200);

// Export the combined team members
export const mockTeamMembers: TeamMember[] = [
  ...initialTeamMembers,
  ...additionalTeachers,
  ...additionalStudents,
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
    id: "student-1",
    name: "John Smith",
    scores: {
      mathematics: 85,
      science: 92,
      programming: 88,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "student-2",
    name: "Emily Brown",
    scores: {
      mathematics: 95,
      science: 88,
      programming: 91,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: "student-3",
    name: "Michael Johnson",
    scores: {
      mathematics: 78,
      science: 85,
      programming: 94,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "student-4",
    name: "Sarah Davis",
    scores: {
      mathematics: 92,
      science: 90,
      programming: 87,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "student-5",
    name: "Alex Martinez",
    scores: {
      mathematics: 88,
      science: 91,
      programming: 85,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    id: "student-6",
    name: "Lisa Wang",
    scores: {
      mathematics: 94,
      science: 89,
      programming: 92,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
  },
  {
    id: "student-7",
    name: "Daniel Lee",
    scores: {
      mathematics: 91,
      science: 88,
      programming: 95,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
  },
  {
    id: "student-8",
    name: "Rachel Chen",
    scores: {
      mathematics: 89,
      science: 94,
      programming: 87,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
  },
  {
    id: "student-9",
    name: "Kevin Patel",
    scores: {
      mathematics: 83,
      science: 86,
      programming: 90,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin",
  },
  {
    id: "student-10",
    name: "Sofia Rodriguez",
    scores: {
      mathematics: 96,
      science: 92,
      programming: 89,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
  },
  {
    id: "student-11",
    name: "Ryan Thompson",
    scores: {
      mathematics: 87,
      science: 85,
      programming: 93,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
  },
  {
    id: "student-12",
    name: "Emma Wilson",
    scores: {
      mathematics: 92,
      science: 88,
      programming: 86,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  {
    id: "student-13",
    name: "Lucas Kim",
    scores: {
      mathematics: 90,
      science: 93,
      programming: 91,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
  },
  {
    id: "student-14",
    name: "Isabella Garcia",
    scores: {
      mathematics: 88,
      science: 91,
      programming: 94,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
  },
  {
    id: "student-15",
    name: "Nathan Wright",
    scores: {
      mathematics: 85,
      science: 89,
      programming: 92,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nathan",
  },
  {
    id: "student-16",
    name: "Olivia Chen",
    scores: {
      mathematics: 93,
      science: 90,
      programming: 88,
    },
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
  },
];

const calculateAverageScore = (students: Student[]) => {
  const totalScores = students.reduce((acc, student) => {
    const studentAvg =
      (student.scores.mathematics +
        student.scores.science +
        student.scores.programming) /
      3;
    return acc + studentAvg;
  }, 0);
  return Math.round(totalScores / students.length);
};

export const mockModuleCatalog = [
  {
    id: "module-1",
    name: "PreWork",
    description: "Basics of IT and Cloud value.",
    credits: 3,
    costPerCredit: 100,
    syncHours: 6,
    asyncHours: 0,
    competencies:
      "Cloud Computing, DevOps, IT, Cloud Computing, DevOps, IT, Cloud Computing, DevOps,",
    tools: "None",
    syllabus: `
      - Introduction to Cloud Computing
      - Introduction to DevOps
      - Introduction to IT
    `,
    objectives:
      "This module lays the foundation for your journey by introducing essential IT concepts and cloud computing fundamentals. Students will gain a clear understanding of the technological landscape, preparing them for more advanced topics throughout the program.",
  },
  {
    id: "module-2",
    name: "Automation with PowerShell",
    description: "Introduction to PowerShell and its usage.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 15,
    asyncHours: 12,
    competencies: "Problem Solving, Coding, Automation, CLI",
    tools: "CLI, PowerShell",
    syllabus: `
      - Introduction to PowerShell
      - Variables and Operators
      - Functions and Scripting
      - Automation and Scripting
    `,
    objectives:
      "In this module, learners will master the fundamentals of PowerShell scripting to automate routine tasks. The focus is on developing problem-solving skills through coding, understanding variables, operators, and crafting reusable scripts to enhance productivity.",
  },
  {
    id: "module-3",
    name: "Azure Cloud Adminisration",
    description: "Introduction to Azure and its usage.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 60,
    asyncHours: 39,
    competencies: "Cloud Services and Administration",
    tools: "Azure Portal, DrawIO",
    syllabus: `
      - Introduction to Azure
      - Azure Services
      - Azure Administration
      - Azure Networking
    `,
    objectives:
      "This module introduces the Azure cloud platform with an emphasis on practical administration. Students will learn to deploy, manage, and secure cloud resources while gaining hands-on experience with the Azure portal and associated networking services.",
  },
  {
    id: "module-4",
    name: "AWS Assoc Architect",
    description: "Introduction to AWS and its usage.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 45,
    asyncHours: 24,
    competencies: "Cloud Services and Architecture",
    tools: "AWS Console, AWS Academy",
    syllabus: `
      - Introduction to AWS
      - AWS Services
      - AWS Architecture
      - AWS Networking
    `,
    objectives:
      "This module is designed to build a strong foundation in AWS architecture. Students will explore core AWS services and learn best practices for designing scalable, secure cloud environments. The module emphasizes hands-on experience with the AWS Console to solidify architectural principles.",
  },
  {
    id: "module-5",
    name: "GCP Assoc Cloud Engineer",
    description: "Introduction to GCP and its usage.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 30,
    asyncHours: 21,
    competencies: "Cloud Services and Administration",
    tools: "GCP Console, DrawIO",
    syllabus: `
      - Introduction to GCP
      - GCP Services
      - GCP Administration
      - GCP Networking
    `,
    objectives:
      "Focusing on the Google Cloud Platform, this module provides essential insights into cloud infrastructure management. Students will gain the skills necessary to deploy, administer, and secure GCP services while understanding the fundamentals of cloud networking.",
  },
  {
    id: "module-6",
    name: "DevOps Engineer",
    description: "Introduction to DevOps.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 40,
    asyncHours: 20,
    competencies: "Code and release management",
    tools: "Azure DevOps, PowerShell",
    syllabus: `
      - Introduction to DevOps
      - Code Management
      - Release Management
      - DevOps Tools
    `,
    objectives:
      "This module introduces the principles and practices of DevOps, emphasizing the integration of development and operations. Students will learn how to streamline the software delivery process by mastering code management, continuous integration, and deployment techniques using industry-standard tools.",
  },
  {
    id: "module-7",
    name: "Capstone",
    description: "Final program.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 33,
    asyncHours: 0,
    competencies: "Team work and program development",
    tools: "",
    syllabus: `
      - Team work
      - Program Development
      - Final Project
    `,
    objectives:
      "The Capstone module is the culmination of the learning experience. Students will work in teams to integrate and apply their acquired skills in a comprehensive project that simulates real-world challenges, reinforcing both technical and collaborative competencies.",
  },
  {
    id: "module-8",
    name: "Introducción a la Ciberseguridad",
    description: "Conceptos básicos, amenazas y vulnerabilidades.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 25,
    asyncHours: 15,
    competencies: "Fundamentals, Networking, Attack Vectors",
    tools: "Wireshark, Linux CLI",
    syllabus: `
      - Conceptos básicos
      - Amenazas y vulnerabilidades
      - Herramientas de seguridad
    `,
    objectives:
      "Este módulo introduce los conceptos fundamentales de la ciberseguridad, explorando las amenazas, vulnerabilidades y técnicas de mitigación. Los estudiantes aprenderán a identificar riesgos y utilizar herramientas básicas para proteger infraestructuras y datos críticos.",
  },
  {
    id: "module-9",
    name: "Pentesting & Ethical Hacking",
    description: "Metodologías de pruebas de penetración.",
    credits: 5,
    costPerCredit: 100,
    syncHours: 35,
    asyncHours: 15,
    competencies: "PenTesting, Ethical Hacking, Vulnerability Scans",
    tools: "Kali Linux, Metasploit",
    syllabus: `
      - Metodologías de pruebas de penetración
      - Herramientas de hacking ético
      - Escaneo de vulnerabilidades
    `,
    objectives:
      "This module empowers students to think like ethical hackers. It covers penetration testing methodologies and the practical use of tools such as Kali Linux and Metasploit to identify vulnerabilities, thereby preparing students to conduct systematic and ethical security assessments.",
  },
  {
    id: "module-10",
    name: "Seguridad en Redes y Sistemas",
    description: "Arquitectura de redes, firewalls y sistemas seguros.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 25,
    asyncHours: 10,
    competencies: "Network Security, Hardening, Firewalls",
    tools: "Cisco Packet Tracer, pfSense",
    syllabus: `
      - Arquitectura de redes
      - Hardening de sistemas
      - Firewalls y seguridad perimetral
    `,
    objectives:
      "Designed to enhance understanding of secure network and system architectures, this module focuses on the implementation of firewalls and system hardening techniques. Students will learn to design robust security frameworks to protect digital assets and critical infrastructures.",
  },
  {
    id: "module-11",
    name: "Criptografía y Protocolos Seguros",
    description: "Conceptos de cifrado, SSL/TLS, PKI y mejores prácticas.",
    credits: 3,
    costPerCredit: 100,
    syncHours: 20,
    asyncHours: 0,
    competencies: "Cryptography, PKI, SSL, TLS",
    tools: "OpenSSL, GPG",
    syllabus: `
      - Conceptos de cifrado
      - SSL/TLS y PKI
      - Mejores prácticas de seguridad
    `,
    objectives:
      "This module delves into the world of cryptography and secure communications. Students will explore encryption techniques, understand the role of SSL/TLS and PKI in data security, and learn best practices for implementing robust security protocols.",
  },
  {
    id: "module-12",
    name: "Fundamentos de UX",
    description:
      "Proceso de diseño centrado en el usuario, research y prototipado rápido.",
    credits: 3,
    costPerCredit: 100,
    syncHours: 15,
    asyncHours: 10,
    competencies: "User Research, Wireframing",
    tools: "Figma, Miro",
    syllabus: `
      - Proceso de diseño centrado en el usuario
      - Investigación de usuarios
      - Prototipado rápido
    `,
    objectives:
      "En este módulo se establecen las bases del diseño de experiencia de usuario (UX). Los estudiantes aprenderán a realizar investigaciones con usuarios, crear wireframes y prototipos, y a iterar en diseños para asegurar soluciones intuitivas y centradas en el usuario.",
  },
  {
    id: "module-13",
    name: "Interfaz de Usuario (UI)",
    description:
      "Diseño visual, tipografía, color y componentes de interacción.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 20,
    asyncHours: 10,
    competencies: "Visual Design, Layout, Branding",
    tools: "Sketch, Adobe XD",
    syllabus: `
      - Diseño visual
      - Tipografía y color
      - Componentes de interacción
    `,
    objectives:
      "Focusing on the visual side of design, this module explores key aspects of UI including layout, typography, color theory, and interactive components. Students will develop the skills necessary to create aesthetically pleasing and functional interfaces that align with modern design trends.",
  },
  {
    id: "module-14",
    name: "Usabilidad y Pruebas de Usuario",
    description: "Evaluación heurística y testing con usuarios.",
    credits: 3,
    costPerCredit: 100,
    syncHours: 15,
    asyncHours: 0,
    competencies: "Usability Testing, Iteration",
    tools: "UserTesting, Maze",
    syllabus: `
      - Evaluación heurística
      - Testing con usuarios
      - Iteración y mejora continua
    `,
    objectives:
      "This module emphasizes the importance of usability in design. Students will learn how to conduct heuristic evaluations and user tests, using the insights gained to iterate and refine interfaces to maximize user satisfaction and efficiency.",
  },
  {
    id: "module-15",
    name: "Fundamentos de Análisis de Datos",
    description:
      "Introducción a la recolección, limpieza y manipulación de datos.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 25,
    asyncHours: 15,
    competencies: "Data Wrangling, Python, Excel",
    tools: "Python, Jupyter, Excel",
    syllabus: `
      - Introducción al análisis de datos
      - Recolección y limpieza de datos
      - Manipulación de datos
    `,
    objectives:
      "This module introduces the core principles of data analysis. Learners will understand how to collect, clean, and manipulate data using popular tools and programming languages, laying the groundwork for more advanced analytical techniques.",
  },
  {
    id: "module-16",
    name: "Visualización y Business Intelligence",
    description: "Técnicas de reporting y dashboards.",
    credits: 3,
    costPerCredit: 100,
    syncHours: 20,
    asyncHours: 10,
    competencies: "Data Viz, Tableau, Power BI",
    tools: "Tableau, Power BI",
    syllabus: `
      - Técnicas de reporting
      - Dashboards interactivos
      - Business Intelligence
    `,
    objectives:
      "Focusing on the transformation of data into insights, this module teaches students how to create effective data visualizations and interactive dashboards. The course covers the use of industry-standard BI tools to support decision-making processes.",
  },
  {
    id: "module-17",
    name: "Estadística y Modelos Predictivos",
    description:
      "Análisis estadístico, regresiones y algoritmos de Machine Learning básicos.",
    credits: 5,
    costPerCredit: 100,
    syncHours: 30,
    asyncHours: 20,
    competencies: "Statistics, Regression, Intro ML",
    tools: "Python, scikit-learn",
    syllabus: `
      - Análisis estadístico
      - Regresiones
      - Modelos predictivos básicos
    `,
    objectives:
      "This module covers the essentials of statistical analysis and predictive modeling. Students will learn how to apply regression techniques and basic machine learning algorithms to forecast trends, interpret data patterns, and make data-driven predictions.",
  },
  {
    id: "module-18",
    name: "Frontend Fundamentals",
    description: "HTML, CSS y JavaScript para crear interfaces de usuario.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 30,
    asyncHours: 10,
    competencies: "HTML, CSS, JavaScript",
    tools: "VSCode, Chrome DevTools",
    syllabus: `
      - HTML y CSS
      - JavaScript básico
      - DOM y eventos
    `,
    objectives:
      "This module establishes the basics of front-end web development. Students will learn to build responsive and interactive interfaces using HTML, CSS, and JavaScript, gaining an understanding of the Document Object Model (DOM) and event-driven programming.",
  },
  {
    id: "module-19",
    name: "Frontend Frameworks",
    description: "Aprender React, Vue o Angular para aplicaciones SPA.",
    credits: 3,
    costPerCredit: 100,
    syncHours: 20,
    asyncHours: 10,
    competencies: "SPA, React, Vue",
    tools: "Node, NPM",
    syllabus: `
      - React, Vue o Angular
      - Componentes y props
      - Routing y state management
    `,
    objectives:
      "Building on frontend fundamentals, this module introduces modern frameworks like React, Vue, or Angular. Students will learn about component-based architecture, state management, and routing to create dynamic single-page applications (SPAs) with ease.",
  },
  {
    id: "module-20",
    name: "Backend con Node.js",
    description: "APIs REST, bases de datos y autenticación.",
    credits: 5,
    costPerCredit: 100,
    syncHours: 35,
    asyncHours: 15,
    competencies: "Node, Express, SQL/NoSQL",
    tools: "Postman, MongoDB, MySQL",
    syllabus: `
      - APIs REST
      - Bases de datos
      - Autenticación y autorización
    `,
    objectives:
      "This module provides an in-depth look at backend development using Node.js and Express. Students will learn how to build RESTful APIs, integrate various databases (both SQL and NoSQL), and implement robust authentication mechanisms to secure their applications.",
  },
  {
    id: "module-21",
    name: "Fundamentos de IA y Machine Learning",
    description: "Historia de la IA, aprendizaje supervisado y no supervisado.",
    credits: 4,
    costPerCredit: 100,
    syncHours: 25,
    asyncHours: 15,
    competencies: "ML Basics, Classification, Clustering",
    tools: "Python, scikit-learn",
    syllabus: `
      - Historia de la IA
      - Aprendizaje supervisado
      - Aprendizaje no supervisado
    `,
    objectives:
      "Introducing the world of artificial intelligence, this module covers the historical context and fundamental concepts of AI and machine learning. Students will explore both supervised and unsupervised learning techniques, setting the stage for more advanced AI studies.",
  },
  {
    id: "module-22",
    name: "Redes Neuronales y Deep Learning",
    description: "Arquitecturas de redes, backpropagation y frameworks.",
    credits: 5,
    costPerCredit: 100,
    syncHours: 40,
    asyncHours: 20,
    competencies: "Neural Networks, CNNs, RNNs",
    tools: "TensorFlow, Keras, PyTorch",
    syllabus: `
      - Redes neuronales
      - Convolutional NNs
      - Recurrent NNs
    `,
    objectives:
      "Delving into the advanced realm of deep learning, this module covers the design and training of neural networks. Students will learn about various architectures, including CNNs and RNNs, and gain hands-on experience with frameworks such as TensorFlow, Keras, and PyTorch.",
  },
  {
    id: "module-23",
    name: "Procesamiento de Lenguaje Natural",
    description: "Text analytics, embeddings y chatbots.",
    credits: 3,
    costPerCredit: 100,
    syncHours: 15,
    asyncHours: 10,
    competencies: "NLP, Word Embeddings, Transformers",
    tools: "NLTK, SpaCy, HuggingFace",
    syllabus: `
      - Análisis de texto
      - Word embeddings
      - Chatbots y asistentes virtuales
    `,
    objectives:
      "This module explores the fundamentals of Natural Language Processing (NLP). Students will learn techniques for text analytics, understand how word embeddings and transformer models work, and develop applications like chatbots and virtual assistants using cutting-edge tools.",
  },
  {
    id: "module-24",
    name: "Visión por Computadora",
    description: "Procesamiento de imágenes y detección de objetos.",
    credits: 3,
    costPerCredit: 100,
    syncHours: 15,
    asyncHours: 5,
    competencies: "OpenCV, Image Classification",
    tools: "OpenCV, TensorFlow",
    syllabus: `
      - Procesamiento de imágenes
      - Detección de objetos
      - Clasificación de imágenes
    `,
    objectives:
      "This module introduces students to the principles of computer vision. By exploring image processing techniques and object detection methodologies, learners will be equipped to build systems that can interpret and classify visual data using tools like OpenCV and TensorFlow.",
  },
];

export const mockPrograms = [
  {
    id: "program-1",
    name: "Bootcamp en Cloud Computing & Devops",
    progress: 65,
    directors: [
      mockTeamMembers.find((m) => m.id === "program-dir-2") as TeamMember,
    ],
    studentCount: 35,
    students: mockStudents.slice(0, 6),
    avgScore: calculateAverageScore(mockStudents.slice(0, 6)),
    modules: [
      "module-1",
      "module-2",
      "module-3",
      "module-4",
      "module-5",
      "module-6",
      "module-7",
    ],
    intakes: [
      {
        id: "intake-1",
        name: "2410BCCS",
        modality: "Online",
        schedule: {
          days: [
            {
              dayId: "Monday",
              startTime: "19:00",
              endTime: "22:00",
              enabled: true,
            },
            {
              dayId: "Tuesday",
              startTime: "19:00",
              endTime: "22:00",
              enabled: true,
            },
            {
              dayId: "Wednesday",
              startTime: "19:00",
              endTime: "22:00",
              enabled: true,
            },
            {
              dayId: "Thursday",
              startTime: "19:00",
              endTime: "22:00",
              enabled: true,
            },
          ],
        },
        groups: [
          {
            id: "group-1",
            name: "Group A",
            status: "full",
            capacity: 30,
            costPerStudent: 500,
            moduleTeachers: [
              { moduleId: "module-1", teacherIds: ["teacher-1"] },
              { moduleId: "module-2", teacherIds: ["teacher-1"] },
              { moduleId: "module-3", teacherIds: ["teacher-1"] },
              { moduleId: "module-4", teacherIds: ["teacher-2"] },
              { moduleId: "module-5", teacherIds: ["teacher-3"] },
              {
                moduleId: "module-6",
                teacherIds: ["teacher-4", "teacher-5", "teacher-6"],
              },
              { moduleId: "module-7", teacherIds: ["teacher-1"] },
            ],
            studentIds: [
              "student-1",
              "student-2",
              "student-3",
              "student-4",
              "student-5",
              "student-6",
              "student-7",
              "student-8",
              "student-9",
              "student-10",
              "student-11",
              "student-12",
              "student-13",
              "student-14",
              "student-15",
              "student-16",
              "student-17",
              "student-18",
              "student-19",
              "student-20",
              "student-21",
              "student-22",
              "student-23",
              "student-24",
              "student-25",
              "student-26",
              "student-27",
              "student-28",
              "student-29",
              "student-30",
            ],
          },
          {
            id: "group-2",
            name: "Group B",
            status: "open",
            capacity: 25,
            costPerStudent: 500,
            moduleTeachers: [
              { moduleId: "module-1", teacherIds: ["teacher-8"] },
              { moduleId: "module-2", teacherIds: ["teacher-9"] },
              {
                moduleId: "module-3",
                teacherIds: ["teacher-10", "teacher-11"],
              },
              { moduleId: "module-4", teacherIds: ["teacher-8"] },
              { moduleId: "module-5", teacherIds: [] },
              { moduleId: "module-6", teacherIds: [] },
              { moduleId: "module-7", teacherIds: [] },
            ],
            studentIds: [
              "student-31",
              "student-32",
              "student-33",
              "student-34",
              "student-35",
            ],
          },
        ],
      },
    ],
    area: "Cloud Computing",
    type: "Bootcamp",
    totalHours: 339,
    description: `El Curso Executive de Cloud Computing y DevOps está diseñado para profesionales de TI, desarrolladores de software, gerentes de proyecto y consultores de tecnología que desean adquirir habilidades avanzadas en cloud computing y DevOps. A lo largo del curso, los participantes aprenderán a diseñar, implementar y gestionar soluciones en la nube, así como a aplicar prácticas de DevOps para mejorar la colaboración y la eficiencia en los equipos de desarrollo y operaciones.  `,
    prerequisites: `Conocimientos básicos de informática y sistemas operativos.`,
    targetAudience: `El Curso Executive de Cloud Computing y DevOps está dirigido a:
    - Profesionales de TI: Ingenieros de sistemas, administradores de sistemas y arquitectos de infraestructura que buscan ampliar sus conocimientos y habilidades en cloud computing y DevOps.
    - Desarrolladores de Software: Programadores y desarrolladores que desean especializarse en el diseño, implementación y gestión de soluciones en la nube.
    - Gerentes y Líderes de Proyecto: Profesionales que gestionan proyectos tecnológicos y desean adquirir habilidades avanzadas en gestión de proyectos y estrategias de negocio en el entorno cloud.
    - Consultores de Tecnología: Expertos que asesoran a empresas en la implementación y optimización de soluciones tecnológicas y desean mejorar sus competencias en arquitecturas cloud y DevOps.
    - Emprendedores y Directivos: Líderes empresariales y emprendedores que buscan integrar soluciones cloud y DevOps en sus estrategias empresariales para impulsar la innovación y la eficiencia operativa.
    - Profesionales Certificados: Aquellos con certificaciones iniciales en cloud computing (Azure, AWS, GCP) y DevOps que desean avanzar a niveles más altos de especialización.`,
    objectives: `El Curso Executive de Cloud Computing y DevOps está dirigido a: 

      - Profesionales de TI: Ingenieros de sistemas, administradores de sistemas y arquitectos de infraestructura que buscan ampliar sus conocimientos y habilidades en cloud computing y DevOps.
      - Desarrolladores de Software: Programadores y desarrolladores que desean especializarse en el diseño, implementación y gestión de soluciones en la nube.
      - Gerentes y Líderes de Proyecto: Profesionales que gestionan proyectos tecnológicos y desean adquirir habilidades avanzadas en gestión de proyectos y estrategias de negocio en el entorno cloud.
      - Consultores de Tecnología: Expertos que asesoran a empresas en la implementación y optimización de soluciones tecnológicas y desean mejorar sus competencias en arquitecturas cloud y DevOps.
      - Emprendedores y Directivos: Líderes empresariales y emprendedores que buscan integrar soluciones cloud y DevOps en sus estrategias empresariales para impulsar la innovación y la eficiencia operativa.
      - Profesionales Certificados: Aquellos con certificaciones iniciales en cloud computing (Azure, AWS, GCP) y DevOps que desean avanzar a niveles más altos de especialización.`,
    whyChoose: ` -Demanda laboral y Reconocimiento en la industria: El crecimiento en la adopción de tecnologías en la nube y DevOps ha generado una gran Demanda de profesionales especializados, lo que significa excelentes oportunidades laborales y salarios competitivos en El mercado. la experiencia en plataformas líderes como Azure, AWS o GCP es altamente valorada por empresas de todos los tamaños y sectores, lo que mejora las perspectivas de empleo y crecimiento profesional. El Cloud Computing market size sigue creciendo con fuerza creando oportunidades de negocio entorno a él.

- Flexibilidad y escalabilidad: El dominio de Cloud Computing y DevOps permitirá a los profesionales diseñar, implementar y administrar soluciones escalables y flexibles, lo que les permitirá adaptarse rápidamente a las necesidades de las empresas y del mercado.

 - Habilidades técnicas y prácticas: Esta formacion cubre una amplia gama de habilidades técnicas y prácticas, desde migraciones y automatización hasta el desarrollo y diseño de soluciones en la nube, lo que permite a los profesionales convertirse en expertos multifuncionales.

- Innovación y adopción de tecnologías emergentes: Arquitecturas serverless, Infraestructura efímera y otros conceptos permitirán a los profesionales mantenerse actualizados en las últimas tendencias tecnológicas y contribuir al desarrollo de soluciones innovadoras.`,
    careerOpportunities: `- Cloud Architect: Diseñar y gestionar arquitecturas de soluciones en la nube para empresas, garantizando la escalabilidad, seguridad y eficiencia.
- DevOps Engineer: Implementar y gestionar procesos de desarrollo y operaciones, mejorando la integración continua y el despliegue continuo (CI/CD) en entornos cloud.
- Site Reliability Engineer (SRE): Asegurar la fiabilidad y disponibilidad de las aplicaciones y servicios en la nube, utilizando principios de ingeniería de software y operaciones.
- IT Program Manager: Gestionar proyectos tecnológicos complejos, aplicando metodologías ágiles y coordinando equipos de desarrollo y operaciones.
- Cloud Consultant: Asesorar a empresas en la adopción y optimización de soluciones en la nube, ayudándoles a mejorar su infraestructura y procesos.
- Data Engineer: Diseñar, construir y gestionar sistemas de procesamiento y almacenamiento de datos, incluyendo lagos de datos y soluciones analíticas.
- Infrastructure Engineer: Gestionar y optimizar la infraestructura de TI en la nube, asegurando la eficiencia y la seguridad de los recursos.
- Innovation Manager: Impulsar la innovación tecnológica dentro de la empresa, aplicando estrategias de transformación digital y análisis de datos.
- Security Engineer: Especializarse en la seguridad de la información en entornos cloud, gestionando la protección de datos y la implementación de políticas de seguridad.`,
    certifications: `Azure Solutions Architect (AZ-305)
AWS Solution Architect
GCP Professional Architect`,
  },
  {
    id: "program-2",
    name: "Bootcamp en Ciberseguridad",
    progress: 45,
    directors: [
      mockTeamMembers.find((m) => m.id === "program-dir-3") as TeamMember,
    ],
    studentCount: 25,
    students: mockStudents.slice(6, 12),
    avgScore: calculateAverageScore(mockStudents.slice(6, 12)),
    modules: ["module-8", "module-9", "module-10", "module-11"],
    intakes: [
      {
        id: "intake-2",
        name: "2409CYBS",
        modality: "Online",
        schedule: {
          days: [
            {
              dayId: "Monday",
              startTime: "18:00",
              endTime: "21:00",
              enabled: true,
            },
            {
              dayId: "Wednesday",
              startTime: "18:00",
              endTime: "21:00",
              enabled: true,
            },
          ],
        },
        groups: [
          {
            id: "group-3",
            name: "Group A",
            status: "open",
            capacity: 25,
            costPerStudent: 600,
            moduleTeachers: [
              { moduleId: "module-8", teacherIds: ["teacher-8"] },
              { moduleId: "module-9", teacherIds: ["teacher-9"] },
              { moduleId: "module-10", teacherIds: ["teacher-10"] },
              { moduleId: "module-11", teacherIds: ["teacher-11"] },
            ],
            studentIds: [
              "student-6",
              "student-7",
              "student-8",
              "student-9",
              "student-10",
              "student-11",
            ],
          },
        ],
      },
    ],
    area: "Cybersecurity",
    type: "Bootcamp",
    totalHours: 145,
    objectives: `Preparar a los estudiantes con las habilidades fundamentales y avanzadas necesarias para proteger infraestructuras y redes frente a ciberataques.`,
    whyChoose: `La ciberseguridad es un campo en pleno crecimiento, con gran demanda de profesionales y oportunidades laborales en múltiples industrias.`,
    careerOpportunities: `- Analista de Ciberseguridad
- Especialista en Pentesting
- Consultor de Seguridad
- Arquitecto de Seguridad de Redes`,
    certifications: `CompTIA Security+
CEH (Certified Ethical Hacker)
CISSP (ISC)²`,
  },
  {
    id: "program-3",
    name: "Bootcamp en Diseño UX/UI",
    progress: 30,
    directors: [
      mockTeamMembers.find((m) => m.id === "program-dir-2") as TeamMember,
    ],
    studentCount: 40,
    students: mockStudents.slice(12, 20),
    avgScore: calculateAverageScore(mockStudents.slice(12, 20)),
    modules: ["module-12", "module-13", "module-14"],
    intakes: [
      {
        id: "intake-4",
        name: "2410BUXS",
        modality: "Hybrid",
        schedule: {
          days: [
            {
              dayId: "Tuesday",
              startTime: "10:00",
              endTime: "13:00",
              enabled: true,
            },
            {
              dayId: "Thursday",
              startTime: "10:00",
              endTime: "13:00",
              enabled: true,
            },
          ],
        },
        groups: [
          {
            id: "group-4",
            name: "Morning Cohort",
            status: "open",
            capacity: 30,
            costPerStudent: 400,
            moduleTeachers: [
              { moduleId: "module-12", teacherIds: ["teacher-12"] },
              { moduleId: "module-13", teacherIds: ["teacher-13"] },
              { moduleId: "module-14", teacherIds: ["teacher-14"] },
            ],
            studentIds: [
              "student-12",
              "student-13",
              "student-14",
              "student-15",
              "student-16",
              "student-17",
            ],
          },
          {
            id: "group-5",
            name: "Evening Cohort",
            status: "open",
            capacity: 10,
            costPerStudent: 400,
            moduleTeachers: [
              { moduleId: "module-12", teacherIds: ["teacher-15"] },
              { moduleId: "module-13", teacherIds: ["teacher-16"] },
              { moduleId: "module-14", teacherIds: ["teacher-17"] },
            ],
            studentIds: ["student-18", "student-19"],
          },
        ],
      },
    ],
    area: "UX/UI",
    type: "Bootcamp",
    totalHours: 70,
    description: `El Bootcamp de Diseño UX/UI es un programa intensivo que combina teoría y práctica para formar a diseñadores capaces de crear experiencias de usuario excepcionales y interfaces atractivas. A lo largo del curso, los participantes aprenderán los fundamentos de la experiencia de usuario, el diseño de interfaces y las técnicas de usabilidad, así como las herramientas y metodologías más utilizadas en la industria. El bootcamp incluye proyectos prácticos y colaborativos, mentorías personalizadas y la posibilidad de trabajar en casos reales de empresas y startups.`,
    objectives: `Formar diseñadores capaces de crear experiencias de usuario excepcionales e interfaces atractivas.`,
    whyChoose: `El diseño centrado en el usuario es clave para el éxito de productos digitales. Las empresas necesitan profesionales que dominen UX/UI.`,
    careerOpportunities: `- UX/UI Designer
- Product Designer
- Interaction Designer
- UX Researcher`,
    certifications: `UX-PM Certification
NN/g UX Certification`,
  },
  {
    id: "program-4",
    name: "Bootcamp en Data Analytics",
    progress: 75,
    directors: [
      mockTeamMembers.find((m) => m.id === "program-dir-1") as TeamMember,
    ],
    studentCount: 28,
    students: mockStudents.slice(20, 30),
    avgScore: calculateAverageScore(mockStudents.slice(20, 30)),
    modules: ["module-15", "module-16", "module-17"],
    intakes: [
      {
        id: "intake-5",
        name: "2410BDAA",
        modality: "In-Person",
        schedule: {
          days: [
            {
              dayId: "Monday",
              startTime: "09:00",
              endTime: "14:00",
              enabled: true,
            },
            {
              dayId: "Wednesday",
              startTime: "09:00",
              endTime: "14:00",
              enabled: true,
            },
          ],
        },
        groups: [
          {
            id: "group-6",
            name: "Group A",
            status: "open",
            capacity: 28,
            costPerStudent: 750,
            moduleTeachers: [
              { moduleId: "module-15", teacherIds: ["teacher-15"] },
              { moduleId: "module-16", teacherIds: ["teacher-16"] },
              { moduleId: "module-17", teacherIds: ["teacher-17"] },
            ],
            studentIds: [
              "student-21",
              "student-22",
              "student-23",
              "student-24",
              "student-25",
              "student-26",
              "student-27",
              "student-28",
              "student-29",
            ],
          },
        ],
      },
    ],
    area: "Data Science",
    type: "Bootcamp",
    totalHours: 120,
    description: `El Bootcamp de Data Analytics es un programa intensivo que combina teoría y práctica para formar a analistas de datos capaces de extraer, transformar y visualizar información relevante a partir de grandes volúmenes de datos. A lo largo del curso, los participantes aprenderán a utilizar herramientas y técnicas de análisis de datos, estadística y visualización para tomar decisiones informadas en entornos empresariales. El bootcamp incluye proyectos prácticos y colaborativos, mentorías personalizadas y la posibilidad de trabajar con datos reales de empresas y organizaciones.`,
    objectives: `Enseñar a los alumnos técnicas de análisis de datos para la toma de decisiones informadas en entornos empresariales.`,
    whyChoose: `La analítica de datos es esencial en la era digital. Las organizaciones exigen profesionales capaces de transformar datos en insights.`,
    careerOpportunities: `- Data Analyst
- BI Specialist
- Data Visualization Engineer
- Jr. Data Scientist`,
    certifications: `Tableau Desktop Specialist
Microsoft Certified: Data Analyst Associate`,
  },
  {
    id: "program-5",
    name: "Bootcamp en Full-Stack Web Development",
    progress: 20,
    directors: [
      mockTeamMembers.find((m) => m.id === "program-dir-1") as TeamMember,
    ],
    studentCount: 52,
    students: mockStudents.slice(30, 45),
    avgScore: calculateAverageScore(mockStudents.slice(30, 45)),
    modules: ["module-18", "module-19", "module-20"],
    intakes: [
      {
        id: "intake-6",
        name: "2410BFWD",
        modality: "Online",
        schedule: {
          days: [
            {
              dayId: "Tuesday",
              startTime: "18:00",
              endTime: "22:00",
              enabled: true,
            },
            {
              dayId: "Thursday",
              startTime: "18:00",
              endTime: "22:00",
              enabled: true,
            },
          ],
        },
        groups: [
          {
            id: "group-7",
            name: "FS-Group1",
            status: "open",
            capacity: 30,
            costPerStudent: 500,
            moduleTeachers: [
              { moduleId: "module-18", teacherIds: ["teacher-18"] },
              { moduleId: "module-19", teacherIds: ["teacher-19"] },
              { moduleId: "module-20", teacherIds: ["teacher-20"] },
            ],
            studentIds: [
              "student-31",
              "student-32",
              "student-33",
              "student-34",
              "student-35",
              "student-36",
              "student-37",
              "student-38",
              "student-39",
            ],
          },
          {
            id: "group-8",
            name: "FS-Group2",
            status: "open",
            capacity: 22,
            costPerStudent: 500,
            moduleTeachers: [
              { moduleId: "module-18", teacherIds: [] },
              { moduleId: "module-19", teacherIds: [] },
              { moduleId: "module-20", teacherIds: [] },
            ],
            studentIds: [
              "student-40",
              "student-41",
              "student-42",
              "student-43",
              "student-44",
            ],
          },
        ],
      },
    ],
    area: "Web Development",
    type: "Bootcamp",
    totalHours: 120,
    description: `El Bootcamp de Full-Stack Web Development es un programa intensivo que combina teoría y práctica para formar a desarrolladores web capaces de crear aplicaciones completas, desde el frontend hasta el backend. A lo largo del curso, los participantes aprenderán a utilizar tecnologías y frameworks modernos para construir sitios web y aplicaciones web interactivas y dinámicas. El bootcamp incluye proyectos prácticos y colaborativos, mentorías personalizadas y la posibilidad de trabajar en proyectos reales de empresas y startups.`,
    objectives: `Proveer una formación completa en desarrollo web, tanto en frontend como en backend.`,
    whyChoose: `La demanda de desarrolladores web full-stack sigue creciendo. Esta formación brinda versatilidad y empleabilidad.`,
    careerOpportunities: `- Full-Stack Developer
- Frontend Developer
- Backend Developer
- Web Application Engineer`,
    certifications: `Scrum Fundamentals Certified
MERN/MEAN Stack Certifications (various)`,
  },
  {
    id: "program-6",
    name: "Bootcamp en Inteligencia Artificial",
    progress: 90,
    directors: [
      mockTeamMembers.find((m) => m.id === "program-dir-3") as TeamMember,
    ],
    studentCount: 18,
    students: mockStudents.slice(45, 50),
    avgScore: calculateAverageScore(mockStudents.slice(45, 50)),
    modules: ["module-21", "module-22", "module-23", "module-24"],
    intakes: [
      {
        id: "intake-7",
        name: "2410BIA",
        modality: "Hybrid",
        schedule: {
          days: [
            {
              dayId: "Monday",
              startTime: "17:00",
              endTime: "20:00",
              enabled: true,
            },
            {
              dayId: "Wednesday",
              startTime: "17:00",
              endTime: "20:00",
              enabled: true,
            },
          ],
        },
        groups: [
          {
            id: "group-9",
            name: "IA-Group1",
            status: "open",
            capacity: 20,
            costPerStudent: 900,
            moduleTeachers: [
              { moduleId: "module-21", teacherIds: ["teacher-21"] },
              { moduleId: "module-22", teacherIds: ["teacher-22"] },
              { moduleId: "module-23", teacherIds: ["teacher-23"] },
              { moduleId: "module-24", teacherIds: ["teacher-24"] },
            ],
            studentIds: [
              "student-46",
              "student-47",
              "student-48",
              "student-49",
            ],
          },
        ],
      },
    ],
    area: "Artificial Intelligence",
    type: "Bootcamp",
    totalHours: 145,
    description: `El Bootcamp de Inteligencia Artificial es un programa intensivo que combina teoría y práctica para formar a especialistas en IA capaces de desarrollar soluciones basadas en Machine Learning y Deep Learning. A lo largo del curso, los participantes aprenderán los fundamentos de la IA, las redes neuronales, el procesamiento de lenguaje natural y la visión por computadora, así como a utilizar herramientas y frameworks especializados. El bootcamp incluye proyectos prácticos y colaborativos, mentorías personalizadas y la posibilidad de trabajar en casos reales de empresas y organizaciones.`,
    objectives: `Formar especialistas que comprendan los fundamentos de la IA y puedan desarrollar soluciones basadas en Machine Learning y Deep Learning.`,
    whyChoose: `La inteligencia artificial es uno de los campos con mayor crecimiento y proyección a futuro. Ofrece oportunidades en diversos sectores.`,
    careerOpportunities: `- Machine Learning Engineer
- AI Researcher
- Data Scientist
- NLP Engineer
- Computer Vision Specialist`,
    certifications: `Google Cloud Professional Machine Learning Engineer
IBM AI Engineering Professional Certificate
Coursera DeepLearning.AI`,
  },
];

export const mockTasks = [
  {
    id: "1",
    title: "Finish monthly reporting",
    dueDate: "Today",
    priority: "high",
    completed: false,
  },
  {
    id: "2",
    title: "Report signing",
    dueDate: "Today",
    priority: "medium",
    completed: false,
  },
  {
    id: "3",
    title: "Market overview keynote",
    dueDate: "Today",
    priority: "high",
    completed: false,
  },
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
  status:
    | "draft"
    | "pending_approval"
    | "approved"
    | "rejected"
    | "signed"
    | "submitted"
    | "accepted";
  approvalWorkflow: {
    currentLevel: number;
    maxLevels: number;
    approvers: {
      level: number;
      role: string;
      status: "pending" | "approved" | "rejected";
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
      status: "pending" | "accepted" | "rejected";
      message?: string;
    };
  };
  qrCode: string;
  pdfUrl?: string;
  auditTrail: {
    timestamp: string;
    action:
      | "created"
      | "signed"
      | "submitted"
      | "verified"
      | "status_changed"
      | "approval_requested"
      | "approved"
      | "rejected";
    actor: string;
    details: string;
    level?: number;
  }[];
}

export const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2025-001",
    customer: {
      name: "Tech Education S.L.",
      taxId: "B12345678",
      address: "Calle Principal 123, 28001 Madrid",
    },
    issueDate: "2025-01-15",
    dueDate: "2025-02-14",
    items: [
      {
        description: "Educational Software License - Annual",
        quantity: 1,
        price: 1200,
        total: 1200,
      },
      {
        description: "Training Sessions",
        quantity: 5,
        price: 300,
        total: 1500,
      },
    ],
    totalAmount: 2700,
    status: "pending_approval",
    approvalWorkflow: {
      currentLevel: 1,
      maxLevels: 3,
      approvers: [
        {
          level: 1,
          role: "Department Manager",
          status: "pending",
        },
        {
          level: 2,
          role: "Financial Controller",
          status: "pending",
        },
        {
          level: 3,
          role: "CFO",
          status: "pending",
        },
      ],
    },
    signatureInfo: {},
    submissionInfo: {},
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-001",
    auditTrail: [
      {
        timestamp: "2025-01-15T10:00:00Z",
        action: "created",
        actor: "Dana R.",
        details: "Invoice created",
      },
      {
        timestamp: "2025-01-15T10:30:00Z",
        action: "approval_requested",
        actor: "Dana R.",
        details: "Approval requested from Department Manager",
        level: 1,
      },
    ],
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-002",
    customer: {
      name: "Educational Services Company",
      taxId: "B87654321",
      address: "Avenida Secundaria 456, 08001 Barcelona",
    },
    issueDate: "2025-01-18",
    dueDate: "2025-02-17",
    items: [
      {
        description: "Curriculum Development Services",
        quantity: 1,
        price: 3500,
        total: 3500,
      },
    ],
    totalAmount: 3500,
    status: "submitted",
    approvalWorkflow: {
      currentLevel: 3,
      maxLevels: 3,
      approvers: [
        {
          level: 1,
          role: "Department Manager",
          status: "approved",
          userId: "DM123",
          timestamp: "2025-01-18T12:00:00Z",
          comments: "Approved after budget review",
        },
        {
          level: 2,
          role: "Financial Controller",
          status: "approved",
          userId: "FC456",
          timestamp: "2025-01-18T13:30:00Z",
          comments: "Financial terms verified",
        },
        {
          level: 3,
          role: "CFO",
          status: "approved",
          userId: "CFO789",
          timestamp: "2025-01-18T14:00:00Z",
          comments: "Final approval granted",
        },
      ],
    },
    signatureInfo: {
      signedAt: "2025-01-18T14:20:00Z",
      signedBy: "Dana R.",
    },
    submissionInfo: {
      submittedAt: "2025-01-18T14:25:00Z",
      verificationId: "VF-2025-002-DEF",
      response: {
        status: "pending",
      },
    },
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-002",
    auditTrail: [
      {
        timestamp: "2025-01-18T10:00:00Z",
        action: "created",
        actor: "Dana R.",
        details: "Invoice created",
      },
      {
        timestamp: "2025-01-18T12:00:00Z",
        action: "approved",
        actor: "Department Manager",
        details: "Level 1 approval granted",
        level: 1,
      },
      {
        timestamp: "2025-01-18T13:30:00Z",
        action: "approved",
        actor: "Financial Controller",
        details: "Level 2 approval granted",
        level: 2,
      },
      {
        timestamp: "2025-01-18T14:00:00Z",
        action: "approved",
        actor: "CFO",
        details: "Level 3 approval granted",
        level: 3,
      },
      {
        timestamp: "2025-01-18T14:20:00Z",
        action: "signed",
        actor: "Dana R.",
        details: "Digital signature applied",
      },
      {
        timestamp: "2025-01-18T14:25:00Z",
        action: "submitted",
        actor: "System",
        details: "Submitted to VERIFACTU",
      },
    ],
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-003",
    customer: {
      name: "Learning Center Institute",
      taxId: "B98765432",
      address: "Plaza Principal 789, 46001 Valencia",
    },
    issueDate: "2025-01-19",
    dueDate: "2025-02-18",
    items: [
      {
        description: "Student Management System - Monthly Fee",
        quantity: 1,
        price: 800,
        total: 800,
      },
      {
        description: "Setup Service",
        quantity: 1,
        price: 500,
        total: 500,
      },
    ],
    totalAmount: 1300,
    status: "rejected",
    approvalWorkflow: {
      currentLevel: 2,
      maxLevels: 3,
      approvers: [
        {
          level: 1,
          role: "Department Manager",
          status: "approved",
          userId: "DM123",
          timestamp: "2025-01-19T11:00:00Z",
          comments: "Initial approval granted",
        },
        {
          level: 2,
          role: "Financial Controller",
          status: "rejected",
          userId: "FC456",
          timestamp: "2025-01-19T12:00:00Z",
          comments: "Budget exceeded for this quarter",
        },
        {
          level: 3,
          role: "CFO",
          status: "pending",
        },
      ],
    },
    signatureInfo: {},
    submissionInfo: {},
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-003",
    auditTrail: [
      {
        timestamp: "2025-01-19T10:00:00Z",
        action: "created",
        actor: "Nancy W.",
        details: "Invoice created",
      },
      {
        timestamp: "2025-01-19T11:00:00Z",
        action: "approved",
        actor: "Department Manager",
        details: "Level 1 approval granted",
        level: 1,
      },
      {
        timestamp: "2025-01-19T1200:00Z",
        action: "rejected",
        actor: "Financial Controller",
        details: "Level 2 approval rejected - Budget exceeded",
        level: 2,
      },
    ],
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-004",
    customer: {
      name: "Digital Learning Academy",
      taxId: "B45678901",
      address: "Avenida Principal 321, 41001 Sevilla",
    },
    issueDate: "2025-01-16",
    dueDate: "2025-02-15",
    items: [
      {
        description: "Learning Management System - Annual License",
        quantity: 1,
        price: 4500,
        total: 4500,
      },
      {
        description: "Implementation Services",
        quantity: 1,
        price: 1500,
        total: 1500,
      },
    ],
    totalAmount: 6000,
    status: "accepted",
    approvalWorkflow: {
      currentLevel: 3,
      maxLevels: 3,
      approvers: [
        {
          level: 1,
          role: "Department Manager",
          status: "approved",
          userId: "DM123",
          timestamp: "2025-01-16T11:00:00Z",
          comments: "Approved - Strategic investment",
        },
        {
          level: 2,
          role: "Financial Controller",
          status: "approved",
          userId: "FC456",
          timestamp: "2025-01-16T13:00:00Z",
          comments: "Budget verified and approved",
        },
        {
          level: 3,
          role: "CFO",
          status: "approved",
          userId: "CFO789",
          timestamp: "2025-01-16T14:30:00Z",
          comments: "Final approval granted - High priority program",
        },
      ],
    },
    signatureInfo: {
      signedAt: "2025-01-16T15:00:00Z",
      signedBy: "Dana R.",
    },
    submissionInfo: {
      submittedAt: "2025-01-16T15:05:00Z",
      verificationId: "VF-2025-004-XYZ",
      response: {
        status: "accepted",
        message: "Invoice successfully verified and accepted by VERIFACTU",
      },
    },
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?data=INV-2025-004",
    auditTrail: [
      {
        timestamp: "2025-01-16T10:00:00Z",
        action: "created",
        actor: "Dana R.",
        details: "Invoice created",
      },
      {
        timestamp: "2025-01-16T10:05:00Z",
        action: "approval_requested",
        actor: "Dana R.",
        details: "Approval workflow initiated",
        level: 1,
      },
      {
        timestamp: "2025-01-16T11:00:00Z",
        action: "approved",
        actor: "Department Manager",
        details: "Level 1 approval granted",
        level: 1,
      },
      {
        timestamp: "2025-01-16T13:00:00Z",
        action: "approved",
        actor: "Financial Controller",
        details: "Level 2 approval granted",
        level: 2,
      },
      {
        timestamp: "2025-01-16T14:30:00Z",
        action: "approved",
        actor: "CFO",
        details: "Level 3 approval granted",
        level: 3,
      },
      {
        timestamp: "2025-01-16T15:00:00Z",
        action: "signed",
        actor: "Dana R.",
        details: "Digital signature applied",
      },
      {
        timestamp: "2025-01-16T15:05:00Z",
        action: "submitted",
        actor: "System",
        details: "Submitted to VERIFACTU for verification",
      },
      {
        timestamp: "2025-01-16T15:10:00Z",
        action: "verified",
        actor: "VERIFACTU",
        details: "Invoice verified and accepted by VERIFACTU",
      },
      {
        timestamp: "2025-01-16T15:11:00Z",
        action: "status_changed",
        actor: "System",
        details: "Status updated to Accepted",
      },
    ],
  },
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
    id: "skill-1",
    name: "Program Management",
    category: "Management",
    description: "Ability to plan, execute and deliver programs effectively",
  },
  {
    id: "skill-2",
    name: "JavaScript",
    category: "Technical",
    description: "Proficiency in JavaScript programming language",
  },
  {
    id: "skill-3",
    name: "Communication",
    category: "Soft Skills",
    description: "Effective verbal and written communication",
  },
  {
    id: "skill-4",
    name: "Leadership",
    category: "Management",
    description: "Ability to lead and motivate teams",
  },
  {
    id: "skill-5",
    name: "Problem Solving",
    category: "Technical",
    description: "Analytical and problem-solving abilities",
  },
];

export const competencyLevels: CompetencyLevel[] = [
  {
    id: "level-1",
    name: "Novice",
    value: 1,
    color: "bg-red-200 hover:bg-red-300",
  },
  {
    id: "level-2",
    name: "Advanced Beginner",
    value: 2,
    color: "bg-orange-200 hover:bg-orange-300",
  },
  {
    id: "level-3",
    name: "Competent",
    value: 3,
    color: "bg-yellow-200 hover:bg-yellow-300",
  },
  {
    id: "level-4",
    name: "Proficient",
    value: 4,
    color: "bg-green-200 hover:bg-green-300",
  },
  {
    id: "level-5",
    name: "Expert",
    value: 5,
    color: "bg-emerald-200 hover:bg-emerald-300",
  },
];
