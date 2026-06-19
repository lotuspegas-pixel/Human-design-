import type { ReportSection } from '../types';

interface Props {
  sections: ReportSection[];
}

export default function ReportView({ sections }: Props) {
  return (
    <div className="space-y-6 print:space-y-4">
      {sections.map((section) => (
        <div
          key={section.title}
          className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm print:border-stone-300 print:shadow-none"
        >
          <h3 className="mb-3 text-lg font-semibold text-stone-800">{section.title}</h3>
          <div className="whitespace-pre-line text-sm leading-relaxed text-stone-600">
            {section.content}
          </div>
        </div>
      ))}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800 print:border-amber-300">
        Dit rapport is bedoeld voor zelfinzicht en reflectie. Het is geen medische diagnose, geen
        psychologische diagnose en geen selectie-instrument. Gebruik de uitkomst als gesprekstarter,
        niet als definitief oordeel over jezelf of anderen.
      </div>
    </div>
  );
}
