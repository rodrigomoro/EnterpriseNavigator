import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockTeamMembers, mockSkills, competencyLevels, type TeamMember, type Skill, type CompetencyLevel } from "@/data/mockData";
import Sidebar from "@/components/Sidebar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { Search } from "lucide-react";

interface CompetencyMapping {
  employeeId: string;
  skillId: string;
  levelId: string;
}

export default function SkillsMatrix() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [competencyMappings, setCompetencyMappings] = useState<CompetencyMapping[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Filter employees based on search and department
  const filteredEmployees = mockTeamMembers.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(new Set(mockTeamMembers.map(member => member.department)));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const levelId = active.id as string;
    const [employeeId, skillId] = (over.id as string).split('-');

    // Update competency mappings
    setCompetencyMappings(prev => {
      // Remove any existing mapping for this employee and skill
      const filtered = prev.filter(m => 
        !(m.employeeId === employeeId && m.skillId === skillId)
      );
      
      // Add the new mapping
      return [...filtered, {
        employeeId,
        skillId,
        levelId
      }];
    });
  };

  const getCompetencyLevel = (employeeId: string, skillId: string) => {
    return competencyMappings.find(m => 
      m.employeeId === employeeId && m.skillId === skillId
    )?.levelId;
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Skills Matrix</h1>
                <p className="text-muted-foreground">Team Competency Mapping</p>
              </div>
              <UserAvatar />
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Competency Mapping</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
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
                <div className="mt-4">
                  <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="p-2 border bg-muted text-left">Employee</th>
                            {mockSkills.map(skill => (
                              <th key={skill.id} className="p-2 border bg-muted text-left min-w-[150px]">
                                <div>
                                  <div className="font-medium">{skill.name}</div>
                                  <div className="text-xs text-muted-foreground">{skill.category}</div>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                              <td className="p-2 border">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={employee.avatar}
                                    alt={employee.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div>
                                    <div className="font-medium">{employee.name}</div>
                                    <div className="text-sm text-muted-foreground">{employee.role}</div>
                                  </div>
                                </div>
                              </td>
                              {mockSkills.map(skill => (
                                <td
                                  key={`${employee.id}-${skill.id}`}
                                  className="p-2 border"
                                >
                                  <div
                                    id={`${employee.id}-${skill.id}`}
                                    className="h-16 rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center"
                                  >
                                    {getCompetencyLevel(employee.id, skill.id) ? (
                                      <CompetencyBadge
                                        level={competencyLevels.find(l => 
                                          l.id === getCompetencyLevel(employee.id, skill.id)
                                        )!}
                                      />
                                    ) : (
                                      <span className="text-sm text-muted-foreground">
                                        Drop level here
                                      </span>
                                    )}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-8 p-4 border rounded-lg bg-muted/50">
                      <h3 className="text-sm font-medium mb-2">Competency Levels</h3>
                      <div className="flex gap-2 flex-wrap">
                        {competencyLevels.map(level => (
                          <CompetencyBadge key={level.id} level={level} draggable />
                        ))}
                      </div>
                    </div>
                  </DndContext>
                </div>
              </CardContent>
            </Card>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}

interface CompetencyBadgeProps {
  level: CompetencyLevel;
  draggable?: boolean;
}

function CompetencyBadge({ level, draggable }: CompetencyBadgeProps) {
  return (
    <div
      className={`px-3 py-1.5 rounded text-sm font-medium cursor-grab active:cursor-grabbing ${level.color}`}
      draggable={draggable}
    >
      {level.name}
    </div>
  );
}
