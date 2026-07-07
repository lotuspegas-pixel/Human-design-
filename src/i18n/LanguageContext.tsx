import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Locale, UIStrings } from './types';
import { DEFAULT_LOCALE, LOCALES } from './types';
import { uiStrings } from './ui';

const STORAGE_KEY = 'arcana-locale';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: UIStrings;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && LOCALES.some((l) => l.code === saved)) return saved;
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    const match = LOCALES.find((l) => l.code === browserLang);
    return match ? match.code : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage kan geblokkeerd zijn; taalkeuze werkt dan alleen voor deze sessie.
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: uiStrings[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n moet binnen LanguageProvider worden gebruikt.');
  return ctx;
}
