import {
  ArrowLeft,
  Edit,
  ChevronDown,
  ChevronRight,
  Clock,
  Users,
  Calendar as CalendarIcon,
  GraduationCap,
} from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState } from "react";
import { mockPrograms, mockTeamMembers } from "@/data/mockData";
import Sidebar from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectOverview() {
  const [, params] = useRoute("/programs/:id");
  const project = mockPrograms.find((p) => p.id === params?.id);
  const [openSections, setOpenSections] = useState({
    modules: true,
    intakes: true,
  });
  const students = mockTeamMembers.filter((m) => m.role === "Student");
  const teachers = mockTeamMembers.filter((m) => m.role === "Teacher");

  if (!project) return <div>Project not found</div>;

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Link href="/programs">
                    <a className="flex items-center gap-1 hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" />
                      Program overview
                    </a>
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold">{project.name}</h1>
                  <Badge variant="secondary">{project.type}</Badge>
                  <Link href={`/programs/${project.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Program
                    </Button>
                  </Link>
                </div>
              </div>

              <UserAvatar />
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Program Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Area</p>
                          <p className="font-medium">{project.area}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="font-medium">{project.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Duration
                          </p>
                          <p className="font-medium">
                            {project.totalHours} hours
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Program Directors
                      </h3>
                      <div className="space-y-3">
                        {project.directors?.map((director) => (
                          <Link
                            key={director.id}
                            href={`/people/${director.id}`}
                          >
                            <a className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={director.avatar}
                                  alt={director.name}
                                />
                                <AvatarFallback>
                                  {director.name.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">
                                  {director.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Director
                                </p>
                              </div>
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Key Stats</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span className="text-sm">Total Students</span>
                          </div>
                          <p className="text-2xl font-semibold">
                            {project.studentCount}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <GraduationCap className="h-4 w-4" />
                            <span className="text-sm">Avg. Score</span>
                          </div>
                          <p className="text-2xl font-semibold">
                            {project.avgScore}%
                          </p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Program Progress
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Overall Progress
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                </Card>
                <Card className="p-6">                    
                  <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Objectives</h4>
                        <p className="text-sm text-muted-foreground">
                          {project.objectives}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Why Choose This Course?
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {project.whyChoose}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Career Opportunities
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {project.careerOpportunities}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Certifications
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {project.certifications}
                        </p>
                      </div>
                    </div>                  
                </Card>
              </div>

              {/* Right Column */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Modules Section */}
                <Card className="p-6">
                  <Collapsible
                    open={openSections.modules}
                    onOpenChange={() => toggleSection("modules")}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <h3 className="text-lg font-semibold">Modules</h3>
                      {openSections.modules ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4">
                      <ScrollArea className="h-[408px] pr-4">
                        <div className="space-y-4">
                          {project.modules?.map((module, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="font-medium">{module.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {module.description}
                                  </p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-right">
                                    <p className="text-sm text-muted-foreground">
                                      Credits
                                    </p>
                                    <p className="font-medium">
                                      {module.credits}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-muted-foreground">
                                      Hours
                                    </p>
                                    <p className="font-medium">
                                      {module.hours}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                  <p className="text-sm font-medium mb-1">
                                    Competencies
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {module.competencies}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium mb-1">
                                    Tools
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {module.tools}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>

                {/* Intakes & Groups Section */}
                <Card className="p-6">
                  <Collapsible
                    open={openSections.intakes}
                    onOpenChange={() => toggleSection("intakes")}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <h3 className="text-lg font-semibold">
                        Intakes & Groups
                      </h3>
                      {openSections.intakes ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4">
                      {/* <ScrollArea className="h-[800px] pr-4"> */}
                        <div className="space-y-6">
                          {project.intakes?.map((intake, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h4 className="font-medium">
                                    {intake.name}{" "}
                                    <Badge variant="outline">
                                      {intake.modality}
                                    </Badge>
                                  </h4>
                                </div>
                              </div>

                              <div className="space-y-4">
                                {/* Schedule */}
                                <div>
                                  <h5 className="text-sm font-medium mb-2">
                                    Schedule
                                  </h5>
                                  <div className="grid grid-cols-2 gap-4">
                                    {intake.schedule.days.map(
                                      (day, dayIndex) =>
                                        day.enabled && (
                                          <div
                                            key={dayIndex}
                                            className="flex items-center gap-2 text-sm"
                                          >
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">
                                              {day.dayId}
                                            </span>
                                            <span className="text-muted-foreground">
                                              {day.startTime} - {day.endTime}
                                            </span>
                                          </div>
                                        ),
                                    )}
                                  </div>
                                </div>

                                {/* Groups */}
                                <div>
                                  <h5 className="text-sm font-medium mb-2">
                                    Groups
                                  </h5>
                                  <div className="space-y-3">
                                    {intake.groups.map((group, groupIndex) => (
                                      <div
                                        key={groupIndex}
                                        className="border rounded-lg p-3"
                                      >
                                        <Collapsible>
                                          <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                              <CollapsibleTrigger className="flex items-center gap-2">
                                                <ChevronRight className="h-4 w-4" />
                                                <span className="font-medium">
                                                  {group.name}
                                                </span>
                                              </CollapsibleTrigger>
                                              <Badge>{group.status}</Badge>
                                            </div>
                                            <div className="flex items-center gap-4">
                                              <div className="text-right">
                                                <p className="text-xs text-muted-foreground">
                                                  Capacity
                                                </p>
                                                <p className="font-medium">
                                                  {group.capacity}
                                                </p>
                                              </div>
                                              <div className="text-right">
                                                <p className="text-xs text-muted-foreground">
                                                  Cost/Student
                                                </p>
                                                <p className="font-medium">
                                                  ${group.costPerStudent}
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          <CollapsibleContent className="pt-4 space-y-4">
                                            {/* Module-Teacher Mapping */}
                                            <div>
                                              <h5 className="text-sm font-medium mb-2">Module Teachers</h5>
                                              <div className="border rounded-md overflow-hidden">
                                                <div className="bg-muted/50 p-2 grid grid-cols-12 gap-2 text-sm font-medium">
                                                  <div className="col-span-4">Module</div>
                                                  <div className="col-span-8">Teachers</div>
                                                </div>
                                                <div className="divide-y">
                                                  {group.moduleTeachers?.map((mapping, mappingIndex) => {
                                                    const module = project.modules?.find((m, idx) => idx.toString() === mapping.moduleId);
                                                    return module ? (
                                                      <div key={mappingIndex} className="p-2 grid grid-cols-12 gap-2 items-center">
                                                        <div className="col-span-4">
                                                          <div className="font-medium">{module.name}</div>
                                                          <div className="text-sm text-muted-foreground">
                                                            {module.credits} credits
                                                          </div>
                                                        </div>
                                                        <div className="col-span-8">
                                                          <div className="flex -space-x-0">
                                                            {mapping.teacherIds.map((teacherId) => {
                                                              const teacher = teachers?.find(m => m.id === teacherId);
                                                              return teacher ? (
                                                                <Link key={teacher.id} href={`/people/${teacher.id}`}>
                                                                  <a onClick={(e) => e.stopPropagation()} className="flex items-center gap-2">
                                                                    <Avatar className="border-2 border-background w-8 h-8">
                                                                      <AvatarImage src={teacher.avatar} alt={teacher.name} />
                                                                      <AvatarFallback>{teacher.name.slice(0, 2)}</AvatarFallback>
                                                                    </Avatar>
                                                                    <span className="text-sm font-medium mr-2">{teacher.name}</span>
                                                                  </a>
                                                                </Link>
                                                              ) : null;
                                                            })}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    ) : null;
                                                  })}
                                                </div>
                                              </div>
                                            </div>

                                            {/* Enrolled Students */}
                                            <div>
                                              <h5 className="text-sm font-medium mb-2">Enrolled Students</h5>
                                              <div className="grid grid-cols-2 gap-2">
                                                {group.studentIds?.map((studentId) => {
                                                  const student = students?.find(s => s.id === studentId);
                                                  return student ? (
                                                    <Link key={student.id} href={`/people/${student.id}`}>
                                                      <a className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded-md">
                                                        <Avatar className="h-8 w-8">
                                                          <AvatarImage src={student.avatar} alt={student.name} />
                                                          <AvatarFallback>{student.name.slice(0, 2)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                          <p className="font-medium text-sm">{student.name}</p>
                                                          <p className="text-xs text-muted-foreground">Student</p>
                                                        </div>
                                                      </a>
                                                    </Link>
                                                  ) : null;
                                                })}
                                              </div>
                                            </div>
                                          </CollapsibleContent>
                                        </Collapsible>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      {/* </ScrollArea> */}
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
