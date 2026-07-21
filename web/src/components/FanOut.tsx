import { useState } from 'react'
import { motion } from 'motion/react'
import type { Bundle, FanoutStep } from '../types'

const COLUMN_X = [12.5, 37.5, 62.5, 87.5]

const ROLE_LABEL: Record<string, string> = {
  pricing: 'Pricing',
  legal: 'Legal',
  technical: 'Technical Fit',
  competitive: 'Competitive',
}

function normalise(steps: FanoutStep[]) {
  const maxReplied = Math.max(...steps.map((s) => s.replied_ms), 1)
  return steps.map((s) => ({
    ...s,
    revealDelay: 0.35 + (s.spawned_ms / 1600) * 0.25,
    replyDelay: 1.0 + (s.replied_ms / maxReplied) * 1.6,
    seconds: Math.round(s.replied_ms / 1000),
  }))
}

export function FanOut({ bundle }: { bundle: Bundle }) {
  const [playKey, setPlayKey] = useState(0)
  const steps = normalise(bundle.fanout)

  return (
    <div key={playKey} className="relative">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="dd-h text-2xl">The swarm fans out</h2>
        <button
          type="button"
          className="dd-chip cursor-pointer hover:opacity-80"
          onClick={() => setPlayKey((k) => k + 1)}
        >
          ↻ Replay
        </button>
      </div>
      <p className="mb-5 max-w-2xl text-[0.95rem]" style={{ color: 'var(--ink-soft)' }}>
        A senior-partner <strong style={{ color: 'var(--ink)' }}>coordinator</strong> reads the RFP,
        then delegates to four specialists <strong style={{ color: 'var(--ink)' }}>in parallel</strong> —
        each in its own thread, each with its own skill — and synthesises the replies into one proposal.
      </p>

      {/* Coordinator */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="dd-card w-full max-w-md px-5 py-4 text-center"
          style={{ borderColor: 'var(--brand)' }}
        >
          <div className="dd-chip mx-auto mb-2" style={{ borderColor: 'var(--brand)', color: 'var(--brand-deep)' }}>
            coordinator
          </div>
          <div className="dd-h text-lg">Deal Desk Senior Partner</div>
          <div className="mt-0.5 font-mono text-xs" style={{ color: 'var(--ink-mute)' }}>
            claude-opus-4-8
          </div>
        </motion.div>
      </div>

      {/* Connectors */}
      <svg
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        className="h-16 w-full"
        aria-hidden="true"
      >
        {steps.map((s, i) => {
          const x = COLUMN_X[i]
          const d = `M50 0 C 50 42, ${x} 18, ${x} 60`
          return (
            <g key={`c-${i}`}>
              <motion.path
                d={d}
                fill="none"
                stroke="var(--border)"
                strokeWidth="0.7"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: s.revealDelay }}
              />
              {/* reply flows back (recolour) */}
              <motion.path
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.1"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 0.5, delay: s.replyDelay }}
              />
            </g>
          )
        })}
      </svg>

      {/* Specialist nodes */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {steps.map((s, i) => {
          const key = s.role as keyof Bundle['specialists']
          const spec = bundle.specialists[key]
          return (
            <motion.div
              key={`n-${i}`}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, delay: s.revealDelay }}
              className="dd-card relative overflow-hidden px-4 py-4"
            >
              <div className="flex items-center justify-between">
                <span className="dd-h text-[0.98rem]">{ROLE_LABEL[s.role] ?? s.agent}</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: s.replyDelay, type: 'spring', stiffness: 300 }}
                  className="grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                  aria-label="replied"
                >
                  ✓
                </motion.span>
              </div>
              <div className="mt-1 font-mono text-[0.66rem]" style={{ color: 'var(--ink-mute)' }}>
                {spec.model}
              </div>
              <p className="mt-2 text-[0.82rem] leading-snug" style={{ color: 'var(--ink-soft)' }}>
                {spec.headline}
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: s.replyDelay }}
                className="mt-3 font-mono text-[0.66rem]"
                style={{ color: 'var(--accent-deep)' }}
              >
                replied · {s.seconds}s
              </motion.div>
              {/* working shimmer until reply */}
              <motion.div
                className="absolute inset-x-0 bottom-0 h-0.5"
                style={{ background: 'var(--brand)' }}
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: s.replyDelay, times: [0, 0.8, 1], ease: 'easeInOut' }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
