// Decorative rising bubbles for the Bath-Time Arcade theme. Purely atmospheric,
// pointer-events: none, and disabled under prefers-reduced-motion (see index.css).
const BUBBLES = [
  { left: '6%', size: 14, delay: 0, dur: 15, op: 0.5 },
  { left: '14%', size: 8, delay: 3, dur: 12, op: 0.35 },
  { left: '23%', size: 20, delay: 6, dur: 18, op: 0.4 },
  { left: '38%', size: 10, delay: 1.5, dur: 14, op: 0.3 },
  { left: '52%', size: 16, delay: 4.5, dur: 16, op: 0.45 },
  { left: '63%', size: 9, delay: 8, dur: 13, op: 0.3 },
  { left: '74%', size: 22, delay: 2.5, dur: 19, op: 0.4 },
  { left: '83%', size: 12, delay: 6.5, dur: 15, op: 0.35 },
  { left: '92%', size: 7, delay: 0.5, dur: 11, op: 0.3 },
]

export function Bubbles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: '999px',
            background:
              'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.9), rgba(42,166,226,0.25) 60%, rgba(42,166,226,0.05))',
            border: '1px solid rgba(255,255,255,0.6)',
            opacity: b.op,
            animation: `bubble-rise ${b.dur}s linear ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
