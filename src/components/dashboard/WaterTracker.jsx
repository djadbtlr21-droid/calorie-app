import { Droplets } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';

const WATER_GOAL = 8;
const ML_PER_CUP = 200;

export default function WaterTracker({ cups, onSetCups }) {
  const { t } = useLang();
  const totalMl = cups * ML_PER_CUP;
  const goalMl = WATER_GOAL * ML_PER_CUP;

  const handleTap = (index) => {
    onSetCups(cups === index + 1 ? index : index + 1);
  };

  return (
    <div className="glass-card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Droplets size={18} color="var(--blue)" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{t.water}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="display-num" style={{ fontSize: '1.2rem', color: 'var(--blue)' }}>
            {cups}/{WATER_GOAL}
          </span>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginLeft: 4 }}>({totalMl}ml)</span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8
      }}>
        {Array.from({ length: WATER_GOAL }).map((_, i) => {
          const filled = i < cups;
          return (
            <button
              key={i}
              onClick={() => handleTap(i)}
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                border: filled ? 'none' : '2px solid rgba(79,195,247,0.25)',
                background: filled ? 'var(--blue)' : 'transparent',
                color: filled ? 'white' : 'rgba(79,195,247,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: filled ? '0 0 16px var(--blue-glow)' : 'none',
                margin: '0 auto',
                minHeight: 44
              }}
            >
              <Droplets size={18} />
            </button>
          );
        })}
      </div>

      <p style={{
        textAlign: 'center', fontSize: '0.6rem',
        color: 'var(--text-muted)', marginTop: 10
      }}>
        {t.waterUnit ? `${t.waterUnit} 250ml` : '매 잔 250ml'}
      </p>
      {cups >= WATER_GOAL && (
        <p className="animate-fade-in-up" style={{
          textAlign: 'center', fontSize: '0.75rem',
          color: 'var(--blue)', marginTop: 6, fontWeight: 600,
          textShadow: '0 0 12px var(--blue-glow)'
        }}>
          {t.waterGoalReached?.replace('{goal}', WATER_GOAL).replace('{ml}', goalMl) || '목표 달성! 🎉'}
        </p>
      )}
    </div>
  );
}
