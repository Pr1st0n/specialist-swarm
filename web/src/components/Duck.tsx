interface DuckProps {
  body: string
  beak?: string
  king?: boolean
  mark?: boolean // colorblind-safe distinguishing pattern (belly ring)
  size?: number
  className?: string
  title?: string
}

// A cheerful rubber duck, facing right. Colors are fully parameterised so the
// same mark renders Classic Yellow, Bath-Time Blue, or a colorblind-safe skin.
export function Duck({
  body,
  beak = '#ff7a35',
  king = false,
  mark = false,
  size = 56,
  className,
  title,
}: DuckProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
      style={{ overflow: 'visible' }}
    >
      {title ? <title>{title}</title> : null}
      {/* body */}
      <ellipse cx="45" cy="61" rx="35" ry="25" fill={body} stroke="rgba(11,45,66,0.16)" strokeWidth="1.5" />
      {/* tail */}
      <path d="M13 55 L1 49 Q9 62 20 64 Z" fill={body} stroke="rgba(11,45,66,0.16)" strokeWidth="1.5" />
      {/* head */}
      <circle cx="72" cy="41" r="17" fill={body} stroke="rgba(11,45,66,0.16)" strokeWidth="1.5" />
      {/* wing */}
      <path d="M32 55 Q45 49 60 60 Q47 68 35 61 Z" fill="rgba(255,255,255,0.45)" />
      {/* colorblind-safe belly ring */}
      {mark ? (
        <circle cx="45" cy="62" r="10" fill="none" stroke="rgba(11,45,66,0.55)" strokeWidth="3" strokeDasharray="4 4" />
      ) : null}
      {/* beak */}
      <path d="M86 38 C97 38 98 48 87 51 C84 47 84 42 86 38 Z" fill={beak} stroke="rgba(11,45,66,0.14)" strokeWidth="1" />
      {/* eye */}
      <circle cx="77" cy="37" r="3" fill="#132a3a" />
      <circle cx="78.2" cy="35.8" r="0.9" fill="#fff" />
      {/* head gloss */}
      <ellipse cx="66" cy="33" rx="5" ry="3.4" fill="rgba(255,255,255,0.6)" />
      {/* crown for kings */}
      {king ? (
        <g>
          <path
            d="M60 22 L64 12 L69 19 L74 10 L79 19 L84 12 L88 22 Z"
            fill="#ffcf3f"
            stroke="#e8961a"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="64" cy="12" r="1.6" fill="#ff7a35" />
          <circle cx="74" cy="10" r="1.8" fill="#ff7a35" />
          <circle cx="84" cy="12" r="1.6" fill="#ff7a35" />
        </g>
      ) : null}
    </svg>
  )
}
