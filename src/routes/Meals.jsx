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
      <div className="space-y-4 anim-enter">
        <PageHeader title={`${t.mealRecordTitle} 🍽️`} />

        <div className="glass-tabs">
          <button
            onClick={() => { setMode('photo'); setSelectedFood(null); setSelectedFoodIndex(null); }}
            className={`glass-tab ${mode === 'photo' ? 'active' : ''}`}
          >
            <Camera size={16} />{t.photoRecognition}
          </button>
          <button
            onClick={() => { setMode('manual'); setSelectedFood(null); setSelectedFoodIndex(null); }}
            className={`glass-tab ${mode === 'manual' ? 'active' : ''}`}
          >
            <Edit3 size={16} />{t.manualInput}
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
                <div className="glass-card" style={{
                  padding: '12px 16px',
                  borderLeft: `3px solid ${geminiResult.dietScore >= 7 ? 'var(--green)' : geminiResult.dietScore >= 4 ? 'var(--orange)' : 'var(--color-danger)'}`,
                  display: 'flex', alignItems: 'center', gap: 10
                }}>
                  <span style={{ fontSize: '1.2rem' }}>💬</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', flex: 1 }}>
                    {geminiResult.dietComment || t.multiFoodFound}
                  </p>
                </div>
                {geminiResult.foods.map((food, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedFood(food); setSelectedFoodIndex(i); }}
                    className="food-card-glass"
                    style={{ width: '100%', cursor: 'pointer', textAlign: 'left' }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: 'rgba(155,109,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.1rem', flexShrink: 0
                    }}>🍽️</div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{food.name}</span>
                    </div>
                    <span className="glow-pill" style={{
                      background: 'linear-gradient(135deg, var(--purple), #7B4FE0)',
                      color: 'white'
                    }}>
                      {food.calories}kcal
                    </span>
                  </button>
                ))}
              </div>
            )}

            {mode === 'manual' && (
              <button
                onClick={() => { setSelectedFood({ name: '', calories: '', protein: '', carbs: '', fat: '' }); setSelectedFoodIndex(null); }}
                style={{
                  width: '100%', padding: 14,
                  border: '2px dashed rgba(155,109,255,0.3)',
                  borderRadius: 'var(--r-md)',
                  background: 'radial-gradient(ellipse at center, rgba(155,109,255,0.06), transparent)',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
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
