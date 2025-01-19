import { Link } from 'wouter';
import Sidebar from '@/components/Sidebar';
import { mockProjects } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Projects() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Projects Directory</h1>
            <p className="text-muted-foreground">Manage and track all your projects</p>
          </div>

          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`}>
              <a className="block">
                <div className="bg-card rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-3">{project.name}</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Team Members</p>
                      <div className="flex -space-x-2">
                        {project.team.map((member) => (
                          <Avatar key={member.id} className="border-2 border-background w-8 h-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
