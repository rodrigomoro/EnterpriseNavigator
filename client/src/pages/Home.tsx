import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Calendar from '@/components/Calendar';
import TeamDirectory from '@/components/TeamDirectory';
import ProjectProgress from '@/components/ProjectProgress';
import TaskList from '@/components/TaskList';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome, Juliana!</h1>
            <p className="text-muted-foreground">Here is your agenda for today</p>
          </div>
          
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-4">
                <Calendar />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-4">
                <ProjectProgress />
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-4">
                <TaskList />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-4">
                <TeamDirectory />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
