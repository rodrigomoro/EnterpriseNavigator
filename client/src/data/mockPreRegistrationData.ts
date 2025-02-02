import { mockTeamMembers } from './mockData';

export const mockStudents = mockTeamMembers.filter(member => member.role === 'Student');

export const mockModules = [
  { id: '1', name: 'Introduction to Biology', credits: 3 },
  { id: '2', name: 'Advanced Chemistry', credits: 4 },
  { id: '3', name: 'Medical Ethics', credits: 3 },
  { id: '4', name: 'Anatomy & Physiology', credits: 5 },
  { id: '5', name: 'Clinical Practice', credits: 4 },
];

export const mockPreRegistrations = [
  {
    id: '1',
    studentId: mockStudents[0].id,
    studentName: mockStudents[0].name,
    modules: ['Introduction to Biology', 'Medical Ethics'],
    timestamp: '2025-02-01T10:00:00Z',
    priority: 1,
  },
  {
    id: '2',
    studentId: mockStudents[1].id,
    studentName: mockStudents[1].name,
    modules: ['Advanced Chemistry', 'Clinical Practice'],
    timestamp: '2025-02-01T11:30:00Z',
    priority: 2,
  },
];
