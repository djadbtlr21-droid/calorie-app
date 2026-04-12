import { useLang } from '../../contexts/LanguageContext';

const GOAL = 8;

export default function WaterTracker({ cups, onSetCups }) {
  const { t } = useLang();
  const handleTap = (i) => onSetCups(cups === i + 1 ? i : i + 1);

  return (
    <div className="card fade" style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>💧 {t.water}</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--blue)' }}>
          {cups}/{GOAL}잔 · {cups * 250}ml
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {Array.from({ length: GOAL }).map((_, i) => {
          const filled = i < cups;
          return (
            <button key={i} onClick={() => handleTap(i)} style={{
              width: '100%', aspectRatio: '1', borderRadius: '50%', border: 'none',
              background: filled ? 'var(--blue)' : 'var(--bg-input)',
              cursor: 'pointer', fontSize: '1rem',
              transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.2s',
              transform: filled ? 'scale(1.05)' : 'scale(1)',
              minHeight: 44
            }}>
              {filled ? '💧' : <span style={{ opacity: 0.4 }}>🫙</span>}
            </button>
          );
        })}
      </div>
      {cups >= GOAL && (
        <p className="animate-fade-in-up" style={{
          textAlign: 'center', fontSize: '0.75rem', color: 'var(--blue)',
          marginTop: 8, fontWeight: 600
        }}>
          {t.waterGoalReached?.replace('{goal}', GOAL).replace('{ml}', GOAL * 250) || '목표 달성! 🎉'}
        </p>
      )}
    </div>
  );
}
