import { ArrowLeft } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { mockTeamMembers } from '@/data/mockData';
import Sidebar from '@/components/Sidebar';
import PageTransition from '@/components/PageTransition';
import UserAvatar from '@/components/UserAvatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function PersonOverview() {
  const [, params] = useRoute('/people/:id');
  const person = mockTeamMembers.find(m => m.id === params?.id);

  if (!person) {
    return <div>Person not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Link href="/people">
                    <a className="flex items-center gap-1 hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" />
                      People Directory
                    </a>
                  </Link>
                  <span>/</span>
                  <span className="text-foreground">{person.name}</span>
                </div>
                <h1 className="text-2xl font-bold">Person Overview / {person.name}</h1>
              </div>

              <UserAvatar />
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - Personal Information */}
              <div className="col-span-12 lg:col-span-4">
                <div className="bg-card rounded-lg shadow-sm p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">{person.name}</h2>
                    <p className="text-muted-foreground">{person.role}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Contact Information</h3>
                      <p className="text-sm text-muted-foreground">example@email.com</p>
                      <p className="text-sm text-muted-foreground">+1 234 567 890</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Activity and Programs */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className="bg-card rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Assigned Programs</h3>
                  <div className="space-y-4">
                    {/* We can add program assignments here */}
                    <p className="text-muted-foreground">No programs assigned yet.</p>
                  </div>
                </div>

                <div className="bg-card rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {/* We can add activity timeline here */}
                    <p className="text-muted-foreground">No recent activity.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
