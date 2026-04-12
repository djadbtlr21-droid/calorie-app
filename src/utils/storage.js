export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  keys() {
    const result = [];
    for (let i = 0; i < localStorage.length; i++) {
      result.push(localStorage.key(i));
    }
    return result;
  },
};

export function getTodayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function archiveDayToStats(dateKey) {
  try {
    const logRaw = localStorage.getItem(`log_${dateKey}`);
    if (!logRaw) return;
    const log = JSON.parse(logRaw);
    const history = JSON.parse(localStorage.getItem('statsHistory') || '[]');
    const exists = history.findIndex((h) => h.date === dateKey);
    const entry = {
      date: dateKey,
      meals: log.meals?.length || 0,
      exercises: log.exercises?.length || 0,
      caloriesConsumed: (log.meals || []).reduce((s, m) => s + (m.calories || 0), 0),
      caloriesBurned: (log.exercises || []).reduce((s, e) => s + (e.caloriesBurned || 0), 0),
      waterCups: log.waterCups || 0,
      weight: log.weight || null
    };
    if (exists >= 0) history[exists] = entry;
    else history.unshift(entry);
    if (history.length > 90) history.length = 90;
    localStorage.setItem('statsHistory', JSON.stringify(history));
  } catch {}
}

export function getStatsHistory() {
  try {
    return JSON.parse(localStorage.getItem('statsHistory') || '[]');
  } catch {
    return [];
  }
}

export function checkDailyReset() {
  const today = getTodayKey();
  const lastDate = localStorage.getItem('lastActiveDate');
  if (lastDate && lastDate !== today) {
    archiveDayToStats(lastDate);
  }
  localStorage.setItem('lastActiveDate', today);
}
