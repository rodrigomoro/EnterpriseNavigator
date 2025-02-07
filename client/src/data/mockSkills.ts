
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
