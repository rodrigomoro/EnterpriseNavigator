export const mockEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2024-04-08',
    time: '10:00 AM',
    priority: 'primary'
  },
  {
    id: '2',
    title: 'Project Review',
    date: '2024-04-08',
    time: '2:00 PM',
    priority: 'destructive'
  },
  {
    id: '3',
    title: 'Client Call',
    date: '2024-04-09',
    time: '11:30 AM',
    priority: 'orange'
  }
];

export const mockTeamMembers = [
  {
    id: '1',
    name: 'Dana R.',
    role: 'Project Manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dana'
  },
  {
    id: '2',
    name: 'Elon S.',
    role: 'Key Account Plann.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elon'
  },
  {
    id: '3',
    name: 'Nancy W.',
    role: 'Account Manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nancy'
  },
  {
    id: '4',
    name: 'James M.',
    role: 'Digital Manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
  }
];

export const mockProjects = [
  {
    id: '1',
    name: 'Market Research 2024',
    progress: 65,
    team: mockTeamMembers.slice(0, 2)
  },
  {
    id: '2',
    name: 'SWOT Analysis',
    progress: 40,
    team: mockTeamMembers.slice(1, 3)
  },
  {
    id: '3',
    name: 'Design Research',
    progress: 85,
    team: mockTeamMembers.slice(2, 4)
  }
];

export const mockTasks = [
  {
    id: '1',
    title: 'Finish monthly reporting',
    dueDate: 'Today',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    title: 'Report signing',
    dueDate: 'Today',
    priority: 'medium',
    completed: false
  },
  {
    id: '3',
    title: 'Market overview keynote',
    dueDate: 'Today',
    priority: 'high',
    completed: false
  }
];
