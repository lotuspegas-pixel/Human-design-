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
      <div className="mb-1 flex justify-between text-xs text-stone-500">
        <span>
          {t.questionOf(current, total)}
          {estimatedMinutesLeft !== undefined && <> · {t.minutesLeft(estimatedMinutesLeft)}</>}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
