import { describe, it, expect } from 'vitest';
import {
  createInitialBoard,
  getLegalMoves,
  applyMove,
  getStatus,
  countPieces,
  chooseAiMove,
  emptyBoard,
  isDark,
  type Board,
  type Move,
  type Piece,
} from './checkers';

// --- test helpers -----------------------------------------------------------

function yellowMan(): Piece {
  return { player: 'yellow', king: false };
}
function yellowKing(): Piece {
  return { player: 'yellow', king: true };
}
function blueMan(): Piece {
  return { player: 'blue', king: false };
}

function moveEq(a: Move, b: Move): boolean {
  const posEq = (p: { row: number; col: number }, q: { row: number; col: number }) =>
    p.row === q.row && p.col === q.col;
  return (
    posEq(a.from, b.from) &&
    posEq(a.to, b.to) &&
    a.promotes === b.promotes &&
    a.captures.length === b.captures.length &&
    a.captures.every((c, i) => posEq(c, b.captures[i])) &&
    a.path.length === b.path.length &&
    a.path.every((p, i) => posEq(p, b.path[i]))
  );
}

// --- 1. initial board --------------------------------------------------------

describe('createInitialBoard', () => {
  it('has 12 yellow + 12 blue, all on dark squares, no kings', () => {
    const board = createInitialBoard();

    const yellow = countPieces(board, 'yellow');
    const blue = countPieces(board, 'blue');
    expect(yellow).toEqual({ men: 12, kings: 0, total: 12 });
    expect(blue).toEqual({ men: 12, kings: 0, total: 12 });

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece) {
          expect(isDark(r, c)).toBe(true);
          expect(piece.king).toBe(false);
        }
      }
    }
  });
});

// --- 2. opening moves --------------------------------------------------------

describe('opening position', () => {
  it('yellow has exactly 7 legal simple moves, no captures', () => {
    const board = createInitialBoard();
    const moves = getLegalMoves(board, 'yellow');
    expect(moves.length).toBe(7);
    expect(moves.every((m) => m.captures.length === 0)).toBe(true);
  });
});

// --- 3. mandatory capture ----------------------------------------------------

describe('mandatory capture', () => {
  it('returns ONLY capturing moves when a capture exists', () => {
    const board = emptyBoard();
    board[5][2] = yellowMan(); // can jump up-right over (4,3) to (3,4)
    board[4][3] = blueMan();
    board[7][0] = yellowMan(); // has a simple move (6,1) that must be excluded

    const moves = getLegalMoves(board, 'yellow');
    expect(moves.length).toBe(1);
    expect(moves.every((m) => m.captures.length > 0)).toBe(true);
    expect(moves[0].captures[0]).toEqual({ row: 4, col: 3 });
    expect(moves[0].to).toEqual({ row: 3, col: 4 });
  });
});

// --- 4. multi-jump chain -----------------------------------------------------

describe('multi-jump', () => {
  it('produces a forced double jump with captures.length === 2 and path.length === 2', () => {
    const board = emptyBoard();
    board[6][1] = yellowMan();
    board[5][2] = blueMan();
    board[3][2] = blueMan();

    const moves = getLegalMoves(board, 'yellow');
    expect(moves.length).toBe(1);

    const chain = moves[0];
    expect(chain.captures.length).toBe(2);
    expect(chain.path.length).toBe(2);
    expect(chain.captures).toEqual([
      { row: 5, col: 2 },
      { row: 3, col: 2 },
    ]);
    expect(chain.to).toEqual({ row: 2, col: 1 });
  });
});

// --- 5. promotion ------------------------------------------------------------

describe('promotion', () => {
  it('marks a promoting move and crowns the piece after applyMove', () => {
    const board = emptyBoard();
    board[1][2] = yellowMan(); // one row from row 0

    const moves = getLegalMoves(board, 'yellow');
    const promoting = moves.find((m) => m.to.row === 0);
    expect(promoting).toBeDefined();
    expect(promoting!.promotes).toBe(true);

    const next = applyMove(board, promoting!);
    const landed = next[promoting!.to.row][promoting!.to.col];
    expect(landed).not.toBeNull();
    expect(landed!.king).toBe(true);
    expect(landed!.player).toBe('yellow');
  });
});

// --- 6. king captures backward -----------------------------------------------

describe('king backward capture', () => {
  it('a king can capture backward but a man cannot', () => {
    // King: yellow king at (3,4), blue man behind it at (4,5), land (5,6).
    const kingBoard = emptyBoard();
    kingBoard[3][4] = yellowKing();
    kingBoard[4][5] = blueMan();
    const kingMoves = getLegalMoves(kingBoard, 'yellow');
    expect(kingMoves.length).toBeGreaterThan(0);
    expect(kingMoves.every((m) => m.captures.length > 0)).toBe(true);
    expect(
      kingMoves.some((m) => m.captures.some((c) => c.row === 4 && c.col === 5)),
    ).toBe(true);

    // Man in the same spot cannot capture backward.
    const manBoard = emptyBoard();
    manBoard[3][4] = yellowMan();
    manBoard[4][5] = blueMan();
    const manMoves = getLegalMoves(manBoard, 'yellow');
    expect(manMoves.every((m) => m.captures.length === 0)).toBe(true);
  });
});

// --- 7. win / loss detection -------------------------------------------------

describe('getStatus', () => {
  it("reports yellow_wins when blue has no pieces", () => {
    const board = emptyBoard();
    board[5][0] = yellowMan();
    expect(getStatus(board, 'blue')).toBe('yellow_wins');
  });

  it('the side to move loses when it has pieces but no legal moves', () => {
    const board = emptyBoard();
    board[7][0] = blueMan(); // a blue man on the bottom edge: no forward move, no jump
    board[4][3] = yellowKing(); // keep yellow on the board
    expect(getLegalMoves(board, 'blue').length).toBe(0);
    expect(getStatus(board, 'blue')).toBe('yellow_wins');
  });
});

// --- 8. immutability ---------------------------------------------------------

describe('applyMove immutability', () => {
  it('does not mutate the input board', () => {
    const board = createInitialBoard();
    const snapshot = JSON.parse(JSON.stringify(board)) as Board;
    const moves = getLegalMoves(board, 'yellow');
    applyMove(board, moves[0]);
    expect(board).toEqual(snapshot);
  });
});

// --- 9. AI legality ----------------------------------------------------------

describe('chooseAiMove', () => {
  it('returns a legal move for each difficulty on the opening board', () => {
    const board = createInitialBoard();
    const legal = getLegalMoves(board, 'yellow');
    for (const difficulty of ['easy', 'medium', 'ruthless'] as const) {
      const move = chooseAiMove(board, 'yellow', difficulty);
      expect(move).not.toBeNull();
      expect(legal.some((m) => moveEq(m, move!))).toBe(true);
    }
  });

  it('returns null when there are no legal moves', () => {
    const board = emptyBoard();
    expect(chooseAiMove(board, 'yellow', 'easy')).toBeNull();
    expect(chooseAiMove(board, 'yellow', 'medium')).toBeNull();
    expect(chooseAiMove(board, 'yellow', 'ruthless')).toBeNull();
  });
});
