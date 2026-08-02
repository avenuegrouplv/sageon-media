import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Language, PageKey, Translations } from "./types";
import { ROUTE_MAP, getPageKeyAndLangFromPath } from "./routes";
import { lvTranslations } from "./translations/lv";
import { enTranslations } from "./translations/en";
import { ruTranslations } from "./translations/ru";

interface LanguageContextType {
  lang: Language;
  pageKey: PageKey;
  t: Translations;
  switchLanguage: (targetLang: Language) => void;
  getLocalizedPath: (key: PageKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translationsMap: Record<Language, Translations> = {
  LV: lvTranslations,
  EN: enTranslations,
  RU: ruTranslations,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { lang, pageKey } = useMemo(() => {
    return getPageKeyAndLangFromPath(location.pathname);
  }, [location.pathname]);

  const t = useMemo(() => {
    return translationsMap[lang] || lvTranslations;
  }, [lang]);

  const switchLanguage = (targetLang: Language) => {
    if (targetLang === lang) return;
    const targetRoute = ROUTE_MAP[targetLang][pageKey] || ROUTE_MAP[targetLang].home;
    const search = location.search; // keep query parameters like ?id=ai-search-recommendation
    navigate(`${targetRoute}${search}`);
  };

  const getLocalizedPath = (key: PageKey) => {
    return ROUTE_MAP[lang][key] || ROUTE_MAP[lang].home;
  };

  // Sync document language attribute
  useEffect(() => {
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, pageKey, t, switchLanguage, getLocalizedPath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
