import type { BingoCard } from '../types/BingoCard';
import type { CalledNumber } from '../types/CalledNumber';
import { generateUniqueId } from './bingoHelpers';

const STORAGE_KEYS = {
  CARDS: 'bingo_cards',
  CALLED_NUMBERS: 'bingo_called_numbers',
};

export function loadCards(): BingoCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CARDS);
    if (!raw) return [];
    
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const seenIds = new Set<string>();
      return parsed.map((card: any) => {
        if (!card.id || seenIds.has(card.id)) {
          const newId = generateUniqueId();
          seenIds.add(newId);
          return { ...card, id: newId };
        }
        seenIds.add(card.id);
        return card as BingoCard;
      });
    }
    console.warn('Malformed cards in localStorage, ignoring.');
    return [];
  } catch (err) {
    console.error('Failed to load cards from storage:', err);
    return [];
  }
}

export function saveCards(cards: BingoCard[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  } catch (err) {
    console.error('Failed to save cards to storage:', err);
  }
}

export function loadCalledNumbers(): CalledNumber[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CALLED_NUMBERS);
    if (!raw) return [];
    
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    console.warn('Malformed called numbers in localStorage, ignoring.');
    return [];
  } catch (err) {
    console.error('Failed to load called numbers from storage:', err);
    return [];
  }
}

export function saveCalledNumbers(calledNumbers: CalledNumber[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CALLED_NUMBERS, JSON.stringify(calledNumbers));
  } catch (err) {
    console.error('Failed to save called numbers to storage:', err);
  }
}
