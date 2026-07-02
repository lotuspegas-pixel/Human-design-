// Volgorde van de 64 poorten rond de dierenriem, beginnend bij 302° (2° Waterman), elk 5.625° breed.
export const GATE_WHEEL_START_DEGREE = 302;
export const GATE_WIDTH = 360 / 64; // 5.625

export const GATE_WHEEL_ORDER: number[] = [
  41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3,
  27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
  31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50,
  28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60,
];

export interface GateLongitude {
  gate: number;
  line: number;
}

/** Bepaalt poort en lijn op basis van een geocentrische eclipticale lengtegraad (0-360). */
export function longitudeToGate(longitude: number): GateLongitude {
  const normalized = ((longitude % 360) + 360) % 360;
  const offsetFromStart = ((normalized - GATE_WHEEL_START_DEGREE) % 360 + 360) % 360;
  const wheelIndex = Math.floor(offsetFromStart / GATE_WIDTH);
  const gate = GATE_WHEEL_ORDER[wheelIndex];
  const offsetInGate = offsetFromStart - wheelIndex * GATE_WIDTH;
  const lineWidth = GATE_WIDTH / 6;
  const line = Math.min(6, Math.floor(offsetInGate / lineWidth) + 1);
  return { gate, line };
}
