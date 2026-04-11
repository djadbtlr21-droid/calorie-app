import { useState } from 'react';
import { Camera, Edit3 } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import PhotoCapture from '../components/meals/PhotoCapture';
import FoodSearch from '../components/meals/FoodSearch';
import MealEntryForm from '../components/meals/MealEntryForm';
import MealLog from '../components/meals/MealLog';
import Trainer from '../components/characters/Trainer';
import { useProfile } from '../hooks/useProfile';
import { useDailyLog } from '../hooks/useDailyLog';
import { useLang } from '../contexts/LanguageContext';

export default function Meals() {
  const { profile } = useProfile();
  const { log, addMeal, removeMeal } = useDailyLog();
  const [mode, setMode] = useState('manual');
  const [selectedFood, setSelectedFood] = useState(null);
  const [geminiResult, setGeminiResult] = useState(null);
  const { t } = useLang();

  const handlePhotoResult = (result) => { setGeminiResult(result); if (result?.foods?.length > 0) setSelectedFood(result.foods[0]); };
  const handleSave = (meal) => { addMeal(meal); setSelectedFood(null); setGeminiResult(null); };

  return (
    <PageContainer>
      <div className="space-y-4">
        <PageHeader title={`${t.mealRecordTitle} 🍽️`} />
        <div className="flex bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
          <button onClick={() => { setMode('photo'); setSelectedFood(null); }} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === 'photo' ? 'bg-white dark:bg-slate-600 text-primary shadow-sm' : 'text-slate-400'}`}><Camera size={16} />{t.photoRecognition}</button>
          <button onClick={() => { setMode('manual'); setSelectedFood(null); }} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${mode === 'manual' ? 'bg-white dark:bg-slate-600 text-primary shadow-sm' : 'text-slate-400'}`}><Edit3 size={16} />{t.manualInput}</button>
        </div>
        {selectedFood ? (
          <MealEntryForm initialFood={selectedFood} onSave={handleSave} onCancel={() => setSelectedFood(null)} />
        ) : (
          <>
            {mode === 'photo' && <PhotoCapture apiKey={profile?.geminiApiKey?.trim()} onResult={handlePhotoResult} />}
            {mode === 'manual' && <FoodSearch onSelect={(f) => { setSelectedFood(f); setGeminiResult(null); }} />}
            {geminiResult?.dietComment && (
              <div className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <Trainer expression={geminiResult.dietScore >= 7 ? 'happy' : geminiResult.dietScore >= 4 ? 'encouraging' : 'disappointed'} size={40} />
                <p className={`text-sm font-medium flex-1 ${geminiResult.dietScore >= 7 ? 'text-green-600 dark:text-green-400' : geminiResult.dietScore >= 4 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-500 dark:text-red-400'}`}>
                  {geminiResult.dietComment}
                </p>
              </div>
            )}
            {geminiResult?.foods?.length > 1 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2"><Trainer expression="happy" size={32} /><p className="text-xs text-slate-500 dark:text-slate-400">{t.multiFoodFound}</p></div>
                {geminiResult.foods.map((food, i) => (
                  <button key={i} onClick={() => setSelectedFood(food)} className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-primary/30 text-left">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{food.name}</span><span className="text-sm font-bold text-primary">{food.calories}kcal</span>
                  </button>
                ))}
              </div>
            )}
            {mode === 'manual' && (
              <button onClick={() => setSelectedFood({ name: '', calories: '', protein: '', carbs: '', fat: '' })} className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-400 hover:border-primary hover:text-primary transition-colors">{t.customEntry}</button>
            )}
          </>
        )}
        <MealLog meals={log.meals} onRemove={removeMeal} />
      </div>
    </PageContainer>
  );
}
