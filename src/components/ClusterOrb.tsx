import { colorClusters } from '../data/colorClusters';

interface Props {
  size?: number;
  className?: string;
}

/**
 * Subtiele visual van de vier kleurclusters als kleine gloeiende orbs.
 * Premium en rustig; bruikbaar op landingpage en report cover. Decoratief.
 */
export default function ClusterOrb({ size = 12, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`} aria-hidden="true">
      {colorClusters.map((c) => (
        <span
          key={c.id}
          className="inline-block rounded-full"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at 35% 30%, #ffffffcc, ${c.color} 65%)`,
            boxShadow: `0 0 0 1px ${c.color}33, 0 2px 6px -1px ${c.color}66`,
          }}
        />
      ))}
    </div>
  );
}
