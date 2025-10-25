import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CountrySelector } from "@/components/CountrySelector";
import { useApp } from "@/contexts/AppContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslation } from "@/lib/i18n";

export default function SelectCountry() {
  const [, setLocation] = useLocation();
  const { setSelectedCountry, language } = useApp();
  const { t } = useTranslation(language);

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setLocation("/wizard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="gap-2"
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("common.back")}
          </Button>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <CountrySelector onSelect={handleCountrySelect} />
      </main>
    </div>
  );
}
