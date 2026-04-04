import React from 'react';
import { colors, fontSize, spacing, borderRadius } from '../styles/tokens';
import { letterForNumber } from '../utils/bingoHelpers';

interface CallBoardActionsProps {
  /** The currently selected bingo number. */
  selectedNumber: number;
  /** Called when the user wants to remove/undo a call. */
  onDelete: (number: number) => void;
  /** Called to dismiss the action bar. */
  onCancel: () => void;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.md,
  padding: `${spacing.sm} ${spacing.lg}`,
  borderRadius: borderRadius.md,
  backgroundColor: colors.surfaceLight,
  border: `1px solid ${colors.glassBorder}`,
  /* Uses the same keyframe injected by ModalContainer */
  animation: 'modalSlideIn 0.15s ease',
};

const labelStyle: React.CSSProperties = {
  fontSize: fontSize.md,
  fontWeight: 600,
  color: '#BEBEFF',
  letterSpacing: '0.5px',
  whiteSpace: 'nowrap',
};

const actionsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: spacing.sm,
};

/*
 * Button styles match DeleteCardOverlay (confirm/cancel pill pattern)
 * to keep the app's confirmation UI consistent.
 */
const confirmButtonStyle: React.CSSProperties = {
  backgroundColor: colors.nearBingo,
  color: colors.background,
  border: 'none',
  borderRadius: '25px',
  padding: `${spacing.sm} ${spacing.md}`,
  fontSize: fontSize.sm,
  fontWeight: 'bold',
  fontFamily: 'inherit',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  whiteSpace: 'nowrap',
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#BEBEFF',
  border: `1px solid ${colors.glassBorder}`,
  borderRadius: '25px',
  padding: `${spacing.sm} ${spacing.md}`,
  fontSize: fontSize.sm,
  fontWeight: 500,
  fontFamily: 'inherit',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};

export const CallBoardActions: React.FC<CallBoardActionsProps> = ({
  selectedNumber,
  onDelete,
  onCancel,
}) => {
  const callLabel = `${letterForNumber(selectedNumber)}${selectedNumber}`;

  return (
    <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
      <span style={labelStyle}>{callLabel}</span>
      <div style={actionsRowStyle}>
        <button
          style={cancelButtonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
        >
          Cancel
        </button>
        <button
          style={confirmButtonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(selectedNumber);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CallBoardActions;
