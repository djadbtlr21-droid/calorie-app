import { useState, useCallback } from 'react';
import { storage } from '../utils/storage';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => storage.get(key, initialValue));

  const setStoredValue = useCallback((newValue) => {
    setValue((prev) => {
      const resolved = typeof newValue === 'function' ? newValue(prev) : newValue;
      storage.set(key, resolved);
      return resolved;
    });
  }, [key]);

  const removeValue = useCallback(() => {
    setValue(initialValue);
    storage.remove(key);
  }, [key, initialValue]);

  return [value, setStoredValue, removeValue];
}
