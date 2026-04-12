import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import ExerciseSearch from '../components/exercise/ExerciseSearch';
import ExerciseEntryForm from '../components/exercise/ExerciseEntryForm';
import ExerciseLog from '../components/exercise/ExerciseLog';
import Trainer from '../components/characters/Trainer';
import { useProfile } from '../hooks/useProfile';
import { useDailyLog } from '../hooks/useDailyLog';
import { useLang } from '../contexts/LanguageContext';

export default function Exercise() {
  const { profile } = useProfile();
  const { log, addExercise, removeExercise, totalCaloriesBurned } = useDailyLog();
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [justAdded, setJustAdded] = useState(null);
  const { t } = useLang();

  const handleSave = (exercise) => {
    addExercise(exercise);
    setJustAdded(exercise);
    setSelectedExercise(null);
    setTimeout(() => setJustAdded(null), 3000);
  };

  return (
    <PageContainer>
      <div className="space-y-4 fade">
        <PageHeader title={`${t.exerciseRecordTitle} 🏃`} />

        {totalCaloriesBurned > 0 && (
          <div className="card fade" style={{ padding: '16px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{t.totalBurned}</p>
            <p className="num-hero" style={{ fontSize: '2.5rem', color: 'var(--red)' }}>-{totalCaloriesBurned}</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>kcal</p>
          </div>
        )}

        {justAdded && (
          <div className="animate-fade-in-up" style={{
            padding: '10px 14px', background: 'var(--bg-input)', borderRadius: 12,
            borderLeft: '3px solid var(--green)', display: 'flex', gap: 10, alignItems: 'center'
          }}>
            <span style={{ fontSize: '1rem' }}>💪</span>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-2)', flex: 1 }}>
              {t.exerciseDone.replace('{name}', justAdded.name).replace('{duration}', justAdded.duration).replace('{cal}', justAdded.caloriesBurned)}
            </p>
          </div>
        )}

        {selectedExercise ? (
          <ExerciseEntryForm exercise={selectedExercise} weight={profile?.weight || 70} onSave={handleSave} onCancel={() => setSelectedExercise(null)} />
        ) : (
          <ExerciseSearch onSelect={setSelectedExercise} />
        )}

        <ExerciseLog exercises={log.exercises} onRemove={removeExercise} />
      </div>
    </PageContainer>
  );
}
