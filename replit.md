# TaxEase - International Tax Form Assistance

## Overview
TaxEase is a web application that helps users fill out tax forms with AI-powered assistance in multiple languages. The app supports various countries and their respective tax systems, providing intelligent guidance, deduction suggestions, and form field explanations tailored to each jurisdiction.

## Features
- **Multi-language Support**: English, Spanish, French, German, and Chinese
- **Country-Specific Tax Forms**: Support for US, UK, Canada, Germany, France, Spain, Australia, and Mexico
- **AI-Powered Assistance**: Free Google Gemini API integration for intelligent tax guidance
- **Step-by-Step Wizard**: Easy-to-follow multi-step form with progress tracking
- **Form Preview**: Review all entered data before submission
- **Dark Mode**: Full light/dark theme support
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS + Shadcn UI components
- Wouter for routing
- TanStack Query for data fetching
- React Hook Form for form management

### Backend
- Express.js
- In-memory storage (MemStorage)
- Google Gemini API for AI assistance
- RESTful API endpoints

## Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AIAssistant.tsx
│   │   ├── CountrySelector.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── ProgressStepper.tsx
│   │   └── ThemeToggle.tsx
│   ├── contexts/           # React contexts
│   │   └── AppContext.tsx  # Global app state (language, theme, country)
│   ├── lib/               # Utilities and helpers
│   │   ├── countries.ts   # Country data and configurations
│   │   └── i18n.ts        # Internationalization translations
│   ├── pages/             # Page components
│   │   ├── Landing.tsx    # Home page
│   │   ├── SelectCountry.tsx
│   │   ├── FormWizard.tsx # Multi-step tax form
│   │   └── Success.tsx    # Completion page
│   └── App.tsx            # Main app component with routing

server/
├── routes.ts              # API route definitions
├── storage.ts             # In-memory data storage
└── index.ts              # Express server setup

shared/
└── schema.ts             # Shared TypeScript types and Zod schemas
```

## Data Model

### TaxForm
- User tax form submissions with country-specific data
- Fields: personal info, income, deductions, credits
- Status tracking: draft, completed, submitted

### CountryConfig
- Country-specific tax configurations
- Available forms, deductions, and credits per country
- Multi-language country names

### AIAssistanceRequest
- AI chat history for each form
- Questions and responses in user's language

## API Endpoints

### Tax Forms
- `POST /api/forms` - Create new tax form
- `GET /api/forms/:id` - Get specific form
- `PATCH /api/forms/:id` - Update form
- `DELETE /api/forms/:id` - Delete form

### Countries
- `GET /api/countries` - Get all country configurations
- `GET /api/countries/:code` - Get specific country config

### AI Assistance
- `POST /api/ai/assist` - Get AI help for tax questions
- `GET /api/ai/history/:formId` - Get AI chat history

## Google Gemini API Setup

The application uses the free Google Gemini API instead of OpenAI:

1. Visit https://aistudio.google.com/
2. Sign in with your Google account
3. Get your free API key
4. Add it to your Replit Secrets as `GOOGLE_AI_API_KEY`

**Benefits:**
- Completely free tier
- 1 billion tokens per month
- No credit card required
- Supports multiple languages natively

## Internationalization

The app supports 5 languages with complete translations:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Chinese (zh)

All UI text, form labels, and AI responses are localized. Users can switch languages at any time using the language selector in the header.

## Supported Countries

Currently supported countries with tax form templates:
1. United States (1040, Schedule C, Schedule A)
2. United Kingdom (Self Assessment)
3. Canada (T1, T4)
4. Germany (Einkommensteuererklärung)
5. France (Déclaration de revenus)
6. Spain (Declaración de la Renta)
7. Australia (Tax Return)
8. Mexico (Declaración Anual)

## Design System

The app follows a professional, clean design with:
- Consistent spacing (4, 8, 12, 16, 24px)
- Inter font for UI text
- IBM Plex Mono for numbers and tax IDs
- Primary blue color scheme
- Subtle shadows and elevation
- Smooth transitions and hover states

## Recent Changes

### Phase 1: Schema & Frontend (Completed)
- ✅ Defined complete data model with TypeScript types
- ✅ Created internationalization system with 5 languages
- ✅ Built country selection interface
- ✅ Implemented multi-step form wizard
- ✅ Created AI assistance chat interface
- ✅ Added dark mode support
- ✅ Designed responsive landing page
- ✅ Implemented progress stepper
- ✅ Created form review/summary page

### Phase 2: Backend (In Progress)
- Backend API implementation
- Google Gemini API integration
- Form data persistence
- PDF generation

### Phase 3: Integration & Testing (Pending)
- Connect frontend to backend
- End-to-end testing
- AI response quality validation

## User Preferences

None specified yet.

## Development Notes

- Using free Google Gemini API instead of OpenAI
- In-memory storage for development (can upgrade to PostgreSQL)
- All API keys stored in Replit Secrets
- Frontend-first architecture with beautiful UI
- Mobile-responsive design throughout
