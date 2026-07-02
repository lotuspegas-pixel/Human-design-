export type CenterId =
  | 'head'
  | 'ajna'
  | 'throat'
  | 'g-center'
  | 'heart'
  | 'spleen'
  | 'sacral'
  | 'solar-plexus'
  | 'root';

export type PlanetId =
  | 'sun'
  | 'earth'
  | 'moon'
  | 'north-node'
  | 'south-node'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto';

export type ActivationSide = 'personality' | 'design';

export type HDType = 'generator' | 'manifesting-generator' | 'manifestor' | 'projector' | 'reflector';

export type HDAuthority =
  | 'emotional'
  | 'sacral'
  | 'splenic'
  | 'ego'
  | 'self-projected'
  | 'mental'
  | 'lunar';

export type HDDefinition = 'geen' | 'enkelvoudig' | 'gesplitst' | 'drievoudig-gesplitst' | 'viervoudig-gesplitst';

export interface BirthData {
  firstName: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  timeZone: string; // IANA zone name
  birthPlace: string; // free text, display only
}

export interface PlanetActivation {
  planet: PlanetId;
  longitude: number;
  gate: number;
  line: number;
  side: ActivationSide;
}

export interface DefinedChannel {
  gates: [number, number];
  centers: [CenterId, CenterId];
}

export interface HumanDesignResult {
  personalityActivations: PlanetActivation[];
  designActivations: PlanetActivation[];
  activeGates: number[];
  definedChannels: DefinedChannel[];
  definedCenters: CenterId[];
  type: HDType;
  authority: HDAuthority;
  profile: [number, number];
  definition: HDDefinition;
  designDateUtc: string;
  birthDateUtc: string;
}

export interface SavedBirthData {
  birthData: BirthData;
  hdResult: HumanDesignResult;
}
