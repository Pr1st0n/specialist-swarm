import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { loadBundle, docxUrl } from '../lib/data'
import { Bubbles } from '../components/Bubbles'
import { Duck } from '../components/Duck'
import { FanOut } from '../components/FanOut'
import { RequirementsMatrix } from '../components/RequirementsMatrix'
import { SpecialistCard } from '../components/SpecialistCard'
import { CheckersBoard } from '../game/CheckersBoard'
import { Markdown } from '../lib/markdown'
import type { Bundle, SpecialistKey } from '../types'

const SPEC_ORDER: SpecialistKey[] = ['technical', 'pricing', 'legal', 'competitive']

const NAV = [
  { id: 'rfp', label: 'The RFP' },
  { id: 'swarm', label: 'The swarm' },
  { id: 'findings', label: 'Findings' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'proposal', label: 'Proposal' },
]

function SectionLabel({ id, kicker, title, sub }: { id: string; kicker: string; title: string; sub?: string }) {
  return (
    <div id={id} className="mb-6 scroll-mt-24">
      <div className="font-mono text-[0.7rem] uppercase tracking-[0.15em]" style={{ color: 'var(--brand-deep)' }}>
        {kicker}
      </div>
      <h2 className="dd-h mt-1 text-3xl">{title}</h2>
      {sub ? (
        <p className="mt-2 max-w-2xl text-[0.98rem]" style={{ color: 'var(--ink-soft)' }}>
          {sub}
        </p>
      ) : null}
    </div>
  )
}

export function DealDetail() {
  const { slug = '' } = useParams()
  const [bundle, setBundle] = useState<Bundle | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadBundle(slug)
      .then(setBundle)
      .catch((e) => setError(String(e)))
  }, [slug])

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p style={{ color: 'var(--pop)' }}>Couldn't load this deal: {error}</p>
        <Link to="/" className="dd-btn dd-btn-ghost mt-4">← Back</Link>
      </div>
    )
  }
  if (!bundle) {
    return <div className="px-6 py-16 text-center" style={{ color: 'var(--ink-mute)' }}>Loading deal room…</div>
  }

  const live = bundle.meta.status === 'generated'

  return (
    <div className={`theme-${bundle.theme} relative min-h-svh`}>
      <Bubbles />

      {/* Top bar */}
      <header
        className="sticky top-0 z-20 border-b backdrop-blur"
        style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg) 82%, transparent)' }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2 font-mono text-[0.78rem]" style={{ color: 'var(--ink-soft)' }}>
            ← Altiora Deal Desk
          </Link>
          <nav className="hidden gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-full px-3 py-1 text-[0.78rem] font-semibold transition hover:opacity-70"
                style={{ color: 'var(--ink-soft)' }}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <span
            className="dd-chip"
            style={{ borderColor: live ? 'var(--accent)' : 'var(--border)', color: live ? 'var(--accent-deep)' : 'var(--ink-mute)' }}
          >
            {live ? '● swarm output' : '○ preview'}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {/* Hero */}
        <section className="grid items-center gap-8 py-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="dd-chip" style={{ borderColor: 'var(--brand)', color: 'var(--brand-deep)' }}>
                {bundle.customer.name}
              </span>
              <span className="dd-chip">{bundle.customer.unit}</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="dd-h mt-4 text-[3.1rem] leading-[0.98]"
            >
              {bundle.rfp.title}
            </motion.h1>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              {bundle.rfp.summary}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {bundle.docx_filename ? (
                <a href={docxUrl(bundle.slug, bundle.docx_filename)} download className="dd-btn dd-btn-primary">
                  ⬇ Download proposal (.docx)
                </a>
              ) : (
                <span className="dd-btn dd-btn-ghost" aria-disabled="true" style={{ opacity: 0.6 }}>
                  docx generating…
                </span>
              )}
              <a href="#proposal" className="dd-btn dd-btn-ghost">Read the proposal ↓</a>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 font-mono text-[0.74rem]" style={{ color: 'var(--ink-mute)' }}>
              <span>issued {bundle.rfp.issued}</span>
              <span>· due {bundle.rfp.due}</span>
              {bundle.rfp.award_expected ? <span>· award {bundle.rfp.award_expected}</span> : null}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="dd-card relative grid place-items-center overflow-hidden p-8"
            style={{ background: 'radial-gradient(circle at 50% 30%, var(--surface-2), var(--surface))' }}
          >
            <div className="anim-bob">
              <Duck body="#ffc21f" beak="#ff7a35" king size={150} title="Quacktastic mascot duck" />
            </div>
            <div className="mt-4 text-center font-mono text-[0.72rem]" style={{ color: 'var(--ink-mute)' }}>
              king me 👑
            </div>
          </motion.div>
        </section>

        {/* RFP requirements */}
        <section className="pt-6">
          <SectionLabel
            id="rfp"
            kicker="What they asked for"
            title="The brief, decomposed"
            sub="Every functional, scale and capability requirement from the RFP — and how our proposal answers it — plus the weighting they'll score us on."
          />
          <RequirementsMatrix requirements={bundle.rfp.requirements} evaluation={bundle.rfp.evaluation} />
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="font-mono text-[0.72rem]" style={{ color: 'var(--ink-mute)' }}>
              Also bidding:
            </span>
            {bundle.rfp.competitors.map((c) => (
              <span key={c} className="dd-chip">{c}</span>
            ))}
          </div>
        </section>

        {/* Swarm fan-out */}
        <section className="pt-16">
          <SectionLabel id="swarm" kicker="How the work happened" title="" />
          <FanOut bundle={bundle} />
        </section>

        {/* Specialist findings */}
        <section className="pt-16">
          <SectionLabel
            id="findings"
            kicker="What each specialist found"
            title="Four lanes, one desk"
            sub="Each specialist owns its lane and reports back with a headline, the evidence, and the single risk it wants the partner to see."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {SPEC_ORDER.map((role, i) => (
              <SpecialistCard key={role} role={role} spec={bundle.specialists[role]} index={i} />
            ))}
          </div>
        </section>

        {/* Playable prototype */}
        <section className="pt-16">
          <SectionLabel
            id="prototype"
            kicker="The product, prototyped"
            title="Quacktastic Checkers — playable now"
            sub="The RFP asks for a board mockup at proposal stage. We went further: a real, playable rubber-duck checkers board — server-style rules engine, three difficulties, 30-second timer, quacks, a colorblind-safe skin, and full keyboard play."
          />
          <div className="dd-card p-5 md:p-7">
            <CheckersBoard />
          </div>
        </section>

        {/* Proposal */}
        <section className="pt-16">
          <SectionLabel id="proposal" kicker="The synthesis" title={bundle.proposal.title} sub={bundle.proposal.subtitle} />
          <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <div className="dd-card p-4">
                <div className="mb-2 font-mono text-[0.64rem] uppercase tracking-wider" style={{ color: 'var(--ink-mute)' }}>
                  Contents
                </div>
                <ol className="space-y-1.5">
                  {bundle.proposal.sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#sec-${s.id}`} className="text-[0.82rem] hover:opacity-70" style={{ color: 'var(--ink-soft)' }}>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
                {bundle.docx_filename ? (
                  <a href={docxUrl(bundle.slug, bundle.docx_filename)} download className="dd-btn dd-btn-primary mt-4 w-full text-[0.82rem]">
                    ⬇ .docx
                  </a>
                ) : null}
              </div>
            </aside>
            <article className="dd-card p-6 md:p-9">
              {bundle.proposal.sections.map((s) => (
                <div key={s.id} id={`sec-${s.id}`} className="mb-8 scroll-mt-24 last:mb-0">
                  <h3 className="dd-h mb-2 text-xl" style={{ color: 'var(--ink)' }}>
                    {s.title}
                  </h3>
                  <Markdown text={s.body_md} />
                </div>
              ))}
            </article>
          </div>
        </section>

        <footer className="mt-20 border-t pt-6 text-center font-mono text-[0.72rem]" style={{ borderColor: 'var(--border)', color: 'var(--ink-mute)' }}>
          {bundle.meta.model} · {bundle.meta.status === 'generated' ? `generated ${bundle.meta.generated_at}` : 'preview data'} · Altiora Deal Desk
        </footer>
      </main>
    </div>
  )
}
