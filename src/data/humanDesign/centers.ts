import type { CenterId } from '../../types/humanDesign';

export interface CenterInfo {
  id: CenterId;
  name: string;
  thema: string;
  gates: number[];
}

export const centers: CenterInfo[] = [
  {
    id: 'head',
    name: 'Krooncentrum',
    thema: 'Inspiratie, vragen en mentale druk om te begrijpen.',
    gates: [64, 61, 63],
  },
  {
    id: 'ajna',
    name: 'Ajna-centrum',
    thema: 'Denken, concepten vormen en betekenis geven.',
    gates: [47, 24, 4, 17, 43, 11],
  },
  {
    id: 'throat',
    name: 'Keelcentrum',
    thema: 'Uiting, communicatie en het omzetten van energie in actie of woord.',
    gates: [8, 12, 16, 20, 23, 31, 33, 35, 45, 56, 62],
  },
  {
    id: 'g-center',
    name: 'G-centrum',
    thema: 'Identiteit, richting en liefde voor wie je bent.',
    gates: [1, 13, 25, 46, 2, 15, 10, 7],
  },
  {
    id: 'heart',
    name: 'Hartcentrum',
    thema: 'Wilskracht, eigenwaarde en het nakomen van beloftes.',
    gates: [21, 40, 26, 51],
  },
  {
    id: 'spleen',
    name: 'Miltcentrum',
    thema: 'Intuïtie, welzijn en instinctief weten wat goed voor je is.',
    gates: [48, 57, 44, 50, 32, 28, 18],
  },
  {
    id: 'solar-plexus',
    name: 'Solar plexus',
    thema: 'Emotie, gevoelsgolven en de wijsheid van geduld.',
    gates: [6, 37, 22, 36, 30, 55, 49],
  },
  {
    id: 'sacral',
    name: 'Sacraal centrum',
    thema: 'Levenskracht, werkenergie en het lichaamsantwoord.',
    gates: [5, 14, 29, 59, 9, 3, 42, 27, 34],
  },
  {
    id: 'root',
    name: 'Wortelcentrum',
    thema: 'Druk, adrenaline en de aanjager achter beweging.',
    gates: [58, 38, 54, 53, 60, 52, 19, 39, 41],
  },
];

export function getCenterForGate(gate: number): CenterId {
  const center = centers.find((c) => c.gates.includes(gate));
  if (!center) throw new Error(`Geen centrum gevonden voor poort ${gate}`);
  return center.id;
}

export function getCenterInfo(id: CenterId): CenterInfo {
  const c = centers.find((c) => c.id === id);
  if (!c) throw new Error(`Onbekend centrum: ${id}`);
  return c;
}
