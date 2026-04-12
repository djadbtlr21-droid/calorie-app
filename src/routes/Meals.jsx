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
  const [selectedFoodIndex, setSelectedFoodIndex] = useState(null);
  const [geminiResult, setGeminiResult] = useState(null);
  const { t } = useLang();

  const handlePhotoResult = (result) => { setGeminiResult(result); };
  const handleSave = (meal) => {
    addMeal(meal);
    if (selectedFoodIndex !== null) {
      setGeminiResult(prev => {
        if (!prev?.foods) return null;
        const remaining = prev.foods.filter((_, i) => i !== selectedFoodIndex);
        return remaining.length > 0 ? { ...prev, foods: remaining } : null;
      });
    }
    setSelectedFood(null);
    setSelectedFoodIndex(null);
  };

  return (
    <PageContainer>
      <div className="space-y-4 fade">
        <PageHeader title={`${t.mealRecordTitle} 🍽️`} />

        <div className="tab-pills">
          <button onClick={() => { setMode('photo'); setSelectedFood(null); setSelectedFoodIndex(null); }}
            className={`pill ${mode === 'photo' ? 'pill-primary' : 'pill-secondary'}`}
            style={{ padding: '8px 18px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
            <Camera size={14} />{t.photoRecognition}
          </button>
          <button onClick={() => { setMode('manual'); setSelectedFood(null); setSelectedFoodIndex(null); }}
            className={`pill ${mode === 'manual' ? 'pill-primary' : 'pill-secondary'}`}
            style={{ padding: '8px 18px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
            <Edit3 size={14} />{t.manualInput}
          </button>
        </div>

        {selectedFood ? (
          <MealEntryForm initialFood={selectedFood} onSave={handleSave} onCancel={() => { setSelectedFood(null); setSelectedFoodIndex(null); }} />
        ) : (
          <>
            {mode === 'photo' && <PhotoCapture apiKey={profile?.geminiApiKey?.trim()} onResult={handlePhotoResult} />}
            {mode === 'manual' && <FoodSearch onSelect={(f) => { setSelectedFood(f); setSelectedFoodIndex(null); setGeminiResult(null); }} />}

            {geminiResult?.foods?.length >= 1 && (
              <div className="space-y-2">
                {geminiResult.dietComment && (
                  <div style={{
                    padding: '10px 14px', background: 'var(--bg-input)', borderRadius: 12,
                    borderLeft: `3px solid ${geminiResult.dietScore >= 7 ? 'var(--green)' : geminiResult.dietScore >= 4 ? 'var(--orange)' : 'var(--red)'}`,
                    display: 'flex', gap: 10, alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '1rem' }}>💬</span>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-2)', flex: 1 }}>{geminiResult.dietComment}</p>
                  </div>
                )}
                {geminiResult.foods.map((food, i) => (
                  <button key={i}
                    onClick={() => { setSelectedFood(food); setSelectedFoodIndex(i); }}
                    className="card" style={{
                      width: '100%', cursor: 'pointer', textAlign: 'left',
                      display: 'flex', alignItems: 'center', gap: 12, padding: 14
                    }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg-input)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🥗</div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{food.name}</span>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{food.calories}<span style={{ fontSize: '0.7rem', color: 'var(--text-3)' }}>kcal</span></span>
                  </button>
                ))}
              </div>
            )}

            {mode === 'manual' && (
              <button
                onClick={() => { setSelectedFood({ name: '', calories: '', protein: '', carbs: '', fat: '' }); setSelectedFoodIndex(null); }}
                style={{
                  width: '100%', padding: 16, border: '2px dashed var(--divider)',
                  borderRadius: 'var(--r)', background: 'var(--bg-card)',
                  fontSize: '0.85rem', color: 'var(--text-3)', cursor: 'pointer', transition: 'all 0.15s'
                }}>
                {t.customEntry}
              </button>
            )}
          </>
        )}
        <MealLog meals={log.meals} onRemove={removeMeal} />
      </div>
    </PageContainer>
  );
}
