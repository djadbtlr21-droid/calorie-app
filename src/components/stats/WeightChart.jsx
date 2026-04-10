import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { storage } from '../../utils/storage';
import { STORAGE_KEYS } from '../../utils/constants';
import { getDaysAgo } from '../../utils/dates';
import { useLang } from '../../contexts/LanguageContext';

export default function WeightChart({ goalWeight }) {
  const { t } = useLang();
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = getDaysAgo(i);
    const log = storage.get(`${STORAGE_KEYS.LOG_PREFIX}${date}`);
    if (log?.weight) data.push({ date: date.slice(5), weight: log.weight });
  }
  if (data.length < 2) return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{t.weightChange}</h3>
      <p className="text-xs text-slate-400 text-center py-6">{t.weightNeedData}<br/>{t.weightRecordDaily}</p>
    </div>
  );
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">{t.weightChange}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94A3B8" />
          <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 10 }} stroke="#94A3B8" width={35} />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} formatter={(v) => [`${v}kg`, t.weightLabel]} />
          <Line type="monotone" dataKey="weight" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
