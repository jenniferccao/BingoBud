import React from 'react';
import { colors, fontSize, spacing, borderRadius } from '../styles/tokens';

interface DeleteCardOverlayProps {
  onConfirm: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
}

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: colors.background,
  borderRadius: borderRadius.md,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.md,
  zIndex: 20,
  color: colors.bodyText,
  padding: spacing.md,
  textAlign: 'center',
};

const messageStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '2px',
  color: '#BEBEFF',
  margin: 0,
};

const actionsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: spacing.md,
  width: '100%',
  justifyContent: 'center',
};

const confirmButtonStyle: React.CSSProperties = {
  backgroundColor: colors.nearBingo,
  color: colors.background,
  border: 'none',
  borderRadius: '25px',
  padding: `${spacing.sm} ${spacing.md}`,
  fontSize: fontSize.sm,
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#BEBEFF',
  border: `1px solid ${colors.glassBorder}`,
  borderRadius: '25px',
  padding: `${spacing.sm} ${spacing.md}`,
  fontSize: fontSize.sm,
  fontWeight: 500,
  cursor: 'pointer',
};

export const DeleteCardOverlay: React.FC<DeleteCardOverlayProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div
      style={overlayStyle}
      onClick={(e) => {
        // Prevent click from bubbling up to the card or page container
        e.stopPropagation();
      }}
    >
      <p style={messageStyle}>DELETE CARD?</p>
      <div style={actionsRowStyle}>
        <button
          style={cancelButtonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onCancel(e);
          }}
        >
          Cancel
        </button>
        <button
          style={confirmButtonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onConfirm(e);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
