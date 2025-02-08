import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import UserAvatar from "@/components/UserAvatar";
import NotificationTemplateEditor from "@/components/NotificationTemplateEditor";
import { BellRing, Globe, Lock, UserCog, Shield, Mail, MessageSquare, Phone, AlertCircle, RefreshCw, Key, Landmark } from "lucide-react";
import { useState } from "react";
import BankFileInterface from "@/components/BankFileInterface";

// Mock data for settings
const mockNotificationChannels = [
  { id: 1, name: "Email", icon: Mail, enabled: true },
  { id: 2, name: "SMS", icon: Phone, enabled: false },
  { id: 3, name: "In-app", icon: BellRing, enabled: true },
  { id: 4, name: "Push", icon: MessageSquare, enabled: true },
];

const mockConnectors = [
  // Identity Management
  {
    id: "microsoft",
    name: "Microsoft Entra ID",
    description: "Sync users and groups with Microsoft Entra ID",
    connected: true,
    lastSync: "2024-01-24T10:30:00",
    category: "Identity",
  },
  {
    id: "google",
    name: "Google Cloud Identity",
    description: "Manage users through Google Workspace",
    connected: false,
    category: "Identity",
  },
  {
    id: "aws",
    name: "AWS Cognito",
    description: "Integrate with AWS Cognito user pools",
    connected: false,
    category: "Identity",
  },
  // CRM Systems
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Connect with HubSpot CRM for student and lead management",
    connected: false,
    category: "CRM",
    fields: ["contacts", "companies", "deals", "tickets"]
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Integrate with Salesforce for comprehensive CRM capabilities",
    connected: false,
    category: "CRM",
    fields: ["accounts", "contacts", "opportunities", "cases"]
  },
  {
    id: "dynamics",
    name: "Microsoft Dynamics 365",
    description: "Connect with Microsoft's CRM solution for education",
    connected: false,
    category: "CRM",
    fields: ["contacts", "accounts", "leads", "opportunities"]
  },
  // Learning Management Systems
  {
    id: "google-classroom",
    name: "Google Classroom",
    description: "Integrate with Google Classroom for course management",
    connected: true,
    lastSync: "2024-01-24T09:15:00",
    category: "LMS",
  },
  {
    id: "aws-academy",
    name: "AWS Academy",
    description: "Connect with AWS Academy for cloud learning resources",
    connected: false,
    category: "LMS",
  },
  {
    id: "moodle",
    name: "Moodle",
    description: "Integrate with Moodle LMS for course content",
    connected: false,
    category: "LMS",
  },
  {
    id: "canvas",
    name: "Canvas LMS",
    description: "Connect with Canvas for comprehensive learning management",
    connected: false,
    category: "LMS",
  }
];

const mockPermissions = [
  // Programs
  { id: 1, name: "View Programs", description: "Can view program details", category: "Programs" },
  { id: 2, name: "Create Programs", description: "Can create new programs", category: "Programs" },
  { id: 3, name: "Edit Programs", description: "Can modify existing programs", category: "Programs" },
  { id: 4, name: "Delete Programs", description: "Can delete programs", category: "Programs" },

  // People
  { id: 5, name: "View People", description: "Can view people profiles", category: "People" },
  { id: 6, name: "Manage People", description: "Can add and edit people", category: "People" },
  { id: 7, name: "Delete People", description: "Can remove people", category: "People" },

  // Calendar
  { id: 8, name: "View Calendar", description: "Can view calendar events", category: "Calendar" },
  { id: 9, name: "Manage Events", description: "Can create and edit calendar events", category: "Calendar" },

  // Organization
  { id: 10, name: "View Organization", description: "Can view organization structure", category: "Organization" },
  { id: 11, name: "Manage Organization", description: "Can modify organization structure", category: "Organization" },

  // Skills Matrix
  { id: 12, name: "View Skills", description: "Can view skills matrix", category: "Skills Matrix" },
  { id: 13, name: "Manage Skills", description: "Can update skills and assessments", category: "Skills Matrix" },

  // Invoices
  { id: 14, name: "View Invoices", description: "Can view invoice details", category: "Invoices" },
  { id: 15, name: "Create Invoices", description: "Can create new invoices", category: "Invoices" },
  { id: 16, name: "Manage Invoices", description: "Can edit and process invoices", category: "Invoices" },

  // QR Tracking
  { id: 17, name: "View QR Codes", description: "Can view QR tracking dashboard", category: "QR Tracking" },
  { id: 18, name: "Generate QR Codes", description: "Can generate new QR codes", category: "QR Tracking" },

  // Analytics
  { id: 19, name: "View Analytics", description: "Can access analytics dashboard", category: "Analytics" },
  { id: 20, name: "Export Reports", description: "Can export analytical reports", category: "Analytics" },

  // Settings
  { id: 21, name: "Manage Communications", description: "Can configure notification settings", category: "Settings" },
  { id: 22, name: "Manage Identity", description: "Can configure identity providers", category: "Settings" },
  { id: 23, name: "Manage Security", description: "Can manage roles and permissions", category: "Settings" }
];

const mockRoles = [
  {
    id: 1,
    name: "Administrator",
    description: "Full system access",
    isSystem: true,
    permissions: mockPermissions,
  },
  {
    id: 2,
    name: "Editor",
    description: "Can manage all content except settings",
    isSystem: true,
    permissions: mockPermissions.filter(p => p.category !== "Settings"),
  },
  {
    id: 3,
    name: "Reader",
    description: "Read-only access to all content",
    isSystem: true,
    permissions: mockPermissions.filter(p => p.name.startsWith("View")),
  },
  {
    id: 4,
    name: "Program Manager",
    description: "Can manage programs and view people",
    isSystem: false,
    permissions: [
      ...mockPermissions.filter(p => p.category === "Programs"),
      ...mockPermissions.filter(p => p.name === "View People"),
    ],
  },
  {
    id: 5,
    name: "HR Manager",
    description: "Can manage people and skills",
    isSystem: false,
    permissions: [
      ...mockPermissions.filter(p => p.category === "People"),
      ...mockPermissions.filter(p => p.category === "Skills Matrix"),
    ],
  }
];

// Add new type for field mapping
type FieldMapping = {
  field: string;
  source: string;
  description: string;
  enabled: boolean;
};

const defaultFieldMappings: FieldMapping[] = [
  { field: "name", source: "microsoft", description: "Full Name", enabled: true },
  { field: "email", source: "google", description: "Email Address", enabled: true },
  { field: "department", source: "microsoft", description: "Department", enabled: true },
  { field: "jobTitle", source: "microsoft", description: "Job Title", enabled: true },
  { field: "manager", source: "microsoft", description: "Reports To", enabled: true },
  { field: "location", source: "microsoft", description: "Office Location", enabled: true },
  { field: "phone", source: "internal", description: "Phone Number", enabled: false },
  { field: "startDate", source: "internal", description: "Start Date", enabled: false },
  // CRM mappings
  { field: "student_id", source: "hubspot", description: "Student ID", enabled: true },
  { field: "enrollment_status", source: "salesforce", description: "Enrollment Status", enabled: true },
  { field: "program_track", source: "dynamics", description: "Program Track", enabled: true },

  // LMS mappings
  { field: "courses", source: "google-classroom", description: "Enrolled Courses", enabled: true },
  { field: "grades", source: "canvas", description: "Course Grades", enabled: true },
  { field: "certifications", source: "aws-academy", description: "AWS Certifications", enabled: true },
];

export default function Settings() {
  const [selectedRole, setSelectedRole] = useState<(typeof mockRoles)[0] | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [configureProvider, setConfigureProvider] = useState<string | null>(null);
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>(defaultFieldMappings);

  const handleEditRole = (role: typeof mockRoles[0]) => {
    setSelectedRole(role);
    setSelectedPermissions(role.permissions.map(p => p.id));
    setEditDialogOpen(true);
  };

  const handlePermissionChange = (permissionId: number, checked: boolean) => {
    setSelectedPermissions(prev =>
      checked
        ? [...prev, permissionId]
        : prev.filter(id => id !== permissionId)
    );
  };

  const handleSaveProviderConfig = (provider: string, data: any) => {
    // In a real app, this would save to backend
    console.log(`Saving ${provider} config:`, data);
    setConfigureProvider(null);
  };

  const handleToggleFieldMapping = (field: string, enabled: boolean) => {
    setFieldMappings(prev =>
      prev.map(mapping =>
        mapping.field === field ? { ...mapping, enabled } : mapping
      )
    );
  };

  const renderProviderConfigDialog = () => {
    if (!configureProvider) return null;

    let title = "";
    let fields = [];
    let category = mockConnectors.find(c => c.id === configureProvider)?.category;

    switch (configureProvider) {
      case "microsoft":
        title = "Microsoft Entra ID Configuration";
        fields = [
          { name: "tenantId", label: "Tenant ID", type: "text" },
          { name: "clientId", label: "Client ID", type: "text" },
          { name: "clientSecret", label: "Client Secret", type: "password" },
        ];
        break;
      case "google":
        title = "Google Cloud Identity Configuration";
        fields = [
          { name: "programId", label: "Program ID", type: "text" },
          { name: "serviceAccount", label: "Service Account JSON", type: "textarea" },
        ];
        break;
      case "aws":
        title = "AWS Cognito Configuration";
        fields = [
          { name: "region", label: "Region", type: "text" },
          { name: "userPoolId", label: "User Pool ID", type: "text" },
          { name: "accessKeyId", label: "Access Key ID", type: "text" },
          { name: "secretAccessKey", label: "Secret Access Key", type: "password" },
        ];
        break;
      // CRM Systems
      case "hubspot":
        title = "HubSpot Configuration";
        fields = [
          { name: "apiKey", label: "API Key", type: "password" },
          { name: "portalId", label: "Portal ID", type: "text" },
          { name: "accessToken", label: "Access Token", type: "password" },
        ];
        break;
      case "salesforce":
        title = "Salesforce Configuration";
        fields = [
          { name: "clientId", label: "Client ID", type: "text" },
          { name: "clientSecret", label: "Client Secret", type: "password" },
          { name: "username", label: "Username", type: "text" },
          { name: "password", label: "Password", type: "password" },
          { name: "securityToken", label: "Security Token", type: "password" },
        ];
        break;
      case "dynamics":
        title = "Microsoft Dynamics 365 Configuration";
        fields = [
          { name: "tenantId", label: "Tenant ID", type: "text" },
          { name: "clientId", label: "Client ID", type: "text" },
          { name: "clientSecret", label: "Client Secret", type: "password" },
          { name: "environment", label: "Environment URL", type: "text" },
        ];
        break;

      // LMS Systems
      case "google-classroom":
        title = "Google Classroom Configuration";
        fields = [
          { name: "clientId", label: "Client ID", type: "text" },
          { name: "clientSecret", label: "Client Secret", type: "password" },
          { name: "programId", label: "Program ID", type: "text" },
          { name: "serviceAccount", label: "Service Account JSON", type: "textarea" },
        ];
        break;
      case "canvas":
        title = "Canvas LMS Configuration";
        fields = [
          { name: "domain", label: "Canvas Domain", type: "text" },
          { name: "accessToken", label: "Access Token", type: "password" },
          { name: "accountId", label: "Account ID", type: "text" },
        ];
        break;
      case "aws-academy":
        title = "AWS Academy Configuration";
        fields = [
          { name: "apiKey", label: "API Key", type: "password" },
          { name: "region", label: "Region", type: "text" },
          { name: "academyId", label: "Academy ID", type: "text" },
        ];
        break;
    }

    return (
      <Dialog open={!!configureProvider} onOpenChange={() => setConfigureProvider(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Configure authentication and synchronization settings for {category?.toLowerCase()} integration
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <Alert>
              <Key className="h-4 w-4" />
              <AlertDescription>
                {category === "CRM"
                  ? "This integration will sync student and program data with your CRM system."
                  : category === "LMS"
                  ? "This integration will sync course and enrollment data with your learning management system."
                  : "Ensure you have the necessary permissions and access to configure this integration."}
                All credentials are encrypted before storage.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-6">
              {/* Authentication Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Authentication</CardTitle>
                  <CardDescription>
                    Provide credentials for secure API access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fields.map(field => (
                    <div key={field.name} className="space-y-2">
                      <Label>{field.label}</Label>
                      {field.type === "textarea" ? (
                        <textarea
                          className="w-full min-h-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                        />
                      ) : (
                        <Input
                          type={field.type}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          className={field.type === "password" ? "font-mono" : ""}
                        />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Sync Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Sync Settings</CardTitle>
                  <CardDescription>
                    Configure synchronization behavior
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Sync Frequency</Label>
                    <Select defaultValue="15">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Every 5 minutes</SelectItem>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Data Flow Direction</Label>
                    <Select defaultValue="bidirectional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bidirectional">Bidirectional</SelectItem>
                        <SelectItem value="import">Import Only</SelectItem>
                        <SelectItem value="export">Export Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {category === "CRM" && (
                    <div className="space-y-2">
                      <Label>Lead Assignment</Label>
                      <Select defaultValue="auto">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Automatic</SelectItem>
                          <SelectItem value="manual">Manual Review</SelectItem>
                          <SelectItem value="round-robin">Round Robin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {category === "LMS" && (
                    <div className="space-y-2">
                      <Label>Grade Sync</Label>
                      <Select defaultValue="auto">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Automatic</SelectItem>
                          <SelectItem value="manual">Manual Approval</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Enable Real-time Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive immediate updates when changes occur
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {/* Field Mappings */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Field Mappings</CardTitle>
                  <CardDescription>
                    Select which fields to sync with this {category?.toLowerCase()} system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {fieldMappings
                      .filter(mapping => mapping.source === configureProvider)
                      .map(mapping => (
                        <div
                          key={mapping.field}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="space-y-0.5">
                            <Label>{mapping.description}</Label>
                            <p className="text-sm text-muted-foreground">
                              Field: {mapping.field}
                            </p>
                          </div>
                          <Switch
                            checked={mapping.enabled}
                            onCheckedChange={(checked) => handleToggleFieldMapping(mapping.field, checked)}
                          />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setConfigureProvider(null)}
              >
                Cancel
              </Button>
              <div className="space-x-2">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Test Connection
                </Button>
                <Button onClick={() => handleSaveProviderConfig(configureProvider, {})}>
                  Save Configuration
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

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
              <TabsList className="grid w-full grid-cols-5">
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
                <TabsTrigger value="bank" className="flex items-center gap-2">
                  <Landmark className="h-4 w-4" />
                  Bank Integration
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
                                Updates to people and roles
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
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Integrations</CardTitle>
                      <CardDescription>
                        Connect and sync with identity providers, CRM systems, and learning platforms
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Alert className="mb-6">
                        <Key className="h-4 w-4" />
                        <AlertDescription>
                          Configured providers will be used as sources of truth for specified fields.
                          Changes to synced fields in the system will be overwritten during synchronization.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-8">
                        {/* Group connectors by category */}
                        {["Identity", "CRM", "LMS"].map(category => (
                          <div key={category} className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold">
                                {category === "LMS" ? "Learning Management Systems" :
                                  category === "CRM" ? "Customer Relationship Management" :
                                    "Identity Providers"}
                              </h3>
                              <Badge variant="secondary" className="text-xs">
                                {mockConnectors.filter(c => c.category === category).length} Available
                              </Badge>
                            </div>
                            <div className="grid gap-4">
                              {mockConnectors
                                .filter(connector => connector.category === category)
                                .map((connector) => (
                                  <div
                                    key={connector.id}
                                    className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
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
                                    {connector.category === "Identity" ? (
                                      <Button
                                        variant={connector.connected ? "outline" : "default"}
                                        onClick={() => setConfigureProvider(connector.id)}
                                      >
                                        {connector.connected ? "Configure" : "Connect"}
                                      </Button>
                                    ) : (
                                      <Button
                                        variant={connector.connected ? "outline" : "default"}
                                        onClick={() => setConfigureProvider(connector.id)}
                                      >
                                        {connector.connected ? "Configure" : "Connect"}
                                      </Button>
                                    )}
                                  </div>
                                ))}
                            </div>
                            {category !== "LMS" && <Separator className="my-6" />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Field Mapping Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Field Mapping Overview</CardTitle>
                      <CardDescription>
                        Current field synchronization settings across all providers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {fieldMappings.map(mapping => (
                          <div
                            key={mapping.field}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{mapping.description}</p>
                              <p className="text-sm text-muted-foreground">
                                Source: {mapping.source === "internal" ? "Internal System" :
                                    mapping.source === "microsoft" ? "Microsoft Entra ID" :
                                      mapping.source === "google" ? "Google Cloud Identity" :
                                        mapping.source === "hubspot" ? "HubSpot" :
                                          mapping.source === "salesforce" ? "Salesforce" :
                                            mapping.source === "dynamics" ? "Microsoft Dynamics 365" :
                                              mapping.source === "google-classroom" ? "Google Classroom" :
                                                mapping.source === "canvas" ? "Canvas LMS" :
                                                  mapping.source === "aws-academy" ? "AWS Academy" :
                                                    "Moodle"}
                              </p>
                            </div>
                            <Switch                              checked={mapping.enabled}
                              onCheckedChange={(checked) => handleToggleFieldMapping(mapping.field, checked)}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="grid gap-4 grid-cols-12">
                    <Card className="col-span-12 lg:col-span-5">
                      <CardHeader>
                        <CardTitle>Roles</CardTitle>
                        <CardDescription>Manage security roles and their permissions</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[600px]">
                          {mockRoles.map((role) => (
                            <div
                              key={role.id}
                              className="p-4 border-b last:border-0 hover:bg-accent/5"
                            >
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">{role.name}</h3>
                                    {role.isSystem && (
                                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                        System
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">{role.description}</p>
                                </div>
                                {!role.isSystem && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditRole(role)}
                                  >
                                    Edit
                                  </Button>
                                )}
                              </div>

                              <div className="mt-4">
                                <h4 className="text-sm font-medium mb-2">Permissions:</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {Object.entries(
                                    role.permissions.reduce((acc, curr) => ({
                                      ...acc,
                                      [curr.category]: [...(acc[curr.category] || []), curr],
                                    }), {} as Record<string, typeof mockPermissions>)
                                  ).map(([category, perms]) => (
                                    <div key={category} className="space-y-1">
                                      <p className="text-xs font-medium text-muted-foreground">
                                        {category}
                                      </p>
                                      {perms.map(perm => (
                                        <p key={perm.id} className="text-xs">
                                          {perm.name}
                                        </p>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    <Card className="col-span-12 lg:col-span-7">
                      <CardHeader>
                        <CardTitle>Available Permissions</CardTitle>
                        <CardDescription>System-defined permissions and their descriptions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[600px] pr-4">
                          <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                            {Array.from(new Set(mockPermissions.map(p => p.category))).map((category) => (
                              <div key={category} className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{category}</h3>
                                  <Badge variant="secondary" className="text-xs">
                                    {mockPermissions.filter(p => p.category === category).length}
                                  </Badge>
                                </div>
                                <Card className="p-4">
                                  <div className="space-y-3">
                                    {mockPermissions
                                      .filter(p => p.category === category)
                                      .map((permission) => (
                                        <div
                                          key={permission.id}
                                          className="hover:bg-accent/5 p-2 rounded-sm"
                                        >
                                          <p className="font-medium text-sm">{permission.name}</p>
                                          <p className="text-sm text-muted-foreground">
                                            {permission.description}
                                          </p>
                                        </div>
                                      ))}
                                  </div>
                                </Card>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Edit Role Dialog */}
                  <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Role: {selectedRole?.name}</DialogTitle>
                        <DialogDescription>
                          Select the permissions for this role
                        </DialogDescription>
                      </DialogHeader>

                      <div className="py-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {Array.from(new Set(mockPermissions.map(p => p.category))).map((category) => (
                            <div key={category} className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm">{category}</h4>
                                <Badge variant="secondary" className="text-xs">
                                  {mockPermissions.filter(p => p.category === category).length}
                                </Badge>
                              </div>
                              <Card className="p-3">
                                <div className="space-y-2">
                                  {mockPermissions
                                    .filter(p => p.category === category)
                                    .map((permission) => (
                                      <div
                                        key={permission.id}
                                        className="flex items-start space-x-2 hover:bg-accent/5 p-1 rounded-sm"
                                      >
                                        <Checkbox
                                          id={`permission-${permission.id}`}
                                          checked={selectedPermissions.includes(permission.id)}
                                          onCheckedChange={(checked) =>
                                            handlePermissionChange(permission.id, checked === true)
                                          }
                                        />
                                        <div className="grid gap-0.5">
                                          <label
                                            htmlFor={`permission-${permission.id}`}
                                            className="text-sm font-medium leading-none cursor-pointer"
                                          >
                                            {permission.name}
                                          </label>
                                          <p className="text-xs text-muted-foreground">
                                            {permission.description}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </Card>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                          <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setEditDialogOpen(false)}>
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TabsContent>
              </Tabs>
            </div>
          </PageTransition>
        </div>
        {renderProviderConfigDialog()}
      </div>
    );
  }