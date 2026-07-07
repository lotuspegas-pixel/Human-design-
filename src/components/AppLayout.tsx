import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-parchment)]">
      <header className="border-b border-stone-200/60 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <h1 className="font-display text-xl font-medium tracking-tight text-[var(--color-ink)]">
            Arcana Profile
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
      <footer className="border-t border-stone-200/60 bg-white/40">
        <div className="mx-auto max-w-3xl px-4 py-6 text-center text-xs text-[var(--color-ink-soft)]">
          Arcana Profile — een zelfinzicht-instrument voor persoonlijke reflectie.
        </div>
      </footer>
    </div>
  );
}
