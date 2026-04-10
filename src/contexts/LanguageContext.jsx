import { createContext, useContext, useState, useCallback } from 'react';
import { T } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return JSON.parse(localStorage.getItem('appLanguage')) || 'ko'; }
    catch { return 'ko'; }
  });

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'ko' ? 'zh' : 'ko';
      localStorage.setItem('appLanguage', JSON.stringify(next));
      return next;
    });
  }, []);

  const t = T[lang] || T.ko;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
