import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

interface FileFormat {
  title: string;
  description: string;
  workflow: string[];
  format: string;
}

interface FileFormatGuideDialogProps {
  formats: Record<string, FileFormat>;
}

export function FileFormatGuideDialog({ formats }: FileFormatGuideDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Bank File Format Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bank File Format Guide</DialogTitle>
          <DialogDescription>
            Learn about the different bank file formats and their workflows
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.entries(formats).map(([key, info]) => (
            <Card key={key} className="p-6">
              <h3 className="text-lg font-medium mb-2">{info.title}</h3>
              <p className="text-muted-foreground mb-4">{info.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Workflow Steps</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {info.workflow.map((step, index) => (
                      <li key={index} className="text-muted-foreground">{step}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">File Format</h4>
                  <p className="text-sm text-muted-foreground">{info.format}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FileFormatGuideDialog;