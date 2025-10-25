import { useState } from "react";
import { Search, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { COUNTRIES } from "@/lib/countries";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/lib/i18n";

interface CountrySelectorProps {
  onSelect: (countryCode: string) => void;
}

export function CountrySelector({ onSelect }: CountrySelectorProps) {
  const { language } = useApp();
  const { t } = useTranslation(language);
  const [search, setSearch] = useState("");

  const filteredCountries = COUNTRIES.filter(country =>
    country.name[language].toLowerCase().includes(search.toLowerCase()) ||
    country.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold" data-testid="text-country-title">
          {t("country.select.title")}
        </h2>
        <p className="text-muted-foreground text-lg">
          {t("country.select.subtitle")}
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t("country.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
          data-testid="input-country-search"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((country) => (
          <Card
            key={country.code}
            className="p-6 cursor-pointer hover-elevate active-elevate-2 transition-all"
            onClick={() => onSelect(country.code)}
            data-testid={`card-country-${country.code}`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{country.flagEmoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {country.name[language]}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {country.currency}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No countries found
        </div>
      )}
    </div>
  );
}
