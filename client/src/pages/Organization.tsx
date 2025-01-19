import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockTeamMembers } from "@/data/mockData";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { Search } from "lucide-react";
import { Link } from "wouter";

// Get unique departments for filter buttons
const departments = Array.from(new Set(mockTeamMembers.map(member => member.department)));

// Simulate logged in user (in a real app, this would come from auth context)
const LOGGED_IN_USER_ID = '7'; // Frank Miles

export default function Organization() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter members based on department and search query
  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesDepartment = selectedDepartment === "All" || member.department === selectedDepartment;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  // Group members by their reporting structure
  const membersByManager = mockTeamMembers.reduce((acc, member) => {
    if (member.reportsTo) {
      if (!acc[member.reportsTo]) {
        acc[member.reportsTo] = [];
      }
      acc[member.reportsTo].push(member);
    }
    return acc;
  }, {} as Record<string, typeof mockTeamMembers>);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Organization</h1>
                <p className="text-muted-foreground">Team Structure and Hierarchy</p>
              </div>
              <UserAvatar />
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>People Org Chart</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search people..."
                      className="pl-8 w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button
                    variant={selectedDepartment === "All" ? "default" : "secondary"}
                    onClick={() => setSelectedDepartment("All")}
                  >
                    All People
                  </Button>
                  {departments.map((dept) => (
                    <Button
                      key={dept}
                      variant={selectedDepartment === dept ? "default" : "secondary"}
                      onClick={() => setSelectedDepartment(dept)}
                    >
                      {dept}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="min-h-[600px] pt-8">
                  <div className="flex flex-col items-center">
                    <div className="grid gap-8">
                      {/* CEO Level */}
                      <div className="flex justify-center">
                        <EmployeeCard 
                          employee={mockTeamMembers[0]} 
                          isCurrentUser={mockTeamMembers[0].id === LOGGED_IN_USER_ID}
                        />
                      </div>

                      {/* C-Level Executives */}
                      <div className="relative">
                        <div className="absolute left-1/2 top-[-30px] h-[30px] w-[2px] bg-border" />
                        <div className="absolute left-0 right-0 top-[-2px] h-[2px] bg-border" />
                        <div className="flex justify-center gap-8">
                          {membersByManager['1']?.map(director => (
                            <div key={director.id} className="relative">
                              <div className="absolute top-[-30px] left-1/2 h-[30px] w-[2px] bg-border" />
                              <EmployeeCard 
                                employee={director}
                                isCurrentUser={director.id === LOGGED_IN_USER_ID}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Department Teams */}
                      <div className="relative">
                        <div className="absolute left-1/2 top-[-30px] h-[30px] w-[2px] bg-border" />
                        <div className="absolute left-0 right-0 top-[-2px] h-[2px] bg-border" />
                        <div className="flex justify-center gap-16">
                          {membersByManager['5']?.map(manager => (
                            <div key={manager.id} className="relative">
                              <div className="absolute top-[-30px] left-1/2 h-[30px] w-[2px] bg-border" />
                              <EmployeeCard 
                                employee={manager}
                                isCurrentUser={manager.id === LOGGED_IN_USER_ID}
                              />

                              {/* Sub-team members */}
                              {membersByManager[manager.id] && (
                                <div className="mt-8 relative">
                                  <div className="absolute left-1/2 top-[-30px] h-[30px] w-[2px] bg-border" />
                                  <div className="absolute left-0 right-0 top-[-2px] h-[2px] bg-border" />
                                  <div className="flex justify-center gap-4">
                                    {membersByManager[manager.id].map(member => (
                                      <div key={member.id} className="relative">
                                        <div className="absolute top-[-30px] left-1/2 h-[30px] w-[2px] bg-border" />
                                        <EmployeeCard 
                                          employee={member}
                                          isCurrentUser={member.id === LOGGED_IN_USER_ID}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}

interface EmployeeCardProps {
  employee: typeof mockTeamMembers[0];
  isCurrentUser: boolean;
}

function EmployeeCard({ employee, isCurrentUser }: EmployeeCardProps) {
  return (
    <Link href={`/people/${employee.id}`}>
      <a className={`block bg-card hover:bg-accent transition-colors w-[200px] rounded-lg border shadow-sm
        ${isCurrentUser ? 'ring-2 ring-primary' : ''}`}>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="h-10 w-10 rounded-full"
            />
            <div className="space-y-1">
              <h3 className="font-medium leading-none">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.role}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}