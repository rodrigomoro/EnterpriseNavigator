import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import UserAvatar from '@/components/UserAvatar';
import RoleDashboard from '@/components/RoleDashboard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('administrator');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <header>
            <div className="px-6 h-16 flex items-center justify-between gap-8 mb-6">
              <div className="min-w-60">
                <h1 className="text-2xl font-bold">Welcome, Juliana!</h1>
                <p className="text-muted-foreground">Here is your role-based dashboard</p>
              </div>

              <div className="flex-1 flex justify-center max-w-xl gap-4">
                <div className="relative w-full">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {/* Role selector for demonstration */}
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrator">Administrator</SelectItem>
                    <SelectItem value="program_manager">Program Manager</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="finance_manager">Finance Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-60 flex justify-end">
                <UserAvatar />
              </div>
            </div>
          </header>

          <main className="p-6">
            <RoleDashboard userRole={selectedRole} />
          </main>
        </PageTransition>
      </div>
    </div>
  );
}