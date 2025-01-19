import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { mockTeamMembers } from '@/data/mockData';
import Calendar from '@/components/Calendar';
import ProjectProgressTimeline from '@/components/ProjectProgressTimeline';
import TasksByUser from '@/components/TasksByUser';
import Sidebar from '@/components/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProjectOverview() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Link href="/">
              <a className="flex items-center gap-1 hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Project overview
              </a>
            </Link>
            <span>/</span>
            <span className="text-foreground">Market research 2024</span>
          </div>
          <h1 className="text-2xl font-bold">Project overview / Market research 2024</h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-card rounded-lg shadow-sm p-4 mb-6">
              <Calendar />
            </div>

            <div className="bg-card rounded-lg shadow-sm p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Team Directory</h3>
                {mockTeamMembers.slice(0, 4).map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="bg-card rounded-lg shadow-sm p-4">
              <ProjectProgressTimeline />
            </div>

            <div className="bg-card rounded-lg shadow-sm p-4">
              <TasksByUser />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}