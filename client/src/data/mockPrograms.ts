import { mockPeople, People } from "./mockPeople";

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

export const mockPrograms = [
    {
        id: "program-1",
        name: "Bootcamp en Cloud Computing & Devops",
        progress: 65,
        directors: [
            mockPeople.find((m) => m.id === "program-dir-2") as People,
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
            mockPeople.find((m) => m.id === "program-dir-3") as People,
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
            mockPeople.find((m) => m.id === "program-dir-2") as People,
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
            mockPeople.find((m) => m.id === "program-dir-1") as People,
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
            mockPeople.find((m) => m.id === "program-dir-1") as People,
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
            mockPeople.find((m) => m.id === "program-dir-3") as People,
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