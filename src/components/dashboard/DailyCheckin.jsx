import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getHour, getTodayKey } from '../../utils/dates';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../utils/constants';
import { useLang } from '../../contexts/LanguageContext';
import Trainer from '../characters/Trainer';

function getReminders(meals, waterCups, exercises, waterGoal, t) {
  const hour = getHour();
  const reminders = [];
  const cats = new Set(meals.map((m) => m.category));
  if (hour >= 6 && hour < 10 && !cats.has('breakfast')) reminders.push({ text: t.noBreakfast, link: '/meals' });
  if (hour >= 11 && hour < 14 && !cats.has('lunch')) reminders.push({ text: t.noLunch, link: '/meals' });
  if (hour >= 17 && hour < 21 && !cats.has('dinner')) reminders.push({ text: t.noDinner, link: '/meals' });
  if (hour >= 15 && waterCups < Math.floor(waterGoal / 2)) reminders.push({ text: t.waterReminder });
  if (hour >= 17 && exercises.length === 0) reminders.push({ text: t.noExerciseReminder, link: '/exercise' });
  return reminders.slice(0, 2);
}

export default function DailyCheckin({ meals, waterCups, exercises, waterGoal, onNavigate }) {
  const [dismissed, setDismissed] = useState(true);
  const { t } = useLang();

  useEffect(() => {
    const dismissKey = STORAGE_KEYS.CHECKIN_DISMISSED + getTodayKey();
    if (!storage.get(dismissKey, false)) {
      const timer = setTimeout(() => setDismissed(false), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const reminders = getReminders(meals, waterCups, exercises, waterGoal, t);

  if (dismissed || reminders.length === 0) return null;

  const handleDismiss = () => {
    setDismissed(true);
    storage.set(STORAGE_KEYS.CHECKIN_DISMISSED + getTodayKey(), true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 w-full max-w-lg animate-fade-in-up shadow-xl">
        <div className="flex justify-between items-start mb-3">
          <Trainer expression="encouraging" size={48} />
          <button onClick={handleDismiss} className="text-slate-400 p-1"><X size={20} /></button>
        </div>
        <div className="space-y-3">
          {reminders.map((r, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-700 rounded-xl p-3">
              <p className="text-sm text-slate-700 dark:text-slate-200">{r.text}</p>
              {r.link && <button onClick={() => { handleDismiss(); onNavigate?.(r.link); }} className="mt-2 text-xs font-medium text-primary">{t.goRecord}</button>}
            </div>
          ))}
        </div>
        <button onClick={handleDismiss} className="w-full mt-4 py-2.5 text-sm text-slate-400 dark:text-slate-500">{t.later}</button>
      </div>
    </div>
  );
}
