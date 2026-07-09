import { useI18n } from '../i18n/LanguageContext';

interface Props {
  value: number | null;
  onChange: (value: number) => void;
}

export default function LikertScale({ value, onChange }: Props) {
  const { t } = useI18n();

  return (
    <div className="space-y-2.5">
      {t.likert.map((label, i) => {
        const score = i + 1;
        const selected = value === score;
        return (
          <button
            key={score}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(score)}
            className={`flex min-h-[52px] w-full items-center gap-3.5 rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-200 ${
              selected
                ? 'border-amber-400/80 bg-amber-50 text-amber-900 shadow-[0_0_0_3px_rgba(245,158,11,0.14)]'
                : 'border-[var(--color-hairline)] bg-white text-[var(--color-ink-soft)] hover:border-amber-200 hover:bg-[var(--color-parchment-veil)]'
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors ${
                selected
                  ? 'border-amber-400 bg-amber-500 text-white'
                  : 'border-stone-300 text-stone-400'
              }`}
            >
              {score}
            </span>
            <span className="leading-snug">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
