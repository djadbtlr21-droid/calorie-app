import { Flame } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';

export default function StreakCounter({ days }) {
  const { t } = useLang();
  return (
    <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-4 text-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Flame size={24} /></div>
        <div><p className="text-xs opacity-80">{t.consecutiveRecord}</p><p className="text-2xl font-bold">{days}{t.daysUnit}</p></div>
      </div>
      {days >= 7 && <p className="text-xs mt-2 opacity-80">{days >= 30 ? t.streak30 : days >= 14 ? t.streak14 : t.streak7}</p>}
    </div>
  );
}
