import { useState } from 'react';
import { Save, Trash2, Moon, Sun, Key, Scale } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import { useProfile } from '../hooks/useProfile';
import { useDailyLog } from '../hooks/useDailyLog';
import { calculateBMI, getBMICategory, calculateBMR, calculateTDEE, getCaloriesForGoal } from '../services/nutrition';
import { useLang } from '../contexts/LanguageContext';
// Characters removed — using clean avatar instead

export default function Profile() {
  const { profile, updateProfile, resetProfile } = useProfile();
  const { log, setWeight } = useDailyLog();
  const { t } = useLang();
  const [editing, setEditing] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [form, setForm] = useState({ ...profile });
  const [todayWeight, setTodayWeight] = useState(log.weight || '');
  const [apiKeyInput, setApiKeyInput] = useState(profile?.geminiApiKey || '');
  const [apiKeyMessage, setApiKeyMessage] = useState(null);
  const [goalToast, setGoalToast] = useState(false);

  const bmr = profile ? (profile.bmr || calculateBMR(profile.gender, profile.weight, profile.height, profile.age)) : 0;
  const tdee = profile ? (profile.tdee || calculateTDEE(bmr, profile.activityMultiplier || 1.2)) : 0;
  const goal = profile?.goal || 'diet';

  const handleGoalChange = (newGoal) => {
    const newDailyGoal = getCaloriesForGoal(tdee, newGoal);
    updateProfile({ goal: newGoal, dailyCalorieGoal: newDailyGoal });
    setGoalToast(true);
    setTimeout(() => setGoalToast(false), 2000);
  };

  const handleSaveApiKey = () => {
    const trimmed = apiKeyInput.trim();
    if (!trimmed.startsWith('AIza') || trimmed.length !== 39) {
      setApiKeyMessage({
        text: `올바르지 않은 키입니다. (현재 ${trimmed.length}자, AIza로 시작해야 함)`,
        type: 'error'
      });
      return;
    }
    const storedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    storedProfile.geminiApiKey = trimmed;
    localStorage.setItem('userProfile', JSON.stringify(storedProfile));
    setApiKeyMessage({ text: 'API 키가 저장되었습니다! ✅', type: 'success' });
  };

  const toggleDarkMode = () => { const next = !darkMode; setDarkMode(next); document.documentElement.classList.toggle('dark', next); localStorage.setItem('darkMode', JSON.stringify(next)); };
  const handleSave = () => { updateProfile(form); setEditing(false); };
  const handleWeighIn = () => { if (todayWeight) { setWeight(Number(todayWeight)); updateProfile({ weight: Number(todayWeight) }); } };
  const handleReset = () => { localStorage.clear(); resetProfile(); window.location.reload(); };

  const bmi = profile ? calculateBMI(profile.weight, profile.height) : 0;
  const bmiCat = getBMICategory(bmi);

  const ACT_LEVELS = [
    { id: 'sedentary', label: t.actSedentary, multiplier: 1.2 },
    { id: 'light', label: t.actLight, multiplier: 1.375 },
    { id: 'moderate', label: t.actModerate, multiplier: 1.55 },
    { id: 'active', label: t.actActive, multiplier: 1.725 },
  ];

  return (
    <PageContainer>
      <div className="space-y-4">
        <PageHeader title={`${t.profileTitle} 👤`} />
        <div className="card" style={{ padding: 20, textAlign: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: '#007AFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '1.8rem', fontWeight: 700,
            margin: '0 auto 12px'
          }}>
            {profile?.name?.[0] || '👤'}
          </div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-1)' }}>{profile?.name}</h2>
          <p className="text-xs text-slate-400 mt-1">{profile?.height}cm · {profile?.weight}kg · {t.bmi} {bmi} ({t[bmiCat.key] || bmiCat.label})</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-2"><p className="text-xs text-slate-400">{t.dailyGoal}</p><p className="text-sm font-bold text-primary">{profile?.dailyCalorieGoal}kcal</p></div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-2"><p className="text-xs text-slate-400">{t.goalWeightShort}</p><p className="text-sm font-bold text-primary">{profile?.goalWeight}kg</p></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-3">📊 칼로리 계산 결과</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">기초 대사량 (BMR)</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{bmr} kcal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">활동 대사량 (TDEE)</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{tdee} kcal</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <button onClick={() => handleGoalChange('diet')} className={`p-3 rounded-lg text-center text-xs transition-colors ${goal === 'diet' ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
              <div className="text-lg">🔥</div>
              <div className="font-bold">{tdee - 500}</div>
              <div>체중 감소</div>
            </button>
            <button onClick={() => handleGoalChange('maintain')} className={`p-3 rounded-lg text-center text-xs transition-colors ${goal === 'maintain' ? 'bg-green-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
              <div className="text-lg">⚖️</div>
              <div className="font-bold">{tdee}</div>
              <div>체중 유지</div>
            </button>
            <button onClick={() => handleGoalChange('bulk')} className={`p-3 rounded-lg text-center text-xs transition-colors ${goal === 'bulk' ? 'bg-orange-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
              <div className="text-lg">💪</div>
              <div className="font-bold">{tdee + 300}</div>
              <div>벌크업</div>
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">선택한 목표에 따라 일일 칼로리 목표가 자동으로 변경됩니다</p>
        </div>
        {goalToast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-medium z-50 animate-fade-in-up">
            목표가 변경되었습니다! ✅
          </div>
        )}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3"><Scale size={16} className="text-primary" /><h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t.todayWeight}</h3></div>
          <div className="flex gap-2">
            <input type="number" value={todayWeight} onChange={(e) => setTodayWeight(e.target.value)} placeholder={`${profile?.weight || ''}kg`} step="0.1"
              className="flex-1 px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" />
            <button onClick={handleWeighIn} className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium">{t.record}</button>
          </div>
          {log.weight && <p className="text-xs text-slate-400 mt-2">{t.todayRecorded.replace('{w}', log.weight)}</p>}
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
          <button onClick={toggleDarkMode} className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">{darkMode ? <Moon size={18} className="text-indigo-400" /> : <Sun size={18} className="text-yellow-500" />}<span className="text-sm font-medium text-slate-700 dark:text-slate-200">{t.darkMode}</span></div>
            <div className={`w-11 h-6 rounded-full relative transition-colors ${darkMode ? 'bg-primary' : 'bg-slate-200'}`}><div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: darkMode ? 'translateX(22px)' : 'translateX(2px)' }} /></div>
          </button>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3"><Key size={16} className="text-primary" /><h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t.geminiKey}</h3></div>
          <div className="flex gap-2">
            <input type="password" value={apiKeyInput} onChange={(e) => {
                setApiKeyInput(e.target.value);
                setApiKeyMessage(null);
              }} placeholder={t.geminiKeyPlaceholder}
              className="flex-1 px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" />
            <button onClick={handleSaveApiKey} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
              {t.save}
            </button>
          </div>
          {apiKeyMessage && (
            <p className={`text-xs mt-1 ${apiKeyMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {apiKeyMessage.text}
            </p>
          )}
          <p className="text-[10px] text-slate-400 mt-2">{t.geminiKeyDesc}</p>
        </div>
        {editing ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t.editProfile}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-slate-400 mb-1 block">{t.heightLabel}</label><input type="number" value={form.height} onChange={(e) => setForm({ ...form, height: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-200" /></div>
              <div><label className="text-xs text-slate-400 mb-1 block">{t.ageLabel}</label><input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-200" /></div>
              <div><label className="text-xs text-slate-400 mb-1 block">{t.goalWeightEdit}</label><input type="number" value={form.goalWeight} onChange={(e) => setForm({ ...form, goalWeight: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-200" /></div>
              <div><label className="text-xs text-slate-400 mb-1 block">{t.dailyGoalEdit}</label><input type="number" value={form.dailyCalorieGoal} onChange={(e) => setForm({ ...form, dailyCalorieGoal: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-200" /></div>
              <div><label className="text-xs text-slate-400 mb-1 block">{t.waterGoalEdit}</label><input type="number" value={form.waterGoal} onChange={(e) => setForm({ ...form, waterGoal: Number(e.target.value) })} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm outline-none text-slate-700 dark:text-slate-200" /></div>
            </div>
            <div><label className="text-xs text-slate-400 mb-2 block">{t.activityLevel}</label>
              <div className="space-y-1.5">{ACT_LEVELS.map(({ id, label, multiplier }) => (
                <button key={id} onClick={() => setForm({ ...form, activityLevel: id, activityMultiplier: multiplier })} className={`w-full py-2.5 px-3 rounded-xl text-xs text-left transition-colors ${form.activityLevel === id ? 'bg-primary text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>{label}</button>
              ))}</div></div>
            <div className="flex gap-3">
              <button onClick={() => setEditing(false)} className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-xl text-sm font-medium">{t.cancel}</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-medium flex items-center justify-center gap-1"><Save size={14} />{t.save}</button>
            </div>
          </div>
        ) : (
          <button onClick={() => { setForm({ ...profile }); setEditing(true); }} className="w-full py-3 bg-white dark:bg-slate-800 rounded-2xl text-sm font-medium text-primary shadow-sm border border-slate-100 dark:border-slate-700">{t.editProfile}</button>
        )}
        <div className="pt-4">
          {showReset ? (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2"><span style={{ fontSize: '1.5rem' }}>⚠️</span><p className="text-sm text-red-600 dark:text-red-400">{t.confirmReset}</p></div>
              <div className="flex gap-3">
                <button onClick={() => setShowReset(false)} className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-xl text-sm font-medium">{t.no}</button>
                <button onClick={handleReset} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-1"><Trash2 size={14} />{t.delete}</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowReset(true)} className="w-full py-3 text-sm text-red-400 hover:text-red-500 transition-colors">{t.resetData}</button>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
