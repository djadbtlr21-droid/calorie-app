import { useLang } from '../../contexts/LanguageContext';

export default function CalorieRing({ consumed, goal }) {
  const { t } = useLang();
  const size = 200;
  const r = 90;
  const circumference = 2 * Math.PI * r;
  const progress = Math.min(consumed / (goal || 1), 1);
  const offset = circumference * (1 - progress);
  const pct = Math.round(progress * 100);

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="100" cy="100" r={r}
          fill="none" stroke="var(--ring-track)" strokeWidth="20" />
        <circle cx="100" cy="100" r={r}
          fill="none" stroke="var(--red)" strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: '2.8rem',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: 'var(--text-1)'
        }}>
          {consumed}
        </span>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-3)', marginTop: 4, fontWeight: 500 }}>
          / {goal} kcal
        </span>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--red)', marginTop: 2 }}>
          {pct}%
        </span>
      </div>
    </div>
  );
}
