import { useState } from 'react';
import { Activity } from 'lucide-react';
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
      <div className="space-y-4 anim-enter">
        <PageHeader title={`${t.exerciseRecordTitle} 🏃`} />

        {totalCaloriesBurned > 0 && (
          <div className="glass-card" style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '18px 20px',
            borderLeft: '3px solid var(--green)'
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'linear-gradient(135deg, var(--green), #2DB86A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px var(--green-glow)'
            }}>
              <Activity size={22} color="white" />
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.totalBurned}</span>
              <div className="display-num" style={{
                fontSize: '1.8rem', color: 'var(--green)',
                textShadow: '0 0 16px var(--green-glow)'
              }}>
                -{totalCaloriesBurned}<span style={{ fontSize: '0.75rem', fontWeight: 500 }}>kcal</span>
              </div>
            </div>
          </div>
        )}

        {justAdded && (
          <div className="glass-card animate-fade-in-up" style={{
            padding: '12px 16px',
            borderLeft: '3px solid var(--green)',
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <span style={{ fontSize: '1.2rem' }}>💪</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', flex: 1 }}>
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
