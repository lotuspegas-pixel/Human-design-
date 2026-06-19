import { useState } from 'react';

interface Props {
  onAccept: () => void;
  onBack: () => void;
}

export default function ConsentScreen({ onAccept, onBack }: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-6 text-2xl font-bold text-stone-800">Voordat je begint</h2>

      <div className="mb-6 space-y-4 rounded-xl border border-stone-200 bg-white p-6 text-sm leading-relaxed text-stone-600 shadow-sm">
        <p>
          Je beantwoordt straks 48 korte stellingen over je voorkeuren, denkstijl en hoe je met
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

      <label className="mb-8 flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 bg-white p-4 transition hover:bg-stone-50">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-stone-300 text-amber-500 focus:ring-amber-500"
        />
        <span className="text-sm text-stone-700">
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
            agreed
              ? 'bg-stone-800 hover:bg-stone-700'
              : 'cursor-not-allowed bg-stone-300'
          }`}
        >
          Doorgaan
        </button>
      </div>
    </div>
  );
}
