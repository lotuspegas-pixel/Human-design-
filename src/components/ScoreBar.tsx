interface Props {
  label: string;
  score: number;
  color: string;
}

export default function ScoreBar({ label, score, color }: Props) {
  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-[var(--color-ink)]">{label}</span>
        <span className="font-display text-lg text-[var(--color-ink)]">{Math.round(score)}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${Math.max(score, 2)}%`,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
          }}
        />
      </div>
    </div>
  );
}
