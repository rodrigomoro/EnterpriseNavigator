export interface People {
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
    notes: string;
    startDate: string;
    birthDate: string;
    linkedinUrl: string;
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

export const initialPeople: People[] = [
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
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
        notes: "",
        startDate: "",
        birthDate: "",
        linkedinUrl: ""
    },
];

function generateTeachers(startIndex: number, count: number): People[] {
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
            notes: "",
            startDate: "",
            birthDate: "",
            linkedinUrl: ""
        };
    });
}

// Function to generate additional students
function generateStudents(startIndex: number, count: number): People[] {
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
            notes: "",
            startDate: "",
            birthDate: "",
            linkedinUrl: ""
        };
    });
}

// Generate additional teachers
const additionalTeachers = generateTeachers(0, 38);
// Generate additional students
const additionalStudents = generateStudents(0, 200);

// Export the combined people
export const mockPeople: People[] = [
    ...initialPeople,
    ...additionalTeachers,
    ...additionalStudents,
];