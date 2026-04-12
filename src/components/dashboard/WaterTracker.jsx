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
    <div className="ap-card" style={{ padding: 16 }}>
      <div className="ap-section-header" style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'var(--accent-blue-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Droplets size={16} color="var(--accent-blue)" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{t.water}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="ap-big-number" style={{ fontSize: '1.2rem', color: 'var(--accent-blue)' }}>
            {cups}/{WATER_GOAL}
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 4 }}>
            ({totalMl}ml)
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
        {Array.from({ length: WATER_GOAL }).map((_, i) => {
          const filled = i < cups;
          return (
            <button
              key={i}
              onClick={() => handleTap(i)}
              style={{
                flex: 1,
                aspectRatio: '1',
                borderRadius: 10,
                border: filled ? 'none' : '2px solid var(--accent-blue-light)',
                background: filled ? 'var(--accent-blue)' : 'transparent',
                color: filled ? 'white' : 'var(--accent-blue-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                transform: filled ? 'scale(1.05)' : 'scale(1)',
                minHeight: 44
              }}
            >
              <Droplets size={14} />
            </button>
          );
        })}
      </div>
      <p style={{
        textAlign: 'center', fontSize: '0.65rem',
        color: 'var(--text-muted)', marginTop: 8
      }}>
        {t.waterUnit ? `${t.waterUnit} 250ml` : '매 잔 250ml'}
      </p>
      {cups >= WATER_GOAL && (
        <p className="animate-fade-in-up" style={{
          textAlign: 'center', fontSize: '0.75rem',
          color: 'var(--accent-blue)', marginTop: 6, fontWeight: 600
        }}>
          {t.waterGoalReached?.replace('{goal}', WATER_GOAL).replace('{ml}', goalMl) || '목표 달성! 🎉'}
        </p>
      )}
    </div>
  );
}
