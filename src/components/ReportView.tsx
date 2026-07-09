import type { ReactNode } from 'react';
import type { ReportSection } from '../types';
import { useI18n } from '../i18n/LanguageContext';
import DecorativeAura from './DecorativeAura';

interface Props {
  sections: ReportSection[];
  accentColor?: string;
  ink?: string;
}

// Rustige, neutrale decoratieve hoofdstuk-glyphs (roteren per sectie voor variatie).
const CHAPTER_GLYPHS: ReactNode[] = [
  <path key="a" d="M12 4c.5 3.4 1.4 4.3 4.8 4.8C13.4 9.3 12.5 10.2 12 13.6c-.5-3.4-1.4-4.3-4.8-4.8C10.6 8.3 11.5 7.4 12 4Z" />,
  <path key="b" d="M12 4 20 12 12 20 4 12Z" />,
  <><circle key="c1" cx="12" cy="12" r="7" /><circle key="c2" cx="12" cy="12" r="2" /></>,
  <path key="d" d="M6 16c4-1 4-8 6-11 2 3 2 10 6 11" />,
  <path key="e" d="M12 5v14M5 12h14" />,
  <path key="f" d="M4 14c3-6 13-6 16 0" />,
];

export default function ReportView({ sections, accentColor = 'var(--color-ink)', ink = 'var(--color-ink)' }: Props) {
  const { t } = useI18n();

  return (
    <div className="space-y-5 print:space-y-3">
      {sections.map((section, i) => {
        const paragraphs = section.content.split('\n\n');
        const [lead, ...rest] = paragraphs;
        const glyph = CHAPTER_GLYPHS[i % CHAPTER_GLYPHS.length];
        return (
          <article
            key={section.title}
            className="card-surface print-avoid-break reveal relative overflow-hidden p-6 sm:p-9"
            style={{ animationDelay: `${Math.min(i, 6) * 55}ms` }}
          >
            <DecorativeAura color={accentColor} variant="top-right" opacity={0.05} />

            {/* Titelblok: medaillon + glyph + titel */}
            <header className="relative mb-5 flex items-start gap-4">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-display text-base"
                style={{ borderColor: `${accentColor}33`, color: ink, background: `${accentColor}0d` }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pt-1">
                <span className="mb-1.5 inline-flex" style={{ color: accentColor }} aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    {glyph}
                  </svg>
                </span>
                <h3 className="font-display text-xl font-medium leading-snug text-[var(--color-ink)] sm:text-2xl">
                  {section.title}
                </h3>
              </div>
            </header>

            {/* Lead als pullquote */}
            <p
              className="reading-column relative mb-4 border-l-2 pl-4 font-display text-lg italic leading-relaxed text-[var(--color-ink)] sm:text-xl"
              style={{ borderColor: `${accentColor}66` }}
            >
              {lead}
            </p>

            {/* Body in rustige leeskolom */}
            {rest.length > 0 && (
              <div className="reading-column whitespace-pre-line text-[15px] leading-[1.75] text-[var(--color-ink-soft)]">
                {rest.join('\n\n')}
              </div>
            )}
          </article>
        );
      })}

      <div className="card-surface print-avoid-break border-amber-200/70 bg-amber-50/50 p-6 text-sm leading-relaxed text-amber-800 print:border-amber-300">
        {t.resultsDisclaimer}
      </div>
    </div>
  );
}
