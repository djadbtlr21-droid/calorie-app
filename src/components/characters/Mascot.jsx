export default function Mascot({ size = 80, className = '' }) {
  const h = size * 1.25;

  return (
    <svg width={size} height={h} viewBox="0 0 80 100" className={className} style={{ flexShrink: 0 }}>
      {/* Hair */}
      <ellipse cx="40" cy="16" rx="16" ry="10" fill="#4A2C2A"/>
      {/* Head */}
      <circle cx="40" cy="24" r="14" fill="#FDBCB4"/>
      {/* Hair top */}
      <path d="M26 20 Q30 10 36 8 Q40 7 44 8 Q50 10 54 20 Q50 14 44 12 Q40 11 36 12 Q30 14 26 20Z" fill="#4A2C2A"/>
      {/* Short messy hair spikes */}
      <path d="M32 10 Q34 6 36 10" fill="#4A2C2A"/>
      <path d="M38 8 Q40 4 42 8" fill="#4A2C2A"/>
      <path d="M44 9 Q46 5 48 10" fill="#4A2C2A"/>

      {/* Eyes */}
      <ellipse cx="34" cy="23" rx="2.5" ry="3" fill="#2D2D2D"/>
      <ellipse cx="46" cy="23" rx="2.5" ry="3" fill="#2D2D2D"/>
      <circle cx="35" cy="21.5" r="1" fill="white"/>
      <circle cx="47" cy="21.5" r="1" fill="white"/>

      {/* Eyebrows - slightly worried */}
      <path d="M30 18.5 Q33 17 37 19" stroke="#4A2C2A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M43 19 Q47 17 50 18.5" stroke="#4A2C2A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* Blush */}
      <ellipse cx="30" cy="27" rx="3.5" ry="1.8" fill="#FFAAAA" opacity="0.45"/>
      <ellipse cx="50" cy="27" rx="3.5" ry="1.8" fill="#FFAAAA" opacity="0.45"/>

      {/* Embarrassed smile */}
      <path d="M36 30 Q40 33 44 30" stroke="#D44" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* Neck */}
      <rect x="37" y="37" width="6" height="4" rx="1.5" fill="#FDBCB4"/>

      {/* Chubby body */}
      <ellipse cx="40" cy="56" rx="22" ry="18" fill="#FDBCB4"/>

      {/* Belly button */}
      <ellipse cx="40" cy="56" rx="1.5" ry="2.2" fill="#E8A090"/>

      {/* Belly curve line */}
      <path d="M28 50 Q32 42 40 42 Q48 42 52 50" stroke="#E8A090" strokeWidth="0.8" fill="none" opacity="0.5"/>

      {/* Arms */}
      <path d="M18 48 Q12 52 10 60 Q9 64 13 63 Q16 61 18 56" fill="#FDBCB4"/>
      <path d="M62 48 Q68 52 70 60 Q71 64 67 63 Q64 61 62 56" fill="#FDBCB4"/>

      {/* Blue underwear/boxers */}
      <path d="M22 66 Q26 60 40 60 Q54 60 58 66 L56 78 Q48 80 40 80 Q32 80 24 78 Z" fill="#4A90D9"/>
      {/* Waistband */}
      <path d="M22 66 Q26 63 40 63 Q54 63 58 66" stroke="#3A78B8" strokeWidth="2" fill="none"/>
      {/* Underwear center line */}
      <line x1="40" y1="68" x2="40" y2="80" stroke="#3A78B8" strokeWidth="0.8" opacity="0.4"/>

      {/* Legs */}
      <path d="M28 78 L26 92 Q30 94 34 92 L36 78" fill="#FDBCB4"/>
      <path d="M44 78 L42 92 Q46 94 50 92 L52 78" fill="#FDBCB4"/>

      {/* Feet */}
      <ellipse cx="30" cy="93" rx="6" ry="3" fill="#FDBCB4"/>
      <ellipse cx="48" cy="93" rx="6" ry="3" fill="#FDBCB4"/>
    </svg>
  );
}
