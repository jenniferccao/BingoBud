import React from 'react';
import { borderRadius } from '../styles/tokens';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'primary';
}

const baseStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  padding: '10px 20px',
  borderRadius: borderRadius.md,
  border: 'none',
  background: 'transparent',
  color: '#BEBEFF',
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  flex: 1,
};

const primaryStyle: React.CSSProperties = {
  ...baseStyle,
  color: '#BEBEFF',
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
  variant = 'default',
}) => {
  return (
    <button
      style={variant === 'primary' ? primaryStyle : baseStyle}
      onClick={onClick}
    >
      <span style={{ fontSize: '20px', lineHeight: 1 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
