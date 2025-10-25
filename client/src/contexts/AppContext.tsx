import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LanguageCode } from "@/lib/i18n";

interface AppContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  // Load preferences from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as LanguageCode;
    const savedCountry = localStorage.getItem("selectedCountry");
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    
    if (savedLang) setLanguageState(savedLang);
    if (savedCountry) setSelectedCountry(savedCountry);
    if (savedTheme) setThemeState(savedTheme);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        selectedCountry,
        setSelectedCountry,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
