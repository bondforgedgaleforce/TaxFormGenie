import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useTranslation } from "@/lib/i18n";

interface AIAssistantProps {
  countryCode: string;
  formType: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIAssistant({ countryCode, formType }: AIAssistantProps) {
  const { language } = useApp();
  const { t } = useTranslation(language);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t("wizard.aiHelp") + ". I'm here to help you with your tax form questions.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage: Message = { role: "user", content: question };
    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          countryCode,
          formType,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI assistance");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again later or check that the AI service is configured properly.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2 pb-4 border-b">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">AI Tax Assistant</h3>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto min-h-0">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
              data-testid={`message-${message.role}-${index}`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t space-y-2">
        <Textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about your tax form..."
          className="min-h-20 resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAsk();
            }
          }}
          data-testid="input-ai-question"
        />
        <Button
          onClick={handleAsk}
          disabled={!question.trim() || isLoading}
          className="w-full gap-2"
          data-testid="button-ask-ai"
        >
          <Send className="h-4 w-4" />
          {t("wizard.aiHelp")}
        </Button>
      </div>
    </Card>
  );
}
