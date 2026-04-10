import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../contexts/LanguageContext';

const CATEGORY_ICONS = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍪' };
const CATEGORY_KEYS = { breakfast: 'breakfast', lunch: 'lunch', dinner: 'dinner', snack: 'snack' };

function MealDetailPopup({ category, meals, onClose, onRemove, t }) {
  const catMeals = meals.filter((m) => m.category === category);
  const totalCal = catMeals.reduce((s, m) => s + (m.calories || 0), 0);
  const label = t[CATEGORY_KEYS[category]] || category;
  const icon = CATEGORY_ICONS[category] || '🍽️';

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 w-full max-w-sm shadow-xl animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">{icon} {label} {t.mealRecord}</h3>
          <button onClick={onClose} className="text-slate-400 p-1"><X size={20} /></button>
        </div>
        {catMeals.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-6">{t.noFoodRecorded}</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {catMeals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{meal.name}</p>
                  <p className="text-[10px] text-slate-400">{t.carbsShort}{meal.carbs || 0}g {t.proteinShort}{meal.protein || 0}g {t.fatShort}{meal.fat || 0}g</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">{meal.calories}kcal</span>
                  <button onClick={() => onRemove?.(meal.id)} className="text-slate-300 hover:text-red-400 p-1"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <span className="text-xs text-slate-400">{t.totalCalories}</span>
          <span className="text-sm font-bold text-primary">{totalCal}kcal</span>
        </div>
        <button onClick={onClose} className="w-full mt-3 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl text-sm font-medium">{t.close}</button>
      </div>
    </div>
  );
}

export default function MealBadges({ meals, onRemoveMeal }) {
  const [sel, setSel] = useState(null);
  const navigate = useNavigate();
  const { t } = useLang();
  const logged = new Set(meals.map((m) => m.category));
  const cats = ['breakfast', 'lunch', 'dinner', 'snack'];

  return (
    <>
      <div className="flex gap-2">
        {cats.map((id) => {
          const has = logged.has(id);
          const cal = meals.filter((m) => m.category === id).reduce((s, m) => s + (m.calories || 0), 0);
          return (
            <button key={id} onClick={() => has ? setSel(id) : navigate('/meals')}
              className={`flex-1 rounded-xl p-2.5 text-center transition-all ${has ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30' : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}>
              <div className="text-lg">{CATEGORY_ICONS[id]}</div>
              <div className={`text-[10px] font-medium ${has ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>{t[id]}</div>
              {has && <div className="text-[10px] font-bold text-primary mt-0.5">{cal}kcal</div>}
            </button>
          );
        })}
      </div>
      {sel && <MealDetailPopup category={sel} meals={meals} onClose={() => setSel(null)} onRemove={onRemoveMeal} t={t} />}
    </>
  );
}
