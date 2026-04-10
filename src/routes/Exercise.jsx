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
      <div className="space-y-4">
        <PageHeader title={`${t.exerciseRecordTitle} 🏃`} />
        {justAdded && (
          <div className="flex items-end gap-3 animate-fade-in-up">
            <Trainer expression="happy" size={48} />
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm p-3 shadow-sm border border-slate-100 dark:border-slate-700">
              <p className="text-sm text-slate-700 dark:text-slate-200">{t.exerciseDone.replace('{name}', justAdded.name).replace('{duration}', justAdded.duration).replace('{cal}', justAdded.caloriesBurned)}</p>
            </div>
          </div>
        )}
        {selectedExercise ? (
          <ExerciseEntryForm exercise={selectedExercise} weight={profile?.weight || 70} onSave={handleSave} onCancel={() => setSelectedExercise(null)} />
        ) : (
          <ExerciseSearch onSelect={setSelectedExercise} />
        )}
        <ExerciseLog exercises={log.exercises} onRemove={removeExercise} />
        {totalCaloriesBurned > 0 && (
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.totalBurned}</p>
            <p className="text-2xl font-bold text-orange-500">{totalCaloriesBurned}kcal</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
