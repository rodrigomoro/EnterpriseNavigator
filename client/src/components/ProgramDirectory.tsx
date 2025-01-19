import { mockProjects } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'wouter';

export default function ProgramDirectory() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Program Directory</h3>
        <Link href="/programs">
          <Button variant="outline" size="sm">See all programs</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {mockProjects.slice(0, 3).map((project) => (
          <Link key={project.id} href={`/program/${project.id}`}>
            <a className="flex items-center justify-between py-2 hover:bg-muted/50 px-2 rounded-md cursor-pointer">
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
                  <Link key={member.id} href={`/people/${member.id}`}>
                    <a onClick={(e) => e.stopPropagation()}>
                      <Avatar className="border-2 border-background w-8 h-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </a>
                  </Link>
                ))}
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
