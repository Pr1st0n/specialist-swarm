import { useState } from 'react'
import { motion } from 'motion/react'
import { Markdown } from '../lib/markdown'
import type { Specialist, SpecialistKey } from '../types'

const META: Record<SpecialistKey, { icon: string; label: string }> = {
  technical: { icon: '🧩', label: 'Technical Fit' },
  pricing: { icon: '💷', label: 'Pricing' },
  legal: { icon: '⚖️', label: 'Legal' },
  competitive: { icon: '🎯', label: 'Competitive Intel' },
}

const FIT_COLOR: Record<string, string> = {
  high: 'var(--accent)',
  medium: 'var(--brand)',
  low: 'var(--pop)',
}

export function SpecialistCard({ role, spec, index }: { role: SpecialistKey; spec: Specialist; index: number }) {
  const [open, setOpen] = useState(false)
  const meta = META[role]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="dd-card flex flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-10 w-10 place-items-center rounded-2xl text-xl"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            {meta.icon}
          </span>
          <div>
            <div className="dd-h text-[1.05rem]">{meta.label}</div>
            <div className="font-mono text-[0.66rem]" style={{ color: 'var(--ink-mute)' }}>
              {spec.model}
            </div>
          </div>
        </div>
        {spec.fit_score ? (
          <span
            className="dd-chip"
            style={{ borderColor: FIT_COLOR[spec.fit_score], color: FIT_COLOR[spec.fit_score] }}
          >
            {spec.fit_score} fit
          </span>
        ) : null}
      </div>

      <p className="mt-3.5 text-[0.95rem] font-semibold leading-snug" style={{ color: 'var(--ink)' }}>
        {spec.headline}
      </p>

      <ul className="mt-3 space-y-1.5">
        {spec.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-[0.86rem] leading-snug" style={{ color: 'var(--ink-soft)' }}>
            <span style={{ color: 'var(--accent)' }}>▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div
        className="mt-3.5 rounded-2xl px-3.5 py-2.5 text-[0.82rem] leading-snug"
        style={{ background: 'color-mix(in srgb, var(--pop) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--pop) 35%, transparent)' }}
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-wider" style={{ color: 'var(--pop-deep)' }}>
          ⚠ Risk flagged
        </span>
        <p className="mt-1" style={{ color: 'var(--ink-soft)' }}>
          {spec.risk}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-3.5 self-start font-mono text-[0.72rem] font-bold"
        style={{ color: 'var(--accent-deep)' }}
      >
        {open ? '− Hide full analysis' : '+ Full analysis'}
      </button>
      {open ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 overflow-hidden border-t pt-3 text-[0.9rem]"
          style={{ borderColor: 'var(--border)' }}
        >
          <Markdown text={spec.body_md} />
        </motion.div>
      ) : null}
    </motion.div>
  )
}
