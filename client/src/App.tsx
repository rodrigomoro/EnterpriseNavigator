import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectOverview from "@/pages/ProjectOverview";
import People from "@/pages/People";
import PersonOverview from "@/pages/PersonOverview";
import Invoices from "@/pages/Invoices";
import InvoiceDetail from "@/pages/InvoiceDetail";
import QRTrackingDashboard from "@/pages/QRTrackingDashboard";
import FinancialDashboard from "@/pages/FinancialDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/programs" component={Projects} />
      <Route path="/program/:id" component={ProjectOverview} />
      <Route path="/people" component={People} />
      <Route path="/people/:id" component={PersonOverview} />
      <Route path="/invoices" component={Invoices} />
      <Route path="/invoices/:id" component={InvoiceDetail} />
      <Route path="/qr-tracking" component={QRTrackingDashboard} />
      <Route path="/financial-dashboard" component={FinancialDashboard} />
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