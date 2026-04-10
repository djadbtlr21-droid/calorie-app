import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import Trainer from '../characters/Trainer';

const CATS = ['breakfast', 'lunch', 'dinner', 'snack'];
const ICONS = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍪' };

export default function MealEntryForm({ initialFood, onSave, onCancel }) {
  const { t } = useLang();
  const [name, setName] = useState(initialFood?.name || '');
  const [calories, setCalories] = useState(initialFood?.calories || '');
  const [protein, setProtein] = useState(initialFood?.protein || '');
  const [carbs, setCarbs] = useState(initialFood?.carbs || '');
  const [fat, setFat] = useState(initialFood?.fat || '');
  const [category, setCategory] = useState('lunch');
  const [portion, setPortion] = useState(1);
  const cal = Math.round(Number(calories || 0) * portion);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !calories) return;
    onSave({ name, calories: Math.round(Number(calories) * portion), protein: Math.round(Number(protein || 0) * portion), carbs: Math.round(Number(carbs || 0) * portion), fat: Math.round(Number(fat || 0) * portion), category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up">
      {initialFood && (
        <div className="flex items-center gap-3 mb-2">
          <Trainer expression="happy" size={40} />
          <p className="text-sm text-slate-700 dark:text-slate-200">{t.foodRecognized.replace('{name}', initialFood.name).replace('{cal}', initialFood.calories)}</p>
        </div>
      )}
      <div>
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.foodName}</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t.foodName} required className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.calories}</label>
          <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" /></div>
        <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.portion}</label>
          <input type="number" value={portion} onChange={(e) => setPortion(Number(e.target.value) || 1)} min="0.1" step="0.1" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.carbs}</label>
          <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" /></div>
        <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.protein}</label>
          <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" /></div>
        <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.fat}</label>
          <input type="number" value={fat} onChange={(e) => setFat(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" /></div>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">{t.mealType}</label>
        <div className="grid grid-cols-4 gap-2">
          {CATS.map((id) => (
            <button key={id} type="button" onClick={() => setCategory(id)}
              className={`py-2 rounded-xl text-xs font-medium transition-colors ${category === id ? 'bg-primary text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
              {ICONS[id]} {t[id]}
            </button>
          ))}
        </div>
      </div>
      {cal > 0 && <div className="text-center text-sm text-slate-500 dark:text-slate-400">{t.totalCalories} <span className="font-bold text-primary">{cal}kcal</span></div>}
      <div className="flex gap-3">
        <button type="button" onClick={onCancel} className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-medium">{t.cancel}</button>
        <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl text-sm font-medium flex items-center justify-center gap-1"><Plus size={16} />{t.add}</button>
      </div>
    </form>
  );
}
