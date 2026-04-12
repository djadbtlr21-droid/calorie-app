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
    <nav className="ap-bottom-nav safe-area-bottom">
      <div className="max-w-[430px] mx-auto flex h-full items-center">
        {tabs.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-1"
              style={{
                color: active ? 'var(--accent-purple)' : 'var(--text-muted)',
                transition: 'color 0.2s ease',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                minHeight: 44
              }}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span style={{ fontSize: '0.65rem', fontWeight: active ? 700 : 500 }}>{label}</span>
              {active && <div className="ap-nav-dot" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
