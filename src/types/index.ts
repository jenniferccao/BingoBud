export type Page = 'main' | 'addCard' | 'editCard' | 'scan';

export interface NavigationState {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}
