import type { ArchetypeId, ColorClusterId } from '../types';
import type { HDAuthority, HDType } from '../types/humanDesign';
import type { Locale } from './types';
import { getArchetype } from '../data/archetypes';
import { getCluster } from '../data/colorClusters';
import { archetypesEn, CLUSTER_EN } from '../logic/report.en';
import { TYPE_EN, AUTHORITY_EN } from '../logic/humanDesign/mergedReport.en';
import { typeInfo, authorityInfo } from '../data/humanDesign/interpretations';

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Korte betekenis-regel van een archetype voor de resultaten-UI (NL eigen tekst, anders Engels). */
export function archetypeMeaning(locale: Locale, id: ArchetypeId): string {
  if (locale === 'nl') return getArchetype(id).meaning;
  return capitalize(archetypesEn[id].meaning);
}

/** Korte betekenis-regel van een kleurcluster voor de resultaten-UI. */
export function clusterMeaning(locale: Locale, id: ColorClusterId): string {
  if (locale === 'nl') return getCluster(id).meaning;
  return capitalize(CLUSTER_EN[id].meaning) + '.';
}

export function hdTypeName(locale: Locale, type: HDType): string {
  return locale === 'nl' ? typeInfo[type].naam : TYPE_EN[type].name;
}

export function hdTypeStrategy(locale: Locale, type: HDType): string {
  return locale === 'nl' ? typeInfo[type].strategie : capitalize(TYPE_EN[type].strategy);
}

export function hdAuthorityName(locale: Locale, authority: HDAuthority): string {
  return locale === 'nl' ? authorityInfo[authority].naam : AUTHORITY_EN[authority].name;
}
