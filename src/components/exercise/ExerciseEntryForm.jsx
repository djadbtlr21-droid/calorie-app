import { useState } from 'react';
import { Plus } from 'lucide-react';
import { calculateExerciseCalories } from '../../services/nutrition';
import { useLang } from '../../contexts/LanguageContext';
import Trainer from '../characters/Trainer';

const INTENSITIES = [
  { id: 'low', modifier: 0.8 },
  { id: 'normal', modifier: 1.0 },
  { id: 'high', modifier: 1.2 },
];
const INTENSITY_KEYS = { low: 'intensityLow', normal: 'intensityNormal', high: 'intensityHigh' };

export default function ExerciseEntryForm({ exercise, weight, onSave, onCancel }) {
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState('normal');
  const { t } = useLang();
  const modifier = INTENSITIES.find((l) => l.id === intensity)?.modifier || 1.0;
  const caloriesBurned = calculateExerciseCalories(exercise.met, weight, duration, modifier);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name: exercise.name, duration, intensity, met: exercise.met, caloriesBurned });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <Trainer expression="encouraging" size={40} />
        <p className="text-sm text-slate-700 dark:text-slate-200">{t.exerciseAsk.replace('{name}', exercise.name)}</p>
      </div>
      <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.duration}</label>
        <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value) || 0)} min="1" required
          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" /></div>
      <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">{t.intensity}</label>
        <div className="grid grid-cols-3 gap-2">
          {INTENSITIES.map(({ id }) => (
            <button key={id} type="button" onClick={() => setIntensity(id)}
              className={`py-2.5 rounded-xl text-sm font-medium transition-colors ${intensity === id ? 'bg-primary text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
              {t[INTENSITY_KEYS[id]]}
            </button>
          ))}
        </div></div>
      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">{t.estimatedBurn}</p>
        <p className="text-2xl font-bold text-orange-500 mt-1">{caloriesBurned}kcal</p>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onCancel} className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-medium">{t.cancel}</button>
        <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl text-sm font-medium flex items-center justify-center gap-1"><Plus size={16} />{t.add}</button>
      </div>
    </form>
  );
}
