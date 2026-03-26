import React from 'react';
import { colors, borderRadius } from '../styles/tokens';

interface BackButtonProps {
  label?: string;
  onClick: () => void;
}

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px',
  borderRadius: borderRadius.pill,
  border: `1px solid ${colors.surfaceBorder}`,
  backgroundColor: 'transparent',
  color: '#BEBEFF',
  fontSize: '16px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, border-color 0.2s ease',
  textAlign: 'center',
};

export const BackButton: React.FC<BackButtonProps> = ({
  label = '← Return',
  onClick,
}) => {
  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default BackButton;
