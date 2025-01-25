import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockTeamMembers } from "@/data/mockData";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "wouter";

// Only include relevant roles
const INCLUDED_ROLES = ['Chief Academic Officer', 'Director', 'Teacher', 'Staff'];

// Get unique departments for filter buttons
const departments = Array.from(new Set(
  mockTeamMembers
    .filter(member => INCLUDED_ROLES.includes(member.role))
    .map(member => member.department)
));

// Simulate logged in user (in a real app, this would come from auth context)
const LOGGED_IN_USER_ID = 'cao-1';

export default function Organization() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', 'cao-1']));

  // Filter members based on department, search query, and included roles
  const filteredMembers = useMemo(() => {
    return mockTeamMembers.filter(member => {
      const matchesRole = INCLUDED_ROLES.includes(member.role);
      const matchesDepartment = selectedDepartment === "All" || member.department === selectedDepartment;
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRole && matchesDepartment && matchesSearch;
    });
  }, [selectedDepartment, searchQuery]);

  // Group members by their reporting structure
  const membersByManager = useMemo(() => {
    return filteredMembers.reduce((acc, member) => {
      if (member.reportsTo) {
        if (!acc[member.reportsTo]) {
          acc[member.reportsTo] = [];
        }
        acc[member.reportsTo].push(member);
      }
      return acc;
    }, {} as Record<string, typeof mockTeamMembers>);
  }, [filteredMembers]);

  const toggleExpand = (id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderOrgNode = (employee: typeof mockTeamMembers[0], level: number = 0) => {
    const hasChildren = membersByManager[employee.id]?.length > 0;
    const isExpanded = expandedNodes.has(employee.id);

    return (
      <div key={employee.id} className="relative" style={{ marginLeft: `${level * 40}px` }}>
        <div className="flex items-center gap-2 mb-4">
          {hasChildren && (
            <button
              onClick={() => toggleExpand(employee.id)}
              className="p-1 hover:bg-accent rounded-sm"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          <EmployeeCard
            employee={employee}
            isCurrentUser={employee.id === LOGGED_IN_USER_ID}
          />
        </div>
        {hasChildren && isExpanded && (
          <div className="border-l-2 border-border pl-4">
            {membersByManager[employee.id].map(child => renderOrgNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Find the top-level manager (CEO)
  const ceo = filteredMembers.find(m => !m.reportsTo);

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
                    All Departments
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
                  {ceo && renderOrgNode(ceo)}
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
      <a className={`block bg-card hover:bg-accent transition-colors w-[280px] rounded-lg border shadow-sm
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
              <p className="text-xs text-muted-foreground">{employee.department}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}