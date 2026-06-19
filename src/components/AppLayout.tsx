import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50/30">
      <header className="border-b border-stone-200/60 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <h1 className="text-xl font-semibold tracking-tight text-stone-800">
            Arcana Profile
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
      <footer className="border-t border-stone-200/60 bg-white/40">
        <div className="mx-auto max-w-3xl px-4 py-6 text-center text-xs text-stone-400">
          Arcana Profile — een zelfinzicht-instrument voor persoonlijke reflectie.
        </div>
      </footer>
    </div>
  );
}
