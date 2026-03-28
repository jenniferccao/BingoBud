import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BingoCard } from '../types/BingoCard';
import type { CalledNumber } from '../types/CalledNumber';
import type { BingoCellState } from '../types/BingoCellState';
import {
  buildCalledNumber,
  createEmptyCard,
  createCardFromNumbers,
  updateCellValue,
} from '../utils/bingoHelpers';
import { buildCalledSet } from '../utils/bingoWinCheck';
import { deriveCellStates } from '../utils/bingoMarkState';
import {
  loadCards,
  saveCards,
  loadCalledNumbers,
  saveCalledNumbers,
} from '../utils/storage';

/* ── Public store interface ────────────────────────────────────────── */

export interface BingoStore {
  /** All bingo cards. */
  cards: BingoCard[];
  /** History of called numbers (most recent last). */
  calledNumbers: CalledNumber[];
  /** Derived 5×5 cell state grids, keyed by card id. */
  cellStatesMap: Record<string, BingoCellState[][]>;

  /** Create a new empty card. */
  createCard: (name?: string) => BingoCard;
  /** Create a card from a 5×5 number grid. */
  createCardFromGrid: (numbers: (number | null)[][], name?: string) => BingoCard;
  /** Update an existing card (full replacement). */
  updateCard: (updatedCard: BingoCard) => void;
  /** Update a single cell value on a card. */
  updateCardCell: (cardId: string, row: number, col: number, value: number | null) => void;
  /** Delete a card by id. */
  deleteCard: (cardId: string) => void;

  /** Call a bingo number (1–75). */
  addCalledNumber: (n: number) => void;
  /** Undo the last called number. */
  undoLastCalledNumber: () => void;
}

/* ── Hook implementation ───────────────────────────────────────────── */

export function useBingoStore(): BingoStore {
  const [cards, setCards] = useState<BingoCard[]>(() => loadCards());
  const [calledNumbers, setCalledNumbers] = useState<CalledNumber[]>(() => loadCalledNumbers());

  /* ── Persistence ──────────────────────────────────────────────────── */

  useEffect(() => {
    saveCards(cards);
  }, [cards]);

  useEffect(() => {
    saveCalledNumbers(calledNumbers);
  }, [calledNumbers]);

  /* ── Derived state ────────────────────────────────────────────────── */

  const calledSet = useMemo(() => buildCalledSet(calledNumbers), [calledNumbers]);

  const cellStatesMap = useMemo(() => {
    const map: Record<string, BingoCellState[][]> = {};
    for (const card of cards) {
      map[card.id] = deriveCellStates(card, calledSet);
    }
    return map;
  }, [cards, calledSet]);

  /* ── Card actions ─────────────────────────────────────────────────── */

  const createCardAction = useCallback((name?: string): BingoCard => {
    const card = createEmptyCard(name);
    setCards((prev) => [...prev, card]);
    return card;
  }, []);

  const createCardFromGridAction = useCallback(
    (numbers: (number | null)[][], name?: string): BingoCard => {
      const card = createCardFromNumbers(numbers, name);
      setCards((prev) => [...prev, card]);
      return card;
    },
    [],
  );

  const updateCardAction = useCallback((updatedCard: BingoCard) => {
    setCards((prev) =>
      prev.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
    );
  }, []);

  const updateCardCellAction = useCallback(
    (cardId: string, row: number, col: number, value: number | null) => {
      setCards((prev) =>
        prev.map((c) =>
          c.id === cardId ? updateCellValue(c, row, col, value) : c,
        ),
      );
    },
    [],
  );

  const deleteCardAction = useCallback((cardId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  }, []);

  /* ── Called number actions ────────────────────────────────────────── */

  const addCalledNumberAction = useCallback((n: number) => {
    setCalledNumbers((prev) => {
      // Don't add duplicates
      if (prev.some((c) => c.number === n)) return prev;
      return [...prev, buildCalledNumber(n)];
    });
  }, []);

  const undoLastCalledNumberAction = useCallback(() => {
    setCalledNumbers((prev) => (prev.length > 0 ? prev.slice(0, -1) : prev));
  }, []);

  /* ── Return ───────────────────────────────────────────────────────── */

  return {
    cards,
    calledNumbers,
    cellStatesMap,
    createCard: createCardAction,
    createCardFromGrid: createCardFromGridAction,
    updateCard: updateCardAction,
    updateCardCell: updateCardCellAction,
    deleteCard: deleteCardAction,
    addCalledNumber: addCalledNumberAction,
    undoLastCalledNumber: undoLastCalledNumberAction,
  };
}
