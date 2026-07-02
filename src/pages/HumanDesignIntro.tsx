import { useState } from 'react';

interface Props {
  onAccept: () => void;
  onSkip: () => void;
}

export default function HumanDesignIntro({ onAccept, onSkip }: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="mx-auto max-w-xl">
      <h2 className="mb-2 text-2xl font-bold text-stone-800">Verdiep je reading</h2>
      <p className="mb-6 text-stone-500">Een extra, optionele laag op basis van je geboortemoment</p>

      <div className="mb-6 space-y-4 rounded-xl border border-stone-200 bg-white p-6 text-sm leading-relaxed text-stone-600 shadow-sm">
        <p>
          Naast de vragenlijst kun je je reading verdiepen met <strong>Human Design</strong> — een
          systeem dat je geboortedatum, -tijd en -plaats combineert met astronomische berekeningen
          om een energetisch profiel te schetsen (je "type", "autoriteit" en "profiel").
        </p>
        <p>
          We berekenen dit met echte planeetposities op het moment van je geboorte. De uitkomst
          wordt samengevoegd met je Arcana-profiel tot één persoonlijke reading.
        </p>
        <p>
          <strong>Belangrijk om te weten:</strong> Human Design is niet wetenschappelijk
          onderbouwd. Het wordt door velen gebruikt als reflectie-instrument, niet als bewezen
          feit. Zie het als een extra perspectief, niet als een waarheid over jezelf. Het is geen
          medisch, psychologisch of therapeutisch advies, en geen vervanging daarvoor.
        </p>
        <p>
          Voor de berekening vragen we je voornaam, geboortedatum, geboortetijd en tijdzone. Deze
          gegevens worden alleen lokaal op je eigen apparaat opgeslagen en nergens naartoe
          verstuurd.
        </p>
      </div>

      <label className="mb-8 flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 bg-white p-4 transition hover:bg-stone-50">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-5 w-5 rounded border-stone-300 text-indigo-500 focus:ring-indigo-500"
        />
        <span className="text-sm text-stone-700">
          Ik begrijp dat dit een aanvullende, niet-wetenschappelijke laag is, bedoeld voor
          zelfreflectie.
        </span>
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onSkip}
          className="rounded-lg border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
        >
          Overslaan
        </button>
        <button
          onClick={onAccept}
          disabled={!agreed}
          className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white transition ${
            agreed ? 'bg-indigo-600 hover:bg-indigo-500' : 'cursor-not-allowed bg-stone-300'
          }`}
        >
          Doorgaan
        </button>
      </div>
    </div>
  );
}
