// Internationalization utilities and translations

export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]["code"];

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.myForms": "My Forms",
    "nav.newForm": "New Form",
    
    // Landing Page
    "hero.title": "Tax Forms Made Simple",
    "hero.subtitle": "AI-powered assistance in your language. Support for multiple countries and tax systems.",
    "hero.cta.start": "Get Started Free",
    "hero.cta.learn": "Learn More",
    "hero.trust": "Free • Secure • Multi-language",
    
    // Features
    "features.title": "Everything You Need",
    "features.ai.title": "AI-Powered Assistance",
    "features.ai.desc": "Get intelligent help with complex tax questions in your language",
    "features.multilang.title": "Multi-Language Support",
    "features.multilang.desc": "Complete tax forms in English, Spanish, French, German, or Chinese",
    "features.countries.title": "Multiple Tax Systems",
    "features.countries.desc": "Support for US, UK, Canada, and more countries",
    "features.secure.title": "Secure & Private",
    "features.secure.desc": "Your data is encrypted and never shared with third parties",
    "features.pdf.title": "PDF Export",
    "features.pdf.desc": "Download completed forms as professional PDFs",
    "features.guidance.title": "Step-by-Step Guidance",
    "features.guidance.desc": "Easy wizard interface with helpful tooltips",
    
    // Country Selection
    "country.select.title": "Select Your Country",
    "country.select.subtitle": "Choose the country where you file taxes",
    "country.search": "Search countries...",
    
    // Language Selection
    "language.select": "Select Language",
    
    // Form Wizard
    "wizard.step": "Step",
    "wizard.of": "of",
    "wizard.next": "Next",
    "wizard.previous": "Previous",
    "wizard.save": "Save Progress",
    "wizard.submit": "Submit Form",
    "wizard.aiHelp": "Ask AI for Help",
    
    // Form Status
    "status.draft": "Draft",
    "status.completed": "Completed",
    "status.submitted": "Submitted",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.cancel": "Cancel",
    "common.continue": "Continue",
    "common.back": "Back",
  },
  es: {
    "nav.home": "Inicio",
    "nav.myForms": "Mis Formularios",
    "nav.newForm": "Nuevo Formulario",
    
    "hero.title": "Formularios de Impuestos Simplificados",
    "hero.subtitle": "Asistencia con IA en tu idioma. Soporte para múltiples países y sistemas fiscales.",
    "hero.cta.start": "Comenzar Gratis",
    "hero.cta.learn": "Más Información",
    "hero.trust": "Gratis • Seguro • Multiidioma",
    
    "features.title": "Todo Lo Que Necesitas",
    "features.ai.title": "Asistencia con IA",
    "features.ai.desc": "Obtén ayuda inteligente con preguntas fiscales complejas en tu idioma",
    "features.multilang.title": "Soporte Multiidioma",
    "features.multilang.desc": "Completa formularios en inglés, español, francés, alemán o chino",
    "features.countries.title": "Múltiples Sistemas Fiscales",
    "features.countries.desc": "Soporte para EE.UU., Reino Unido, Canadá y más países",
    "features.secure.title": "Seguro y Privado",
    "features.secure.desc": "Tus datos están encriptados y nunca se comparten con terceros",
    "features.pdf.title": "Exportar PDF",
    "features.pdf.desc": "Descarga formularios completos como PDFs profesionales",
    "features.guidance.title": "Guía Paso a Paso",
    "features.guidance.desc": "Interfaz de asistente fácil con consejos útiles",
    
    "country.select.title": "Selecciona Tu País",
    "country.select.subtitle": "Elige el país donde presentas impuestos",
    "country.search": "Buscar países...",
    
    "language.select": "Seleccionar Idioma",
    
    "wizard.step": "Paso",
    "wizard.of": "de",
    "wizard.next": "Siguiente",
    "wizard.previous": "Anterior",
    "wizard.save": "Guardar Progreso",
    "wizard.submit": "Enviar Formulario",
    "wizard.aiHelp": "Pedir Ayuda a IA",
    
    "status.draft": "Borrador",
    "status.completed": "Completado",
    "status.submitted": "Enviado",
    
    "common.loading": "Cargando...",
    "common.error": "Ocurrió un error",
    "common.cancel": "Cancelar",
    "common.continue": "Continuar",
    "common.back": "Volver",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.myForms": "Mes Formulaires",
    "nav.newForm": "Nouveau Formulaire",
    
    "hero.title": "Formulaires Fiscaux Simplifiés",
    "hero.subtitle": "Assistance IA dans votre langue. Support pour plusieurs pays et systèmes fiscaux.",
    "hero.cta.start": "Commencer Gratuitement",
    "hero.cta.learn": "En Savoir Plus",
    "hero.trust": "Gratuit • Sécurisé • Multilingue",
    
    "features.title": "Tout Ce Dont Vous Avez Besoin",
    "features.ai.title": "Assistance IA",
    "features.ai.desc": "Obtenez de l'aide intelligente pour les questions fiscales complexes dans votre langue",
    "features.multilang.title": "Support Multilingue",
    "features.multilang.desc": "Remplissez les formulaires en anglais, espagnol, français, allemand ou chinois",
    "features.countries.title": "Plusieurs Systèmes Fiscaux",
    "features.countries.desc": "Support pour les États-Unis, le Royaume-Uni, le Canada et plus",
    "features.secure.title": "Sécurisé et Privé",
    "features.secure.desc": "Vos données sont cryptées et jamais partagées avec des tiers",
    "features.pdf.title": "Export PDF",
    "features.pdf.desc": "Téléchargez les formulaires complétés en PDF professionnel",
    "features.guidance.title": "Guidage Étape par Étape",
    "features.guidance.desc": "Interface d'assistant facile avec des conseils utiles",
    
    "country.select.title": "Sélectionnez Votre Pays",
    "country.select.subtitle": "Choisissez le pays où vous déclarez vos impôts",
    "country.search": "Rechercher des pays...",
    
    "language.select": "Sélectionner la Langue",
    
    "wizard.step": "Étape",
    "wizard.of": "sur",
    "wizard.next": "Suivant",
    "wizard.previous": "Précédent",
    "wizard.save": "Sauvegarder",
    "wizard.submit": "Soumettre",
    "wizard.aiHelp": "Demander l'Aide de l'IA",
    
    "status.draft": "Brouillon",
    "status.completed": "Terminé",
    "status.submitted": "Soumis",
    
    "common.loading": "Chargement...",
    "common.error": "Une erreur s'est produite",
    "common.cancel": "Annuler",
    "common.continue": "Continuer",
    "common.back": "Retour",
  },
  de: {
    "nav.home": "Startseite",
    "nav.myForms": "Meine Formulare",
    "nav.newForm": "Neues Formular",
    
    "hero.title": "Steuerformulare Leicht Gemacht",
    "hero.subtitle": "KI-gestützte Hilfe in Ihrer Sprache. Unterstützung für mehrere Länder und Steuersysteme.",
    "hero.cta.start": "Kostenlos Starten",
    "hero.cta.learn": "Mehr Erfahren",
    "hero.trust": "Kostenlos • Sicher • Mehrsprachig",
    
    "features.title": "Alles Was Sie Brauchen",
    "features.ai.title": "KI-Unterstützung",
    "features.ai.desc": "Erhalten Sie intelligente Hilfe bei komplexen Steuerfragen in Ihrer Sprache",
    "features.multilang.title": "Mehrsprachige Unterstützung",
    "features.multilang.desc": "Formulare in Englisch, Spanisch, Französisch, Deutsch oder Chinesisch ausfüllen",
    "features.countries.title": "Mehrere Steuersysteme",
    "features.countries.desc": "Unterstützung für USA, UK, Kanada und weitere Länder",
    "features.secure.title": "Sicher & Privat",
    "features.secure.desc": "Ihre Daten sind verschlüsselt und werden niemals an Dritte weitergegeben",
    "features.pdf.title": "PDF-Export",
    "features.pdf.desc": "Laden Sie ausgefüllte Formulare als professionelle PDFs herunter",
    "features.guidance.title": "Schritt-für-Schritt-Anleitung",
    "features.guidance.desc": "Einfache Assistenten-Oberfläche mit hilfreichen Tipps",
    
    "country.select.title": "Wählen Sie Ihr Land",
    "country.select.subtitle": "Wählen Sie das Land, in dem Sie Steuern zahlen",
    "country.search": "Länder suchen...",
    
    "language.select": "Sprache Wählen",
    
    "wizard.step": "Schritt",
    "wizard.of": "von",
    "wizard.next": "Weiter",
    "wizard.previous": "Zurück",
    "wizard.save": "Fortschritt Speichern",
    "wizard.submit": "Formular Absenden",
    "wizard.aiHelp": "KI um Hilfe Bitten",
    
    "status.draft": "Entwurf",
    "status.completed": "Abgeschlossen",
    "status.submitted": "Eingereicht",
    
    "common.loading": "Laden...",
    "common.error": "Ein Fehler ist aufgetreten",
    "common.cancel": "Abbrechen",
    "common.continue": "Fortfahren",
    "common.back": "Zurück",
  },
  zh: {
    "nav.home": "首页",
    "nav.myForms": "我的表单",
    "nav.newForm": "新表单",
    
    "hero.title": "税务表格变得简单",
    "hero.subtitle": "用您的语言获得AI驱动的帮助。支持多个国家和税务系统。",
    "hero.cta.start": "免费开始",
    "hero.cta.learn": "了解更多",
    "hero.trust": "免费 • 安全 • 多语言",
    
    "features.title": "您需要的一切",
    "features.ai.title": "AI助手",
    "features.ai.desc": "用您的语言获得复杂税务问题的智能帮助",
    "features.multilang.title": "多语言支持",
    "features.multilang.desc": "以英语、西班牙语、法语、德语或中文填写表格",
    "features.countries.title": "多个税务系统",
    "features.countries.desc": "支持美国、英国、加拿大等国家",
    "features.secure.title": "安全私密",
    "features.secure.desc": "您的数据已加密，绝不与第三方共享",
    "features.pdf.title": "PDF导出",
    "features.pdf.desc": "将完成的表格下载为专业PDF",
    "features.guidance.title": "分步指导",
    "features.guidance.desc": "带有有用提示的简易向导界面",
    
    "country.select.title": "选择您的国家",
    "country.select.subtitle": "选择您申报税务的国家",
    "country.search": "搜索国家...",
    
    "language.select": "选择语言",
    
    "wizard.step": "步骤",
    "wizard.of": "/",
    "wizard.next": "下一步",
    "wizard.previous": "上一步",
    "wizard.save": "保存进度",
    "wizard.submit": "提交表单",
    "wizard.aiHelp": "向AI求助",
    
    "status.draft": "草稿",
    "status.completed": "已完成",
    "status.submitted": "已提交",
    
    "common.loading": "加载中...",
    "common.error": "发生错误",
    "common.cancel": "取消",
    "common.continue": "继续",
    "common.back": "返回",
  },
};

export function useTranslation(language: LanguageCode) {
  return {
    t: (key: string): string => {
      return translations[language]?.[key] || translations.en[key] || key;
    },
    language,
  };
}
