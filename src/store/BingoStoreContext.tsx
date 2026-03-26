import React, { createContext, useContext } from 'react';
import { useBingoStore } from './useBingoStore';
import type { BingoStore } from './useBingoStore';

const BingoStoreContext = createContext<BingoStore | null>(null);

/** Provides a single shared BingoStore instance to the whole app. */
export const BingoStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = useBingoStore();
  return (
    <BingoStoreContext.Provider value={store}>
      {children}
    </BingoStoreContext.Provider>
  );
};

/** Consume the shared bingo store. Must be used inside BingoStoreProvider. */
export function useBingoStoreContext(): BingoStore {
  const ctx = useContext(BingoStoreContext);
  if (!ctx) {
    throw new Error(
      'useBingoStoreContext must be used within a BingoStoreProvider',
    );
  }
  return ctx;
}
