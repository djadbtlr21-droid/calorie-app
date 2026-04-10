import { Trash2, Timer, Flame } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';

export default function ExerciseLog({ exercises, onRemove }) {
  const { t } = useLang();
  if (exercises.length === 0) return <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm">{t.noExercises}</div>;
  const total = exercises.reduce((s, e) => s + (e.caloriesBurned || 0), 0);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t.todayExercises}</h3>
        <span className="text-xs font-bold text-orange-500">-{total}kcal</span>
      </div>
      {exercises.map((exercise) => (
        <div key={exercise.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center"><Flame size={16} className="text-orange-500" /></div>
            <div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{exercise.name}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400"><Timer size={12} /><span>{exercise.duration}min</span></div></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-orange-500">-{exercise.caloriesBurned}kcal</span>
            <button onClick={() => onRemove(exercise.id)} className="text-slate-300 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
