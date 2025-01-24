import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageSquare, Bell } from 'lucide-react';

const sampleVariables = {
  user_name: "John Doe",
  program_name: "Advanced Mathematics",
  date: "January 24, 2025",
  time: "2:30 PM",
  location: "Room 101",
};

interface PreviewProps {
  template: string;
  variables: Record<string, string>;
}

const Preview: React.FC<PreviewProps> = ({ template, variables }) => {
  const replacedContent = Object.entries(variables).reduce(
    (text, [key, value]) => text.replace(new RegExp(`{${key}}`, 'g'), value),
    template
  );

  return (
    <div className="p-4 border rounded-md bg-background">
      <p className="whitespace-pre-wrap">{replacedContent}</p>
    </div>
  );
};

const presetTemplates = {
  program_reminder: "Hello {user_name},\n\nThis is a reminder about your upcoming program '{program_name}' scheduled for {date} at {time} in {location}.\n\nBest regards,\nThe Education Team",
  assignment_due: "Hi {user_name},\n\nYour assignment for {program_name} is due on {date}.\n\nBest regards,\nThe Education Team",
  class_cancelled: "Dear {user_name},\n\nYour class '{program_name}' scheduled for {date} at {time} has been cancelled.\n\nBest regards,\nThe Education Team",
};

export default function NotificationTemplateEditor() {
  const [template, setTemplate] = useState(presetTemplates.program_reminder);
  const [selectedPreset, setSelectedPreset] = useState("program_reminder");
  const [previewVariables, setPreviewVariables] = useState(sampleVariables);

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value);
    setTemplate(presetTemplates[value as keyof typeof presetTemplates]);
  };

  const handleVariableChange = (key: string, value: string) => {
    setPreviewVariables(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <Label>Template Preset</Label>
          <Select value={selectedPreset} onValueChange={handlePresetChange}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="program_reminder">Program Reminder</SelectItem>
              <SelectItem value="assignment_due">Assignment Due</SelectItem>
              <SelectItem value="class_cancelled">Class Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label>Template Content</Label>
            <Textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="min-h-[200px] font-mono"
              placeholder="Enter your template here..."
            />

            <div className="space-y-4">
              <Label>Preview Variables</Label>
              {Object.entries(previewVariables).map(([key, value]) => (
                <div key={key} className="flex gap-2 items-center">
                  <Label className="w-32">{key}:</Label>
                  <Input
                    value={value}
                    onChange={(e) => handleVariableChange(key, e.target.value)}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Live Preview</Label>
            <Tabs defaultValue="email">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="sms" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  SMS
                </TabsTrigger>
                <TabsTrigger value="inapp" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  In-app
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-4">
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Email Preview</p>
                    </div>
                    <Preview template={template} variables={previewVariables} />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="sms" className="mt-4">
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">SMS Preview</p>
                    </div>
                    <Preview template={template} variables={previewVariables} />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="inapp" className="mt-4">
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">In-app Notification Preview</p>
                    </div>
                    <Preview template={template} variables={previewVariables} />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Card>
  );
}
