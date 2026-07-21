import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Duck } from '../components/Duck'
import {
  createInitialBoard,
  getLegalMoves,
  applyMove,
  getStatus,
  countPieces,
  chooseAiMove,
} from './checkers'
import type { Board, Move, Player, Pos } from './checkers'

type Difficulty = 'easy' | 'medium' | 'ruthless'
type Skin = 'classic' | 'cvd'

const HUMAN: Player = 'yellow'
const AI: Player = 'blue'
const COLS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const key = (p: Pos) => `${p.row},${p.col}`
const sq = (p: Pos) => `${COLS[p.col]}${8 - p.row}`

const SKINS: Record<Skin, { yellow: { body: string; beak: string; mark: boolean }; blue: { body: string; beak: string; mark: boolean } }> = {
  classic: {
    yellow: { body: '#ffce33', beak: '#ff7a35', mark: false },
    blue: { body: '#2aa6e2', beak: '#ff9a3c', mark: false },
  },
  // Okabe–Ito colorblind-safe pairing + a pattern marker on one side
  cvd: {
    yellow: { body: '#e69f00', beak: '#0b2d42', mark: false },
    blue: { body: '#0072b2', beak: '#ffd166', mark: true },
  },
}

// --- tiny WebAudio "quack" (no assets) ---
function useQuack(muted: boolean) {
  const ctxRef = useRef<AudioContext | null>(null)
  return useCallback(
    (capture: boolean) => {
      if (muted) return
      try {
        if (!ctxRef.current) {
          const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
          ctxRef.current = new Ctor()
        }
        const ctx = ctxRef.current
        if (ctx.state === 'suspended') void ctx.resume()
        const t = ctx.currentTime
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sawtooth'
        const f0 = capture ? 1150 : 780
        const f1 = capture ? 240 : 300
        osc.frequency.setValueAtTime(f0, t)
        osc.frequency.exponentialRampToValueAtTime(f1, t + (capture ? 0.22 : 0.14))
        // vibrato gives it the "quack" character
        const lfo = ctx.createOscillator()
        const lfoGain = ctx.createGain()
        lfo.frequency.value = 22
        lfoGain.gain.value = 45
        lfo.connect(lfoGain).connect(osc.frequency)
        const peak = capture ? 0.32 : 0.18
        gain.gain.setValueAtTime(0.0001, t)
        gain.gain.exponentialRampToValueAtTime(peak, t + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + (capture ? 0.28 : 0.18))
        osc.connect(gain).connect(ctx.destination)
        osc.start(t)
        lfo.start(t)
        osc.stop(t + 0.3)
        lfo.stop(t + 0.3)
      } catch {
        /* audio not available — silently ignore */
      }
    },
    [muted],
  )
}

export function CheckersBoard() {
  const [board, setBoard] = useState<Board>(() => createInitialBoard())
  const [toMove, setToMove] = useState<Player>(HUMAN)
  const [selected, setSelected] = useState<Pos | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [skin, setSkin] = useState<Skin>('classic')
  const [muted, setMuted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [moveCount, setMoveCount] = useState(0)
  const [cursor, setCursor] = useState<Pos>({ row: 5, col: 0 })
  const [lastMove, setLastMove] = useState<Move | null>(null)

  const quack = useQuack(muted)

  const status = useMemo(() => getStatus(board, toMove), [board, toMove])
  const legalMoves = useMemo(
    () => (status === 'playing' ? getLegalMoves(board, toMove) : []),
    [board, toMove, status],
  )
  const movableFroms = useMemo(() => new Set(legalMoves.map((m) => key(m.from))), [legalMoves])
  const destinations = useMemo(() => {
    const map = new Map<string, Move>()
    if (selected) for (const m of legalMoves) if (key(m.from) === key(selected)) map.set(key(m.to), m)
    return map
  }, [legalMoves, selected])

  const commit = useCallback(
    (move: Move) => {
      const captured = move.captures.length
      quack(captured > 0)
      setBoard((b) => applyMove(b, move))
      setLastMove(move)
      setSelected(null)
      setHistory((h) => [
        `${toMove === HUMAN ? '🟡' : '🔵'} ${sq(move.from)}→${sq(move.to)}${captured ? ` ×${captured}` : ''}${move.promotes ? ' 👑' : ''}`,
        ...h,
      ])
      setToMove((p) => (p === 'yellow' ? 'blue' : 'yellow'))
      setMoveCount((c) => c + 1)
    },
    [quack, toMove],
  )

  const newGame = useCallback(() => {
    setBoard(createInitialBoard())
    setToMove(HUMAN)
    setSelected(null)
    setHistory([])
    setTimeLeft(30)
    setMoveCount(0)
    setLastMove(null)
  }, [])

  // AI turn
  useEffect(() => {
    if (toMove !== AI || status !== 'playing') return
    const id = setTimeout(() => {
      const move = chooseAiMove(board, AI, difficulty)
      if (move) commit(move)
    }, 650)
    return () => clearTimeout(id)
  }, [toMove, status, board, difficulty, commit])

  // Per-turn 30s timer (+ auto-move on human timeout)
  useEffect(() => {
    if (status !== 'playing') return
    setTimeLeft(30)
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (toMove === HUMAN) {
            const moves = getLegalMoves(board, HUMAN)
            if (moves.length) commit(moves[Math.floor(Math.random() * moves.length)])
          }
          return 30
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toMove, status, moveCount])

  const onSquareClick = useCallback(
    (row: number, col: number) => {
      if (toMove !== HUMAN || status !== 'playing') return
      const pos = { row, col }
      const dest = destinations.get(key(pos))
      if (dest) {
        commit(dest)
        return
      }
      const piece = board[row][col]
      if (piece && piece.player === HUMAN && movableFroms.has(key(pos))) {
        setSelected(pos)
      } else {
        setSelected(null)
      }
    },
    [board, toMove, status, destinations, movableFroms, commit],
  )

  // Drag & drop (desktop) — mirrors tap-to-select
  const onDrop = useCallback(
    (row: number, col: number) => {
      const dest = destinations.get(key({ row, col }))
      if (dest) commit(dest)
    },
    [destinations, commit],
  )

  // Keyboard navigation
  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent) => {
      const k = e.key
      if (k === 'ArrowUp' || k === 'ArrowDown' || k === 'ArrowLeft' || k === 'ArrowRight') {
        e.preventDefault()
        setCursor((c) => ({
          row: Math.min(7, Math.max(0, c.row + (k === 'ArrowUp' ? -1 : k === 'ArrowDown' ? 1 : 0))),
          col: Math.min(7, Math.max(0, c.col + (k === 'ArrowLeft' ? -1 : k === 'ArrowRight' ? 1 : 0))),
        }))
      } else if (k === 'Enter' || k === ' ') {
        e.preventDefault()
        onSquareClick(cursor.row, cursor.col)
      } else if (k === 'Escape') {
        setSelected(null)
      }
    },
    [cursor, onSquareClick],
  )

  const yellowCount = countPieces(board, 'yellow')
  const blueCount = countPieces(board, 'blue')
  const lowTime = timeLeft <= 8 && status === 'playing'

  const banner =
    status === 'yellow_wins'
      ? '🎉 Your ducks take a bow — you win!'
      : status === 'blue_wins'
        ? 'The challenger ducks win this round.'
        : status === 'draw'
          ? "It's a draw — ducks all round."
          : toMove === HUMAN
            ? 'Your move'
            : 'Ruthless Duck is thinking…'

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
      {/* Board */}
      <div>
        <div
          role="grid"
          aria-label="Duck checkers board"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[24px] p-2 outline-none"
          style={{
            background: 'linear-gradient(135deg, var(--accent-deep), var(--accent))',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div className="grid h-full w-full grid-cols-8 overflow-hidden rounded-[16px]">
            {board.map((rowArr, row) =>
              rowArr.map((piece, col) => {
                const dark = (row + col) % 2 === 1
                const isSel = selected && selected.row === row && selected.col === col
                const isDest = destinations.has(key({ row, col }))
                const isCursor = cursor.row === row && cursor.col === col
                const inLast =
                  lastMove && (key(lastMove.from) === key({ row, col }) || key(lastMove.to) === key({ row, col }))
                const s = piece ? SKINS[skin][piece.player] : null
                const fidget = lowTime && piece?.player === toMove
                const bow =
                  (status === 'yellow_wins' && piece?.player === 'yellow') ||
                  (status === 'blue_wins' && piece?.player === 'blue')
                return (
                  <div
                    key={`${row}-${col}`}
                    role="gridcell"
                    onClick={() => onSquareClick(row, col)}
                    onDragOver={(e) => isDest && e.preventDefault()}
                    onDrop={() => onDrop(row, col)}
                    className="relative flex items-center justify-center"
                    style={{
                      background: dark
                        ? inLast
                          ? 'color-mix(in srgb, var(--brand) 30%, #2f6d94)'
                          : '#2f6d94'
                        : '#eaf4fb',
                      cursor: toMove === HUMAN && (isDest || movableFroms.has(key({ row, col }))) ? 'pointer' : 'default',
                      boxShadow: isCursor ? 'inset 0 0 0 3px var(--pop)' : isSel ? 'inset 0 0 0 3px var(--brand)' : undefined,
                    }}
                  >
                    {isDest ? (
                      <span
                        className="absolute h-1/3 w-1/3 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.55)', boxShadow: '0 0 0 3px var(--brand)' }}
                      />
                    ) : null}
                    {piece && s ? (
                      <div
                        draggable={toMove === HUMAN && piece.player === HUMAN && movableFroms.has(key({ row, col }))}
                        onDragStart={() => setSelected({ row, col })}
                        className={`grid h-full w-full place-items-center ${fidget ? 'anim-fidget' : ''} ${bow ? 'anim-bow' : ''}`}
                      >
                        <Duck
                          body={s.body}
                          beak={s.beak}
                          king={piece.king}
                          mark={s.mark}
                          size={44}
                          title={`${piece.player} ${piece.king ? 'king' : 'duck'} on ${sq({ row, col })}`}
                        />
                      </div>
                    ) : null}
                  </div>
                )
              }),
            )}
          </div>
        </div>
        <p className="mt-2 text-center font-mono text-[0.7rem]" style={{ color: 'var(--ink-mute)' }}>
          Tap a duck, then tap a highlighted square · drag on desktop · arrow keys + Enter for keyboard play
        </p>
      </div>

      {/* Control panel */}
      <aside className="flex flex-col gap-3">
        <div
          className="rounded-[18px] px-4 py-3 text-center"
          aria-live="polite"
          style={{
            background: status.endsWith('_wins') || status === 'draw' ? 'var(--brand)' : 'var(--surface-2)',
            color: status.endsWith('_wins') || status === 'draw' ? '#12303f' : 'var(--ink)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="dd-h text-[0.98rem]">{banner}</div>
          <div className="mt-1 font-mono text-2xl font-bold" style={{ color: lowTime ? 'var(--pop-deep)' : 'inherit' }}>
            {status === 'playing' ? `0:${String(timeLeft).padStart(2, '0')}` : '—'}
          </div>
        </div>

        <div className="dd-card px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Duck body={SKINS[skin].yellow.body} beak={SKINS[skin].yellow.beak} mark={SKINS[skin].yellow.mark} size={22} title="you" /> You
            </span>
            <span className="font-mono font-bold">{yellowCount.total}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Duck body={SKINS[skin].blue.body} beak={SKINS[skin].blue.beak} mark={SKINS[skin].blue.mark} size={22} title="challenger" /> Challenger
            </span>
            <span className="font-mono font-bold">{blueCount.total}</span>
          </div>
        </div>

        <div className="dd-card px-4 py-3">
          <label className="mb-1 block font-mono text-[0.66rem] uppercase tracking-wider" style={{ color: 'var(--ink-mute)' }}>
            Difficulty
          </label>
          <div className="grid grid-cols-3 gap-1">
            {(['easy', 'medium', 'ruthless'] as Difficulty[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className="rounded-full px-2 py-1.5 text-[0.72rem] font-bold transition"
                style={{
                  background: difficulty === d ? 'var(--brand)' : 'transparent',
                  color: difficulty === d ? '#12303f' : 'var(--ink-soft)',
                  border: '1px solid var(--border)',
                }}
              >
                {d === 'ruthless' ? 'Ruthless' : d[0].toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
          {difficulty === 'ruthless' ? (
            <p className="mt-1.5 text-[0.68rem]" style={{ color: 'var(--pop-deep)' }}>
              “Ruthless Duck” — minimax, depth 6. Good luck.
            </p>
          ) : null}
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={() => setSkin((s) => (s === 'classic' ? 'cvd' : 'classic'))} className="dd-btn dd-btn-ghost flex-1 text-[0.78rem]">
            {skin === 'classic' ? '👁 Colorblind skin' : '🦆 Classic skin'}
          </button>
          <button type="button" onClick={() => setMuted((m) => !m)} className="dd-btn dd-btn-ghost text-[0.78rem]" aria-pressed={muted}>
            {muted ? '🔇' : '🔊'}
          </button>
        </div>

        <button type="button" onClick={newGame} className="dd-btn dd-btn-primary">
          New game
        </button>

        <div className="dd-card flex-1 px-4 py-3">
          <div className="mb-2 font-mono text-[0.66rem] uppercase tracking-wider" style={{ color: 'var(--ink-mute)' }}>
            Move history
          </div>
          <ol className="space-y-1 font-mono text-[0.75rem]" style={{ color: 'var(--ink-soft)' }}>
            {history.length === 0 ? <li style={{ color: 'var(--ink-mute)' }}>No moves yet.</li> : null}
            {history.slice(0, 10).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  )
}
