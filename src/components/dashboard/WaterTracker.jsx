import { Droplets } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';

const WATER_GOAL = 8;

export default function WaterTracker({ cups, onSetCups }) {
  const { t } = useLang();
  const handleTap = (index) => {
    onSetCups(cups === index + 1 ? index : index + 1);
  };

  return (
    <div className="card enter enter-4" style={{ padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>💧 {t.water}</span>
        <span className="font-display" style={{ fontSize: '0.85rem', color: 'var(--blue)', fontWeight: 700 }}>
          {cups}/{WATER_GOAL} <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 400 }}>(250ml)</span>
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 10
      }}>
        {Array.from({ length: WATER_GOAL }).map((_, i) => {
          const filled = i < cups;
          return (
            <button
              key={i}
              onClick={() => handleTap(i)}
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                background: filled
                  ? 'linear-gradient(135deg, var(--blue), #0EA5E9)'
                  : 'var(--blue-soft)',
                boxShadow: filled
                  ? '0 0 14px var(--blue-glow), 0 4px 8px rgba(0,0,0,0.1)'
                  : 'none',
                fontSize: '1.15rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                minHeight: 44
              }}
            >
              {filled ? '💧' : <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>○</span>}
            </button>
          );
        })}
      </div>

      {cups >= WATER_GOAL && (
        <p className="animate-fade-in-up" style={{
          textAlign: 'center', fontSize: '0.75rem',
          color: 'var(--blue)', marginTop: 10, fontWeight: 600
        }}>
          {t.waterGoalReached?.replace('{goal}', WATER_GOAL).replace('{ml}', WATER_GOAL * 250) || '목표 달성! 🎉'}
        </p>
      )}
    </div>
  );
}
