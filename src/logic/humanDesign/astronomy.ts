import * as Astronomy from 'astronomy-engine';
import { longitudeToGate } from '../../data/humanDesign/gateWheel';
import type { ActivationSide, PlanetActivation, PlanetId } from '../../types/humanDesign';

// Gemiddelde maansknoop (Meeus, Astronomical Algorithms). Een veelgebruikte, goed gedocumenteerde
// benadering; het "ware" knooppunt kan tot circa 1.5° afwijken.
function meanNorthNodeLongitude(date: Date): number {
  const time = Astronomy.MakeTime(date);
  const T = time.tt / 36525;
  let node = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000;
  return ((node % 360) + 360) % 360;
}

function planetLongitude(body: Astronomy.Body, date: Date): number {
  const vector = Astronomy.GeoVector(body, date, true);
  const ecliptic = Astronomy.Ecliptic(vector);
  return ((ecliptic.elon % 360) + 360) % 360;
}

function sunLongitude(date: Date): number {
  return ((Astronomy.SunPosition(date).elon % 360) + 360) % 360;
}

function moonLongitude(date: Date): number {
  const ecl = Astronomy.EclipticGeoMoon(date);
  return ((ecl.lon % 360) + 360) % 360;
}

export function calculateActivations(date: Date, side: ActivationSide): PlanetActivation[] {
  const sun = sunLongitude(date);
  const earth = (sun + 180) % 360;
  const moon = moonLongitude(date);
  const northNode = meanNorthNodeLongitude(date);
  const southNode = (northNode + 180) % 360;
  const mercury = planetLongitude(Astronomy.Body.Mercury, date);
  const venus = planetLongitude(Astronomy.Body.Venus, date);
  const mars = planetLongitude(Astronomy.Body.Mars, date);
  const jupiter = planetLongitude(Astronomy.Body.Jupiter, date);
  const saturn = planetLongitude(Astronomy.Body.Saturn, date);
  const uranus = planetLongitude(Astronomy.Body.Uranus, date);
  const neptune = planetLongitude(Astronomy.Body.Neptune, date);
  const pluto = planetLongitude(Astronomy.Body.Pluto, date);

  const longitudes: [PlanetId, number][] = [
    ['sun', sun],
    ['earth', earth],
    ['moon', moon],
    ['north-node', northNode],
    ['south-node', southNode],
    ['mercury', mercury],
    ['venus', venus],
    ['mars', mars],
    ['jupiter', jupiter],
    ['saturn', saturn],
    ['uranus', uranus],
    ['neptune', neptune],
    ['pluto', pluto],
  ];

  return longitudes.map(([planet, longitude]) => {
    const { gate, line } = longitudeToGate(longitude);
    return { planet, longitude, gate, line, side };
  });
}

/** Zoekt het "Design"-moment: wanneer de zon precies 88° eerder stond dan op het geboortemoment. */
export function findDesignDate(birthDateUtc: Date): Date {
  const sunAtBirth = sunLongitude(birthDateUtc);
  let targetLon = sunAtBirth - 88;
  if (targetLon < 0) targetLon += 360;

  const searchStart = new Date(birthDateUtc.getTime() - 100 * 24 * 3600 * 1000);
  const result = Astronomy.SearchSunLongitude(targetLon, searchStart, 100);
  if (!result) {
    throw new Error('Kon het Design-moment niet berekenen.');
  }
  return result.date;
}
