import { ArrowLeft, Edit, RefreshCw, Globe, Database } from "lucide-react";
import { Link, useRoute } from 'wouter';
import { mockTeamMembers, mockStudents } from '@/data/mockData';
import Sidebar from '@/components/Sidebar';
import PageTransition from '@/components/PageTransition';
import UserAvatar from '@/components/UserAvatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { mockProjects } from '@/data/mockData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export default function PersonOverview() {
  const [, params] = useRoute('/people/:id');
  const person = mockTeamMembers.find(m => m.id === params?.id);
  const studentData = person?.role === 'Student' ? mockStudents.find(s => s.id === params?.id) : null;

  if (!person) {
    return <div>Person not found</div>;
  }

  // Mock data for demo purposes
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
                      <DataField
                        label="Full Name"
                        value={person.name}
                        source="Microsoft Entra ID"
                      />
                      <DataField
                        label="Job Title"
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
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12 lg:col-span-8 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Details</CardTitle>
                    <CardDescription>Work-related information and reporting structure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <DataField
                      label="Reports To"
                      value={person.reportsTo || 'N/A'}
                      source="Microsoft Entra ID"
                    />
                    <DataField
                      label="Team"
                      value={person.department}
                      source="Microsoft Entra ID"
                    />
                    <DataField
                      label="Bio"
                      value={person.bio}
                      source="internal"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Access</CardTitle>
                    <CardDescription>Account status and permissions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <DataField
                      label="Account Status"
                      value="Active"
                      source="Microsoft Entra ID"
                    />
                    <DataField
                      label="Role"
                      value={person.role}
                      source="internal"
                    />
                    <DataField
                      label="Last Login"
                      value="Today at 9:30 AM"
                      source="internal"
                    />
                  </CardContent>
                </Card>
              </div>

              {studentData && (
                <div className="col-span-12 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Academic Information</CardTitle>
                      <CardDescription>
                        Program enrollments, certifications, and academic performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {studentData.previousEducation && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Previous Education</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <DataField
                              label="Institution"
                              value={studentData.previousEducation.institution}
                              source="internal"
                            />
                            <DataField
                              label="Degree"
                              value={studentData.previousEducation.degree}
                              source="internal"
                            />
                            <DataField
                              label="Field of Study"
                              value={studentData.previousEducation.field}
                              source="internal"
                            />
                            <DataField
                              label="Graduation Year"
                              value={studentData.previousEducation.graduationYear}
                              source="internal"
                            />
                          </div>
                        </div>
                      )}

                      {studentData.enrollments && studentData.enrollments.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Current Enrollments</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Program</TableHead>
                                <TableHead>Enrollment Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Progress</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {studentData.enrollments.map(enrollment => {
                                const program = mockProjects.find(p => p.id === enrollment.programId);
                                return (
                                  <TableRow key={enrollment.programId}>
                                    <TableCell className="font-medium">
                                      {program?.name || 'Unknown Program'}
                                    </TableCell>
                                    <TableCell>
                                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                      <Badge
                                        variant={
                                          enrollment.status === 'active'
                                            ? 'default'
                                            : enrollment.status === 'completed'
                                            ? 'outline'
                                            : 'destructive'
                                        }
                                      >
                                        {enrollment.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Progress value={enrollment.progress} className="w-[60px]" />
                                        <span className="text-sm text-muted-foreground">
                                          {enrollment.progress}%
                                        </span>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      )}

                      {studentData.scores && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Academic Performance</h3>
                          <div className="grid grid-cols-3 gap-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">
                                  Mathematics
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">
                                  {studentData.scores.mathematics}%
                                </div>
                                <Progress
                                  value={studentData.scores.mathematics}
                                  className="mt-2"
                                />
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">
                                  Science
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">
                                  {studentData.scores.science}%
                                </div>
                                <Progress
                                  value={studentData.scores.science}
                                  className="mt-2"
                                />
                              </CardContent>
                            </Card>
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium">
                                  Programming
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-2xl font-bold">
                                  {studentData.scores.programming}%
                                </div>
                                <Progress
                                  value={studentData.scores.programming}
                                  className="mt-2"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      )}

                      {studentData.certifications && studentData.certifications.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="font-semibold">Certifications</h3>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Certification</TableHead>
                                <TableHead>Issue Date</TableHead>
                                <TableHead>Expiry Date</TableHead>
                                <TableHead>Verify</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {studentData.certifications.map(cert => (
                                <TableRow key={cert.id}>
                                  <TableCell className="font-medium">
                                    {cert.name}
                                  </TableCell>
                                  <TableCell>
                                    {new Date(cert.issueDate).toLocaleDateString()}
                                  </TableCell>
                                  <TableCell>
                                    {cert.expiryDate
                                      ? new Date(cert.expiryDate).toLocaleDateString()
                                      : 'No expiry'}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="hover:bg-transparent underline"
                                      asChild
                                    >
                                      <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Verify
                                      </a>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
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