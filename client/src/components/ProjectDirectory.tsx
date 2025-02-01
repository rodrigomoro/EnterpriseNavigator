import { useState } from 'react';
import { mockPrograms, mockTeamMembers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'wouter';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ProjectDirectory() {
  const [showAll, setShowAll] = useState(false);
  const displayMembers = showAll ? mockPrograms : mockPrograms.slice(0, 3);
  const teachers = mockTeamMembers.filter((m) => m.role === "Teacher");

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Program Directory</h3>
        <Link href="/programs">
          <Button variant="outline" size="sm">See all programs</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {displayMembers.map((project) => (
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
                {Array.from(new Set(project.intakes.flatMap(intake => intake.groups.flatMap(group => group.moduleTeachers)).flatMap(moduleTeacher => 
                  moduleTeacher.teacherIds))).map(teacherId => {
                  const teacher = teachers?.find(m => m.id === teacherId);
                  return (
                    <Link key={teacher?.id} href={`/people/${teacher?.id}`}>
                    <a onClick={(e) => e.stopPropagation()}>
                      <Avatar className="border-2 border-background w-8 h-8">
                      <AvatarImage src={teacher?.avatar} alt={teacher?.name} />
                      <AvatarFallback>{teacher?.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </a>
                    </Link>
                  );
                  })
                }
              </div>
            </a>
          </Link>
        ))}
      </div>
      {mockPrograms.length > 3 && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="gap-2"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}