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

- 64 vragen, 8 per archetype, op een 7-punts Likert-schaal, met 8 consistentieparen ter controle.
- Sommige vragen zijn omgekeerd gescoord: `reversedScore = 8 - rawScore`.
- Per archetype wordt het gemiddelde berekend en omgezet naar een 0–100 score: `((gemiddelde - 1) / 6) * 100`.
- Kleurclusters zijn het gemiddelde van hun twee archetypes.
- Als de top-2 archetypes ≤ 5 punten verschil hebben: **blend profiel**.
- Als alle 4 kleurclusters ≤ 10 punten verschil hebben: **gebalanceerd profiel**.

## Human Design-uitbreiding (optioneel)

Na het invullen van de vragenlijst kan de gebruiker expliciet kiezen voor een aanvullende,
duidelijk gelabelde laag op basis van Human Design (geboortedatum, -tijd en -plaats). Dit is
altijd opt-in, met een eigen uitleg- en toestemmingsscherm, en wordt nergens verplicht of
verborgen gepresenteerd.

- `src/logic/humanDesign/astronomy.ts` — berekent planeetposities via `astronomy-engine`
  (Personality = geboortemoment, Design = moment waarop de zon 88° eerder stond).
- `src/logic/humanDesign/bodygraph.ts` — leidt poorten, kanalen, centra, type, autoriteit,
  profiel en definitie af uit de planeetposities.
- `src/data/humanDesign/` — referentietabellen (poortenwiel, kanalen, centra) en Nederlandse,
  origineel geformuleerde interpretatieteksten.
- `src/logic/humanDesign/mergedReport.ts` — voegt het Arcana-profiel en het Human Design-resultaat
  samen tot één gepersonaliseerde reading (met voornaam).
- Tijdzone-conversie gebeurt met `luxon`, gebaseerd op de IANA-tijdzonedatabase van de browser
  (historisch correcte zomer-/wintertijd).

**Nauwkeurigheidskanttekening:** de maansknopen worden berekend met de gangbare "gemiddelde
knoop"-formule (Meeus), die tot circa 1,5° kan afwijken van de "ware knoop". Dit kan bij een
klein deel van de gebruikers een grenspoort net anders indelen dan bij een professionele
Human Design-berekening.

## Vragen aanpassen

Bewerk `src/data/questions.ts`. Elk vraagobject bevat:

- `id` — uniek nummer
- `text` — de vraagtekst in het Nederlands
- `archetypeId` — koppeling aan een archetype
- `reverseScored` — `true` als de vraag omgekeerd gescoord moet worden
- `colorCluster` — het kleurcluster

## Rapporttekst aanpassen

Bewerk `src/logic/report.ts` voor de rapportsecties en `src/data/archetypes.ts` voor de beschrijvingen per archetype.

## Meertaligheid

De app is beschikbaar in 10 talen (Engels als hoofdtaal, Nederlands als tweede,
plus Duits, Frans, Spaans, Italiaans, Portugees, Pools, Zweeds en Turks).

- `src/i18n/ui.ts` — alle interfaceteksten per taal
- `src/i18n/questionTexts.ts` — de 64 vragen per taal
- `src/logic/report.en.ts` + `src/logic/humanDesign/mergedReport.en.ts` — de volledig
  uitgeschreven Engelse reading (therapeut-/coachtoon)
- De volledig uitgeschreven reading bestaat in het Engels en Nederlands; de overige
  acht talen tonen de Engelse reading met een korte melding.
- Taalkeuze staat in de header en wordt onthouden in localStorage.

## Technische stack

- Vite + React + TypeScript
- Tailwind CSS v4 met een eigen `@theme`-tokensysteem (kleuren, schaduwen, fonts) in `src/index.css`
- Zelfgehoste premium typografie: Fraunces (display/serif) + Inter (body), via `@fontsource`
- Geen backend, geen login, localStorage voor opslag

## Ontwerpsysteem

- `.card-surface` / `.card-surface-lift` — de gedeelde premium kaartstijl (vervangt losse `rounded-xl border shadow-sm` recepten)
- `.font-display` — Fraunces voor koppen, cijfers en pull-quotes
- `--color-amber-cluster` / `--color-indigo-cluster` / `--color-karmijn-cluster` / `--color-jade-cluster` — de vier merkkleuren als CSS custom properties
- `--color-ink` / `--color-ink-soft` / `--color-parchment` — warme neutrale tekst- en achtergrondkleuren
- `.reveal` — rustige CSS-only entrance-animatie voor het resultatenscherm
