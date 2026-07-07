import { useI18n } from '../i18n/LanguageContext';

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-8 flex gap-2.5">
        {['#F59E0B', '#6366F1', '#DC2626', '#10B981'].map((c) => (
          <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      <h2 className="mb-3 font-display text-5xl font-medium tracking-tight text-[var(--color-ink)] sm:text-6xl">
        Arcana Profile
      </h2>
      <p className="mb-8 max-w-lg text-lg text-[var(--color-ink-soft)]">
        {t.landingSubtitle}
      </p>
      <button
        onClick={onStart}
        className="rounded-xl px-8 py-3.5 text-base font-medium text-white shadow-[var(--shadow-card-lift)] transition hover:opacity-90"
        style={{ backgroundColor: 'var(--color-ink)' }}
      >
        {t.landingStart}
      </button>
      <p className="mt-8 max-w-md text-xs text-stone-400">
        {t.landingDisclaimer}
      </p>
    </div>
  );
}
