import { Check } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/lib/i18n";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{ title: string }>;
}

export function ProgressStepper({ currentStep, totalSteps, steps }: ProgressStepperProps) {
  const { language } = useApp();
  const { t } = useTranslation(language);

  return (
    <div className="w-full">
      {/* Mobile: Compact view */}
      <div className="md:hidden text-center py-4">
        <p className="text-sm text-muted-foreground">
          {t("wizard.step")} {currentStep + 1} {t("wizard.of")} {totalSteps}
        </p>
        <h2 className="text-xl font-semibold mt-1">{steps[currentStep]?.title}</h2>
      </div>

      {/* Desktop: Full stepper */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isUpcoming = index > currentStep;

            return (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`
                      h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold
                      transition-all duration-300
                      ${isCompleted ? "bg-primary text-primary-foreground" : ""}
                      ${isCurrent ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : ""}
                      ${isUpcoming ? "bg-muted text-muted-foreground" : ""}
                    `}
                    data-testid={`step-indicator-${index}`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-sm font-medium ${
                        isCurrent ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-4 transition-all duration-300 ${
                      isCompleted ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
