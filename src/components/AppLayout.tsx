import type { ReactNode } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import { LOCALES } from '../i18n/types';
import type { Locale } from '../i18n/types';
import BrandMark from './BrandMark';

interface Props {
  children: ReactNode;
  /** Ruimere leesbreedte voor landing- en resultatenpagina. */
  wide?: boolean;
}

export default function AppLayout({ children, wide = false }: Props) {
  const { locale, setLocale, t } = useI18n();
  const width = wide ? 'max-w-5xl' : 'max-w-3xl';

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-[var(--color-hairline-soft)] bg-[var(--color-parchment)]/80 backdrop-blur-md print:hidden">
        <div className={`mx-auto flex ${width} items-center justify-between px-4 py-3.5`}>
          <div className="flex items-center gap-2.5">
            <BrandMark className="h-7 w-7" />
            <span className="font-display text-lg font-medium tracking-tight text-[var(--color-ink)]">
              {t.appTitle}
            </span>
          </div>
          <label className="flex items-center gap-1.5 rounded-full border border-[var(--color-hairline)] bg-white/70 px-2.5 py-1.5">
            <span className="sr-only">Language</span>
            <svg viewBox="0 0 20 20" className="h-4 w-4 text-[var(--color-ink-faint)]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="10" cy="10" r="8" />
              <path d="M2 10h16M10 2c2.5 2.4 3.8 5.1 3.8 8S12.5 15.6 10 18c-2.5-2.4-3.8-5.1-3.8-8S7.5 4.4 10 2z" />
            </svg>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="cursor-pointer appearance-none bg-transparent pr-1 text-sm text-[var(--color-ink)] focus:outline-none"
              aria-label="Language"
            >
              {LOCALES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <main className={`mx-auto w-full ${width} flex-1 px-4 py-8 sm:py-12`}>{children}</main>

      <footer className="border-t border-[var(--color-hairline-soft)] print:hidden">
        <div className={`mx-auto ${width} px-4 py-7 text-center text-xs text-[var(--color-ink-faint)]`}>
          {t.footerTagline}
        </div>
      </footer>
    </div>
  );
}
