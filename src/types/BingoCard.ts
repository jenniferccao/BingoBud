import type { BingoCell } from './BingoCell';

/** A full 5×5 bingo card. */
export interface BingoCard {
  /** Unique identifier. */
  id: string;
  /** User-given name, e.g. "Card 1". */
  name: string;
  /** ISO timestamp of when the card was created. */
  createdAt: string;
  /** 5×5 grid of cells, stored as grid[row][col]. */
  grid: BingoCell[][];
}
