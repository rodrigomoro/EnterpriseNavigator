import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import UserAvatar from "@/components/UserAvatar";
import NotificationTemplateEditor from "@/components/NotificationTemplateEditor";
import { BellRing, Globe, Lock, UserCog, Shield, Mail, MessageSquare, Phone, AlertCircle } from "lucide-react";

// Mock data for settings
const mockNotificationChannels = [
  { id: 1, name: "Email", icon: Mail, enabled: true },
  { id: 2, name: "SMS", icon: Phone, enabled: false },
  { id: 3, name: "In-app", icon: BellRing, enabled: true },
  { id: 4, name: "Push", icon: MessageSquare, enabled: true },
];

const mockConnectors = [
  {
    id: "microsoft",
    name: "Microsoft Entra ID",
    description: "Sync users and groups with Microsoft Entra ID",
    connected: true,
    lastSync: "2024-01-24T10:30:00",
  },
  {
    id: "google",
    name: "Google Cloud Identity",
    description: "Manage users through Google Workspace",
    connected: false,
  },
  {
    id: "aws",
    name: "AWS Cognito",
    description: "Integrate with AWS Cognito user pools",
    connected: false,
  },
];

const mockPermissions = [
  { id: 1, name: "View Programs", description: "Can view program details", category: "Programs" },
  { id: 2, name: "Manage Programs", description: "Can create and edit programs", category: "Programs" },
  { id: 3, name: "View People", description: "Can view people profiles", category: "People" },
  { id: 4, name: "Manage People", description: "Can add and edit people", category: "People" },
];

const mockRoles = [
  { 
    id: 1, 
    name: "Administrator", 
    description: "Full system access",
    permissions: mockPermissions,
  },
  {
    id: 2,
    name: "Program Manager",
    description: "Can manage programs and view people",
    permissions: mockPermissions.filter(p => p.category === "Programs" || p.name === "View People"),
  },
];

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1">
        <PageTransition>
          <div className="p-6">
            <header className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your preferences and account settings</p>
              </div>
              <UserAvatar />
            </header>

            <Tabs defaultValue="personal" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <UserCog className="h-4 w-4" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="communications" className="flex items-center gap-2">
                  <BellRing className="h-4 w-4" />
                  Communications
                </TabsTrigger>
                <TabsTrigger value="connectors" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Identity
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Preferences</CardTitle>
                    <CardDescription>
                      Customize your experience with personalized settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select defaultValue="eur">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select defaultValue="dd/mm/yyyy">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select defaultValue="utc+1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc">UTC</SelectItem>
                          <SelectItem value="utc+1">UTC+1 (Central European Time)</SelectItem>
                          <SelectItem value="utc-5">UTC-5 (Eastern Time)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="communications">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Communication Preferences</CardTitle>
                      <CardDescription>
                        Manage how and when you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        {mockNotificationChannels.map((channel) => (
                          <div key={channel.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <channel.icon className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{channel.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive notifications via {channel.name.toLowerCase()}
                                </p>
                              </div>
                            </div>
                            <Switch defaultChecked={channel.enabled} />
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4 pt-4 border-t">
                        <h3 className="font-medium">Notification Types</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Program Updates</p>
                              <p className="text-sm text-muted-foreground">
                                Changes to programs you're involved in
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">People Changes</p>
                              <p className="text-sm text-muted-foreground">
                                Updates to team members and roles
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Templates</CardTitle>
                      <CardDescription>
                        Customize how your notifications appear across different channels
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <NotificationTemplateEditor />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="connectors">
                <Card>
                  <CardHeader>
                    <CardTitle>Identity Management</CardTitle>
                    <CardDescription>
                      Connect and sync with external identity providers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {mockConnectors.map((connector) => (
                      <div
                        key={connector.id}
                        className="flex items-start justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{connector.name}</h3>
                            {connector.connected && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Connected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{connector.description}</p>
                          {connector.lastSync && (
                            <p className="text-xs text-muted-foreground">
                              Last synced: {new Date(connector.lastSync).toLocaleString()}
                            </p>
                          )}
                        </div>
                        <Button variant={connector.connected ? "outline" : "default"}>
                          {connector.connected ? "Configure" : "Connect"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <div className="grid gap-4 grid-cols-12">
                  <Card className="col-span-12 lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Roles</CardTitle>
                      <CardDescription>Manage security roles and their permissions</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[400px]">
                        {mockRoles.map((role) => (
                          <div
                            key={role.id}
                            className="flex items-start justify-between p-4 border-b last:border-0"
                          >
                            <div className="space-y-1">
                              <h3 className="font-medium">{role.name}</h3>
                              <p className="text-sm text-muted-foreground">{role.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {role.permissions.slice(0, 2).map((permission) => (
                                  <Badge key={permission.id} variant="secondary" className="text-xs">
                                    {permission.name}
                                  </Badge>
                                ))}
                                {role.permissions.length > 2 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{role.permissions.length - 2} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        ))}
                      </ScrollArea>
                    </CardContent>
                  </Card>

                  <Card className="col-span-12 lg:col-span-8">
                    <CardHeader>
                      <CardTitle>Permissions</CardTitle>
                      <CardDescription>Available permissions in the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {Array.from(new Set(mockPermissions.map(p => p.category))).map((category) => (
                          <div key={category} className="space-y-4">
                            <h3 className="font-medium">{category}</h3>
                            <div className="grid gap-4">
                              {mockPermissions
                                .filter(p => p.category === category)
                                .map((permission) => (
                                  <div
                                    key={permission.id}
                                    className="flex items-start justify-between"
                                  >
                                    <div>
                                      <p className="font-medium">{permission.name}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {permission.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </PageTransition>
      </div>
    </div>
  );
}