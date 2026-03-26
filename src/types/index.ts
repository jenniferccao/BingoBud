export type Page = 'main' | 'addCard' | 'editCard' | 'scan';

export interface NavigationState {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

// Re-export all domain types
export type { BingoCellState } from './BingoCellState';
export type { BingoCell } from './BingoCell';
export type { BingoCard } from './BingoCard';
export type { CalledNumber } from './CalledNumber';
