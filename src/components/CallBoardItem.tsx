import React from 'react';
import { colors, fontSize, borderRadius } from '../styles/tokens';

interface CallBoardItemProps {
  /** The bingo number (1–75). */
  number: number;
  /** Whether this number has been called. */
  isCalled: boolean;
  /** Whether this item is currently selected. */
  isSelected: boolean;
  /** Fired when a called item is tapped. */
  onSelect: (number: number) => void;
}

const baseChipStyle: React.CSSProperties = {
  width: '36px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: borderRadius.sm,
  fontSize: fontSize.xs,
  fontFamily: 'inherit',
  lineHeight: 1,
  border: 'none',
  padding: 0,
  outline: 'none',
  transition: 'transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease',
};

const calledStyle: React.CSSProperties = {
  ...baseChipStyle,
  backgroundColor: colors.accent,
  color: colors.background,
  fontWeight: 700,
  cursor: 'pointer',
};

const selectedStyle: React.CSSProperties = {
  ...baseChipStyle,
  backgroundColor: '#BEBEFF',
  color: colors.background,
  fontWeight: 700,
  cursor: 'pointer',
};

const uncalledStyle: React.CSSProperties = {
  ...baseChipStyle,
  backgroundColor: 'transparent',
  color: colors.bodyTextMuted,
  fontWeight: 500,
  opacity: 0.3,
  cursor: 'default',
};

export const CallBoardItem: React.FC<CallBoardItemProps> = ({
  number,
  isCalled,
  isSelected,
  onSelect,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCalled) {
      onSelect(number);
    }
  };

  let style: React.CSSProperties;
  if (isSelected) {
    style = selectedStyle;
  } else if (isCalled) {
    style = calledStyle;
  } else {
    style = uncalledStyle;
  }

  return (
    <button
      style={style}
      onClick={handleClick}
      aria-label={`Number ${number}${isCalled ? ', called' : ''}${isSelected ? ', selected' : ''}`}
      tabIndex={isCalled ? 0 : -1}
    >
      {number}
    </button>
  );
};

export default CallBoardItem;
