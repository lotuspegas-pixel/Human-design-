interface Props {
  score: number;
  color: string;
  size?: number;
  label?: string;
}

/**
 * Score als premium "seal": een dubbele ring met de score in het midden,
 * gevuld naar rato van de score. Puur presentatie — de waarde komt binnen.
 */
export default function ScoreSeal({ score, color, size = 132, label }: Props) {
  const stroke = 5;
  const r = (size - stroke) / 2 - 6;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score)) / 100;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r + 6} fill="none" stroke="var(--color-hairline-soft)" strokeWidth="1" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-hairline)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <div className="flex flex-col items-center leading-none">
        <span className="font-display text-4xl font-medium" style={{ color }}>
          {Math.round(score)}
        </span>
        {label && <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">{label}</span>}
      </div>
    </div>
  );
}
