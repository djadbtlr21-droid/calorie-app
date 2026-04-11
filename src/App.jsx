import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ProfileProvider, useProfile } from './hooks/useProfile';
import { LanguageProvider } from './contexts/LanguageContext';
import BottomNav from './components/layout/BottomNav';
import Onboarding from './routes/Onboarding';
import Home from './routes/Home';
import Meals from './routes/Meals';
import Exercise from './routes/Exercise';
import Stats from './routes/Stats';
import Profile from './routes/Profile';

function MainLayout() {
  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <main className="flex-1 overflow-y-auto overscroll-none">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

function AppGuard() {
  const { profile } = useProfile();
  if (!profile) return <Navigate to="/onboarding" replace />;
  return <MainLayout />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route element={<AppGuard />}>
        <Route path="/" element={<Home />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  useEffect(() => {
    const dark = JSON.parse(localStorage.getItem('darkMode') || 'false');
    document.documentElement.classList.toggle('dark', dark);

    // Migration: ensure waterGoal is set to 8
    try {
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        const profile = JSON.parse(saved);
        if (profile.waterGoal === 10 || profile.waterGoal === undefined) {
          profile.waterGoal = 8;
          localStorage.setItem('userProfile', JSON.stringify(profile));
        }
      }
    } catch {}
  }, []);

  return (
    <HashRouter>
      <LanguageProvider>
        <ProfileProvider>
          <AppRoutes />
        </ProfileProvider>
      </LanguageProvider>
    </HashRouter>
  );
}
