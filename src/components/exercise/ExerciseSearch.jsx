import { useState } from 'react';
import { Search } from 'lucide-react';
import { EXERCISES, EXERCISE_CATEGORIES, EXERCISE_CATEGORIES_ZH } from '../../data/exercises';
import { useLang } from '../../contexts/LanguageContext';

export default function ExerciseSearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t, lang } = useLang();

  const catList = lang === 'zh' ? EXERCISE_CATEGORIES_ZH : EXERCISE_CATEGORIES;
  const categories = [null, ...catList];

  const getExName = (e) => lang === 'zh' ? (e.nameZh || e.name) : e.name;
  const getExCat = (e) => lang === 'zh' ? (e.categoryZh || e.category) : e.category;

  const filtered = EXERCISES.filter((e) => {
    const name = getExName(e);
    const matchQ = !query || name.includes(query) || e.name.includes(query);
    const matchC = !selectedCategory || getExCat(e) === selectedCategory;
    return matchQ && matchC;
  });

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder={t.searchExercise} value={query} onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" />
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button key={cat || '__all'} onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition-colors ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
            {cat || t.all}
          </button>
        ))}
      </div>
      <div className="space-y-1.5 max-h-64 overflow-y-auto">
        {filtered.map((exercise) => (
          <button key={exercise.id} onClick={() => onSelect({ ...exercise, name: getExName(exercise) })}
            className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-primary/50 transition-colors text-left">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{getExName(exercise)}</p>
              <p className="text-xs text-slate-400">{getExCat(exercise)}</p>
            </div>
            <div className="text-xs text-slate-400">MET {exercise.met}</div>
          </button>
        ))}
        {filtered.length === 0 && <p className="text-center text-sm text-slate-400 py-8">{t.noResults}</p>}
      </div>
    </div>
  );
}
