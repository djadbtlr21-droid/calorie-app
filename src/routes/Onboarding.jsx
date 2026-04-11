import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { calculateBMR, calculateBMI, getBMICategory, calculateTDEE, getCaloriesForGoal } from '../services/nutrition';
import { useLang } from '../contexts/LanguageContext';
import Trainer from '../components/characters/Trainer';
import Mascot from '../components/characters/Mascot';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', gender: '', age: '', height: '', weight: '', goalWeight: '', activityLevel: '', activityMultiplier: 1.2 });
  const [goal, setGoal] = useState('diet');
  const { saveProfile } = useProfile();
  const navigate = useNavigate();
  const { t, lang, toggleLang } = useLang();
  const onChange = (u) => setData((p) => ({ ...p, ...u }));
  const handleComplete = (dailyCalorieGoal) => { saveProfile({ ...data, goal, dailyCalorieGoal }); navigate('/'); };

  const ACT = [
    { id: 'sedentary', label: t.actSedentary, m: 1.2 },
    { id: 'light', label: t.actLight, m: 1.375 },
    { id: 'moderate', label: t.actModerate, m: 1.55 },
    { id: 'active', label: t.actActive, m: 1.725 },
  ];

  const bmr = calculateBMR(data.gender, data.weight, data.height, data.age);
  const bmi = calculateBMI(data.weight, data.height);
  const bmiCat = getBMICategory(bmi);
  const tdee = calculateTDEE(bmr, data.activityMultiplier);

  return (
    <div className="min-h-dvh bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Language toggle */}
      <div className="absolute top-4 right-4">
        <button onClick={toggleLang} className="px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm">
          {lang === 'ko' ? '🇰🇷 한국어' : '🇨🇳 中文'}
        </button>
      </div>

      {step > 0 && step < 4 && (
        <div className="px-6 pt-6"><div className="flex gap-1.5">{[1,2,3].map((s) => <div key={s} className={`flex-1 h-1 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />)}</div></div>
      )}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {step === 0 && (
            <div className="flex flex-col items-center text-center animate-fade-in-up">
              <Mascot size={120} className="mb-6" />
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.appName}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">{t.appSubtitle}</p>
              <div className="flex items-end gap-3 mb-8 w-full max-w-xs">
                <Trainer expression="happy" size={56} />
                <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm p-3 shadow-sm border border-slate-100 dark:border-slate-700">
                  <p className="text-sm text-slate-700 dark:text-slate-200">{t.onboardingGreet}</p>
                </div>
              </div>
              <button onClick={() => setStep(1)} className="w-full max-w-xs py-3.5 bg-primary text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-1">{t.start} <ChevronRight size={18} /></button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5 animate-fade-in-up">
              <div className="flex items-end gap-3"><Trainer expression="happy" size={48} /><div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm p-3 shadow-sm border border-slate-100 dark:border-slate-700"><p className="text-sm text-slate-700 dark:text-slate-200">{t.askBasicInfo}</p></div></div>
              <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.name}</label><input type="text" value={data.name} onChange={(e) => onChange({ name: e.target.value })} placeholder={t.name} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" /></div>
              <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">{t.gender}</label><div className="grid grid-cols-2 gap-3">{[{ id: 'male', l: t.male }, { id: 'female', l: t.female }].map(({ id, l }) => <button key={id} onClick={() => onChange({ gender: id })} className={`py-3 rounded-xl text-sm font-medium transition-colors ${data.gender === id ? 'bg-primary text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>{l}</button>)}</div></div>
              <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.age}</label><input type="number" value={data.age} onChange={(e) => onChange({ age: Number(e.target.value) })} placeholder={t.age} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" /></div>
              <div className="flex gap-3"><button onClick={() => setStep(0)} className="py-3 px-4 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-xl"><ChevronLeft size={18} /></button><button onClick={() => setStep(2)} disabled={!data.name || !data.gender || !data.age} className="flex-1 py-3 bg-primary text-white rounded-xl font-medium text-sm disabled:opacity-40 flex items-center justify-center gap-1">{t.next} <ChevronRight size={18} /></button></div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fade-in-up">
              <div className="flex items-end gap-3"><Trainer expression="encouraging" size={48} /><div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm p-3 shadow-sm border border-slate-100 dark:border-slate-700"><p className="text-sm text-slate-700 dark:text-slate-200">{t.askBodyInfo}</p></div></div>
              <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.height}</label><input type="number" value={data.height} onChange={(e) => onChange({ height: Number(e.target.value) })} placeholder="170" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" /></div>
              <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.weight}</label><input type="number" value={data.weight} onChange={(e) => onChange({ weight: Number(e.target.value) })} placeholder="70" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" /></div>
              <div className="flex gap-3"><button onClick={() => setStep(1)} className="py-3 px-4 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-xl"><ChevronLeft size={18} /></button><button onClick={() => setStep(3)} disabled={!data.height || !data.weight} className="flex-1 py-3 bg-primary text-white rounded-xl font-medium text-sm disabled:opacity-40 flex items-center justify-center gap-1">{t.next} <ChevronRight size={18} /></button></div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-fade-in-up">
              <div className="flex items-end gap-3"><Trainer expression="encouraging" size={48} /><div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm p-3 shadow-sm border border-slate-100 dark:border-slate-700"><p className="text-sm text-slate-700 dark:text-slate-200">{t.askGoal}</p></div></div>
              <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{t.goalWeight}</label><input type="number" value={data.goalWeight} onChange={(e) => onChange({ goalWeight: Number(e.target.value) })} placeholder="65" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200" /></div>
              <div><label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">{t.activityLevel}</label><div className="space-y-2">{ACT.map(({ id, label, m }) => <button key={id} onClick={() => onChange({ activityLevel: id, activityMultiplier: m })} className={`w-full py-3 px-4 rounded-xl text-sm text-left transition-colors ${data.activityLevel === id ? 'bg-primary text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>{label}</button>)}</div></div>
              <div className="flex gap-3"><button onClick={() => setStep(2)} className="py-3 px-4 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-xl"><ChevronLeft size={18} /></button><button onClick={() => setStep(4)} disabled={!data.goalWeight || !data.activityLevel} className="flex-1 py-3 bg-primary text-white rounded-xl font-medium text-sm disabled:opacity-40 flex items-center justify-center gap-1">{t.seeResult} <ChevronRight size={18} /></button></div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-fade-in-up">
              <div className="flex items-end gap-3"><Trainer expression="happy" size={48} /><div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm p-3 shadow-sm border border-slate-100 dark:border-slate-700"><p className="text-sm text-slate-700 dark:text-slate-200">{t.resultGreet.replace('{name}', data.name)}</p></div></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-100 dark:border-slate-700"><p className="text-xs text-slate-400 mb-1">{t.bmi}</p><p className="text-2xl font-bold text-slate-700 dark:text-slate-200">{bmi}</p><p className={`text-xs font-medium mt-1 ${bmiCat.color}`}>{t[bmiCat.key] || bmiCat.label}</p></div>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-100 dark:border-slate-700"><p className="text-xs text-slate-400 mb-1">{t.bmr}</p><p className="text-2xl font-bold text-slate-700 dark:text-slate-200">{bmr}</p><p className="text-xs text-slate-400 mt-1">{t.bmrUnit}</p></div>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-5 text-white text-center"><p className="text-xs opacity-80 mb-1">{t.dailyRecommended}</p><p className="text-3xl font-bold">{getCaloriesForGoal(tdee, goal)}kcal</p><p className="text-xs opacity-80 mt-1">TDEE {tdee}kcal</p></div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">🎯 목표 선택</p>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => setGoal('diet')} className={`p-3 rounded-lg text-center text-xs transition-colors ${goal === 'diet' ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                    <div className="text-lg">🔥</div>
                    <div className="font-bold">{tdee - 500}</div>
                    <div>체중 감소</div>
                  </button>
                  <button onClick={() => setGoal('maintain')} className={`p-3 rounded-lg text-center text-xs transition-colors ${goal === 'maintain' ? 'bg-green-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                    <div className="text-lg">⚖️</div>
                    <div className="font-bold">{tdee}</div>
                    <div>체중 유지</div>
                  </button>
                  <button onClick={() => setGoal('bulk')} className={`p-3 rounded-lg text-center text-xs transition-colors ${goal === 'bulk' ? 'bg-orange-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                    <div className="text-lg">💪</div>
                    <div className="font-bold">{tdee + 300}</div>
                    <div>벌크업</div>
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between text-sm"><span className="text-slate-400">{t.currentWeight}</span><span className="font-medium text-slate-700 dark:text-slate-200">{data.weight}kg</span></div>
                <div className="flex justify-between text-sm mt-2"><span className="text-slate-400">{t.goalWeightLabel}</span><span className="font-medium text-primary">{data.goalWeight}kg</span></div>
                <div className="flex justify-between text-sm mt-2"><span className="text-slate-400">{t.weightToLose}</span><span className="font-medium text-orange-500">{Math.max(0, data.weight - data.goalWeight)}kg</span></div>
              </div>
              <button onClick={() => handleComplete(getCaloriesForGoal(tdee, goal))} className="w-full py-3.5 bg-primary text-white rounded-2xl font-semibold text-sm">{t.startNow}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
