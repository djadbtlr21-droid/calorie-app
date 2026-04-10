export const STORAGE_KEYS = {
  PROFILE: 'userProfile',
  LOG_PREFIX: 'log_',
  ACHIEVEMENTS: 'achievements',
  DARK_MODE: 'darkMode',
  CHECKIN_DISMISSED: 'checkinDismissed_',
};

export const logKey = (date) => `${STORAGE_KEYS.LOG_PREFIX}${date}`;

export const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: '비활동적 (거의 운동 안 함)', multiplier: 1.2 },
  { id: 'light', label: '가벼운 활동 (주 1-3일)', multiplier: 1.375 },
  { id: 'moderate', label: '보통 활동 (주 3-5일)', multiplier: 1.55 },
  { id: 'active', label: '활발한 활동 (주 6-7일)', multiplier: 1.725 },
];

export const MEAL_CATEGORIES = [
  { id: 'breakfast', label: '아침', icon: '🌅' },
  { id: 'lunch', label: '점심', icon: '☀️' },
  { id: 'dinner', label: '저녁', icon: '🌙' },
  { id: 'snack', label: '간식', icon: '🍪' },
];

export const INTENSITY_LEVELS = [
  { id: 'low', label: '낮음', modifier: 0.8 },
  { id: 'normal', label: '보통', modifier: 1.0 },
  { id: 'high', label: '높음', modifier: 1.2 },
];

export const DEFAULT_WATER_GOAL = 8;
export const ML_PER_CUP = 200;
