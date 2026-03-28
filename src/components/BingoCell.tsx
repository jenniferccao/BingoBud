import React from 'react';
import { colors } from '../styles/tokens';
import type { BingoCellState } from '../types';

interface BingoCellProps {
  value: number | null;
  state: BingoCellState;
  isFree: boolean;
  onPress?: () => void;
}

const STATE_COLORS: Record<BingoCellState, string> = {
  unmarked: 'rgba(15, 15, 35, 0.6)',
  marked: colors.marked,
  oneAway: colors.nearBingo,
  bingo: colors.completedBingo,
};

export const BingoCell: React.FC<BingoCellProps> = ({
  value,
  state,
  isFree,
  onPress,
}) => {
  const bgColor =
    isFree && state === 'unmarked'
      ? colors.freeCell
      : STATE_COLORS[state];

  const textColor =
    state !== 'unmarked' || isFree
      ? colors.background
      : colors.bodyTextMuted;

  const cellStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px',
    fontWeight: 500,
    color: textColor,
    aspectRatio: '1',
    borderRadius: '2px',
    border: `1px solid ${colors.surfaceBorderLight}`,
    cursor: onPress ? 'pointer' : 'inherit',
    transition: 'background-color 0.15s ease, transform 0.1s ease',
  };

  return (
    <div style={cellStyle} onClick={onPress}>
      {isFree ? (
        <span style={{ fontSize: '7px', fontWeight: 600 }}>FREE</span>
      ) : (
        value
      )}
    </div>
  );
};

export default BingoCell;
