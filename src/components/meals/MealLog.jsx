import { Trash2 } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';

const ICONS = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍪' };

export default function MealLog({ meals, onRemove }) {
  const { t } = useLang();
  if (meals.length === 0) return <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm">{t.noMeals}</div>;
  const total = meals.reduce((s, m) => s + (m.calories || 0), 0);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t.todayMeals}</h3>
        <span className="text-xs font-bold text-primary">{total}kcal</span>
      </div>
      {meals.map((meal) => (
        <div key={meal.id} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <span className="text-lg">{ICONS[meal.category] || '🍽️'}</span>
            <div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{meal.name}</p><p className="text-xs text-slate-400">{t[meal.category] || meal.category}</p></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-primary">{meal.calories}kcal</span>
            <button onClick={() => onRemove(meal.id)} className="text-slate-300 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
