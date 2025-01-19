import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Calendar from '@/components/Calendar';
import PeopleDirectory from '@/components/PeopleDirectory';
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
          <header>
            <div className="px-6 h-16 flex items-center justify-between gap-8 mb-6">
              <div className="min-w-60">
                <h1 className="text-2xl font-bold">Welcome, Juliana!</h1>
                <p className="text-muted-foreground">Here is your agenda for today</p>
              </div>

              <div className="flex-1 flex justify-center max-w-xl">
                <div className="relative w-full">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="min-w-60 flex justify-end">
                <UserAvatar />
              </div>
            </div>
          </header>

          <main className="p-6">
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