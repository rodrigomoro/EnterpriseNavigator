import { mockTeamMembers, mockPrograms } from './mockData';

export const mockStudents = mockTeamMembers.filter(member => member.role === 'Student');

export const mockModules = mockPrograms.flatMap(program =>
  program.intakes.flatMap(intake =>
    intake.groups
      .filter(group => group.status === 'open' || group.status === 'waitlist')
      .flatMap(group => group.moduleTeachers.map(mt => program.modules.find(m => m.id === mt.moduleId)))
  )
).filter((module, index, self) => module && self.indexOf(module) === index);

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
