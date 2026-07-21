import { motion } from 'motion/react'
import type { EvalCriterion, Requirement, ReqStatus } from '../types'

const STATUS_META: Record<ReqStatus, { icon: string; label: string; color: string }> = {
  met: { icon: '✓', label: 'Met', color: 'var(--accent)' },
  partial: { icon: '≈', label: 'Partial', color: 'var(--brand-deep)' },
  gap: { icon: '✕', label: 'Gap', color: 'var(--pop)' },
}

export function RequirementsMatrix({
  requirements,
  evaluation,
}: {
  requirements: Requirement[]
  evaluation: EvalCriterion[]
}) {
  const categories = [...new Set(requirements.map((r) => r.category))]
  const counts = requirements.reduce<Record<ReqStatus, number>>(
    (acc, r) => {
      acc[r.status]++
      return acc
    },
    { met: 0, partial: 0, gap: 0 },
  )

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      {/* Coverage matrix */}
      <div className="dd-card p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h3 className="dd-h text-lg">Requirement coverage</h3>
          <div className="ml-auto flex gap-1.5">
            {(Object.keys(counts) as ReqStatus[]).map((s) =>
              counts[s] > 0 ? (
                <span key={s} className="dd-chip" style={{ borderColor: STATUS_META[s].color, color: STATUS_META[s].color }}>
                  {counts[s]} {STATUS_META[s].label}
                </span>
              ) : null,
            )}
          </div>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-4 last:mb-0">
            <div className="mb-1.5 font-mono text-[0.66rem] uppercase tracking-wider" style={{ color: 'var(--ink-mute)' }}>
              {cat}
            </div>
            <div className="space-y-1.5">
              {requirements
                .filter((r) => r.category === cat)
                .map((r, i) => {
                  const m = STATUS_META[r.status]
                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.02 }}
                      className="flex items-start gap-3 rounded-xl px-3 py-2"
                      style={{ background: 'var(--bg-2)' }}
                    >
                      <span
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold text-white"
                        style={{ background: m.color }}
                        title={m.label}
                      >
                        {m.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.86rem] leading-snug" style={{ color: 'var(--ink)' }}>
                          <span className="font-mono text-[0.7rem]" style={{ color: 'var(--ink-mute)' }}>
                            {r.id}
                          </span>{' '}
                          {r.text}
                        </p>
                        {r.note ? (
                          <p className="mt-0.5 text-[0.78rem] leading-snug" style={{ color: 'var(--ink-soft)' }}>
                            {r.note}
                          </p>
                        ) : null}
                      </div>
                    </motion.div>
                  )
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Evaluation weights */}
      <div className="dd-card p-5">
        <h3 className="dd-h mb-3 text-lg">How they'll score us</h3>
        <div className="space-y-3.5">
          {evaluation.map((c) => (
            <div key={c.criterion}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[0.85rem] leading-tight" style={{ color: 'var(--ink)' }}>
                  {c.criterion}
                </span>
                <span className="font-mono text-[0.78rem] font-bold" style={{ color: 'var(--ink-soft)' }}>
                  {Math.round(c.weight * 100)}%
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full" style={{ background: 'var(--bg-2)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--accent), var(--brand))' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.weight * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                />
              </div>
              <p className="mt-1 text-[0.74rem]" style={{ color: 'var(--ink-mute)' }}>
                {c.self_assessment} · {c.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
