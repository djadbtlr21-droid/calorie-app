import { useLang } from '../../contexts/LanguageContext';

export default function Achievements({ achievements }) {
  const { t } = useLang();
  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t.achievements}</h3>
      <div className="grid grid-cols-2 gap-2">
        {unlocked.map((a) => (
          <div key={a.id} className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-primary/30 shadow-sm">
            <div className="text-2xl mb-1">{a.icon}</div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{a.title}</p>
            <p className="text-[10px] text-slate-400">{a.description}</p>
          </div>
        ))}
        {locked.map((a) => (
          <div key={a.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-200 dark:border-slate-700 opacity-50">
            <div className="text-2xl mb-1 grayscale">🔒</div>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">{a.title}</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-600">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
