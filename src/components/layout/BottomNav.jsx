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
    <nav className="bottom-nav-glass safe-area-bottom">
      <div className="max-w-[430px] mx-auto flex h-full items-center">
        {tabs.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: active ? 'var(--purple)' : 'var(--text-muted)',
                transition: 'color 0.2s, transform 0.15s',
                minHeight: 44
              }}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span style={{ fontSize: '0.62rem', fontWeight: active ? 700 : 400 }}>{label}</span>
              {active && <div className="nav-glow-dot" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
