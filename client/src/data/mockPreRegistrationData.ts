import { mockModuleCatalog } from "./mockModules";
import { mockPeople } from "./mockPeople";
import { mockPrograms } from "./mockPrograms";

export const mockStudents = mockPeople.filter(person => person.role === 'Student');

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
      'module-1',
       'module-2',
       'module-3',
       'module-4',
       'module-5',
       'module-6',
       'module-7',
    ],
    timestamp: '2025-02-01T10:00:00Z',
    priority: 1,
  },
  {
    id: 'pre-registration-2',
    studentId: mockStudents[1].id,
    studentName: mockStudents[1].name,
    modules: [
      'module-8',
      'module-9',
      'module-10',
      'module-1',
    ],
    timestamp: '2025-02-01T11:30:00Z',
    priority: 2,
  },
  {
    id: 'pre-registration-3',
    studentId: mockStudents[2].id,
    studentName: mockStudents[2].name,
    modules: [
      'module-18',
      'module-19',
      'module-20',
    ],
    timestamp: '2025-02-01T13:00:00Z',
    priority: 3,
  },
  {
    id: 'pre-registration-4',
    studentId: mockStudents[3].id,
    studentName: mockStudents[3].name,
    modules: [
      'module-12',
      'module-13',
      'module-14',
    ],
    timestamp: '2025-02-01T14:30:00Z',
    priority: 4,
  },
  {
    id: 'pre-registration-5',
    studentId: mockStudents[4].id,
    studentName: mockStudents[4].name,
    modules: [
      'module-2',
      'module-21',
      'module-22',
      'module-23',
      'module-24',
    ],
    timestamp: '2025-02-01T16:00:00Z',
    priority: 5,
  },
  {
    id: 'pre-registration-6',
    studentId: mockStudents[5].id,
    studentName: mockStudents[5].name,
    modules: [
      'module-14',
      'module-2',
      'module-21',
    ],
    timestamp: '2025-02-01T17:30:00Z',
    priority: 6,
  },
  {
    id: 'pre-registration-7',
    studentId: mockStudents[6].id,
    studentName: mockStudents[6].name,
    modules: [
      'module-19',
      'module-20',
    ],
    timestamp: '2025-02-01T19:00:00Z',
    priority: 7,
  },
  {
    id: 'pre-registration-8',
    studentId: mockStudents[7].id,
    studentName: mockStudents[7].name,
    modules: [
      'module-19',
      'module-20',
    ],
    timestamp: '2025-02-01T20:30:00Z',
    priority: 8,
  },
  {
    id: 'pre-registration-9',
    studentId: mockStudents[8].id,
    studentName: mockStudents[8].name,
    modules: [
      'module-1',
       'module-2',
       'module-3',
       'module-4',
       'module-5',
       'module-6',
       'module-7',
    ],
    timestamp: '2025-02-01T22:00:00Z',
    priority: 9,
  },
];
