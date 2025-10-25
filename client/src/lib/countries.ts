// Country configurations and tax data

export interface CountryData {
  code: string;
  name: {
    en: string;
    es: string;
    fr: string;
    de: string;
    zh: string;
  };
  currency: string;
  currencySymbol: string;
  flagEmoji: string;
  taxForms: string[];
}

export const COUNTRIES: CountryData[] = [
  {
    code: "US",
    name: {
      en: "United States",
      es: "Estados Unidos",
      fr: "États-Unis",
      de: "Vereinigte Staaten",
      zh: "美国",
    },
    currency: "USD",
    currencySymbol: "$",
    flagEmoji: "🇺🇸",
    taxForms: ["1040", "Schedule C", "Schedule A"],
  },
  {
    code: "GB",
    name: {
      en: "United Kingdom",
      es: "Reino Unido",
      fr: "Royaume-Uni",
      de: "Vereinigtes Königreich",
      zh: "英国",
    },
    currency: "GBP",
    currencySymbol: "£",
    flagEmoji: "🇬🇧",
    taxForms: ["Self Assessment"],
  },
  {
    code: "CA",
    name: {
      en: "Canada",
      es: "Canadá",
      fr: "Canada",
      de: "Kanada",
      zh: "加拿大",
    },
    currency: "CAD",
    currencySymbol: "$",
    flagEmoji: "🇨🇦",
    taxForms: ["T1", "T4"],
  },
  {
    code: "DE",
    name: {
      en: "Germany",
      es: "Alemania",
      fr: "Allemagne",
      de: "Deutschland",
      zh: "德国",
    },
    currency: "EUR",
    currencySymbol: "€",
    flagEmoji: "🇩🇪",
    taxForms: ["Einkommensteuererklärung"],
  },
  {
    code: "FR",
    name: {
      en: "France",
      es: "Francia",
      fr: "France",
      de: "Frankreich",
      zh: "法国",
    },
    currency: "EUR",
    currencySymbol: "€",
    flagEmoji: "🇫🇷",
    taxForms: ["Déclaration de revenus"],
  },
  {
    code: "ES",
    name: {
      en: "Spain",
      es: "España",
      fr: "Espagne",
      de: "Spanien",
      zh: "西班牙",
    },
    currency: "EUR",
    currencySymbol: "€",
    flagEmoji: "🇪🇸",
    taxForms: ["Declaración de la Renta"],
  },
  {
    code: "AU",
    name: {
      en: "Australia",
      es: "Australia",
      fr: "Australie",
      de: "Australien",
      zh: "澳大利亚",
    },
    currency: "AUD",
    currencySymbol: "$",
    flagEmoji: "🇦🇺",
    taxForms: ["Tax Return"],
  },
  {
    code: "MX",
    name: {
      en: "Mexico",
      es: "México",
      fr: "Mexique",
      de: "Mexiko",
      zh: "墨西哥",
    },
    currency: "MXN",
    currencySymbol: "$",
    flagEmoji: "🇲🇽",
    taxForms: ["Declaración Anual"],
  },
];

export function getCountryByCode(code: string): CountryData | undefined {
  return COUNTRIES.find(c => c.code === code);
}

export function formatCurrency(amount: number, currencySymbol: string): string {
  return `${currencySymbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
