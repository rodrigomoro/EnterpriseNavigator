import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { mockTasks } from '@/data/mockTasks';
import { useState } from 'react';

const priorityColors: Record<string, string> = {
  high: 'destructive',
  medium: 'orange',
  low: 'green',
};

export default function TaskList() {
  const [tasks, setTasks] = useState(mockTasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Urgent Tasks</h3>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            
            <div className="flex-1">
              <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </p>
              <p className="text-sm text-muted-foreground">{task.dueDate}</p>
            </div>

            <Badge variant={priorityColors[task.priority] as any}>
              {task.priority}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
