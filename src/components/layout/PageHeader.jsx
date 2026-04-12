import { useLang } from '../../contexts/LanguageContext';

export default function PageHeader({ title }) {
  const { lang, toggleLang } = useLang();
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <h1 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-1)' }}>{title}</h1>
      <button onClick={toggleLang} className="pill pill-secondary pill-sm">
        {lang === 'ko' ? '🇰🇷 한' : '🇨🇳 中'}
      </button>
    </div>
  );
}
