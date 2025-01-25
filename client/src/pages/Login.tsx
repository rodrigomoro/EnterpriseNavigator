import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiMicrosoft, SiGoogle, SiAmazonaws } from "react-icons/si";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account using your preferred identity provider
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Button 
              variant="outline" 
              className="w-full h-12"
              onClick={() => window.location.href = "/api/auth/microsoft"}
            >
              <SiMicrosoft className="mr-2 h-5 w-5" />
              Continue with Microsoft
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12"
              onClick={() => window.location.href = "/api/auth/google"}
            >
              <SiGoogle className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12"
              onClick={() => window.location.href = "/api/auth/cognito"}
            >
              <SiAmazonaws className="mr-2 h-5 w-5" />
              Continue with AWS
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Secure Authentication
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
