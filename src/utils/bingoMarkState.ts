import type { BingoCard } from '../types/BingoCard';
import type { BingoCellState } from '../types/BingoCellState';
import { evaluateLines, isCellHit } from './bingoWinCheck';

/**
 * Derive the 5×5 visual state grid for a single card.
 * Priority: bingo > oneAway > marked > unmarked
 */
export function deriveCellStates(
  card: BingoCard,
  calledSet: Set<number>,
): BingoCellState[][] {
  const grid = card.grid;
  // Initialize to unmarked
  const states: BingoCellState[][] = Array.from({ length: 5 }, () =>
    Array(5).fill('unmarked'),
  );

  const statuses = evaluateLines(grid, calledSet);

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const cell = grid[r][c];

      // If it's not hit at all, it's unmarked
      if (!isCellHit(cell, calledSet)) {
        continue; // stays 'unmarked'
      }

      // Default state for a hit cell
      let cellState: BingoCellState = 'marked';

      // Find all lines containing this cell
      const linesWithCell = statuses.filter((status) =>
        status.cells.some(([lr, lc]) => lr === r && lc === c),
      );

      // Check priorities: bingo overrides oneAway overrides marked
      let isPartofBingo = false;
      let isPartOfOneAway = false;

      for (const line of linesWithCell) {
        if (line.isBingo) isPartofBingo = true;
        if (line.isOneAway) isPartOfOneAway = true;
      }

      if (isPartofBingo) {
        cellState = 'bingo';
      } else if (isPartOfOneAway) {
        cellState = 'oneAway';
      }

      states[r][c] = cellState;
    }
  }

  return states;
}
