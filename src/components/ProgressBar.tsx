import { useI18n } from '../i18n/LanguageContext';

interface Props {
  current: number;
  total: number;
  estimatedMinutesLeft?: number;
}

export default function ProgressBar({ current, total, estimatedMinutesLeft }: Props) {
  const { t } = useI18n();
  const pct = Math.round((current / total) * 100);

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-end justify-between">
        <span className="text-sm font-medium text-[var(--color-ink)]">
          {t.questionOf(current, total)}
        </span>
        <span className="font-display text-sm text-[var(--color-ink-soft)]">{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-parchment-deep)]">
        <div
          className="h-full rounded-full bg-[var(--color-ink)] transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      {estimatedMinutesLeft !== undefined && (
        <p className="mt-1.5 text-right text-[11px] text-[var(--color-ink-faint)]">
          {t.minutesLeft(estimatedMinutesLeft)}
        </p>
      )}
    </div>
  );
}
