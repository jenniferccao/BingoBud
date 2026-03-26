import type { BingoCell } from '../types/BingoCell';
import type { CalledNumber } from '../types/CalledNumber';

export interface LineStatus {
  /** Coordinates on this line. */
  cells: [number, number][];
  /** How many cells are hit. */
  hitCount: number;
  /** Whether the line is a bingo (all 5 hit). */
  isBingo: boolean;
  /** Whether the line is one-away (exactly 4 hit). */
  isOneAway: boolean;
}

/** All winning lines on a 5×5 board (rows, columns, diagonals). */
export const WINNING_LINES: [number, number][][] = [
  // 5 rows
  ...Array.from({ length: 5 }, (_, r) =>
    Array.from({ length: 5 }, (_, c) => [r, c] as [number, number]),
  ),
  // 5 columns
  ...Array.from({ length: 5 }, (_, c) =>
    Array.from({ length: 5 }, (_, r) => [r, c] as [number, number]),
  ),
  // 2 diagonals
  Array.from({ length: 5 }, (_, i) => [i, i] as [number, number]),
  Array.from({ length: 5 }, (_, i) => [i, 4 - i] as [number, number]),
];

/**
 * Build a Set of all called numbers for fast lookup.
 */
export function buildCalledSet(calledNumbers: CalledNumber[]): Set<number> {
  return new Set(calledNumbers.map((c) => c.number));
}

/**
 * Check whether a cell is "hit" (its value has been called, or it's FREE).
 */
export function isCellHit(cell: BingoCell, calledSet: Set<number>): boolean {
  if (cell.isFree) return true;
  return cell.value !== null && calledSet.has(cell.value);
}

/**
 * Evaluate all 12 winning lines on a card.
 */
export function evaluateLines(
  grid: BingoCell[][],
  calledSet: Set<number>,
): LineStatus[] {
  return WINNING_LINES.map((line) => {
    let hitCount = 0;
    for (const [r, c] of line) {
      if (isCellHit(grid[r][c], calledSet)) {
        hitCount++;
      }
    }
    return {
      cells: line,
      hitCount,
      isBingo: hitCount === 5,
      isOneAway: hitCount === 4,
    };
  });
}

/**
 * Check whether any line on the card is a bingo.
 */
export function hasBingo(grid: BingoCell[][], calledSet: Set<number>): boolean {
  return evaluateLines(grid, calledSet).some((l) => l.isBingo);
}

