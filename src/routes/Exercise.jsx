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
      <div className="space-y-4 animate-page-enter">
        <PageHeader title={`${t.exerciseRecordTitle} 🏃`} />

        {/* Today's burn header */}
        {totalCaloriesBurned > 0 && (
          <div className="ap-stat-card green" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px', borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'var(--accent-green)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Activity size={20} color="white" />
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.totalBurned}</span>
                <div className="ap-big-number" style={{ fontSize: '1.6rem', color: 'var(--accent-green)' }}>
                  -{totalCaloriesBurned}<span style={{ fontSize: '0.8rem', fontWeight: 500 }}>kcal</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {justAdded && (
          <div className="flex items-end gap-3 animate-fade-in-up">
            <Trainer expression="happy" size={48} />
            <div className="ap-card" style={{ flex: 1, padding: 14, borderRadius: 'var(--radius-md) var(--radius-md) var(--radius-md) 4px' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                {t.exerciseDone.replace('{name}', justAdded.name).replace('{duration}', justAdded.duration).replace('{cal}', justAdded.caloriesBurned)}
              </p>
            </div>
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
