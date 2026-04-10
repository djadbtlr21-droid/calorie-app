const P = 4; // pixel size
const S = '#FDBCB4'; // skin
const H = '#4A3728'; // hair
const U = '#4A90D9'; // underwear
const W = '#3A78B8'; // waistband
const E = '#2D2D2D'; // eyes
const B = '#FF9999'; // blush
const M = '#E06070'; // mouth
const V = '#F0A8A0'; // belly

function R({ x, y, c }) {
  return <rect x={x * P} y={y * P} width={P} height={P} fill={c} />;
}

export default function Mascot({ size = 80, className = '' }) {
  return (
    <svg
      width={size}
      height={size * (100 / 80)}
      viewBox="0 0 80 100"
      className={className}
      style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated', flexShrink: 0 }}
    >
      {/* Hair row 0-1 */}
      {[6,7,8,9,10,11,12,13].map(x => <R key={`h0-${x}`} x={x} y={0} c={H} />)}
      {[5,6,7,8,9,10,11,12,13,14].map(x => <R key={`h1-${x}`} x={x} y={1} c={H} />)}
      {/* Hair spikes */}
      <R x={7} y={0} c={H} /><R x={8} y={0} c={H} />

      {/* Hair sides + face row 2 */}
      {[5,6].map(x => <R key={`hs2-${x}`} x={x} y={2} c={H} />)}
      {[7,8,9,10,11,12].map(x => <R key={`f2-${x}`} x={x} y={2} c={S} />)}
      {[13,14].map(x => <R key={`hs2b-${x}`} x={x} y={2} c={H} />)}

      {/* Face row 3 */}
      {[5,6,7,8,9,10,11,12,13,14].map(x => <R key={`f3-${x}`} x={x} y={3} c={S} />)}

      {/* Eyes row 4 */}
      <R x={5} y={4} c={S} /><R x={6} y={4} c={S} />
      <R x={7} y={4} c={E} /><R x={8} y={4} c={S} /><R x={9} y={4} c={S} />
      <R x={10} y={4} c={S} /><R x={11} y={4} c={S} />
      <R x={12} y={4} c={E} /><R x={13} y={4} c={S} /><R x={14} y={4} c={S} />

      {/* Cheeks + mouth row 5 */}
      <R x={5} y={5} c={B} /><R x={6} y={5} c={S} /><R x={7} y={5} c={S} />
      <R x={8} y={5} c={S} /><R x={9} y={5} c={M} /><R x={10} y={5} c={M} />
      <R x={11} y={5} c={S} /><R x={12} y={5} c={S} /><R x={13} y={5} c={S} />
      <R x={14} y={5} c={B} />

      {/* Chin row 6 */}
      {[7,8,9,10,11,12].map(x => <R key={`ch-${x}`} x={x} y={6} c={S} />)}

      {/* Neck row 7 */}
      <R x={9} y={7} c={S} /><R x={10} y={7} c={S} />

      {/* Shoulders row 8 */}
      {[4,5,6,7,8,9,10,11,12,13,14,15].map(x => <R key={`sh-${x}`} x={x} y={8} c={S} />)}

      {/* Arms + body row 9 */}
      <R x={3} y={9} c={S} />
      {[4,5,6,7,8,9,10,11,12,13,14,15].map(x => <R key={`b9-${x}`} x={x} y={9} c={S} />)}
      <R x={16} y={9} c={S} />

      {/* Wide belly row 10 */}
      <R x={3} y={10} c={S} />
      {[4,5,6,7,8].map(x => <R key={`b10a-${x}`} x={x} y={10} c={S} />)}
      <R x={9} y={10} c={V} /><R x={10} y={10} c={V} />
      {[11,12,13,14,15].map(x => <R key={`b10b-${x}`} x={x} y={10} c={S} />)}
      <R x={16} y={10} c={S} />

      {/* Belly row 11 */}
      {[4,5,6,7,8].map(x => <R key={`b11a-${x}`} x={x} y={11} c={S} />)}
      <R x={9} y={11} c={V} /><R x={10} y={11} c={V} />
      {[11,12,13,14,15].map(x => <R key={`b11b-${x}`} x={x} y={11} c={S} />)}

      {/* Lower belly row 12 */}
      {[5,6,7,8,9,10,11,12,13,14].map(x => <R key={`b12-${x}`} x={x} y={12} c={S} />)}

      {/* Underwear waistband row 13 */}
      {[5,6,7,8,9,10,11,12,13,14].map(x => <R key={`wb-${x}`} x={x} y={13} c={W} />)}

      {/* Underwear rows 14-16 */}
      {[5,6,7,8,9,10,11,12,13,14].map(x => <R key={`u14-${x}`} x={x} y={14} c={U} />)}
      {[5,6,7,8,9,10,11,12,13,14].map(x => <R key={`u15-${x}`} x={x} y={15} c={U} />)}
      {[5,6,7,8].map(x => <R key={`u16a-${x}`} x={x} y={16} c={U} />)}
      {[11,12,13,14].map(x => <R key={`u16b-${x}`} x={x} y={16} c={U} />)}

      {/* Legs rows 17-19 */}
      {[5,6,7,8].map(x => <R key={`l17a-${x}`} x={x} y={17} c={S} />)}
      {[11,12,13,14].map(x => <R key={`l17b-${x}`} x={x} y={17} c={S} />)}
      {[5,6,7].map(x => <R key={`l18a-${x}`} x={x} y={18} c={S} />)}
      {[12,13,14].map(x => <R key={`l18b-${x}`} x={x} y={18} c={S} />)}
      {[5,6,7].map(x => <R key={`l19a-${x}`} x={x} y={19} c={S} />)}
      {[12,13,14].map(x => <R key={`l19b-${x}`} x={x} y={19} c={S} />)}

      {/* Feet row 20 */}
      {[4,5,6,7,8].map(x => <R key={`f20a-${x}`} x={x} y={20} c={S} />)}
      {[11,12,13,14,15].map(x => <R key={`f20b-${x}`} x={x} y={20} c={S} />)}

      {/* Sweat drop */}
      <R x={15} y={3} c="#7EC8E3" />
      <R x={15} y={4} c="#7EC8E3" />
    </svg>
  );
}
