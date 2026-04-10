const P = 5; // pixel size

function R({ x, y, c }) {
  return <rect x={x * P} y={y * P} width={P} height={P} fill={c} />;
}

const PINK = '#FF69B4';
const HOT = '#FF1493';
const SKIN = '#FDBCB4';
const DARK = '#2D2D2D';
const WHITE = '#FFF';
const BLUSH = '#FF9999';
const SHOE = '#FF1493';

function Body() {
  return (
    <g>
      {/* Hair back */}
      {[5,6,7,8,9,10].map(x => <R key={`hb0-${x}`} x={x} y={0} c={HOT} />)}
      {[4,5,6,7,8,9,10,11].map(x => <R key={`hb1-${x}`} x={x} y={1} c={HOT} />)}
      {/* Ponytail */}
      <R x={11} y={2} c={HOT} /><R x={12} y={2} c={HOT} />
      <R x={12} y={3} c={HOT} /><R x={13} y={3} c={PINK} />
      <R x={13} y={4} c={PINK} />

      {/* Hair sides */}
      <R x={4} y={2} c={HOT} /><R x={5} y={2} c={HOT} />
      <R x={10} y={2} c={HOT} /><R x={11} y={2} c={HOT} />

      {/* Face */}
      {[6,7,8,9].map(x => <R key={`f2-${x}`} x={x} y={2} c={SKIN} />)}
      {[5,6,7,8,9,10].map(x => <R key={`f3-${x}`} x={x} y={3} c={SKIN} />)}
      {[5,6,7,8,9,10].map(x => <R key={`f4-${x}`} x={x} y={4} c={SKIN} />)}
      {[6,7,8,9].map(x => <R key={`f5-${x}`} x={x} y={5} c={SKIN} />)}

      {/* Neck */}
      <R x={7} y={6} c={SKIN} /><R x={8} y={6} c={SKIN} />

      {/* Pink tank top */}
      {[5,6,7,8,9,10].map(x => <R key={`t7-${x}`} x={x} y={7} c={PINK} />)}
      {[4,5,6,7,8,9,10,11].map(x => <R key={`t8-${x}`} x={x} y={8} c={PINK} />)}
      {[5,6,7,8,9,10].map(x => <R key={`t9-${x}`} x={x} y={9} c={PINK} />)}

      {/* Arms */}
      <R x={3} y={8} c={SKIN} /><R x={3} y={9} c={SKIN} />
      <R x={12} y={8} c={SKIN} /><R x={12} y={9} c={SKIN} />

      {/* Pink shorts */}
      {[6,7,8,9].map(x => <R key={`s10-${x}`} x={x} y={10} c={HOT} />)}
      {[6,7].map(x => <R key={`s11a-${x}`} x={x} y={11} c={HOT} />)}
      {[8,9].map(x => <R key={`s11b-${x}`} x={x} y={11} c={HOT} />)}

      {/* Legs */}
      <R x={6} y={12} c={SKIN} /><R x={7} y={12} c={SKIN} />
      <R x={8} y={12} c={SKIN} /><R x={9} y={12} c={SKIN} />

      {/* Shoes */}
      <R x={5} y={13} c={SHOE} /><R x={6} y={13} c={SHOE} /><R x={7} y={13} c={SHOE} />
      <R x={8} y={13} c={SHOE} /><R x={9} y={13} c={SHOE} /><R x={10} y={13} c={SHOE} />
    </g>
  );
}

function HappyFace() {
  return (
    <g>
      <R x={6} y={3} c={DARK} /><R x={9} y={3} c={DARK} />
      <R x={5} y={4} c={BLUSH} /><R x={10} y={4} c={BLUSH} />
      <R x={7} y={5} c="#E04060" /><R x={8} y={5} c="#E04060" />
    </g>
  );
}

function EncouragingFace() {
  return (
    <g>
      <R x={6} y={3} c={DARK} />
      {/* Wink */}
      <R x={9} y={4} c={DARK} />
      <R x={5} y={4} c={BLUSH} /><R x={10} y={4} c={BLUSH} />
      <R x={7} y={5} c="#E04060" /><R x={8} y={5} c="#E04060" />
    </g>
  );
}

function SternFace() {
  return (
    <g>
      {/* Angled brows */}
      <R x={5} y={2} c={HOT} /><R x={10} y={2} c={HOT} />
      <R x={6} y={3} c={DARK} /><R x={9} y={3} c={DARK} />
      <R x={7} y={5} c="#C03050" />
    </g>
  );
}

function DisappointedFace() {
  return (
    <g>
      <R x={6} y={3} c={DARK} /><R x={9} y={3} c={DARK} />
      <R x={6} y={5} c="#C03050" /><R x={7} y={5} c="#C03050" />
      <R x={8} y={5} c="#C03050" /><R x={9} y={5} c="#C03050" />
    </g>
  );
}

const faces = { happy: HappyFace, encouraging: EncouragingFace, stern: SternFace, disappointed: DisappointedFace };

export default function Trainer({ expression = 'happy', size = 64, className = '' }) {
  const Face = faces[expression] || HappyFace;
  const w = 16 * P;
  const h = 14 * P;

  return (
    <svg
      width={size}
      height={size * (14 / 16)}
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated', flexShrink: 0 }}
    >
      <Body />
      <Face />
    </svg>
  );
}
