/**
 * A called bingo value, e.g. "B12".
 * The column letter maps to the bingo column:
 *   B = col 0 (1–15)
 *   I = col 1 (16–30)
 *   N = col 2 (31–45)
 *   G = col 3 (46–60)
 *   O = col 4 (61–75)
 */
export interface CalledNumber {
  /** The full call string, e.g. "B12". */
  call: string;
  /** The column letter: B, I, N, G, or O. */
  letter: 'B' | 'I' | 'N' | 'G' | 'O';
  /** The numeric value (1–75). */
  number: number;
  /** ISO timestamp of when the number was called. */
  calledAt: string;
}
