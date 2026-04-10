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
