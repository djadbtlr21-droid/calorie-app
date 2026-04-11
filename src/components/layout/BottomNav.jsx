import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Utensils, Dumbbell, BarChart3, User } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLang();

  const tabs = [
    { path: '/', label: t.home, icon: Home },
    { path: '/meals', label: t.meals, icon: Utensils },
    { path: '/exercise', label: t.exercise, icon: Dumbbell },
    { path: '/stats', label: t.stats, icon: BarChart3 },
    { path: '/profile', label: t.profile, icon: User },
  ];

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-slate-700 safe-area-bottom">
      <div className="max-w-lg mx-auto flex">
        {tabs.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex-1 flex flex-col items-center py-2 pt-3 gap-0.5 transition-colors ${
                active ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
