/** A single cell on a bingo card. */
export interface BingoCell {
  /** The numeric value (1–75), or null for the FREE cell. */
  value: number | null;
  /** Row index (0–4). */
  row: number;
  /** Column index (0–4). */
  col: number;
  /** Whether this is the center FREE cell. */
  isFree: boolean;
}
