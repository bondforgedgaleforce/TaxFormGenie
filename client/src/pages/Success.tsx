import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Download, Home, FileText } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/lib/i18n";

export default function Success() {
  const [, setLocation] = useLocation();
  const { language } = useApp();
  const { t } = useTranslation(language);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-12 text-center space-y-8">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Form Submitted Successfully!</h1>
          <p className="text-lg text-muted-foreground">
            Your tax form has been completed and is ready for download.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="gap-2 min-h-12" data-testid="button-download-pdf">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => setLocation("/")}
            className="gap-2 min-h-12"
            data-testid="button-home"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Your form data has been encrypted and securely stored. You can access it anytime from your dashboard.
          </p>
        </div>
      </Card>
    </div>
  );
}
