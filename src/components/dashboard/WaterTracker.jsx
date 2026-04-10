import { Droplets } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';

const WATER_GOAL = 8; // 8 cups = 1600ml, 200ml per cup
const ML_PER_CUP = 200;

export default function WaterTracker({ cups, onSetCups }) {
  const { t } = useLang();
  const totalMl = cups * ML_PER_CUP;
  const goalMl = WATER_GOAL * ML_PER_CUP;

  const handleTap = (index) => {
    onSetCups(cups === index + 1 ? index : index + 1);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Droplets size={18} className="text-blue-400" />
          <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{t.water}</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-blue-500">{cups}/{WATER_GOAL}{t.waterUnit}</span>
          <span className="text-[10px] text-slate-400 ml-1">({totalMl}ml / {goalMl}ml)</span>
        </div>
      </div>
      <div className="w-full h-2 bg-blue-50 dark:bg-slate-700 rounded-full mb-3 overflow-hidden">
        <div className="h-full bg-blue-400 rounded-full transition-all duration-500" style={{ width: `${Math.min((cups / WATER_GOAL) * 100, 100)}%` }} />
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {Array.from({ length: WATER_GOAL }).map((_, i) => (
          <button key={i} onClick={() => handleTap(i)}
            className={`aspect-square rounded-lg flex items-center justify-center transition-all duration-300 ${
              i < cups ? 'bg-blue-400 text-white scale-105' : 'bg-blue-50 dark:bg-slate-700 text-blue-300 dark:text-slate-500'
            }`}>
            <Droplets size={14} />
          </button>
        ))}
      </div>
      {cups >= WATER_GOAL && (
        <p className="text-center text-xs text-blue-500 mt-2 font-medium animate-fade-in-up">
          {t.waterGoalReached.replace('{goal}', WATER_GOAL).replace('{ml}', goalMl)}
        </p>
      )}
    </div>
  );
}
