import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../utils/constants';
import { getDaysAgo } from '../../utils/dates';
import { useLang } from '../../contexts/LanguageContext';

export default function CalorieChart({ dailyGoal }) {
  const { t } = useLang();
  const DAYS = [t.sun, t.mon, t.tue, t.wed, t.thu, t.fri, t.sat];
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = getDaysAgo(i);
    const log = storage.get(`${STORAGE_KEYS.LOG_PREFIX}${date}`);
    const consumed = (log?.meals || []).reduce((s, m) => s + (m.calories || 0), 0);
    data.push({ day: DAYS[new Date(date).getDay()], calories: consumed, date: date.slice(5) });
  }
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">{t.weeklyCalories}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="#94A3B8" />
          <YAxis tick={{ fontSize: 10 }} stroke="#94A3B8" width={35} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} formatter={(v) => [`${v}kcal`, t.consumed]} labelFormatter={(_, p) => p?.[0]?.payload?.date || ''} />
          {dailyGoal && <ReferenceLine y={dailyGoal} stroke="#10B981" strokeDasharray="5 5" label={{ value: t.calorieGoal, fontSize: 10, fill: '#10B981' }} />}
          <Bar dataKey="calories" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
