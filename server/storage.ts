import { 
  type TaxForm, 
  type InsertTaxForm,
  type CountryConfig,
  type InsertCountryConfig,
  type AiAssistanceRequest,
  type InsertAiAssistanceRequest
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Tax Forms
  getTaxForm(id: string): Promise<TaxForm | undefined>;
  getTaxFormsByUser(userId: string): Promise<TaxForm[]>;
  createTaxForm(form: InsertTaxForm): Promise<TaxForm>;
  updateTaxForm(id: string, updates: Partial<InsertTaxForm>): Promise<TaxForm | undefined>;
  deleteTaxForm(id: string): Promise<boolean>;

  // Country Configurations
  getCountryConfig(countryCode: string): Promise<CountryConfig | undefined>;
  getAllCountryConfigs(): Promise<CountryConfig[]>;
  createCountryConfig(config: InsertCountryConfig): Promise<CountryConfig>;

  // AI Assistance
  createAiAssistanceRequest(request: InsertAiAssistanceRequest): Promise<AiAssistanceRequest>;
  getAiAssistanceByForm(formId: string): Promise<AiAssistanceRequest[]>;
}

export class MemStorage implements IStorage {
  private taxForms: Map<string, TaxForm>;
  private countryConfigs: Map<string, CountryConfig>;
  private aiAssistance: Map<string, AiAssistanceRequest>;

  constructor() {
    this.taxForms = new Map();
    this.countryConfigs = new Map();
    this.aiAssistance = new Map();
    
    // Initialize with some default country configurations
    this.initializeCountryConfigs();
  }

  private initializeCountryConfigs() {
    const configs: CountryConfig[] = [
      {
        id: "US",
        countryCode: "US",
        countryName: {
          en: "United States",
          es: "Estados Unidos",
          fr: "États-Unis",
          de: "Vereinigte Staaten",
          zh: "美国",
        },
        currency: "USD",
        currencySymbol: "$",
        taxForms: ["1040", "Schedule C", "Schedule A"],
        deductions: ["charitable", "medical", "education", "mortgage"],
        credits: ["child", "education", "energy"],
      },
      {
        id: "GB",
        countryCode: "GB",
        countryName: {
          en: "United Kingdom",
          es: "Reino Unido",
          fr: "Royaume-Uni",
          de: "Vereinigtes Königreich",
          zh: "英国",
        },
        currency: "GBP",
        currencySymbol: "£",
        taxForms: ["Self Assessment"],
        deductions: ["pension", "charitable", "business"],
        credits: [],
      },
      {
        id: "CA",
        countryCode: "CA",
        countryName: {
          en: "Canada",
          es: "Canadá",
          fr: "Canada",
          de: "Kanada",
          zh: "加拿大",
        },
        currency: "CAD",
        currencySymbol: "$",
        taxForms: ["T1", "T4"],
        deductions: ["rrsp", "medical", "charitable"],
        credits: ["child", "gst", "climate"],
      },
    ];

    configs.forEach(config => this.countryConfigs.set(config.countryCode, config));
  }

  // Tax Forms
  async getTaxForm(id: string): Promise<TaxForm | undefined> {
    return this.taxForms.get(id);
  }

  async getTaxFormsByUser(userId: string): Promise<TaxForm[]> {
    return Array.from(this.taxForms.values()).filter(
      (form) => form.userId === userId
    );
  }

  async createTaxForm(insertForm: InsertTaxForm): Promise<TaxForm> {
    const id = randomUUID();
    const now = new Date();
    const form: TaxForm = {
      ...insertForm,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.taxForms.set(id, form);
    return form;
  }

  async updateTaxForm(id: string, updates: Partial<InsertTaxForm>): Promise<TaxForm | undefined> {
    const form = this.taxForms.get(id);
    if (!form) return undefined;

    const updatedForm: TaxForm = {
      ...form,
      ...updates,
      updatedAt: new Date(),
    };
    this.taxForms.set(id, updatedForm);
    return updatedForm;
  }

  async deleteTaxForm(id: string): Promise<boolean> {
    return this.taxForms.delete(id);
  }

  // Country Configurations
  async getCountryConfig(countryCode: string): Promise<CountryConfig | undefined> {
    return this.countryConfigs.get(countryCode);
  }

  async getAllCountryConfigs(): Promise<CountryConfig[]> {
    return Array.from(this.countryConfigs.values());
  }

  async createCountryConfig(insertConfig: InsertCountryConfig): Promise<CountryConfig> {
    const config: CountryConfig = {
      id: insertConfig.countryCode,
      ...insertConfig,
    };
    this.countryConfigs.set(config.countryCode, config);
    return config;
  }

  // AI Assistance
  async createAiAssistanceRequest(insertRequest: InsertAiAssistanceRequest): Promise<AiAssistanceRequest> {
    const id = randomUUID();
    const request: AiAssistanceRequest = {
      ...insertRequest,
      id,
      createdAt: new Date(),
    };
    this.aiAssistance.set(id, request);
    return request;
  }

  async getAiAssistanceByForm(formId: string): Promise<AiAssistanceRequest[]> {
    return Array.from(this.aiAssistance.values()).filter(
      (request) => request.formId === formId
    );
  }
}

export const storage = new MemStorage();
