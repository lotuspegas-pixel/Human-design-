import { useState } from 'react';

interface Props {
  onAccept: () => void;
  onBack: () => void;
}

export default function ConsentScreen({ onAccept, onBack }: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-6 font-display text-2xl font-medium text-[var(--color-ink)]">Voordat je begint</h2>

      <div className="card-surface mb-6 space-y-4 p-6 text-sm leading-relaxed text-[var(--color-ink-soft)]">
        <p>
          Je beantwoordt straks 64 korte stellingen over je voorkeuren, denkstijl en hoe je met
          situaties omgaat. Er zijn geen goede of foute antwoorden.
        </p>
        <p>
          Op basis van je antwoorden ontvang je een reflectierapport dat laat zien welke
          denkstijlen en gevoelsstijlen bij jou het sterkst naar voren komen.
        </p>
        <p>
          Dit rapport is uitsluitend bedoeld voor zelfinzicht en persoonlijke ontwikkeling. Het
          geeft geen medisch, klinisch, psychologisch of selectieadvies. Het is niet geschikt voor
          gebruik bij werving, selectie of geautomatiseerde besluitvorming.
        </p>
        <p>
          Je gegevens worden alleen lokaal op je eigen apparaat opgeslagen. Er worden geen gegevens
          naar een server verstuurd.
        </p>
      </div>

      <label className="card-surface mb-8 flex cursor-pointer items-start gap-3 p-4 transition hover:bg-stone-50">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-stone-300 text-amber-500 focus:ring-amber-500"
        />
        <span className="text-sm text-[var(--color-ink)]">
          Ik begrijp dat dit rapport bedoeld is voor zelfinzicht.
        </span>
      </label>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
        >
          Terug
        </button>
        <button
          onClick={onAccept}
          disabled={!agreed}
          className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white transition ${
            agreed ? 'hover:opacity-90' : 'cursor-not-allowed bg-stone-300'
          }`}
          style={agreed ? { backgroundColor: 'var(--color-ink)' } : undefined}
        >
          Doorgaan
        </button>
      </div>
    </div>
  );
}
