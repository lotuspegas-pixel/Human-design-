import type { ArchetypeId, ColorClusterId } from '../types';
import { getArchetype } from '../data/archetypes';
import { getCluster } from '../data/colorClusters';

/** Donkere, toegankelijke ink-variant per cluster voor tekst/labels. */
export const clusterInk: Record<ColorClusterId, string> = {
  amber: 'var(--color-amber-ink)',
  indigo: 'var(--color-indigo-ink)',
  karmijn: 'var(--color-karmijn-ink)',
  jade: 'var(--color-jade-ink)',
};

/** Accentkleur (glow/border/illustratie) per cluster. */
export function clusterAccent(id: ColorClusterId): string {
  return getCluster(id).color;
}

/** Cluster waartoe een archetype behoort. */
export function archetypeClusterId(id: ArchetypeId): ColorClusterId {
  return getArchetype(id).colorCluster;
}

/** Accentkleur van een archetype (via zijn cluster). */
export function archetypeAccent(id: ArchetypeId): string {
  return clusterAccent(archetypeClusterId(id));
}

/** Ink-kleur van een archetype (via zijn cluster). */
export function archetypeInk(id: ArchetypeId): string {
  return clusterInk[archetypeClusterId(id)];
}
