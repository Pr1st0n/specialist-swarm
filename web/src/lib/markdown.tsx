import type { ReactNode } from 'react'

// Tiny, dependency-free markdown renderer for our own trusted content.
// Supports: **bold**, ## / ### headings, "- " bullet lists, "N. " ordered
// lists, and GitHub-style pipe tables. Everything else becomes a paragraph.

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  parts.forEach((part, i) => {
    if (!part) return
    if (part.startsWith('**') && part.endsWith('**')) {
      nodes.push(<strong key={`${keyPrefix}-b${i}`}>{part.slice(2, -2)}</strong>)
    } else {
      nodes.push(part)
    }
  })
  return nodes
}

function cells(row: string): string[] {
  return row
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim())
}

export function Markdown({ text }: { text: string }) {
  const lines = text.replace(/\r/g, '').split('\n')
  const out: ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed === '') {
      i++
      continue
    }

    // Heading
    if (trimmed.startsWith('### ')) {
      out.push(<h3 key={key++}>{inline(trimmed.slice(4), `h${key}`)}</h3>)
      i++
      continue
    }
    if (trimmed.startsWith('## ')) {
      out.push(<h3 key={key++}>{inline(trimmed.slice(3), `h${key}`)}</h3>)
      i++
      continue
    }

    // Table
    if (trimmed.startsWith('|')) {
      const block: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        block.push(lines[i].trim())
        i++
      }
      const header = cells(block[0])
      const rows = block.slice(2).map(cells) // skip the |---| separator
      out.push(
        <table key={key++}>
          <thead>
            <tr>
              {header.map((h, c) => (
                <th key={c}>{inline(h, `th${key}-${c}`)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((cell, c) => (
                  <td key={c}>{inline(cell, `td${key}-${ri}-${c}`)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>,
      )
      continue
    }

    // Unordered list
    if (/^- /.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^- /.test(lines[i].trim())) {
        items.push(lines[i].trim().slice(2))
        i++
      }
      out.push(
        <ul key={key++}>
          {items.map((it, ii) => (
            <li key={ii}>{inline(it, `uli${key}-${ii}`)}</li>
          ))}
        </ul>,
      )
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''))
        i++
      }
      out.push(
        <ol key={key++}>
          {items.map((it, ii) => (
            <li key={ii}>{inline(it, `oli${key}-${ii}`)}</li>
          ))}
        </ol>,
      )
      continue
    }

    // Paragraph (join wrapped lines until blank / block start)
    const para: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('|') &&
      !/^[-#]/.test(lines[i].trim()) &&
      !/^\d+\.\s/.test(lines[i].trim())
    ) {
      para.push(lines[i].trim())
      i++
    }
    out.push(<p key={key++}>{inline(para.join(' '), `p${key}`)}</p>)
  }

  return <div className="dd-prose">{out}</div>
}
