import { useMemo, useState } from 'react';
import type { BirthData } from '../types/humanDesign';
import { getTimezoneOptions, guessDefaultTimezone } from '../data/humanDesign/timezones';

interface Props {
  onSubmit: (data: BirthData) => void;
  onBack: () => void;
  isCalculating: boolean;
  error: string | null;
}

export default function BirthDataForm({ onSubmit, onBack, isCalculating, error }: Props) {
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [timeZone, setTimeZone] = useState(guessDefaultTimezone());
  const [birthPlace, setBirthPlace] = useState('');

  const timezoneOptions = useMemo(() => getTimezoneOptions(), []);

  const isValid = firstName.trim().length > 0 && birthDate && birthTime && timeZone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ firstName: firstName.trim(), birthDate, birthTime, timeZone, birthPlace: birthPlace.trim() });
  };

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-2 font-display text-2xl font-medium text-[var(--color-ink)]">Je geboortegegevens</h2>
      <p className="mb-6 text-[var(--color-ink-soft)]">
        Voor een nauwkeurige berekening is de exacte geboortetijd belangrijk. Weet je die niet
        zeker? Vraag het na op je geboorteakte of bij je ouders — een verschil van enkele minuten
        kan de uitkomst beïnvloeden.
      </p>

      <form onSubmit={handleSubmit} className="card-surface space-y-5 p-6 sm:p-8">
        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-[var(--color-ink)]">
            Voornaam
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Bijv. Sanne"
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="birthDate" className="mb-1 block text-sm font-medium text-[var(--color-ink)]">
            Geboortedatum
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="birthTime" className="mb-1 block text-sm font-medium text-[var(--color-ink)]">
            Geboortetijd (zo precies mogelijk)
          </label>
          <input
            id="birthTime"
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="timeZone" className="mb-1 block text-sm font-medium text-[var(--color-ink)]">
            Tijdzone op moment van geboorte
          </label>
          <select
            id="timeZone"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          >
            {timezoneOptions.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="birthPlace" className="mb-1 block text-sm font-medium text-[var(--color-ink)]">
            Geboorteplaats (optioneel, alleen voor weergave)
          </label>
          <input
            id="birthPlace"
            type="text"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            placeholder="Bijv. Utrecht, Nederland"
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
          >
            Terug
          </button>
          <button
            type="submit"
            disabled={!isValid || isCalculating}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white transition ${
              isValid && !isCalculating ? 'hover:opacity-90' : 'cursor-not-allowed bg-stone-300'
            }`}
            style={isValid && !isCalculating ? { backgroundColor: 'var(--color-indigo-cluster)' } : undefined}
          >
            {isCalculating ? 'Bezig met berekenen...' : 'Bereken mijn reading'}
          </button>
        </div>
      </form>
    </div>
  );
}
