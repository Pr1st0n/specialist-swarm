// Pure-TypeScript checkers (English / American draughts) rules engine.
//
// No React, no DOM, no rendering. Pure functions and types only.
// Everything is immutable: functions never mutate the board passed in; a new
// board is cloned before any change is applied.
//
// Board conventions:
//   - 8x8 grid, row 0 = top, row 7 = bottom.
//   - Pieces live only on dark squares, where (row + col) is odd.
//   - 'yellow' starts on the bottom three rows (5,6,7) and moves UP (row -1),
//     promoting on row 0.
//   - 'blue' starts on the top three rows (0,1,2) and moves DOWN (row +1),
//     promoting on row 7.
//   - Yellow moves first.

export type Player = 'yellow' | 'blue';

export interface Piece {
  player: Player;
  king: boolean;
}

export type Square = Piece | null;
export type Board = Square[][]; // 8 rows x 8 cols, row 0 = top

export type Pos = { row: number; col: number };

export interface Move {
  from: Pos;
  to: Pos; // final landing square
  captures: Pos[]; // squares of captured pieces (empty for a simple move)
  path: Pos[]; // landing squares in order, from just-after-`from` to `to`
  promotes: boolean; // true if this move crowns a king
}

export type GameStatus = 'playing' | 'yellow_wins' | 'blue_wins' | 'draw';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SIZE = 8;

/** Plies without a capture or promotion after which the game is a draw. */
export const DRAW_PLIES = 40;

type Dir = readonly [number, number];

const ALL_DIRS: readonly Dir[] = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

const YELLOW_FORWARD: readonly Dir[] = [
  [-1, -1],
  [-1, 1],
];

const BLUE_FORWARD: readonly Dir[] = [
  [1, -1],
  [1, 1],
];

// Evaluation weights (used by the 'ruthless' AI).
const MAN_VALUE = 100;
const KING_VALUE = 160; // ~1.6x a man
const ADVANCE_WEIGHT = 4; // per row a man has advanced toward promotion
const BACKROW_GUARD = 12; // per man still defending its own back row
const MOBILITY_WEIGHT = 2; // per net legal-ish move
const WIN_SCORE = 1_000_000;

/** Search depth for the 'ruthless' minimax AI (>= 5 as required). */
export const RUTHLESS_DEPTH = 6;

// ---------------------------------------------------------------------------
// Small helpers (exported for UI convenience)
// ---------------------------------------------------------------------------

export function posEq(a: Pos, b: Pos): boolean {
  return a.row === b.row && a.col === b.col;
}

export function isDark(row: number, col: number): boolean {
  return (row + col) % 2 === 1;
}

export function inBounds(row: number, col: number): boolean {
  return row >= 0 && row < SIZE && col >= 0 && col < SIZE;
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => row.map((sq) => (sq ? { player: sq.player, king: sq.king } : null)));
}

/** An 8x8 board of all empty squares. Handy for building test/scenario boards. */
export function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => null as Square));
}

function other(player: Player): Player {
  return player === 'yellow' ? 'blue' : 'yellow';
}

function forwardDirs(player: Player): readonly Dir[] {
  return player === 'yellow' ? YELLOW_FORWARD : BLUE_FORWARD;
}

function moveDirs(piece: Piece): readonly Dir[] {
  return piece.king ? ALL_DIRS : forwardDirs(piece.player);
}

/** The row a man of `player` promotes on (the opponent's back row). */
function promotionRow(player: Player): number {
  return player === 'yellow' ? 0 : SIZE - 1;
}

function isPromotionSquare(pos: Pos, player: Player): boolean {
  return pos.row === promotionRow(player);
}

/** The player's own back row (where a defending man guards against promotion). */
function ownBackRow(player: Player): number {
  return player === 'yellow' ? SIZE - 1 : 0;
}

// ---------------------------------------------------------------------------
// Board construction
// ---------------------------------------------------------------------------

export function createInitialBoard(): Board {
  const board = emptyBoard();
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!isDark(r, c)) continue;
      if (r <= 2) {
        board[r][c] = { player: 'blue', king: false };
      } else if (r >= 5) {
        board[r][c] = { player: 'yellow', king: false };
      }
    }
  }
  return board;
}

// ---------------------------------------------------------------------------
// Move generation
// ---------------------------------------------------------------------------

/**
 * All maximal capture chains for the piece at `from`.
 *
 * A returned Move represents the FULL chain of jumps (English draughts forces
 * you to keep jumping with the same piece while jumps remain). A man that lands
 * on its promotion row ends the chain immediately (it is crowned; a freshly
 * crowned man does not continue jumping as a king this turn).
 */
function generateCaptures(board: Board, from: Pos, piece: Piece): Move[] {
  const player = piece.player;
  const king = piece.king;
  const dirs = king ? ALL_DIRS : forwardDirs(player);
  const results: Move[] = [];

  // captured pieces stay physically on the board until the whole move is done,
  // so they keep blocking landing squares and may not be jumped twice.
  const dfs = (pos: Pos, captured: Pos[], path: Pos[]): boolean => {
    let hadJump = false;
    for (const [dr, dc] of dirs) {
      const midRow = pos.row + dr;
      const midCol = pos.col + dc;
      const landRow = pos.row + 2 * dr;
      const landCol = pos.col + 2 * dc;
      if (!inBounds(landRow, landCol)) continue;

      const midPiece = board[midRow][midCol];
      if (!midPiece || midPiece.player === player) continue;
      const mid: Pos = { row: midRow, col: midCol };
      if (captured.some((c) => posEq(c, mid))) continue; // already jumped this piece

      // Landing square must be empty. The moving piece has vacated `from`, so
      // that square counts as empty; every other occupant (including pieces
      // captured earlier in this chain, which stay put) blocks the landing.
      const landOccupant = board[landRow][landCol];
      const land: Pos = { row: landRow, col: landCol };
      if (landOccupant !== null && !posEq(land, from)) continue;

      hadJump = true;
      const nextCaptured = [...captured, mid];
      const nextPath = [...path, land];
      const promotesHere = !king && isPromotionSquare(land, player);

      if (promotesHere) {
        // Crowned: the chain ends here even if more jumps look available.
        results.push({ from, to: land, captures: nextCaptured, path: nextPath, promotes: true });
      } else {
        const childContinued = dfs(land, nextCaptured, nextPath);
        if (!childContinued) {
          // No further jump possible: this is a terminal (maximal) chain.
          results.push({ from, to: land, captures: nextCaptured, path: nextPath, promotes: false });
        }
      }
    }
    return hadJump;
  };

  dfs(from, [], []);
  return results;
}

/** Simple (non-capturing) one-step diagonal moves for the piece at `from`. */
function generateSimpleMoves(board: Board, from: Pos, piece: Piece): Move[] {
  const moves: Move[] = [];
  for (const [dr, dc] of moveDirs(piece)) {
    const toRow = from.row + dr;
    const toCol = from.col + dc;
    if (!inBounds(toRow, toCol)) continue;
    if (board[toRow][toCol] !== null) continue;
    const to: Pos = { row: toRow, col: toCol };
    const promotes = !piece.king && isPromotionSquare(to, piece.player);
    moves.push({ from, to, captures: [], path: [to], promotes });
  }
  return moves;
}

/**
 * All legal moves for `player`. If any capture is available, ONLY capturing
 * moves are returned (mandatory capture).
 */
export function getLegalMoves(board: Board, player: Player): Move[] {
  const captures: Move[] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const piece = board[r][c];
      if (!piece || piece.player !== player) continue;
      const caps = generateCaptures(board, { row: r, col: c }, piece);
      if (caps.length) captures.push(...caps);
    }
  }
  if (captures.length) return captures;

  const simple: Move[] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const piece = board[r][c];
      if (!piece || piece.player !== player) continue;
      simple.push(...generateSimpleMoves(board, { row: r, col: c }, piece));
    }
  }
  return simple;
}

// ---------------------------------------------------------------------------
// Applying moves
// ---------------------------------------------------------------------------

/** Returns a NEW board with `move` applied. The input board is never mutated. */
export function applyMove(board: Board, move: Move): Board {
  const next = cloneBoard(board);
  const piece = next[move.from.row][move.from.col];
  if (!piece) {
    throw new Error(`applyMove: no piece at from (${move.from.row},${move.from.col})`);
  }
  next[move.from.row][move.from.col] = null;
  for (const cap of move.captures) {
    next[cap.row][cap.col] = null;
  }
  next[move.to.row][move.to.col] = {
    player: piece.player,
    king: piece.king || move.promotes,
  };
  return next;
}

// ---------------------------------------------------------------------------
// Status & counting
// ---------------------------------------------------------------------------

export function countPieces(
  board: Board,
  player: Player,
): { men: number; kings: number; total: number } {
  let men = 0;
  let kings = 0;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const piece = board[r][c];
      if (!piece || piece.player !== player) continue;
      if (piece.king) kings++;
      else men++;
    }
  }
  return { men, kings, total: men + kings };
}

/**
 * Game status for the position, from the perspective of the side to move.
 *
 * The side to move loses if it has no pieces or no legal moves. Optionally pass
 * `noProgressPlies` (a counter of consecutive plies with no capture and no
 * promotion) to detect a draw once it reaches {@link DRAW_PLIES}.
 */
export function getStatus(board: Board, toMove: Player, noProgressPlies?: number): GameStatus {
  const yellow = countPieces(board, 'yellow');
  const blue = countPieces(board, 'blue');

  if (blue.total === 0) return 'yellow_wins';
  if (yellow.total === 0) return 'blue_wins';

  if (getLegalMoves(board, toMove).length === 0) {
    return toMove === 'yellow' ? 'blue_wins' : 'yellow_wins';
  }

  if (noProgressPlies !== undefined && noProgressPlies >= DRAW_PLIES) {
    return 'draw';
  }

  return 'playing';
}

// ---------------------------------------------------------------------------
// AI
// ---------------------------------------------------------------------------

/** Cheap mobility proxy: counts one-step moves and immediate single jumps. */
function mobility(board: Board, player: Player): number {
  let count = 0;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const piece = board[r][c];
      if (!piece || piece.player !== player) continue;
      const dirs = piece.king ? ALL_DIRS : forwardDirs(player);
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (!inBounds(nr, nc)) continue;
        const occ = board[nr][nc];
        if (occ === null) {
          count++;
        } else if (occ.player !== player) {
          const lr = r + 2 * dr;
          const lc = c + 2 * dc;
          if (inBounds(lr, lc) && board[lr][lc] === null) count++;
        }
      }
    }
  }
  return count;
}

/** Static evaluation from `player`'s perspective (higher = better for player). */
function evaluate(board: Board, player: Player): number {
  const opp = other(player);
  let score = 0;

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const piece = board[r][c];
      if (!piece) continue;
      const sign = piece.player === player ? 1 : -1;
      let value = piece.king ? KING_VALUE : MAN_VALUE;
      if (!piece.king) {
        // advancement toward promotion
        const advance = piece.player === 'yellow' ? SIZE - 1 - r : r;
        value += advance * ADVANCE_WEIGHT;
        // back-row guard: a man on its own back row denies a promotion square
        if (r === ownBackRow(piece.player)) value += BACKROW_GUARD;
      }
      score += sign * value;
    }
  }

  score += (mobility(board, player) - mobility(board, opp)) * MOBILITY_WEIGHT;
  return score;
}

/** Negamax with alpha-beta pruning. Returns the value for `player` to move. */
function negamax(
  board: Board,
  player: Player,
  depth: number,
  alpha: number,
  beta: number,
): number {
  const moves = getLegalMoves(board, player);
  if (moves.length === 0) {
    // Side to move cannot move -> it has lost. Prefer losses that are further off.
    return -(WIN_SCORE + depth);
  }
  if (depth === 0) return evaluate(board, player);

  let best = -Infinity;
  for (const move of moves) {
    const child = applyMove(board, move);
    const value = -negamax(child, other(player), depth - 1, -beta, -alpha);
    if (value > best) best = value;
    if (best > alpha) alpha = best;
    if (alpha >= beta) break; // prune
  }
  return best;
}

/** 1-ply greedy score for the 'medium' AI. */
function greedyScore(board: Board, move: Move, player: Player): number {
  let score = 0;
  for (const cap of move.captures) {
    const captured = board[cap.row][cap.col];
    score += captured && captured.king ? 1.6 : 1.0;
  }
  if (move.promotes) score += 0.9;
  const moved = board[move.from.row][move.from.col];
  if (moved && !moved.king) {
    const advance =
      player === 'yellow' ? move.from.row - move.to.row : move.to.row - move.from.row;
    score += Math.max(0, advance) * 0.05;
  }
  return score;
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Choose a move for the AI.
 *   - 'easy':     a random legal move.
 *   - 'medium':   1-ply greedy (maximize immediate material + small bonuses for
 *                 promotion and advancement).
 *   - 'ruthless': minimax + alpha-beta at {@link RUTHLESS_DEPTH}.
 * Returns null when the player has no legal moves.
 */
export function chooseAiMove(
  board: Board,
  player: Player,
  difficulty: 'easy' | 'medium' | 'ruthless',
): Move | null {
  const moves = getLegalMoves(board, player);
  if (moves.length === 0) return null;

  if (difficulty === 'easy') {
    return pickRandom(moves);
  }

  if (difficulty === 'medium') {
    let bestScore = -Infinity;
    let best: Move[] = [];
    for (const move of moves) {
      const score = greedyScore(board, move, player);
      if (score > bestScore) {
        bestScore = score;
        best = [move];
      } else if (score === bestScore) {
        best.push(move);
      }
    }
    return pickRandom(best);
  }

  // ruthless
  let bestValue = -Infinity;
  let best: Move[] = [];
  let alpha = -Infinity;
  const beta = Infinity;
  for (const move of moves) {
    const child = applyMove(board, move);
    const value = -negamax(child, other(player), RUTHLESS_DEPTH - 1, -beta, -alpha);
    if (value > bestValue) {
      bestValue = value;
      best = [move];
      if (value > alpha) alpha = value;
    } else if (value === bestValue) {
      best.push(move);
    }
  }
  return pickRandom(best);
}
