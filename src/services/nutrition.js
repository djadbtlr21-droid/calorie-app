// Mifflin-St Jeor Formula (more accurate than Harris-Benedict)
export function calculateBMR(gender, weight, height, age) {
  if (gender === 'male') {
    return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  }
  return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
}

export const GOAL_OFFSETS = { diet: -500, maintain: 0, bulk: 300 };

export function calculateGoalCalories(tdee) {
  return {
    diet: tdee + GOAL_OFFSETS.diet,
    maintain: tdee + GOAL_OFFSETS.maintain,
    bulk: tdee + GOAL_OFFSETS.bulk,
  };
}

export function getCaloriesForGoal(tdee, goal) {
  return tdee + (GOAL_OFFSETS[goal] ?? 0);
}

export function calculateBMI(weight, heightCm) {
  const heightM = heightCm / 100;
  return Math.round((weight / (heightM * heightM)) * 10) / 10;
}

export function getBMICategory(bmi) {
  if (bmi < 18.5) return { key: 'bmiUnderweight', label: '저체중', color: 'text-blue-500' };
  if (bmi < 23) return { key: 'bmiNormal', label: '정상', color: 'text-green-500' };
  if (bmi < 25) return { key: 'bmiOverweight', label: '과체중', color: 'text-yellow-500' };
  if (bmi < 30) return { key: 'bmiObese', label: '비만', color: 'text-orange-500' };
  return { key: 'bmiSevereObese', label: '고도비만', color: 'text-red-500' };
}

export function calculateTDEE(bmr, activityMultiplier) {
  return Math.round(bmr * activityMultiplier);
}

export function calculateExerciseCalories(met, weightKg, durationMinutes, intensityModifier = 1.0) {
  const adjustedMet = met * intensityModifier;
  return Math.round(adjustedMet * weightKg * (durationMinutes / 60));
}
