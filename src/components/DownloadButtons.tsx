import type { ReportSection, ScoreResult } from '../types';
import { getArchetype } from '../data/archetypes';

interface Props {
  sections: ReportSection[];
  result: ScoreResult;
  onReset: () => void;
}

export default function DownloadButtons({ sections, result, onReset }: Props) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const primary = getArchetype(result.highestArchetype);
    const secondary = getArchetype(result.secondArchetype);

    let text = 'ARCANA PROFILE — RAPPORT\n';
    text += `Datum: ${new Date(result.completedAt).toLocaleDateString('nl-NL')}\n`;
    text += `Hoofdprofiel: ${primary.name}\n`;
    text += `Tweede profiel: ${secondary.name}\n`;
    text += '\n' + '='.repeat(50) + '\n\n';

    for (const section of sections) {
      text += `${section.title.toUpperCase()}\n`;
      text += '-'.repeat(section.title.length) + '\n';
      text += section.content + '\n\n';
    }

    text += '='.repeat(50) + '\n';
    text += 'Dit rapport is bedoeld voor zelfinzicht en reflectie. Het is geen medische diagnose, ';
    text += 'geen psychologische diagnose en geen selectie-instrument. Gebruik de uitkomst als ';
    text += 'gesprekstarter, niet als definitief oordeel over jezelf of anderen.\n';

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arcana-profile-rapport.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <button
        onClick={handlePrint}
        className="rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
        style={{ backgroundColor: 'var(--color-ink)' }}
      >
        Print rapport
      </button>
      <button
        onClick={handleDownloadText}
        className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
      >
        Download als tekst
      </button>
      <button
        onClick={onReset}
        className="rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        Nieuwe test starten
      </button>
    </div>
  );
}
