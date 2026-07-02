export interface TimezoneOption {
  value: string;
  label: string;
}

const CURATED_FALLBACK: string[] = [
  'Europe/Amsterdam', 'Europe/Brussels', 'Europe/London', 'Europe/Berlin', 'Europe/Paris',
  'Europe/Madrid', 'Europe/Rome', 'Europe/Lisbon', 'Europe/Dublin', 'Europe/Vienna',
  'Europe/Warsaw', 'Europe/Athens', 'Europe/Istanbul', 'Europe/Moscow', 'Europe/Stockholm',
  'Europe/Oslo', 'Europe/Copenhagen', 'Europe/Helsinki', 'Europe/Bucharest', 'Europe/Zurich',
  'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Sao_Paulo', 'America/Mexico_City', 'America/Bogota', 'America/Toronto',
  'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Lagos', 'Africa/Casablanca', 'Africa/Nairobi',
  'Asia/Dubai', 'Asia/Kolkata', 'Asia/Bangkok', 'Asia/Jakarta', 'Asia/Shanghai',
  'Asia/Tokyo', 'Asia/Seoul', 'Asia/Hong_Kong', 'Asia/Singapore', 'Asia/Manila',
  'Australia/Sydney', 'Australia/Melbourne', 'Australia/Perth',
  'Pacific/Auckland', 'UTC',
];

function friendlyLabel(zone: string): string {
  const city = zone.split('/').pop()?.replace(/_/g, ' ') ?? zone;
  try {
    const formatter = new Intl.DateTimeFormat('nl-NL', {
      timeZone: zone,
      timeZoneName: 'shortOffset',
    });
    const parts = formatter.formatToParts(new Date());
    const offset = parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
    return `${city} (${offset})`;
  } catch {
    return city;
  }
}

export function getTimezoneOptions(): TimezoneOption[] {
  let zones: string[];
  try {
    const supported = (Intl as unknown as { supportedValuesOf?: (key: string) => string[] }).supportedValuesOf;
    zones = supported ? supported('timeZone') : CURATED_FALLBACK;
  } catch {
    zones = CURATED_FALLBACK;
  }

  return zones
    .map((zone) => ({ value: zone, label: friendlyLabel(zone) }))
    .sort((a, b) => a.label.localeCompare(b.label, 'nl'));
}

export function guessDefaultTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'Europe/Amsterdam';
  }
}
