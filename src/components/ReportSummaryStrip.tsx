import type { ReactNode } from 'react';

export interface SummaryItem {
  label: string;
  value: string;
  sub?: string;
  accent: string;
  ink: string;
  icon?: ReactNode;
}

interface Props {
  items: SummaryItem[];
}

/** Visuele samenvatting: vier compacte kaarten met de kerngegevens van het profiel. */
export default function ReportSummaryStrip({ items }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="card-surface print-avoid-break relative overflow-hidden p-4"
        >
          <span
            className="absolute inset-x-0 top-0 h-0.5"
            style={{ background: `linear-gradient(90deg, ${item.accent}, ${item.accent}44)` }}
            aria-hidden="true"
          />
          <div className="mb-2 flex items-center gap-2">
            {item.icon && <span style={{ color: item.accent }}>{item.icon}</span>}
            <span className="text-[10px] font-medium uppercase tracking-[0.16em]" style={{ color: item.ink }}>
              {item.label}
            </span>
          </div>
          <p className="font-display text-base font-medium leading-snug text-[var(--color-ink)]">{item.value}</p>
          {item.sub && <p className="mt-0.5 text-xs text-[var(--color-ink-faint)]">{item.sub}</p>}
        </div>
      ))}
    </div>
  );
}
