import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Programs from "@/pages/Programs";
import ProgramOverview from "@/pages/ProgramOverview";
import People from "@/pages/People";
import PersonOverview from "@/pages/PersonOverview";
import ManagePerson from "@/pages/ManagePerson";
import ManageProgram from "@/pages/ManageProgram";
import ProgramEnrollments from "@/pages/ProgramEnrollments";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/programs/new" component={ManageProgram} />
      <Route path="/programs/:id/edit" component={ManageProgram} />
      <Route path="/programs/:id" component={ProgramOverview} />
      <Route path="/programs/enrollments" component={ProgramEnrollments} />
      <Route path="/programs" component={Programs} />
      <Route path="/people/new" component={ManagePerson} />
      <Route path="/people/:id/edit" component={ManagePerson} />
      <Route path="/people/:id" component={PersonOverview} />
      <Route path="/people" component={People} />
      <Route path="/organization" component={Organization} />
      <Route path="/invoices/new" component={CreateEditInvoice} />
      <Route path="/invoices/:id/edit" component={CreateEditInvoice} />
      <Route path="/invoices/:id" component={InvoiceDetail} />
      <Route path="/invoices" component={Invoices} />
      <Route path="/qr-tracking" component={QRTrackingDashboard} />
      <Route path="/financial-dashboard" component={FinancialDashboard} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/skills-matrix" component={SkillsMatrix} />
      <Route path="/settings" component={Settings} />
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