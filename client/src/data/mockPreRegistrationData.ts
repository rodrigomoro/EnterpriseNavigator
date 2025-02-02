import { mockTeamMembers, mockPrograms, mockModuleCatalog } from './mockData';

export const mockStudents = mockTeamMembers.filter(member => member.role === 'Student');

export const mockModules = mockPrograms.flatMap(program =>
  program.intakes.flatMap(intake =>
    intake.groups
      .filter(group => group.status === 'open' || group.status === 'waitlist')
      .flatMap(group => group.moduleTeachers.map(mt => program.modules.find(m => m === mt.moduleId)))
  )
).filter((module, index, self) => module && self.indexOf(module) === index)
  .map(moduleId => mockModuleCatalog.find(m => m.id === moduleId))
  .filter(module => module);

export const mockPreRegistrations = [
  {
    id: 'pre-registration-1',
    studentId: mockStudents[0].id,
    studentName: mockStudents[0].name,
    modules: [
      { moduleId: 'module-1', groupId: 'group-1' },
       { moduleId: 'module-2', groupId: 'group-1' },
       { moduleId: 'module-3', groupId: 'group-1' },
       { moduleId: 'module-4', groupId: 'group-1' },
       { moduleId: 'module-5', groupId: 'group-1' },
       { moduleId: 'module-6', groupId: 'group-1' },
       { moduleId: 'module-7', groupId: 'group-1' },
    ],
    timestamp: '2025-02-01T10:00:00Z',
    priority: 1,
  },
  {
    id: 'pre-registration-2',
    studentId: mockStudents[1].id,
    studentName: mockStudents[1].name,
    modules: [
      { moduleId: 'module-8', groupId: 'group-3' },
      { moduleId: 'module-9', groupId: 'group-3' },
      { moduleId: 'module-10', groupId: 'group-3' },
      { moduleId: 'module-1', groupId: 'group-1' },
    ],
    timestamp: '2025-02-01T11:30:00Z',
    priority: 2,
  },
  {
    id: 'pre-registration-3',
    studentId: mockStudents[2].id,
    studentName: mockStudents[2].name,
    modules: [
      { moduleId: 'module-18', groupId: 'group-7' },
      { moduleId: 'module-19', groupId: 'group-7' },
      { moduleId: 'module-20', groupId: 'group-7' },
    ],
    timestamp: '2025-02-01T13:00:00Z',
    priority: 3,
  },
  {
    id: 'pre-registration-4',
    studentId: mockStudents[3].id,
    studentName: mockStudents[3].name,
    modules: [
      { moduleId: 'module-12', groupId: 'group-4' },
      { moduleId: 'module-13', groupId: 'group-4' },
      { moduleId: 'module-14', groupId: 'group-4' },
    ],
    timestamp: '2025-02-01T14:30:00Z',
    priority: 4,
  },
  {
    id: 'pre-registration-5',
    studentId: mockStudents[4].id,
    studentName: mockStudents[4].name,
    modules: [
      { moduleId: 'module-2', groupId: 'group-1' },
      { moduleId: 'module-21', groupId: 'group-9' },
      { moduleId: 'module-22', groupId: 'group-9' },
      { moduleId: 'module-23', groupId: 'group-9' },
      { moduleId: 'module-24', groupId: 'group-9' },
    ],
    timestamp: '2025-02-01T16:00:00Z',
    priority: 5,
  },
  {
    id: 'pre-registration-6',
    studentId: mockStudents[5].id,
    studentName: mockStudents[5].name,
    modules: [
      { moduleId: 'module-14', groupId: 'group-4' },
      { moduleId: 'module-2', groupId: 'group-1' },
      { moduleId: 'module-21', groupId: 'group-9' },
    ],
    timestamp: '2025-02-01T17:30:00Z',
    priority: 6,
  },
  {
    id: 'pre-registration-7',
    studentId: mockStudents[6].id,
    studentName: mockStudents[6].name,
    modules: [
      { moduleId: 'module-19', groupId: 'group-7' },
      { moduleId: 'module-20', groupId: 'group-7' },
    ],
    timestamp: '2025-02-01T19:00:00Z',
    priority: 7,
  },
  {
    id: 'pre-registration-8',
    studentId: mockStudents[7].id,
    studentName: mockStudents[7].name,
    modules: [
      { moduleId: 'module-19', groupId: 'group-7' },
      { moduleId: 'module-20', groupId: 'group-7' },
    ],
    timestamp: '2025-02-01T20:30:00Z',
    priority: 8,
  },
  {
    id: 'pre-registration-9',
    studentId: mockStudents[8].id,
    studentName: mockStudents[8].name,
    modules: [
      { moduleId: 'module-1', groupId: 'group-1' },
       { moduleId: 'module-2', groupId: 'group-1' },
       { moduleId: 'module-3', groupId: 'group-1' },
       { moduleId: 'module-4', groupId: 'group-1' },
       { moduleId: 'module-5', groupId: 'group-1' },
       { moduleId: 'module-6', groupId: 'group-1' },
       { moduleId: 'module-7', groupId: 'group-1' },
    ],
    timestamp: '2025-02-01T22:00:00Z',
    priority: 9,
  },
];
