import type { Bundle, DealIndex } from '../types'

const base = import.meta.env.BASE_URL

export async function loadIndex(): Promise<DealIndex> {
  const res = await fetch(`${base}data/index.json`)
  if (!res.ok) throw new Error(`Failed to load deal index (${res.status})`)
  return res.json()
}

export async function loadBundle(slug: string): Promise<Bundle> {
  const res = await fetch(`${base}data/deals/${slug}/bundle.json`)
  if (!res.ok) throw new Error(`Failed to load bundle for "${slug}" (${res.status})`)
  return res.json()
}

export function docxUrl(slug: string, filename: string): string {
  return `${base}data/deals/${slug}/${filename}`
}
