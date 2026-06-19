interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-8 flex gap-2">
        {['#F59E0B', '#6366F1', '#DC2626', '#10B981'].map((c) => (
          <div key={c} className="h-3 w-3 rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      <h2 className="mb-3 text-4xl font-bold tracking-tight text-stone-800 sm:text-5xl">
        Arcana Profile
      </h2>
      <p className="mb-8 max-w-lg text-lg text-stone-500">
        Ontdek jouw persoonlijke denkstijl, gevoelsstijl en groeipad.
      </p>
      <button
        onClick={onStart}
        className="rounded-xl bg-stone-800 px-8 py-3.5 text-base font-medium text-white shadow-lg transition hover:bg-stone-700 hover:shadow-xl"
      >
        Start de vragenlijst
      </button>
      <p className="mt-8 max-w-md text-xs text-stone-400">
        Arcana Profile is een zelfreflectie-instrument gebaseerd op persoonlijke denkstijlen. Het is
        geen diagnose, geen selectiemiddel en geen vervanging voor professioneel advies. Gebruik het
        als spiegel voor je eigen ontwikkeling.
      </p>
    </div>
  );
}
