import React from 'react';
import { colors, spacing } from '../styles/tokens';

interface DeleteCardButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

const buttonStyle: React.CSSProperties = {
  position: 'absolute',
  top: spacing.sm,
  right: spacing.sm,
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: colors.nearBingo,
  color: colors.background,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  zIndex: 10,
};

export const DeleteCardButton: React.FC<DeleteCardButtonProps> = ({ onClick }) => {
  return (
    <button
      style={buttonStyle}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      aria-label="Delete card"
    >
      ✕
    </button>
  );
};
