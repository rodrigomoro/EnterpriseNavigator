import { mockProjects } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProjectDirectory() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Project Directory</h3>
        <Button variant="outline" size="sm">+ Add more</Button>
      </div>
      
      <div className="space-y-4">
        {mockProjects.map((project) => (
          <div key={project.id} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-sm">P</span>
              </div>
              <div>
                <p className="font-medium">{project.name}</p>
              </div>
            </div>

            <div className="flex -space-x-2">
              {project.team.map((member) => (
                <Avatar key={member.id} className="border-2 border-background w-8 h-8">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
