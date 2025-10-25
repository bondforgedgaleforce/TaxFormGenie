import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import SelectCountry from "@/pages/SelectCountry";
import FormWizard from "@/pages/FormWizard";
import Success from "@/pages/Success";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/select-country" component={SelectCountry} />
      <Route path="/wizard" component={FormWizard} />
      <Route path="/success" component={Success} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Router />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
