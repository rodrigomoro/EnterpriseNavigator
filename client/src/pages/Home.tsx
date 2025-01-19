import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Calendar from '@/components/Calendar';
import PeopleDirectory from '@/components/TeamDirectory';
import ProjectDirectory from '@/components/ProjectDirectory';
import TaskList from '@/components/TaskList';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import UserAvatar from '@/components/UserAvatar';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex flex-col gap-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">Welcome, Juliana!</h1>
                  <p className="text-muted-foreground">Here is your agenda for today</p>
                </div>
                <UserAvatar />
              </div>

              <div className="flex justify-center">
                <div className="relative w-96">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-12 lg:col-span-5">
                <div className="bg-card rounded-lg shadow-sm p-4 mb-6">
                  <Calendar />
                </div>

                <div className="bg-card rounded-lg shadow-sm p-4">
                  <ProjectDirectory />
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-12 lg:col-span-7 space-y-6">
                <div className="bg-card rounded-lg shadow-sm p-4">
                  <TaskList />
                </div>

                <div className="bg-card rounded-lg shadow-sm p-4">
                  <PeopleDirectory />
                </div>
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}