import type { ColorCluster } from '../types';

export const colorClusters: ColorCluster[] = [
  {
    id: 'amber',
    name: 'Amber',
    archetypes: ['idea-finder', 'people-helper'],
    meaning: 'Ideeën, mensen, beweging, mogelijkheid, inspiratie.',
    color: '#F59E0B',
  },
  {
    id: 'indigo',
    name: 'Indigo',
    archetypes: ['pattern-seer', 'clear-thinker'],
    meaning: 'Inzicht, logica, diepte, strategie, reflectie.',
    color: '#6366F1',
  },
  {
    id: 'karmijn',
    name: 'Karmijn',
    archetypes: ['action-maker', 'plan-builder'],
    meaning: 'Actie, uitvoering, structuur, resultaat, richting.',
    color: '#DC2626',
  },
  {
    id: 'jade',
    name: 'Jade',
    archetypes: ['calm-keeper', 'heart-listener'],
    meaning: 'Rust, waarden, continuïteit, vertrouwen, authenticiteit.',
    color: '#10B981',
  },
];

export function getCluster(id: string): ColorCluster {
  const c = colorClusters.find((c) => c.id === id);
  if (!c) throw new Error(`Unknown cluster: ${id}`);
  return c;
}
