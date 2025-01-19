import { ArrowLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import { mockProjects } from "@/data/mockData";
import Calendar from "@/components/Calendar";
import Sidebar from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageTransition from "@/components/PageTransition";
import UserAvatar from "@/components/UserAvatar";
import { Card } from "@/components/ui/card";

export default function ProjectOverview() {
  const [, params] = useRoute("/programs/:id");
  const project = mockProjects.find((p) => p.id === params?.id);

  if (!project) return <div>Project not found</div>;

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
                  <span>/</span>
                  <span className="text-foreground">{project.name}</span>
                </div>
                <h1 className="text-2xl font-bold">
                  Program overview / {project.name}
                </h1>
              </div>

              <UserAvatar />
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="col-span-12 lg:col-span-4">
                <div className="bg-card rounded-lg shadow-sm p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <h2 className="text-xl font-semibold">{project.name}</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Assigned Teachers
                      </h3>
                      {project.team.map((member) => (
                        <Link key={member.id} href={`/people/${member.id}`}>
                          <a className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-lg">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={member.avatar}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {member.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className="bg-card rounded-lg shadow-sm p-4">
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
                      <div className="h-2 bg-muted rounded-full">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Students ({project.studentCount})
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      Avg. Score: {project.avgScore}%
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.students.map((student) => {
                      const avgScore = Math.round(
                        (student.scores.mathematics +
                          student.scores.science +
                          student.scores.programming) /
                          3
                      );
                      return (
                        <Link key={student.id} href={`/people/${student.id}`}>
                          <a className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={student.avatar}
                                alt={student.name}
                              />
                              <AvatarFallback>
                                {student.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Score: {avgScore}%
                              </p>
                            </div>
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}