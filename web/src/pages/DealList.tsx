import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { loadIndex } from '../lib/data'
import { Duck } from '../components/Duck'
import type { DealSummary } from '../types'

const FIT_COLOR: Record<string, string> = {
  high: 'var(--accent)',
  medium: 'var(--brand)',
  low: 'var(--pop)',
}

export function DealList() {
  const [deals, setDeals] = useState<DealSummary[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadIndex()
      .then((d) => setDeals(d.deals))
      .catch((e) => setError(String(e)))
  }, [])

  return (
    <div className="mx-auto min-h-svh max-w-6xl px-6 py-10">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="grid h-11 w-11 place-items-center rounded-2xl text-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <Duck body="#ffce33" beak="#ff7a35" size={30} title="Altiora" />
          </span>
          <div>
            <div className="dd-h text-xl">Altiora Deal Desk</div>
            <div className="font-mono text-[0.7rem]" style={{ color: 'var(--ink-mute)' }}>
              specialist swarm · RFP → branded proposal
            </div>
          </div>
        </div>
        <span className="dd-chip">Managed Agents · Claude</span>
      </header>

      <div className="mt-14 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="dd-h text-5xl leading-[1.05]"
        >
          Every RFP, worked like a{' '}
          <span style={{ color: 'var(--brand)' }}>senior partner</span> runs it.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-lg"
          style={{ color: 'var(--ink-soft)' }}
        >
          A coordinator agent reads the brief, fans it out to pricing, legal, technical-fit and
          competitive specialists in parallel, and synthesises a branded proposal — docx included.
        </motion.p>
      </div>

      <div className="mt-12">
        <div className="mb-3 font-mono text-[0.7rem] uppercase tracking-wider" style={{ color: 'var(--ink-mute)' }}>
          Deal portfolio
        </div>
        {error ? (
          <p style={{ color: 'var(--pop)' }}>Couldn't load deals: {error}</p>
        ) : !deals ? (
          <p style={{ color: 'var(--ink-mute)' }}>Loading…</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((d, i) => (
              <motion.div
                key={d.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              >
                <Link to={`/deal/${d.slug}`} className="group block">
                  <div className="dd-card h-full p-5 transition-transform group-hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <span className="dd-chip">{d.customer}</span>
                      <span
                        className="dd-chip"
                        style={{ borderColor: FIT_COLOR[d.fit], color: FIT_COLOR[d.fit] }}
                      >
                        {d.fit} fit
                      </span>
                    </div>
                    <h2 className="dd-h mt-3 text-xl leading-tight">{d.title}</h2>
                    <p className="mt-2 text-[0.9rem]" style={{ color: 'var(--ink-soft)' }}>
                      {d.tagline}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-mono text-[0.75rem]" style={{ color: 'var(--brand)' }}>
                        {d.value_label}
                      </span>
                      <span
                        className="font-mono text-[0.66rem] uppercase tracking-wider"
                        style={{ color: d.status === 'generated' ? 'var(--accent)' : 'var(--ink-mute)' }}
                      >
                        {d.status === 'generated' ? '● live' : '○ preview'}
                      </span>
                    </div>
                    <span
                      className="mt-4 inline-flex items-center gap-1 font-mono text-[0.72rem] font-bold"
                      style={{ color: 'var(--ink)' }}
                    >
                      Open deal room
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
