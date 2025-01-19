import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { mockTeamMembers } from '@/data/mockData';
import Calendar from '@/components/Calendar';
import TasksByUser from '@/components/TasksByUser';
import Sidebar from '@/components/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PageTransition from '@/components/PageTransition';
import UserAvatar from '@/components/UserAvatar';

export default function ProjectOverview() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Link href="/projects">
                    <a className="flex items-center gap-1 hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" />
                      Program overview
                    </a>
                  </Link>
                  <span>/</span>
                  <span className="text-foreground">Market research 2024</span>
                </div>
                <h1 className="text-2xl font-bold">Program overview / Market research 2024</h1>
              </div>

              <UserAvatar />
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-12 lg:col-span-5">
                <div className="bg-card rounded-lg shadow-sm p-4 mb-6">
                  <Calendar />
                </div>

                <div className="bg-card rounded-lg shadow-sm p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Assigned Teachers</h3>
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
                  <h3 className="text-lg font-semibold mb-4">Program Progress</h3>
                  <div className="space-y-4">
                    {/* Simple progress display since we removed the timeline component */}
                    {mockTeamMembers.slice(0, 3).map((member, index) => (
                      <div key={member.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{member.name}</span>
                          <span className="text-sm text-muted-foreground">{65 - index * 15}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${65 - index * 15}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-lg shadow-sm p-4">
                  <TasksByUser />
                </div>
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}