// Canonical deal-bundle schema. The swarm export (run_swarm.py → authored
// bundle.json) and the app agree on this shape. Keep in sync with
// web/public/data/deals/<slug>/bundle.json.

export type FitScore = 'high' | 'medium' | 'low'
export type ReqStatus = 'met' | 'partial' | 'gap'
export type DealStatus = 'mock' | 'generated'

export interface DealSummary {
  slug: string
  customer: string
  title: string
  theme: string
  status: DealStatus
  value_label: string
  fit: FitScore
  tagline: string
}

export interface DealIndex {
  deals: DealSummary[]
}

export interface Requirement {
  id: string
  category: string
  text: string
  status: ReqStatus
  note: string
}

export interface EvalCriterion {
  criterion: string
  weight: number
  self_assessment: string
  note: string
}

export interface Specialist {
  name: string
  model: string
  skill: string
  headline: string
  bullets: string[]
  risk: string
  body_md: string
  fit_score?: FitScore
}

export interface FanoutStep {
  agent: string
  role: string
  model: string
  spawned_ms: number
  replied_ms: number
}

export interface ProposalSection {
  id: string
  title: string
  body_md: string
}

export interface Bundle {
  slug: string
  theme: string
  customer: {
    name: string
    unit: string
    contact: string
    tech_lead?: string
    blurb: string
  }
  rfp: {
    title: string
    summary: string
    issued: string
    due: string
    award_expected?: string
    requirements: Requirement[]
    evaluation: EvalCriterion[]
    competitors: string[]
  }
  fanout: FanoutStep[]
  specialists: {
    technical: Specialist
    pricing: Specialist
    legal: Specialist
    competitive: Specialist
  }
  proposal: {
    title: string
    subtitle: string
    sections: ProposalSection[]
  }
  docx_filename: string | null
  meta: {
    model: string
    generated_at: string | null
    status: DealStatus
    note?: string
  }
}

export type SpecialistKey = keyof Bundle['specialists']
