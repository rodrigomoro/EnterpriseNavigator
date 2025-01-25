import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectOverview from "@/pages/ProjectOverview";
import People from "@/pages/People";
import PersonOverview from "@/pages/PersonOverview";
import ManagePerson from "@/pages/ManagePerson";
import ManageProgram from "@/pages/ManageProgram";
import Invoices from "@/pages/Invoices";
import InvoiceDetail from "@/pages/InvoiceDetail";
import CreateEditInvoice from "@/pages/CreateEditInvoice";
import QRTrackingDashboard from "@/pages/QRTrackingDashboard";
import FinancialDashboard from "@/pages/FinancialDashboard";
import Analytics from "@/pages/Analytics";
import Organization from "@/pages/Organization";
import SkillsMatrix from "@/pages/SkillsMatrix";
import Calendar from "@/pages/calendar";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import { useEffect } from "react";

// Protected route wrapper component
function ProtectedRoute({ component: Component, ...rest }: { component: React.ComponentType<any> }) {
  const [, setLocation] = useLocation();
  const isAuthenticated = false; // TODO: Replace with actual auth check

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <Component {...rest} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={() => <ProtectedRoute component={Home} />} />
      <Route path="/calendar" component={() => <ProtectedRoute component={Calendar} />} />
      <Route path="/programs/new" component={() => <ProtectedRoute component={ManageProgram} />} />
      <Route path="/programs/:id/edit" component={() => <ProtectedRoute component={ManageProgram} />} />
      <Route path="/programs/:id" component={() => <ProtectedRoute component={ProjectOverview} />} />
      <Route path="/programs" component={() => <ProtectedRoute component={Projects} />} />
      <Route path="/people/new" component={() => <ProtectedRoute component={ManagePerson} />} />
      <Route path="/people/:id/edit" component={() => <ProtectedRoute component={ManagePerson} />} />
      <Route path="/people/:id" component={() => <ProtectedRoute component={PersonOverview} />} />
      <Route path="/people" component={() => <ProtectedRoute component={People} />} />
      <Route path="/organization" component={() => <ProtectedRoute component={Organization} />} />
      <Route path="/invoices/new" component={() => <ProtectedRoute component={CreateEditInvoice} />} />
      <Route path="/invoices/:id/edit" component={() => <ProtectedRoute component={CreateEditInvoice} />} />
      <Route path="/invoices/:id" component={() => <ProtectedRoute component={InvoiceDetail} />} />
      <Route path="/invoices" component={() => <ProtectedRoute component={Invoices} />} />
      <Route path="/qr-tracking" component={() => <ProtectedRoute component={QRTrackingDashboard} />} />
      <Route path="/financial-dashboard" component={() => <ProtectedRoute component={FinancialDashboard} />} />
      <Route path="/analytics" component={() => <ProtectedRoute component={Analytics} />} />
      <Route path="/skills-matrix" component={() => <ProtectedRoute component={SkillsMatrix} />} />
      <Route path="/settings" component={() => <ProtectedRoute component={Settings} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;