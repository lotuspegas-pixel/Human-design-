import { useState } from 'react';
import { useI18n } from '../i18n/LanguageContext';
import SectionDivider from '../components/SectionDivider';

interface Props {
  onAccept: () => void;
  onBack: () => void;
}

export default function ConsentScreen({ onAccept, onBack }: Props) {
  const [agreed, setAgreed] = useState(false);
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-ink-faint)]">
        Arcana Profile
      </p>
      <h2 className="mb-6 text-center font-display text-3xl font-medium text-[var(--color-ink)]">{t.consentTitle}</h2>
      <SectionDivider className="mb-8" />

      <div className="card-surface card-corner mb-6 space-y-4 p-6 text-sm leading-relaxed text-[var(--color-ink-soft)] sm:p-8">
        <p>{t.consentP1}</p>
        <p>{t.consentP2}</p>
        <p>{t.consentP3}</p>
        <p>{t.consentP4}</p>
      </div>

      <label className="card-surface mb-8 flex cursor-pointer items-start gap-3 p-4 transition hover:border-[var(--color-hairline)] hover:bg-[var(--color-parchment-veil)]">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-stone-300 text-amber-500 focus:ring-amber-500"
        />
        <span className="text-sm text-[var(--color-ink)]">{t.consentCheckbox}</span>
      </label>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="min-h-[48px] rounded-full border border-stone-300 bg-white px-6 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
        >
          {t.back}
        </button>
        <button
          onClick={onAccept}
          disabled={!agreed}
          className={`min-h-[48px] flex-1 rounded-full px-6 text-sm font-medium text-white transition sm:flex-none ${
            agreed ? 'hover:opacity-90' : 'cursor-not-allowed bg-stone-300'
          }`}
          style={agreed ? { backgroundColor: 'var(--color-ink)' } : undefined}
        >
          {t.continue_}
        </button>
      </div>
    </div>
  );
}
