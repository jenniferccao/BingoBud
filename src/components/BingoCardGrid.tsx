import React from 'react';
import { spacing } from '../styles/tokens';
import { BingoCardComponent } from './BingoCard';
import type { BingoCard } from '../types/BingoCard';
import type { BingoCellState } from '../types/BingoCellState';

interface BingoCardGridProps {
  cards: BingoCard[];
  cellStatesMap: Record<string, BingoCellState[][]>;
  onCardPress?: (cardId: string) => void;
  selectedCardId?: string | null;
  deletingCardId?: string | null;
  isConfirmingDelete?: boolean;
  onSelectCard?: (cardId: string) => void;
  onDeleteClick?: (cardId: string) => void;
  onDeleteConfirm?: (cardId: string) => void;
  onDeleteCancel?: (cardId: string) => void;
}

const gridWrapperStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.md,
  padding: `${spacing.lg} 0`,
};

/** Default 5×5 unmarked grid for cards without derived states. */
const DEFAULT_STATES: BingoCellState[][] = Array.from({ length: 5 }, () =>
  Array(5).fill('unmarked'),
);

export const BingoCardGrid: React.FC<BingoCardGridProps> = ({
  cards,
  cellStatesMap,
  onCardPress,
  selectedCardId,
  deletingCardId,
  isConfirmingDelete,
  onSelectCard,
  onDeleteClick,
  onDeleteConfirm,
  onDeleteCancel,
}) => {
  return (
    <div style={gridWrapperStyle}>
      {cards.map((card) => (
        <BingoCardComponent
          key={card.id}
          card={card}
          cellStates={cellStatesMap[card.id] ?? DEFAULT_STATES}
          onCardPress={onCardPress}
          isSelected={selectedCardId === card.id}
          isDeleting={deletingCardId === card.id}
          isConfirmingDelete={selectedCardId === card.id && isConfirmingDelete}
          onSelect={onSelectCard}
          onDeleteClick={onDeleteClick}
          onDeleteConfirm={onDeleteConfirm}
          onDeleteCancel={onDeleteCancel}
        />
      ))}
    </div>
  );
};

export default BingoCardGrid;
