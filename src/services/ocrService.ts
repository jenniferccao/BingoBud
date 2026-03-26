/**
 * OCR service wrapping Tesseract.js.
 * Provides digit-focused recognition for bingo card cell images.
 */

import { createWorker, Worker } from 'tesseract.js';

let workerInstance: Worker | null = null;

/** Get or create a reusable Tesseract worker configured for digit recognition. */
async function getWorker(): Promise<Worker> {
  if (!workerInstance) {
    workerInstance = await createWorker('eng', 1, {
      // Tesseract.js loads assets from CDN by default — no extra config needed
    });
    // Restrict character set to digits only for better accuracy
    await workerInstance.setParameters({
      tessedit_char_whitelist: '0123456789',
    });
  }
  return workerInstance;
}

/**
 * Run OCR on a 5×5 grid of cell canvases.
 * Skips the center cell (2,2) — returns '' for it.
 * Returns a 5×5 array of raw recognized text strings.
 */
export async function recognizeCells(
  cellCanvases: HTMLCanvasElement[][],
): Promise<string[][]> {
  const worker = await getWorker();
  const results: string[][] = [];

  for (let row = 0; row < 5; row++) {
    const rowResults: string[] = [];
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        // Skip center FREE cell
        rowResults.push('');
        continue;
      }

      try {
        const canvas = cellCanvases[row][col];
        const dataUrl = canvas.toDataURL('image/png');
        const { data } = await worker.recognize(dataUrl);
        rowResults.push(data.text.trim());
      } catch (err) {
        console.warn(`OCR failed for cell [${row},${col}]:`, err);
        rowResults.push('');
      }
    }
    results.push(rowResults);
  }

  return results;
}

/**
 * Terminate the Tesseract worker to free resources.
 * Safe to call even if no worker exists.
 */
export async function terminateOcrWorker(): Promise<void> {
  if (workerInstance) {
    await workerInstance.terminate();
    workerInstance = null;
  }
}
