import { useLang } from '../../contexts/LanguageContext';

export default function CalorieRing({ consumed, goal, burned, size = 240 }) {
  const { t } = useLang();
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const netGoal = goal + burned;
  const progress = Math.min(consumed / (netGoal || 1), 1);
  const offset = circumference - progress * circumference;
  const remaining = netGoal - consumed;
  const isOver = remaining < 0;

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      {/* Pulsing glow behind ring */}
      <div style={{
        position: 'absolute',
        width: size * 0.65, height: size * 0.65,
        borderRadius: '50%',
        background: isOver ? 'var(--orange-glow)' : 'var(--purple-glow)',
        filter: 'blur(40px)',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        animation: 'pulse 3s ease-in-out infinite',
        opacity: progress > 0 ? 0.6 : 0.15
      }} />

      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'relative', zIndex: 1 }}>
        <defs>
          <linearGradient id="ringGradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="ringGradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="var(--purple-soft)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={isOver ? 'url(#ringGradOrange)' : 'url(#ringGradPurple)'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter="url(#ringGlow)"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{
          fontSize: '0.62rem', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--text-muted)'
        }}>
          {t.consumed}
        </span>
        <span className="font-display" style={{
          fontSize: '3.2rem', fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.05
        }}>
          {consumed.toLocaleString()}
        </span>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          / {netGoal.toLocaleString()} kcal
        </span>
      </div>
    </div>
  );
}
