import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Globe, 
  Shield, 
  Download, 
  Sparkles, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/lib/i18n";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Landing() {
  const [, setLocation] = useLocation();
  const { language } = useApp();
  const { t } = useTranslation(language);

  const features = [
    {
      icon: Sparkles,
      title: t("features.ai.title"),
      description: t("features.ai.desc"),
    },
    {
      icon: Globe,
      title: t("features.multilang.title"),
      description: t("features.multilang.desc"),
    },
    {
      icon: FileText,
      title: t("features.countries.title"),
      description: t("features.countries.desc"),
    },
    {
      icon: Shield,
      title: t("features.secure.title"),
      description: t("features.secure.desc"),
    },
    {
      icon: Download,
      title: t("features.pdf.title"),
      description: t("features.pdf.desc"),
    },
    {
      icon: CheckCircle2,
      title: t("features.guidance.title"),
      description: t("features.guidance.desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TaxEase</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="gap-2 min-h-12 px-8"
              onClick={() => setLocation("/select-country")}
              data-testid="button-get-started"
            >
              {t("hero.cta.start")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="min-h-12 px-8"
              data-testid="button-learn-more"
            >
              {t("hero.cta.learn")}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{t("hero.trust").split(" • ")[0]}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{t("hero.trust").split(" • ")[1]}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{t("hero.trust").split(" • ")[2]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-16">
            {t("features.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 space-y-4 hover-elevate transition-all"
                data-testid={`card-feature-${index}`}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl font-bold">
            Ready to simplify your taxes?
          </h2>
          <p className="text-xl text-muted-foreground">
            Get started in seconds. No credit card required.
          </p>
          <Button 
            size="lg" 
            className="gap-2 min-h-12 px-8"
            onClick={() => setLocation("/select-country")}
            data-testid="button-cta-start"
          >
            {t("hero.cta.start")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">TaxEase</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered tax assistance for everyone, everywhere.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Countries</li>
                <li>Pricing</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 TaxEase. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
