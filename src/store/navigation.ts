import { createContext, useContext } from 'react';
import type { NavigationState } from '../types';

export const NavigationContext = createContext<NavigationState | null>(null);

export const useNavigation = (): NavigationState => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
