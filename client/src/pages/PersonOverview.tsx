import { ArrowLeft, Edit, RefreshCw, Globe, Database, GraduationCap, Award, BookOpen } from "lucide-react";
import { Link, useRoute } from 'wouter';
import { mockTeamMembers } from '@/data/mockData';
import Sidebar from '@/components/Sidebar';
import PageTransition from '@/components/PageTransition';
import UserAvatar from '@/components/UserAvatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Mock student data (in a real app, this would come from your LMS/CRM integration)
const mockStudentData = {
  enrollmentStatus: "Active",
  academicStanding: "Good Standing",
  leadSource: "Website Form",
  conversionDate: "2023-05-15",
  gpa: 8.5,
  totalCredits: 45,
  enrolledPrograms: [
    {
      name: "Full Stack Development",
      progress: 75,
      score: 8.2,
      startDate: "2023-09-01",
      expectedCompletion: "2024-08-31",
    },
    {
      name: "UI/UX Design Fundamentals",
      progress: 100,
      score: 9.5,
      startDate: "2023-06-01",
      completionDate: "2023-12-15",
    }
  ],
  certifications: [
    {
      name: "UI/UX Design Certificate",
      issueDate: "2023-12-15",
      status: "Completed",
      score: 9.5
    },
    {
      name: "JavaScript Fundamentals",
      issueDate: "2023-10-30",
      status: "Completed",
      score: 8.8
    }
  ]
};

const mockTeacherData = {
  programs: [
    {
      name: "Full Stack Development",
      role: "Lead Instructor",
      students: 25,
      startDate: "2023-09-01",
    },
    {
      name: "Advanced JavaScript",
      role: "Instructor",
      students: 18,
      startDate: "2023-11-15",
    }
  ],
  certifications: [
    {
      name: "Advanced Web Development Certificate",
      issueDate: "2023-08-15",
      status: "Completed",
      score: 9.8
    },
    {
      name: "Cloud Architecture Certification",
      issueDate: "2023-12-01",
      status: "Completed",
      score: 9.5
    }
  ]
};

export default function PersonOverview() {
  const [, params] = useRoute('/people/:id');
  const person = mockTeamMembers.find(m => m.id === params?.id);

  if (!person) {
    return <div>Person not found</div>;
  }

  const lastSync = new Date("2024-01-24T10:30:00");
  const connectedProviders = ["Microsoft Entra ID", "Google Cloud Identity"];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Link href="/people">
                    <a className="flex items-center gap-1 hover:text-foreground">
                      <ArrowLeft className="h-4 w-4" />
                      People Directory
                    </a>
                  </Link>
                  <span>/</span>
                  <span className="text-foreground">{person.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold">Person Overview</h1>
                  <Link href={`/people/${person.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Person
                    </Button>
                  </Link>
                </div>
              </div>

              <UserAvatar />
            </div>

            <div className="mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Connected Identity Providers</p>
                          <p className="text-sm text-muted-foreground">
                            Last synced {lastSync.toLocaleDateString()} at {lastSync.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {connectedProviders.map(provider => (
                          <Badge key={provider} variant="secondary">
                            {provider}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Sync Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Basic details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{person.name}</h3>
                        <Badge variant="outline">{person.status || 'Active'}</Badge>
                      </div>

                      <DataField
                        label="Role"
                        value={person.role}
                        source="Microsoft Entra ID"
                      />
                      <DataField
                        label="Department"
                        value={person.department}
                        source="Microsoft Entra ID"
                      />
                      <DataField
                        label="Email"
                        value={person.email}
                        source="Google Cloud Identity"
                      />
                      <DataField
                        label="Phone"
                        value={person.phone}
                        source="internal"
                      />
                      <DataField
                        label="Birth Date"
                        value={new Date(person.birthDate || '').toLocaleDateString()}
                        source="internal"
                      />
                      <DataField
                        label="LinkedIn"
                        value={person.linkedinUrl}
                        source="internal"
                      />
                      <DataField
                        label="Location"
                        value={person.location}
                        source="Microsoft Entra ID"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12 lg:col-span-8 space-y-6">
                {person.role === 'Student' && (
                  <>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-5 w-5" />
                          <div>
                            <CardTitle>Academic Status</CardTitle>
                            <CardDescription>Current academic standing and lead information</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Lead Source</p>
                            <p className="font-medium">{mockStudentData.leadSource}</p>
                            <p className="text-xs text-muted-foreground">
                              Converted: {new Date(mockStudentData.conversionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Enrollment Status</p>
                            <p className="font-medium">{mockStudentData.enrollmentStatus}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Academic Standing</p>
                            <p className="font-medium">{mockStudentData.academicStanding}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Average Score</p>
                            <p className="font-medium">{mockStudentData.gpa}/10</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          <div>
                            <CardTitle>Program Enrollment</CardTitle>
                            <CardDescription>Current and completed programs</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {mockStudentData.enrolledPrograms.map((program, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">{program.name}</h4>
                                <Badge variant={program.progress === 100 ? "default" : "secondary"}>
                                  {program.progress === 100 ? "Completed" : "In Progress"}
                                </Badge>
                              </div>
                              <Progress value={program.progress} className="h-2" />
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Started: {new Date(program.startDate).toLocaleDateString()}</span>
                                <span>Score: {program.score}/10</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {program.completionDate
                                  ? `Completed: ${new Date(program.completionDate).toLocaleDateString()}`
                                  : `Expected: ${new Date(program.expectedCompletion).toLocaleDateString()}`}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          <div>
                            <CardTitle>Certifications</CardTitle>
                            <CardDescription>Earned certificates and achievements</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockStudentData.certifications.map((cert, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                              <div>
                                <h4 className="font-medium">{cert.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Issued: {new Date(cert.issueDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge className="mb-1">{cert.status}</Badge>
                                <p className="text-sm text-muted-foreground">Score: {cert.score}/10</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}

                {(person.role === 'Teacher' || person.role === 'Director') && (
                  <>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          <div>
                            <CardTitle>Current Programs</CardTitle>
                            <CardDescription>Programs currently teaching or supervising</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {mockTeacherData.programs.map((program, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                              <div>
                                <h4 className="font-medium">{program.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Role: {program.role}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge variant="secondary">{program.students} Students</Badge>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Since: {new Date(program.startDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          <div>
                            <CardTitle>Certifications</CardTitle>
                            <CardDescription>Professional certifications and achievements</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mockTeacherData.certifications.map((cert, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                              <div>
                                <h4 className="font-medium">{cert.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Issued: {new Date(cert.issueDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge className="mb-1">{cert.status}</Badge>
                                <p className="text-sm text-muted-foreground">Score: {cert.score}/10</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}

function DataField({ label, value, source }: { label: string; value: string; source: string }) {
  return (
    <TooltipProvider>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">{label}</label>
          <Tooltip>
            <TooltipTrigger>
              {source === "internal" ? (
                <Database className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Globe className="h-4 w-4 text-muted-foreground" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Source: {source}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="text-sm">{value}</p>
      </div>
    </TooltipProvider>
  );
}