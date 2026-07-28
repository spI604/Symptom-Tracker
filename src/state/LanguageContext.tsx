import React, { createContext, useContext, useState, useEffect } from 'react';
import { locales, LanguageCode } from '../locales';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, variables?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'meddemo_language_preference';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  // Load saved language on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode;
        if (saved && (saved === 'en' || saved === 'hi' || saved === 'te')) {
          setLanguageState(saved);
        }
      }
    } catch (e) {
      console.warn('Failed to load language preference:', e);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      }
    } catch (e) {
      console.warn('Failed to save language preference:', e);
    }
  };

  const t = (key: string, variables?: Record<string, string>): string => {
    if (!key) return '';
    
    let text = locales[language]?.[key] || locales['en']?.[key] || key;

    // Optional: basic variable replacement
    if (variables) {
      Object.keys(variables).forEach((varKey) => {
        text = text.replace(new RegExp(`{${varKey}}`, 'g'), variables[varKey]);
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
