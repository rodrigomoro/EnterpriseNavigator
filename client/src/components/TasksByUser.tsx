import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockTeamMembers } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

type TaskStatus = 'Not started' | 'In progress' | 'Paused';
type TaskPriority = 'High' | 'Medium' | 'Low';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
}

interface UserTasks {
  userId: string;
  name: string;
  avatar: string;
  tasks: Task[];
}

const userTasks: UserTasks[] = [
  {
    userId: '1',
    name: 'Dana\'s responsibilities',
    avatar: mockTeamMembers[0].avatar,
    tasks: [
      {
        id: '1',
        title: 'Research check-in',
        dueDate: 'Today',
        status: 'Not started',
        priority: 'High'
      },
      {
        id: '2',
        title: 'Survey design',
        dueDate: 'Tomorrow',
        status: 'In progress',
        priority: 'Medium'
      },
      {
        id: '3',
        title: 'Idea sprint',
        dueDate: 'Friday',
        status: 'In progress',
        priority: 'High'
      }
    ]
  },
  {
    userId: '2',
    name: 'Elon\'s responsibilities',
    avatar: mockTeamMembers[1].avatar,
    tasks: [
      {
        id: '4',
        title: 'Market analysis',
        dueDate: 'Today',
        status: 'Not started',
        priority: 'High'
      },
      {
        id: '5',
        title: 'Surveys evaluation',
        dueDate: 'Thursday',
        status: 'In progress',
        priority: 'Medium'
      },
      {
        id: '6',
        title: 'B2B Research',
        dueDate: 'Friday',
        status: 'Paused',
        priority: 'Low'
      }
    ]
  }
];

const statusColors: Record<TaskStatus, string> = {
  'Not started': 'bg-destructive/10 text-destructive',
  'In progress': 'bg-primary/10 text-primary',
  'Paused': 'bg-muted text-muted-foreground'
};

const priorityColors: Record<TaskPriority, string> = {
  'High': 'destructive',
  'Medium': 'orange',
  'Low': 'green'
} as const;

export default function TasksByTeacher() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Task by Teachers</h3>
      <div className="space-y-8">
        {userTasks.map((user) => (
          <div key={user.userId}>
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <h4 className="font-medium">{user.name}</h4>
            </div>

            <div className="space-y-3">
              {user.tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.dueDate}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
                      {task.status}
                    </span>
                    <Badge variant={priorityColors[task.priority] as any}>
                      {task.priority} priority
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}