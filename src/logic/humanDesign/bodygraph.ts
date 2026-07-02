import { DateTime } from 'luxon';
import { calculateActivations, findDesignDate } from './astronomy';
import { findActiveChannels } from '../../data/humanDesign/channels';
import { getCenterForGate } from '../../data/humanDesign/centers';
import type { BirthData, CenterId, DefinedChannel, HDAuthority, HDDefinition, HDType, HumanDesignResult, PlanetActivation } from '../../types/humanDesign';

// Kanalen die het keelcentrum rechtstreeks verbinden met een motorcentrum.
const THROAT_MOTOR_CHANNELS: [number, number][] = [
  [20, 34], // Keel - Sacraal
  [21, 45], // Hart - Keel
  [12, 22], // Keel - Solar plexus
  [35, 36], // Keel - Solar plexus
];

function birthDataToUtc(birthData: BirthData): Date {
  const [year, month, day] = birthData.birthDate.split('-').map(Number);
  const [hour, minute] = birthData.birthTime.split(':').map(Number);
  const dt = DateTime.fromObject(
    { year, month, day, hour, minute },
    { zone: birthData.timeZone }
  );
  if (!dt.isValid) {
    throw new Error(`Ongeldige geboortedatum/tijd/tijdzone: ${dt.invalidReason}`);
  }
  return dt.toUTC().toJSDate();
}

function determineDefinedCenters(definedChannels: DefinedChannel[]): CenterId[] {
  const centersSet = new Set<CenterId>();
  for (const channel of definedChannels) {
    centersSet.add(channel.centers[0]);
    centersSet.add(channel.centers[1]);
  }
  return Array.from(centersSet);
}

function determineType(activeGates: Set<number>, definedCenters: CenterId[]): HDType {
  if (definedCenters.length === 0) return 'reflector';

  const sacralDefined = definedCenters.includes('sacral');
  const hasThroatMotorConnection = THROAT_MOTOR_CHANNELS.some(
    ([g1, g2]) => activeGates.has(g1) && activeGates.has(g2)
  );

  if (sacralDefined) {
    return hasThroatMotorConnection ? 'manifesting-generator' : 'generator';
  }
  if (hasThroatMotorConnection) {
    return 'manifestor';
  }
  return 'projector';
}

function determineAuthority(definedCenters: CenterId[], type: HDType): HDAuthority {
  if (type === 'reflector') return 'lunar';
  if (definedCenters.includes('solar-plexus')) return 'emotional';
  if (definedCenters.includes('sacral')) return 'sacral';
  if (definedCenters.includes('spleen')) return 'splenic';
  if (definedCenters.includes('heart')) return 'ego';
  if (definedCenters.includes('g-center')) return 'self-projected';
  return 'mental';
}

function determineDefinition(definedCenters: CenterId[], definedChannels: DefinedChannel[]): HDDefinition {
  if (definedCenters.length === 0) return 'geen';

  const parent = new Map<CenterId, CenterId>();
  for (const c of definedCenters) parent.set(c, c);

  function find(c: CenterId): CenterId {
    let root = c;
    while (parent.get(root) !== root) root = parent.get(root)!;
    return root;
  }
  function union(a: CenterId, b: CenterId) {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent.set(ra, rb);
  }

  for (const channel of definedChannels) {
    union(channel.centers[0], channel.centers[1]);
  }

  const roots = new Set(definedCenters.map((c) => find(c)));
  const count = roots.size;

  if (count === 1) return 'enkelvoudig';
  if (count === 2) return 'gesplitst';
  if (count === 3) return 'drievoudig-gesplitst';
  return 'viervoudig-gesplitst';
}

function getSunLine(activations: PlanetActivation[]): number {
  const sun = activations.find((a) => a.planet === 'sun');
  if (!sun) throw new Error('Geen zonpositie gevonden.');
  return sun.line;
}

export function calculateHumanDesign(birthData: BirthData): HumanDesignResult {
  const birthDateUtc = birthDataToUtc(birthData);
  const designDateUtc = findDesignDate(birthDateUtc);

  const personalityActivations = calculateActivations(birthDateUtc, 'personality');
  const designActivations = calculateActivations(designDateUtc, 'design');

  const allActivations = [...personalityActivations, ...designActivations];
  const activeGatesSet = new Set(allActivations.map((a) => a.gate));
  const activeGates = Array.from(activeGatesSet).sort((a, b) => a - b);

  const rawChannels = findActiveChannels(activeGatesSet);
  const definedChannels: DefinedChannel[] = rawChannels.map((c) => ({
    gates: c.gates,
    centers: c.centers,
  }));

  const definedCenters = determineDefinedCenters(definedChannels);
  const type = determineType(activeGatesSet, definedCenters);
  const authority = determineAuthority(definedCenters, type);
  const definition = determineDefinition(definedCenters, definedChannels);

  const personalitySunLine = getSunLine(personalityActivations);
  const designSunLine = getSunLine(designActivations);

  return {
    personalityActivations,
    designActivations,
    activeGates,
    definedChannels,
    definedCenters,
    type,
    authority,
    profile: [personalitySunLine, designSunLine],
    definition,
    designDateUtc: designDateUtc.toISOString(),
    birthDateUtc: birthDateUtc.toISOString(),
  };
}

export { getCenterForGate };
