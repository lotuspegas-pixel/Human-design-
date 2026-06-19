import type { ColorCluster } from '../types';

export const colorClusters: ColorCluster[] = [
  {
    id: 'amber',
    name: 'Amber',
    archetypes: ['idea-finder', 'people-helper'],
    meaning: 'Ideeën, mensen, beweging, mogelijkheid, inspiratie.',
    color: '#F59E0B',
    bgClass: 'bg-amber-100',
    textClass: 'text-amber-700',
    accentClass: 'bg-amber-500',
  },
  {
    id: 'indigo',
    name: 'Indigo',
    archetypes: ['pattern-seer', 'clear-thinker'],
    meaning: 'Inzicht, logica, diepte, strategie, reflectie.',
    color: '#6366F1',
    bgClass: 'bg-indigo-100',
    textClass: 'text-indigo-700',
    accentClass: 'bg-indigo-500',
  },
  {
    id: 'karmijn',
    name: 'Karmijn',
    archetypes: ['action-maker', 'plan-builder'],
    meaning: 'Actie, uitvoering, structuur, resultaat, richting.',
    color: '#DC2626',
    bgClass: 'bg-red-100',
    textClass: 'text-red-700',
    accentClass: 'bg-red-600',
  },
  {
    id: 'jade',
    name: 'Jade',
    archetypes: ['calm-keeper', 'heart-listener'],
    meaning: 'Rust, waarden, continuïteit, vertrouwen, authenticiteit.',
    color: '#10B981',
    bgClass: 'bg-emerald-100',
    textClass: 'text-emerald-700',
    accentClass: 'bg-emerald-500',
  },
];

export function getCluster(id: string): ColorCluster {
  const c = colorClusters.find((c) => c.id === id);
  if (!c) throw new Error(`Unknown cluster: ${id}`);
  return c;
}
