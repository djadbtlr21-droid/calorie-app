import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { logKey } from '../utils/constants';
import { getTodayKey } from '../utils/dates';

const emptyLog = (date) => ({
  date,
  meals: [],
  exercises: [],
  waterCups: 0,
  weight: null,
});

export function useDailyLog(date) {
  const dateKey = date || getTodayKey();
  const [log, setLog] = useLocalStorage(logKey(dateKey), emptyLog(dateKey));

  const addMeal = useCallback((meal) => {
    setLog((prev) => ({
      ...prev,
      meals: [...prev.meals, { ...meal, id: Date.now().toString(), time: new Date().toISOString() }],
    }));
  }, [setLog]);

  const removeMeal = useCallback((mealId) => {
    setLog((prev) => ({
      ...prev,
      meals: prev.meals.filter((m) => m.id !== mealId),
    }));
  }, [setLog]);

  const addExercise = useCallback((exercise) => {
    setLog((prev) => ({
      ...prev,
      exercises: [...prev.exercises, { ...exercise, id: Date.now().toString(), time: new Date().toISOString() }],
    }));
  }, [setLog]);

  const removeExercise = useCallback((exerciseId) => {
    setLog((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((e) => e.id !== exerciseId),
    }));
  }, [setLog]);

  const setWater = useCallback((cups) => {
    setLog((prev) => ({ ...prev, waterCups: cups }));
  }, [setLog]);

  const setWeight = useCallback((weight) => {
    setLog((prev) => ({ ...prev, weight }));
  }, [setLog]);

  const totalCaloriesConsumed = log.meals.reduce((sum, m) => sum + (m.calories || 0), 0);
  const totalCaloriesBurned = log.exercises.reduce((sum, e) => sum + (e.caloriesBurned || 0), 0);

  return {
    log,
    addMeal,
    removeMeal,
    addExercise,
    removeExercise,
    setWater,
    setWeight,
    totalCaloriesConsumed,
    totalCaloriesBurned,
  };
}
