import { useLang } from '../../contexts/LanguageContext';

export default function PageHeader({ title }) {
  const { lang, toggleLang } = useLang();

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 12, padding: '4px 0'
    }}>
      <h1 className="font-display" style={{
        fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.01em',
        color: 'var(--text-primary)'
      }}>{title}</h1>
      <button
        onClick={toggleLang}
        style={{
          padding: '5px 10px', borderRadius: 10,
          background: 'var(--bg-glass)', backdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600,
          cursor: 'pointer', transition: 'all 0.15s'
        }}
      >
        {lang === 'ko' ? '🇰🇷 한' : '🇨🇳 中'}
      </button>
    </div>
  );
}
