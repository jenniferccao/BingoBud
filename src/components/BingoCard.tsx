import React from 'react';
import { borderRadius, fontSize, spacing, glassEffect } from '../styles/tokens';
import { BingoCell } from './BingoCell';
import { DeleteCardButton } from './DeleteCardButton';
import { DeleteCardOverlay } from './DeleteCardOverlay';
import type { BingoCard as BingoCardType } from '../types/BingoCard';
import type { BingoCellState } from '../types/BingoCellState';

const BINGO_HEADERS = ['B', 'I', 'N', 'G', 'O'];

interface BingoCardProps {
  card: BingoCardType;
  cellStates: BingoCellState[][];
  onCardPress?: (cardId: string) => void;
  isSelected?: boolean;
  isDeleting?: boolean;
  isConfirmingDelete?: boolean;
  onSelect?: (cardId: string) => void;
  onDeleteClick?: (cardId: string) => void;
  onDeleteConfirm?: (cardId: string) => void;
  onDeleteCancel?: (cardId: string) => void;
}

const cardStyle: React.CSSProperties = {
  ...glassEffect,
  borderRadius: borderRadius.md,
  padding: spacing.sm,
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease',
};

const headerRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '1px',
  marginBottom: '1px',
};

const headerCellStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: fontSize.xs,
  fontWeight: 700,
  color: '#BEBEFF',
  padding: '4px 0',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '1px',
};

export const BingoCardComponent: React.FC<BingoCardProps> = ({
  card,
  cellStates,
  onCardPress,
  isSelected = false,
  isDeleting = false,
  isConfirmingDelete = false,
  onSelect,
  onDeleteClick,
  onDeleteConfirm,
  onDeleteCancel,
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const dynamicCardStyle: React.CSSProperties = {
    ...cardStyle,
    transform: isPressed ? 'scale(0.97)' : isDeleting ? 'scale(0.92)' : 'scale(1)',
    opacity: isDeleting ? 0 : 1,
    boxShadow: isPressed || isDeleting
      ? 'none'
      : '0 2px 8px rgba(0, 0, 0, 0.3)',
    pointerEvents: isDeleting ? 'none' : 'auto',
  };

  return (
    <div
      style={dynamicCardStyle}
      onClick={(e) => {
        // Prevent click from bubbling up to the container's outside-click handler
        e.stopPropagation();
        onCardPress?.(card.id);
        onSelect?.(card.id);
      }}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
    >
      {/* B-I-N-G-O header */}
      <div style={headerRowStyle}>
        {BINGO_HEADERS.map((letter) => (
          <div key={letter} style={headerCellStyle}>
            {letter}
          </div>
        ))}
      </div>

      {/* 5×5 cell grid */}
      <div style={gridStyle}>
        {card.grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            const state = cellStates[rowIdx][colIdx];
            return (
              <BingoCell
                key={`${rowIdx}-${colIdx}`}
                value={cell.value}
                state={cell.isFree && state === 'unmarked' ? 'marked' : state}
                isFree={cell.isFree}
              />
            );
          })
        )}
      </div>

      {isSelected && !isConfirmingDelete && onDeleteClick && (
        <DeleteCardButton onClick={() => onDeleteClick(card.id)} />
      )}

      {isConfirmingDelete && onDeleteConfirm && onDeleteCancel && (
        <DeleteCardOverlay
          onConfirm={() => onDeleteConfirm(card.id)}
          onCancel={() => onDeleteCancel(card.id)}
        />
      )}
    </div>
  );
};

export { BingoCardComponent as BingoCard };
export default BingoCardComponent;
