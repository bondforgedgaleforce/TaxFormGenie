import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { geminiAI } from "./gemini";
import { insertTaxFormSchema, insertAiAssistanceRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Tax Forms API
  
  // Create new tax form
  app.post("/api/forms", async (req, res) => {
    try {
      const validatedData = insertTaxFormSchema.parse(req.body);
      const form = await storage.createTaxForm(validatedData);
      res.json(form);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get tax form by ID
  app.get("/api/forms/:id", async (req, res) => {
    try {
      const form = await storage.getTaxForm(req.params.id);
      if (!form) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.json(form);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all forms for a user
  app.get("/api/forms/user/:userId", async (req, res) => {
    try {
      const forms = await storage.getTaxFormsByUser(req.params.userId);
      res.json(forms);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update tax form
  app.patch("/api/forms/:id", async (req, res) => {
    try {
      const updates = req.body;
      const form = await storage.updateTaxForm(req.params.id, updates);
      if (!form) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.json(form);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete tax form
  app.delete("/api/forms/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTaxForm(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Country Configuration API
  
  // Get all country configurations
  app.get("/api/countries", async (req, res) => {
    try {
      const countries = await storage.getAllCountryConfigs();
      res.json(countries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get specific country configuration
  app.get("/api/countries/:code", async (req, res) => {
    try {
      const country = await storage.getCountryConfig(req.params.code);
      if (!country) {
        return res.status(404).json({ error: "Country not found" });
      }
      res.json(country);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // AI Assistance API
  
  // Get AI assistance for tax questions
  app.post("/api/ai/assist", async (req, res) => {
    try {
      const { question, formId, countryCode, formType, language, formData } = req.body;

      if (!question || !countryCode || !formType || !language) {
        return res.status(400).json({ 
          error: "Missing required fields: question, countryCode, formType, language" 
        });
      }

      // Generate AI response using Google Gemini
      const response = await geminiAI.generateTaxAssistance(question, {
        countryCode,
        formType,
        language,
        formData,
      });

      // Store the assistance request if formId is provided
      if (formId) {
        await storage.createAiAssistanceRequest({
          formId,
          question,
          response,
          language,
        });
      }

      res.json({ response });
    } catch (error: any) {
      console.error("AI assistance error:", error);
      res.status(500).json({ 
        error: "Failed to generate AI assistance. Please make sure GOOGLE_AI_API_KEY is configured.",
        details: error.message 
      });
    }
  });

  // Get AI assistance history for a form
  app.get("/api/ai/history/:formId", async (req, res) => {
    try {
      const history = await storage.getAiAssistanceByForm(req.params.formId);
      res.json(history);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get deduction suggestions based on form data
  app.post("/api/ai/suggestions", async (req, res) => {
    try {
      const { formData, countryCode, language } = req.body;

      if (!formData || !countryCode || !language) {
        return res.status(400).json({ 
          error: "Missing required fields: formData, countryCode, language" 
        });
      }

      const suggestions = await geminiAI.generateDeductionSuggestions(
        formData,
        countryCode,
        language
      );

      res.json({ suggestions });
    } catch (error: any) {
      console.error("Suggestion generation error:", error);
      res.status(500).json({ 
        error: "Failed to generate suggestions",
        details: error.message 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    const hasGeminiKey = !!process.env.GOOGLE_AI_API_KEY;
    res.json({ 
      status: "ok",
      aiEnabled: hasGeminiKey,
      message: hasGeminiKey 
        ? "AI assistance available" 
        : "AI assistance unavailable - GOOGLE_AI_API_KEY not configured"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
