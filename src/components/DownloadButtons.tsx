import type { ReportSection, ScoreResult } from '../types';
import { getArchetype } from '../data/archetypes';
import { useI18n } from '../i18n/LanguageContext';

interface Props {
  sections: ReportSection[];
  result: ScoreResult;
  onReset: () => void;
}

export default function DownloadButtons({ sections, result, onReset }: Props) {
  const { t } = useI18n();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const primary = getArchetype(result.highestArchetype);
    const secondary = getArchetype(result.secondArchetype);

    let text = 'ARCANA PROFILE\n';
    text += `${t.completedOn} ${new Date(result.completedAt).toLocaleDateString()}\n`;
    text += `${primary.name} · ${secondary.name}\n`;
    text += '\n' + '='.repeat(50) + '\n\n';

    for (const section of sections) {
      text += `${section.title.toUpperCase()}\n`;
      text += '-'.repeat(Math.min(section.title.length, 50)) + '\n';
      text += section.content + '\n\n';
    }

    text += '='.repeat(50) + '\n';
    text += t.resultsDisclaimer + '\n';

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arcana-profile-reading.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <button
        onClick={handlePrint}
        className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        style={{ backgroundColor: 'var(--color-ink)' }}
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 7V3h8v4M6 14H4v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4h-2M6 12h8v5H6Z" />
        </svg>
        {t.printReport}
      </button>
      <button
        onClick={handleDownloadText}
        className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-stone-300 bg-white px-6 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 3v10m0 0 3.5-3.5M10 13 6.5 9.5M4 16h12" />
        </svg>
        {t.downloadAsText}
      </button>
      <button
        onClick={onReset}
        className="inline-flex min-h-[48px] items-center rounded-full border border-red-200 bg-white px-6 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        {t.startNewTest}
      </button>
    </div>
  );
}
