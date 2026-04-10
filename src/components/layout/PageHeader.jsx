import { useLang } from '../../contexts/LanguageContext';

export default function PageHeader({ title }) {
  const { lang, toggleLang } = useLang();

  return (
    <div className="flex items-center justify-between mb-3">
      <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">{title}</h1>
      <button
        onClick={toggleLang}
        className="px-2 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-medium"
      >
        {lang === 'ko' ? '🇰🇷 한' : '🇨🇳 中'}
      </button>
    </div>
  );
}
