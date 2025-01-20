import Sidebar from '@/components/Sidebar';
import { mockTeamMembers } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PageTransition from '@/components/PageTransition';
import UserAvatar from '@/components/UserAvatar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Team() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">People Directory</h1>
                <p className="text-muted-foreground">View and manage all team members</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search people..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <UserAvatar />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTeamMembers.map((member) => (
                <div key={member.id} className="bg-card rounded-lg shadow-sm p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
