import { useState } from 'react';
import { Search, Leaf } from 'lucide-react';
import { FOODS, FOOD_CATEGORIES, FOOD_CATEGORIES_ZH } from '../../data/foods';
import { useLang } from '../../contexts/LanguageContext';

export default function FoodSearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dietOnly, setDietOnly] = useState(false);
  const { t, lang } = useLang();

  const catList = lang === 'zh' ? FOOD_CATEGORIES_ZH : FOOD_CATEGORIES;
  const categories = [null, ...catList];

  const getFoodName = (f) => lang === 'zh' ? (f.nameZh || f.name) : f.name;
  const getFoodCategory = (f) => lang === 'zh' ? (f.categoryZh || f.category) : f.category;

  // When zh: only show foods that have nameZh (Chinese foods first, then any with nameZh)
  const baseFoods = lang === 'zh'
    ? FOODS.filter(f => f.nameZh || f.categoryZh)
    : FOODS;

  const filtered = baseFoods.filter((f) => {
    const name = getFoodName(f);
    const matchQ = !query || name.toLowerCase().includes(query.toLowerCase()) || f.name.toLowerCase().includes(query.toLowerCase());
    const matchC = !selectedCategory || getFoodCategory(f) === selectedCategory;
    const matchD = !dietOnly || f.diet;
    return matchQ && matchC && matchD;
  });

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder={t.searchFood} value={query} onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" />
      </div>
      <div className="flex gap-1.5 items-center">
        <button onClick={() => setDietOnly(!dietOnly)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition-colors ${dietOnly ? 'bg-green-500 text-white' : 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'}`}>
          <Leaf size={12} />{t.diet}
        </button>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button key={cat || '__all'} onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition-colors ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
            {cat || t.all}
          </button>
        ))}
      </div>
      <div className="space-y-1.5 max-h-64 overflow-y-auto">
        {filtered.map((food) => (
          <button key={food.id} onClick={() => onSelect({ ...food, name: getFoodName(food) })}
            className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-primary/50 transition-colors text-left">
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{getFoodName(food)}</p>
                {food.diet && <Leaf size={10} className="text-green-500" />}
              </div>
              <p className="text-xs text-slate-400">{food.serving}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{food.calories}kcal</p>
              <p className="text-[10px] text-slate-400">{t.carbsShort}{food.carbs} {t.proteinShort}{food.protein} {t.fatShort}{food.fat}</p>
            </div>
          </button>
        ))}
        {filtered.length === 0 && <p className="text-center text-sm text-slate-400 py-8">{t.noResults}</p>}
      </div>
    </div>
  );
}
