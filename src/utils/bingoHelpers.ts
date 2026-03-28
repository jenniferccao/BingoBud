import type { BingoCard } from '../types/BingoCard';
import type { BingoCell } from '../types/BingoCell';
import type { CalledNumber } from '../types/CalledNumber';

/* ── Constants ─────────────────────────────────────────────────────── */

const BINGO_LETTERS = ['B', 'I', 'N', 'G', 'O'] as const;

/** Column ranges: B=1-15, I=16-30, N=31-45, G=46-60, O=61-75 */
const COL_RANGES: [number, number][] = [
  [1, 15],
  [16, 30],
  [31, 45],
  [46, 60],
  [61, 75],
];

/* ── Called number helpers ──────────────────────────────────────────── */

/**
 * Get the bingo letter for a number 1–75.
 */
export function letterForNumber(n: number): 'B' | 'I' | 'N' | 'G' | 'O' {
  const colIndex = COL_RANGES.findIndex(([lo, hi]) => n >= lo && n <= hi);
  return BINGO_LETTERS[colIndex >= 0 ? colIndex : 0];
}

/**
 * Build a CalledNumber from a raw number.
 */
export function buildCalledNumber(n: number): CalledNumber {
  const letter = letterForNumber(n);
  return {
    call: `${letter}${n}`,
    letter,
    number: n,
    calledAt: new Date().toISOString(),
  };
}

/**
 * Parse a call string like "B12" into { letter, number }.
 * Returns null if the string is invalid.
 */
export function parseCallString(
  call: string,
): { letter: 'B' | 'I' | 'N' | 'G' | 'O'; number: number } | null {
  const match = call.match(/^([BINGO])(\d+)$/i);
  if (!match) return null;
  const letter = match[1].toUpperCase() as 'B' | 'I' | 'N' | 'G' | 'O';
  const num = parseInt(match[2], 10);
  if (num < 1 || num > 75) return null;
  // Validate that the number belongs to the correct column
  const expectedLetter = letterForNumber(num);
  if (letter !== expectedLetter) return null;
  return { letter, number: num };
}

/* ── Card construction ─────────────────────────────────────────────── */

let nextCardNameId = 1;

export function generateUniqueId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `card-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create an empty 5×5 BingoCard with the FREE center cell.
 */
export function createEmptyCard(name?: string): BingoCard {
  const id = generateUniqueId();
  const grid: BingoCell[][] = Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => ({
      value: row === 2 && col === 2 ? null : null,
      row,
      col,
      isFree: row === 2 && col === 2,
    })),
  );

  return {
    id,
    name: name || `Card ${nextCardNameId++}`,
    createdAt: new Date().toISOString(),
    grid,
  };
}

/**
 * Create a BingoCard from a 5×5 array of numbers.
 * Center cell (2,2) is always FREE regardless of input value.
 */
export function createCardFromNumbers(
  numbers: (number | null)[][],
  name?: string,
): BingoCard {
  const id = generateUniqueId();
  const grid: BingoCell[][] = numbers.map((row, rowIdx) =>
    row.map((val, colIdx) => {
      const isFree = rowIdx === 2 && colIdx === 2;
      return {
        value: isFree ? null : val,
        row: rowIdx,
        col: colIdx,
        isFree,
      };
    }),
  );

  return {
    id,
    name: name || `Card ${nextCardNameId++}`,
    createdAt: new Date().toISOString(),
    grid,
  };
}

/* ── Other Helpers ─────────────────────────────────────────────────── */

/**
 * Immutably update a single cell's value in a card.
 * Returns a new card object (no mutation).
 */
export function updateCellValue(
  card: BingoCard,
  row: number,
  col: number,
  value: number | null,
): BingoCard {
  const newGrid = card.grid.map((r, rIdx) =>
    r.map((cell, cIdx) => {
      if (rIdx === row && cIdx === col && !cell.isFree) {
        return { ...cell, value };
      }
      return cell;
    }),
  );
  return { ...card, grid: newGrid };
}
