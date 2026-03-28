/**
 * Helpers for converting raw OCR text output into a bingo grid.
 */

/**
 * Normalize a single OCR text result into a number or null.
 * Strips whitespace and non-digit characters, parses the remaining digits.
 */
export function normalizeOcrText(text: string, colIndex?: number): number | null {
  // Strip everything except digits
  const digits = text.replace(/[^0-9]/g, '').trim();
  if (digits.length === 0) return null;

  const num = parseInt(digits, 10);
  // Bingo numbers are overall 1–75
  if (isNaN(num) || num < 1 || num > 75) return null;

  // If column index is known, validate strict bounds
  if (colIndex !== undefined && colIndex >= 0 && colIndex <= 4) {
    const min = colIndex * 15 + 1; // 0=1, 1=16, 2=31, 3=46, 4=61
    const max = min + 14;          // 0=15, 1=30, 2=45, 3=60, 4=75
    if (num < min || num > max) return null;
  }

  return num;
}

/**
 * Build a 5×5 grid of (number | null) from raw OCR text results.
 * Center cell (2,2) is always null (FREE).
 */
export function buildGridFromOcrResults(
  texts: string[][],
): (number | null)[][] {
  const grid: (number | null)[][] = [];

  for (let row = 0; row < 5; row++) {
    const rowValues: (number | null)[] = [];
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        // Center FREE cell
        rowValues.push(null);
      } else {
        const rawText = texts[row]?.[col] ?? '';
        rowValues.push(normalizeOcrText(rawText, col));
      }
    }
    grid.push(rowValues);
  }

  return grid;
}
