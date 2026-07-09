import LikertScale from './LikertScale';

interface Props {
  text: string;
  value: number | null;
  onChange: (value: number) => void;
  number?: number;
  total?: number;
}

export default function QuestionCard({ text, value, onChange, number, total }: Props) {
  return (
    <div className="card-surface card-corner relative overflow-hidden p-6 sm:p-9">
      {number !== undefined && (
        <div className="mb-4 flex items-baseline gap-2 text-[var(--color-ink-faint)]">
          <span className="font-display text-sm font-medium">{String(number).padStart(2, '0')}</span>
          {total !== undefined && <span className="text-xs">/ {total}</span>}
        </div>
      )}
      <p className="reading-column mb-7 font-display text-2xl font-medium leading-[1.35] text-[var(--color-ink)]">
        {text}
      </p>
      <LikertScale value={value} onChange={onChange} />
    </div>
  );
}
