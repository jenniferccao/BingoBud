import React from 'react';
import { borderRadius, fontSize, spacing, glassEffect } from '../styles/tokens';
import { BingoCell } from './BingoCell';
import type { BingoCard as BingoCardType } from '../types/BingoCard';
import type { BingoCellState } from '../types/BingoCellState';

const BINGO_HEADERS = ['B', 'I', 'N', 'G', 'O'];

interface BingoCardProps {
  card: BingoCardType;
  cellStates: BingoCellState[][];
  onCardPress?: (cardId: string) => void;
}

const cardStyle: React.CSSProperties = {
  ...glassEffect,
  borderRadius: borderRadius.md,
  padding: spacing.sm,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
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

export const BingoCardComponent: React.FC<BingoCardProps> = ({ card, cellStates, onCardPress }) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const dynamicCardStyle: React.CSSProperties = {
    ...cardStyle,
    transform: isPressed ? 'scale(0.97)' : 'scale(1)',
    boxShadow: isPressed
      ? 'none'
      : '0 2px 8px rgba(0, 0, 0, 0.3)',
  };

  return (
    <div
      style={dynamicCardStyle}
      onClick={() => onCardPress?.(card.id)}
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
    </div>
  );
};

export { BingoCardComponent as BingoCard };
export default BingoCardComponent;
