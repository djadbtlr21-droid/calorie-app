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
    <nav className="tab-bar safe-area-bottom">
      <div className="max-w-[430px] mx-auto flex h-full items-center w-full justify-around">
        {tabs.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`tab-item ${active ? 'active' : ''}`}
            >
              <span className="tab-icon"><Icon size={22} strokeWidth={active ? 2.5 : 1.8} /></span>
              <span className="tab-label">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
