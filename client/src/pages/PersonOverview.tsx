import { ArrowLeft, Edit, RefreshCw, Globe, Database } from "lucide-react";
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

export default function PersonOverview() {
  const [, params] = useRoute('/people/:id');
  const person = mockTeamMembers.find(m => m.id === params?.id);

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

            {/* Identity Provider Status */}
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
              {/* Personal Information */}
              <div className="col-span-12 lg:col-span-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Basic details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Identity Information */}
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
                        value="example@email.com"
                        source="Google Cloud Identity"
                      />
                      <DataField
                        label="Phone"
                        value="+1 234 567 890"
                        source="internal"
                      />
                      <DataField
                        label="Location"
                        value="San Francisco, CA"
                        source="Microsoft Entra ID"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Work Information */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Organization Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Details</CardTitle>
                    <CardDescription>Work-related information and reporting structure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <DataField
                      label="Reports To"
                      value="Jane Smith"
                      source="Microsoft Entra ID"
                    />
                    <DataField
                      label="Team"
                      value="Engineering"
                      source="Microsoft Entra ID"
                    />
                    <DataField
                      label="Office"
                      value="HQ - Floor 3"
                      source="internal"
                    />
                    <DataField
                      label="Start Date"
                      value="January 15, 2024"
                      source="internal"
                    />
                  </CardContent>
                </Card>

                {/* System Access */}
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
                      value="Administrator"
                      source="internal"
                    />
                    <DataField
                      label="Last Login"
                      value="Today at 9:30 AM"
                      source="internal"
                    />
                  </CardContent>
                </Card>

                {/* Internal Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Internal Notes</CardTitle>
                    <CardDescription>Additional information for internal use</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataField
                      label="Notes"
                      value="Team lead for the new cloud migration project. Excellent communication skills and project management experience."
                      source="internal"
                    />
                  </CardContent>
                </Card>
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