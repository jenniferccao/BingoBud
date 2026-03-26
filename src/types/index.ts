export type Page = 'main' | 'addCard' | 'editCard' | 'scan' | 'scanReview';

/** Optional parameters passed between pages during navigation. */
export interface NavParams {
  /** Pre-populated 5×5 grid values for the edit card page. */
  initialGrid?: (number | null)[][];
  /** Page to return to when cancelling from edit. */
  returnTo?: Page;
  /** Full set of scanned card grids (carried through edit round-trips). */
  scannedGrids?: (number | null)[][][];
  /** Index of the card being edited within scannedGrids. */
  editCardIndex?: number;
  /** Captured image data URL from the camera. */
  capturedImage?: string;
}

export interface NavigationState {
  currentPage: Page;
  navParams: NavParams;
  navigateTo: (page: Page, params?: NavParams) => void;
}

// Re-export all domain types
export type { BingoCellState } from './BingoCellState';
export type { BingoCell } from './BingoCell';
export type { BingoCard } from './BingoCard';
export type { CalledNumber } from './CalledNumber';
