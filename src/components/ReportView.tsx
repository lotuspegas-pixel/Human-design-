import type { ReportSection } from '../types';

interface Props {
  sections: ReportSection[];
}

export default function ReportView({ sections }: Props) {
  return (
    <div className="space-y-5 print:space-y-4">
      {sections.map((section, i) => {
        const paragraphs = section.content.split('\n\n');
        const [lead, ...rest] = paragraphs;
        return (
          <div
            key={section.title}
            className={`card-surface reveal p-6 print:border-stone-300 print:shadow-none sm:p-8 ${
              i % 2 === 1 ? 'bg-[var(--color-parchment)]' : 'bg-white'
            }`}
            style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="font-display text-xs font-medium text-stone-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl font-medium text-[var(--color-ink)]">
                {section.title}
              </h3>
            </div>
            <p className="mb-3 font-display text-lg leading-relaxed text-[var(--color-ink)] italic">
              {lead}
            </p>
            <div className="whitespace-pre-line text-sm leading-relaxed text-[var(--color-ink-soft)]">
              {rest.join('\n\n')}
            </div>
          </div>
        );
      })}
      <div className="card-surface border-amber-200/70 bg-amber-50/60 p-6 text-sm text-amber-800 print:border-amber-300">
        Dit rapport is bedoeld voor zelfinzicht en reflectie. Het is geen medische diagnose, geen
        psychologische diagnose en geen selectie-instrument. Gebruik de uitkomst als gesprekstarter,
        niet als definitief oordeel over jezelf of anderen.
      </div>
    </div>
  );
}
