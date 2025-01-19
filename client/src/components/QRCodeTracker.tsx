import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import type { Invoice } from "@/data/mockData";

interface QRCodeTrackerProps {
  invoice: Invoice;
  onRefresh?: () => void;
}

export default function QRCodeTracker({ invoice, onRefresh }: QRCodeTrackerProps) {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onRefresh?.();
    }, 1500);
  };

  const getStatusIcon = () => {
    switch (invoice.submissionInfo.response?.status) {
      case 'accepted':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (invoice.submissionInfo.response?.status) {
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <img
            src={invoice.qrCode}
            alt="Invoice QR Code"
            className="w-48 h-48 mx-auto mb-4"
          />
          <p className="text-sm text-muted-foreground">
            Scan to verify invoice authenticity
          </p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Verification Status</span>
            <Badge className={getStatusColor()}>
              <span className="flex items-center gap-1">
                {getStatusIcon()}
                {invoice.submissionInfo.response?.status 
                  ? invoice.submissionInfo.response.status.charAt(0).toUpperCase() + 
                    invoice.submissionInfo.response.status.slice(1)
                  : 'Not Verified'}
              </span>
            </Badge>
          </div>

          {invoice.submissionInfo.verificationId && (
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">Verification ID:</p>
              <p className="font-mono bg-muted p-2 rounded text-xs">
                {invoice.submissionInfo.verificationId}
              </p>
            </div>
          )}

          {invoice.submissionInfo.response?.message && (
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">Response:</p>
              <p className="bg-muted p-2 rounded text-xs">
                {invoice.submissionInfo.response.message}
              </p>
            </div>
          )}

          <Button 
            className="w-full" 
            onClick={handleVerify}
            disabled={isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
