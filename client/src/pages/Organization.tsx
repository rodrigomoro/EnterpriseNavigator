import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { mockPeople } from "@/data/mockPeople";

// Only include relevant roles for the org chart
const INCLUDED_ROLES = [
  'CEO & Founder',
  'Chief Academic Officer',
  'Chief Financial Officer',
  'Chief Technology Officer',
  'CFO',
  'CTO',
  'Marketing Director',
  'Sales Director',
  'Admission Director',
  'Program Director',
  'Teacher',
  'Finance Staff',
  'Tech Staff',
  'HR Staff'
];

// Get unique departments for filter buttons
const departments = Array.from(new Set(
  mockPeople
    .filter(person => INCLUDED_ROLES.includes(person.role))
    .map(person => person.department)
));

// Simulate logged in user (in a real app, this would come from auth context)
const LOGGED_IN_USER_ID = 'cao-1';

export default function Organization() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', 'cao-1']));

  // Filter people based on department, search query, and included roles
  const filteredPeople = useMemo(() => {
    return mockPeople.filter(person => {
      const matchesRole = INCLUDED_ROLES.some(included => 
        // This will match "Program Director: Science Program"
        // since it starts with "Program Director"
        person.role.toLowerCase().startsWith(included.toLowerCase())
      ) || person.id === '1';

      // Department + search remain the same
      const matchesDepartment = selectedDepartment === "All" || person.department === selectedDepartment;
      const matchesSearch = (
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.role.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return matchesRole && matchesDepartment && matchesSearch;
    });
  }, [selectedDepartment, searchQuery]);

  // Group people by their reporting structure
  const peopleByManager = useMemo(() => {
    return filteredPeople.reduce((acc, person) => {
      if (person.reportsTo) {
        if (!acc[person.reportsTo]) {
          acc[person.reportsTo] = [];
        }
        acc[person.reportsTo].push(person);
      }
      return acc;
    }, {} as Record<string, typeof mockPeople>);
  }, [filteredPeople]);

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

  const renderOrgNode = (employee: typeof mockPeople[0], level: number = 0) => {
    const hasChildren = peopleByManager[employee.id]?.length > 0;
    const isExpanded = expandedNodes.has(employee.id);

    return (
      <div key={employee.id} className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <EmployeeCard
            employee={employee}
            isCurrentUser={employee.id === LOGGED_IN_USER_ID}
          />
          {hasChildren && (
            <button
              onClick={() => toggleExpand(employee.id)}
              className="mt-2 p-1 hover:bg-accent rounded-full border"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <>
            <div className="w-px h-8 bg-border"></div>
            <div className="relative">
              <div className="absolute top-0 left-1/2 w-px h-8 -translate-x-1/2 bg-border"></div>
              <div className="absolute top-8 left-0 right-0 h-px bg-border"></div>
              <div className="pt-8 flex gap-8">
                {peopleByManager[employee.id].map((child, index) => (
                  <div key={child.id} className="relative">
                    <div className="absolute top-0 left-1/2 w-px h-8 -translate-x-1/2 bg-border"></div>
                    {renderOrgNode(child, level + 1)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  // Find the top-level manager (CEO)
  const ceo = filteredPeople.find(m => !m.reportsTo);

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
                <div className="min-h-[600px] pt-8 overflow-x-auto">
                  <div className="min-w-[800px] flex justify-center">
                    {ceo && renderOrgNode(ceo)}
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
  employee: typeof mockPeople[0];
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