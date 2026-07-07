import { useMemo, useState } from 'react';
import type { BirthData } from '../types/humanDesign';
import { getTimezoneOptions, guessDefaultTimezone } from '../data/humanDesign/timezones';
import { useI18n } from '../i18n/LanguageContext';

interface Props {
  onSubmit: (data: BirthData) => void;
  onBack: () => void;
  isCalculating: boolean;
  error: string | null;
}

const inputClass =
  'w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400';
const labelClass = 'mb-1 block text-sm font-medium text-[var(--color-ink)]';

export default function BirthDataForm({ onSubmit, onBack, isCalculating, error }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [timeZone, setTimeZone] = useState(guessDefaultTimezone());
  const [birthPlace, setBirthPlace] = useState('');
  const [birthCountry, setBirthCountry] = useState('');
  const { t } = useI18n();

  const timezoneOptions = useMemo(() => getTimezoneOptions(), []);

  const isValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    birthDate !== '' &&
    birthTime !== '' &&
    timeZone !== '' &&
    birthPlace.trim().length > 0 &&
    birthCountry.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      birthDate,
      birthTime,
      timeZone,
      birthPlace: birthPlace.trim(),
      birthCountry: birthCountry.trim(),
    });
  };

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-2 font-display text-2xl font-medium text-[var(--color-ink)]">{t.birthTitle}</h2>
      <p className="mb-6 text-[var(--color-ink-soft)]">{t.birthIntro}</p>

      <form onSubmit={handleSubmit} className="card-surface space-y-5 p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClass}>{t.firstName}</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t.firstNamePlaceholder}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>{t.lastName}</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t.lastNamePlaceholder}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="birthDate" className={labelClass}>{t.birthDate}</label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="birthTime" className={labelClass}>{t.birthTime}</label>
            <input
              id="birthTime"
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="birthPlace" className={labelClass}>{t.birthPlaceLabel}</label>
            <input
              id="birthPlace"
              type="text"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder={t.birthPlacePlaceholder}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="birthCountry" className={labelClass}>{t.birthCountryLabel}</label>
            <input
              id="birthCountry"
              type="text"
              value={birthCountry}
              onChange={(e) => setBirthCountry(e.target.value)}
              placeholder={t.birthCountryPlaceholder}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="timeZone" className={labelClass}>{t.timeZoneLabel}</label>
          <select
            id="timeZone"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className={inputClass}
          >
            {timezoneOptions.map((tz) => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
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
            {t.back}
          </button>
          <button
            type="submit"
            disabled={!isValid || isCalculating}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white transition ${
              isValid && !isCalculating ? 'hover:opacity-90' : 'cursor-not-allowed bg-stone-300'
            }`}
            style={isValid && !isCalculating ? { backgroundColor: 'var(--color-indigo-cluster)' } : undefined}
          >
            {isCalculating ? t.calculating : t.calculate}
          </button>
        </div>
      </form>
    </div>
  );
}
