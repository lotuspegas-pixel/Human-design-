# Arcana Profile

Een zelfreflectie-instrument voor persoonlijke denkstijlen, gevoelsstijlen en groeipad.

## Installatie

```bash
npm install
```

## Ontwikkelen

```bash
npm run dev
```

## Bouwen voor productie

```bash
npm run build
```

De statische bestanden worden gegenereerd in de `dist/` map.

## Hosten op Hostinger

1. Voer `npm run build` uit.
2. Upload de inhoud van de `dist/` map naar je Hostinger `public_html` map via File Manager of FTP.
3. De app draait direct als statische site — er is geen backend nodig.

## Hoe scoring werkt

- 48 vragen, 6 per archetype, op een 7-punts Likert-schaal.
- Sommige vragen zijn omgekeerd gescoord: `reversedScore = 8 - rawScore`.
- Per archetype wordt het gemiddelde berekend en omgezet naar een 0–100 score: `((gemiddelde - 1) / 6) * 100`.
- Kleurclusters zijn het gemiddelde van hun twee archetypes.
- Als de top-2 archetypes ≤ 5 punten verschil hebben: **blend profiel**.
- Als alle 4 kleurclusters ≤ 10 punten verschil hebben: **gebalanceerd profiel**.

## Vragen aanpassen

Bewerk `src/data/questions.ts`. Elk vraagobject bevat:

- `id` — uniek nummer
- `text` — de vraagtekst in het Nederlands
- `archetypeId` — koppeling aan een archetype
- `reverseScored` — `true` als de vraag omgekeerd gescoord moet worden
- `colorCluster` — het kleurcluster

## Rapporttekst aanpassen

Bewerk `src/logic/report.ts` voor de rapportsecties en `src/data/archetypes.ts` voor de beschrijvingen per archetype.

## Technische stack

- Vite + React + TypeScript
- Tailwind CSS
- Geen backend, geen login, localStorage voor opslag
