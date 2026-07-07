import type { ReactNode } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import { LOCALES } from '../i18n/types';
import type { Locale } from '../i18n/types';

export default function AppLayout({ children }: { children: ReactNode }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      <header className="border-b border-stone-200/60 bg-white/70 backdrop-blur-sm print:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <h1 className="font-display text-xl font-medium tracking-tight text-[var(--color-ink)]">
            {t.appTitle}
          </h1>
          <label className="flex items-center gap-2">
            <span className="sr-only">Language</span>
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="10" cy="10" r="8" />
              <path d="M2 10h16M10 2c2.5 2.4 3.8 5.1 3.8 8S12.5 15.6 10 18c-2.5-2.4-3.8-5.1-3.8-8S7.5 4.4 10 2z" />
            </svg>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-sm text-[var(--color-ink)] focus:border-stone-400 focus:outline-none"
            >
              {LOCALES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </label>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
      <footer className="border-t border-stone-200/60 bg-white/40 print:hidden">
        <div className="mx-auto max-w-3xl px-4 py-6 text-center text-xs text-[var(--color-ink-soft)]">
          {t.footerTagline}
        </div>
      </footer>
    </div>
  );
}
