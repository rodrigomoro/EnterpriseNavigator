import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/Sidebar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Programs from "@/pages/Programs";
import ProgramOverview from "@/pages/ProgramOverview";
import People from "@/pages/People";
import PersonOverview from "@/pages/PersonOverview";
import ManagePerson from "@/pages/ManagePerson";
import ManageProgram from "@/pages/ManageProgram";
import ProgramEnrollments from "@/pages/ProgramEnrollments";
import ModulesCatalog from "@/pages/ModulesCatalog";
import ManageModule from "@/pages/ManageModule";
import Invoices from "@/pages/Invoices";
import InvoiceDetail from "@/pages/InvoiceDetail";
import CreateEditInvoice from "@/pages/CreateEditInvoice";
import FinancialDashboard from "@/pages/FinancialDashboard";
import Analytics from "@/pages/Analytics";
import Organization from "@/pages/Organization";
import SkillsMatrix from "@/pages/SkillsMatrix";
import Calendar from "@/pages/calendar";
import Settings from "@/pages/Settings";
import BankIntegration from "@/pages/BankIntegration";
import { useOnboardingTour } from '@/components/OnboardingTour';
import React from 'react';

function Router() {
  const { startTour, hasSeenTour } = useOnboardingTour();

  // Start tour for new users
  React.useEffect(() => {
    if (!hasSeenTour) {
      startTour();
    }
  }, [hasSeenTour, startTour]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 pl-12 md:pl-48 min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/programs/enrollments" component={ProgramEnrollments} />
          <Route path="/programs/new" component={ManageProgram} />
          <Route path="/programs/:id/edit" component={ManageProgram} />
          <Route path="/programs/:id" component={ProgramOverview} />
          <Route path="/programs" component={Programs} />
          <Route path="/modules/new" component={ManageModule} />
          <Route path="/modules/:id/edit" component={ManageModule} />
          <Route path="/modules" component={ModulesCatalog} />
          <Route path="/people/new" component={ManagePerson} />
          <Route path="/people/:id/edit" component={ManagePerson} />
          <Route path="/people/:id" component={PersonOverview} />
          <Route path="/people" component={People} />
          <Route path="/organization" component={Organization} />
          <Route path="/invoices/new" component={CreateEditInvoice} />
          <Route path="/invoices/:id/edit" component={CreateEditInvoice} />
          <Route path="/invoices/:id" component={InvoiceDetail} />
          <Route path="/invoices" component={Invoices} />
          <Route path="/financial-dashboard" component={FinancialDashboard} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/skills-matrix" component={SkillsMatrix} />
          <Route path="/settings" component={Settings} />
          <Route path="/bank-integration" component={BankIntegration} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
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