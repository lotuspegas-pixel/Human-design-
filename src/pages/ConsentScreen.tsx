import { useState } from 'react';
import { useI18n } from '../i18n/LanguageContext';

interface Props {
  onAccept: () => void;
  onBack: () => void;
}

export default function ConsentScreen({ onAccept, onBack }: Props) {
  const [agreed, setAgreed] = useState(false);
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-6 font-display text-2xl font-medium text-[var(--color-ink)]">{t.consentTitle}</h2>

      <div className="card-surface mb-6 space-y-4 p-6 text-sm leading-relaxed text-[var(--color-ink-soft)]">
        <p>{t.consentP1}</p>
        <p>{t.consentP2}</p>
        <p>{t.consentP3}</p>
        <p>{t.consentP4}</p>
      </div>

      <label className="card-surface mb-8 flex cursor-pointer items-start gap-3 p-4 transition hover:bg-stone-50">
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
          className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
        >
          {t.back}
        </button>
        <button
          onClick={onAccept}
          disabled={!agreed}
          className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white transition ${
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
