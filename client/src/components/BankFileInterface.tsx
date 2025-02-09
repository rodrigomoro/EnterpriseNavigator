import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, File } from "lucide-react";

interface FormatOption {
  value: string;
  label: string;
}

interface BankFileInterfaceProps {
  onFileUpload: (file: File, format: string) => Promise<void>;
  supportedFormats?: FormatOption[];
}

const DEFAULT_FORMATS = [
  { value: 'norma19', label: 'Norma 19 - Direct Debit Orders' },
  { value: 'norma34', label: 'Norma 34 - Transfer Orders' },
  { value: 'norma43', label: 'Norma 43 - Account Statements' },
  { value: 'sepa', label: 'SEPA XML' },
];

export function BankFileInterface({ 
  onFileUpload, 
  supportedFormats = DEFAULT_FORMATS 
}: BankFileInterfaceProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!selectedFormat) {
      toast({
        title: "Format Required",
        description: "Please select a file format before uploading",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      await onFileUpload(file, selectedFormat);
      toast({
        title: "File Uploaded",
        description: "Bank file has been uploaded successfully",
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
          <h3 className="text-lg font-medium mb-2">Bank File Management</h3>
          <p className="text-sm text-muted-foreground">
            Upload bank files for payment processing and reconciliation.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>File Format</Label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select file format" />
              </SelectTrigger>
              <SelectContent>
                {supportedFormats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload Bank File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                accept=".txt,.xml,.asc"
                disabled={isUploading || !selectedFormat}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              <Upload className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <h4 className="font-medium mb-2">Supported File Formats:</h4>
          <ul className="list-disc list-inside space-y-1">
            {supportedFormats.map((format) => (
              <li key={format.value} className="flex items-center gap-2">
                <File className="h-4 w-4" />
                {format.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default BankFileInterface;