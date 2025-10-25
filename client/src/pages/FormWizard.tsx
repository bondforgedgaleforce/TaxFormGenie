import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Save, FileCheck } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/lib/i18n";
import { getCountryByCode, formatCurrency } from "@/lib/countries";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProgressStepper } from "@/components/ProgressStepper";
import { AIAssistant } from "@/components/AIAssistant";

export default function FormWizard() {
  const [, setLocation] = useLocation();
  const { language, selectedCountry } = useApp();
  const { t } = useTranslation(language);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const country = selectedCountry ? getCountryByCode(selectedCountry) : null;

  if (!country) {
    setLocation("/select-country");
    return null;
  }

  // Define form steps based on country
  const steps = [
    {
      title: language === "en" ? "Personal Information" : 
             language === "es" ? "Información Personal" :
             language === "fr" ? "Informations Personnelles" :
             language === "de" ? "Persönliche Informationen" :
             "个人信息",
      fields: [
        { id: "firstName", label: "First Name", type: "text", required: true },
        { id: "lastName", label: "Last Name", type: "text", required: true },
        { id: "taxId", label: `Tax ID (${country.code})`, type: "text", required: true },
        { id: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
      ],
    },
    {
      title: language === "en" ? "Income Information" :
             language === "es" ? "Información de Ingresos" :
             language === "fr" ? "Informations sur les Revenus" :
             language === "de" ? "Einkommensinformationen" :
             "收入信息",
      fields: [
        { id: "employmentIncome", label: "Employment Income", type: "currency", required: true },
        { id: "selfEmploymentIncome", label: "Self-Employment Income", type: "currency" },
        { id: "investmentIncome", label: "Investment Income", type: "currency" },
        { id: "otherIncome", label: "Other Income", type: "currency" },
      ],
    },
    {
      title: language === "en" ? "Deductions" :
             language === "es" ? "Deducciones" :
             language === "fr" ? "Déductions" :
             language === "de" ? "Abzüge" :
             "扣除",
      fields: [
        { id: "charitableDonations", label: "Charitable Donations", type: "currency" },
        { id: "medicalExpenses", label: "Medical Expenses", type: "currency" },
        { id: "educationExpenses", label: "Education Expenses", type: "currency" },
        { id: "mortgageInterest", label: "Mortgage Interest", type: "currency" },
      ],
    },
    {
      title: language === "en" ? "Review & Submit" :
             language === "es" ? "Revisar y Enviar" :
             language === "fr" ? "Réviser et Soumettre" :
             language === "de" ? "Überprüfen & Senden" :
             "审核和提交",
      fields: [],
    },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSave = async () => {
    try {
      const formPayload = {
        countryCode: country.code,
        formType: country.taxForms[0],
        taxYear: new Date().getFullYear(),
        formData,
        status: "draft",
        language,
        userId: "anonymous", // For demo purposes
      };

      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        // Show success toast
        console.log("Form saved successfully");
      }
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formPayload = {
        countryCode: country.code,
        formType: country.taxForms[0],
        taxYear: new Date().getFullYear(),
        formData,
        status: "completed",
        language,
        userId: "anonymous", // For demo purposes
      };

      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        setLocation("/success");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const calculateTotal = (fields: string[]) => {
    return fields.reduce((sum, fieldId) => {
      const value = parseFloat(formData[fieldId] || "0");
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/select-country")}
              className="gap-2"
              data-testid="button-back-to-country"
            >
              <ArrowLeft className="h-4 w-4" />
              {country.flagEmoji} {country.name[language]}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="gap-2"
              data-testid="button-save-progress"
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">{t("wizard.save")}</span>
            </Button>
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <ProgressStepper
            currentStep={currentStep}
            totalSteps={steps.length}
            steps={steps}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">{currentStepData.title}</h2>

              {!isLastStep ? (
                <div className="space-y-6">
                  {currentStepData.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id} className="text-base">
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      {field.type === "currency" ? (
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
                            {country.currencySymbol}
                          </span>
                          <Input
                            id={field.id}
                            type="number"
                            step="0.01"
                            min="0"
                            value={formData[field.id] || ""}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            className="pl-8 font-mono tabular-nums"
                            data-testid={`input-${field.id}`}
                          />
                        </div>
                      ) : field.type === "date" ? (
                        <Input
                          id={field.id}
                          type="date"
                          value={formData[field.id] || ""}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          data-testid={`input-${field.id}`}
                        />
                      ) : (
                        <Input
                          id={field.id}
                          type={field.type}
                          value={formData[field.id] || ""}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          required={field.required}
                          data-testid={`input-${field.id}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  <p className="text-muted-foreground">
                    Please review your information before submitting.
                  </p>

                  {/* Summary Cards */}
                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                      <h3 className="font-semibold text-lg">Personal Information</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Name</p>
                          <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tax ID</p>
                          <p className="font-medium font-mono">{formData.taxId}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                      <h3 className="font-semibold text-lg">Income Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Employment Income</span>
                          <span className="font-medium font-mono">
                            {formatCurrency(parseFloat(formData.employmentIncome || "0"), country.currencySymbol)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Self-Employment Income</span>
                          <span className="font-medium font-mono">
                            {formatCurrency(parseFloat(formData.selfEmploymentIncome || "0"), country.currencySymbol)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investment Income</span>
                          <span className="font-medium font-mono">
                            {formatCurrency(parseFloat(formData.investmentIncome || "0"), country.currencySymbol)}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t font-semibold">
                          <span>Total Income</span>
                          <span className="font-mono">
                            {formatCurrency(
                              calculateTotal(["employmentIncome", "selfEmploymentIncome", "investmentIncome", "otherIncome"]),
                              country.currencySymbol
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                      <h3 className="font-semibold text-lg">Deductions</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Charitable Donations</span>
                          <span className="font-medium font-mono">
                            {formatCurrency(parseFloat(formData.charitableDonations || "0"), country.currencySymbol)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Medical Expenses</span>
                          <span className="font-medium font-mono">
                            {formatCurrency(parseFloat(formData.medicalExpenses || "0"), country.currencySymbol)}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t font-semibold">
                          <span>Total Deductions</span>
                          <span className="font-mono">
                            {formatCurrency(
                              calculateTotal(["charitableDonations", "medicalExpenses", "educationExpenses", "mortgageInterest"]),
                              country.currencySymbol
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstStep}
                className="gap-2 min-h-12"
                data-testid="button-previous"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("wizard.previous")}
              </Button>

              {!isLastStep ? (
                <Button
                  onClick={handleNext}
                  className="gap-2 min-h-12"
                  data-testid="button-next"
                >
                  {t("wizard.next")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="gap-2 min-h-12"
                  data-testid="button-submit"
                >
                  <FileCheck className="h-4 w-4" />
                  {t("wizard.submit")}
                </Button>
              )}
            </div>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AIAssistant
                countryCode={country.code}
                formType={country.taxForms[0]}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
