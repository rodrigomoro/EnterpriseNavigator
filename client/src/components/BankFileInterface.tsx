import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, File } from "lucide-react";

interface BankFileInterfaceProps {
  onFileUpload: (file: File) => Promise<void>;
}

export function BankFileInterface({ onFileUpload }: BankFileInterfaceProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await onFileUpload(file);
      toast({
        title: "File Uploaded",
        description: "Bank statement file has been uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload bank file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Bank Statement Upload</h3>
          <p className="text-sm text-muted-foreground">
            Upload Norma 43 bank statement files to reconcile payments and update statuses.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file-upload">Upload Bank Statement</Label>
          <div className="flex items-center gap-2">
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileUpload}
              accept=".n43,.txt,.asc"
              disabled={isUploading}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            <Upload className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <h4 className="font-medium mb-2">Supported File Format:</h4>
          <div className="flex items-center gap-2">
            <File className="h-4 w-4" />
            Norma 43 - Bank Account Statements
          </div>
        </div>
      </div>
    </Card>
  );
}

export default BankFileInterface;