import type { ArchetypeScore } from '../types';
import { archetypes } from '../data/archetypes';
import { colorClusters } from '../data/colorClusters';

interface Props {
  scores: ArchetypeScore[];
  primaryColor: string;
}

const SIZE = 340;
const CENTER = SIZE / 2;
const RADIUS = 118;
const LABEL_RADIUS = RADIUS + 26;

// Vaste volgorde rond de cirkel zodat clusters naast elkaar liggen.
const AXIS_ORDER = [
  'idea-finder', 'people-helper', 'pattern-seer', 'clear-thinker',
  'action-maker', 'plan-builder', 'calm-keeper', 'heart-listener',
] as const;

const SHORT_LABELS: Record<string, string> = {
  'idea-finder': 'Idea Finder',
  'people-helper': 'People Helper',
  'pattern-seer': 'Pattern Seer',
  'clear-thinker': 'Clear Thinker',
  'action-maker': 'Action Maker',
  'plan-builder': 'Plan Builder',
  'calm-keeper': 'Calm Keeper',
  'heart-listener': 'Heart Listener',
};

function polar(angleIndex: number, radius: number): [number, number] {
  const angle = (Math.PI * 2 * angleIndex) / AXIS_ORDER.length - Math.PI / 2;
  return [CENTER + radius * Math.cos(angle), CENTER + radius * Math.sin(angle)];
}

export default function RadarChart({ scores, primaryColor }: Props) {
  const points = AXIS_ORDER.map((id, i) => {
    const s = scores.find((x) => x.archetypeId === id)!;
    const r = (Math.max(s.score100, 4) / 100) * RADIUS;
    return polar(i, r);
  });
  const polygon = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="mx-auto w-full max-w-sm"
      role="img"
      aria-label="Archetype radar"
    >
      {rings.map((f) => (
        <polygon
          key={f}
          points={AXIS_ORDER.map((_, i) => polar(i, RADIUS * f).map((v) => v.toFixed(1)).join(',')).join(' ')}
          fill="none"
          stroke="rgba(41,36,32,0.08)"
          strokeWidth={1}
        />
      ))}
      {AXIS_ORDER.map((_, i) => {
        const [x, y] = polar(i, RADIUS);
        return <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="rgba(41,36,32,0.08)" strokeWidth={1} />;
      })}

      <polygon points={polygon} fill={`${primaryColor}2a`} stroke={primaryColor} strokeWidth={2} strokeLinejoin="round" />

      {AXIS_ORDER.map((id, i) => {
        const s = scores.find((x) => x.archetypeId === id)!;
        const r = (Math.max(s.score100, 4) / 100) * RADIUS;
        const [x, y] = polar(i, r);
        const arch = archetypes.find((a) => a.id === id)!;
        const cluster = colorClusters.find((c) => c.id === arch.colorCluster)!;
        return <circle key={id} cx={x} cy={y} r={4} fill={cluster.color} stroke="white" strokeWidth={1.5} />;
      })}

      {AXIS_ORDER.map((id, i) => {
        const [x, y] = polar(i, LABEL_RADIUS);
        const anchor = Math.abs(x - CENTER) < 12 ? 'middle' : x > CENTER ? 'start' : 'end';
        return (
          <text
            key={id}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={10.5}
            fill="var(--color-ink-soft)"
            fontFamily="Inter, system-ui, sans-serif"
          >
            {SHORT_LABELS[id]}
          </text>
        );
      })}
    </svg>
  );
}
