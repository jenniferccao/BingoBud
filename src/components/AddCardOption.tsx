import React from 'react';
import { borderRadius, spacing, glassEffect } from '../styles/tokens';

interface AddCardOptionProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

const optionCardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.md,
  ...glassEffect,
  borderRadius: borderRadius.lg,
  padding: spacing.xl,
  cursor: 'pointer',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  minHeight: '280px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 500,
  color: '#BEBEFF',
};

export const AddCardOption: React.FC<AddCardOptionProps> = ({
  icon,
  label,
  onPress,
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const dynamicStyle: React.CSSProperties = {
    ...optionCardStyle,
    transform: isPressed ? 'scale(0.96)' : 'scale(1)',
    boxShadow: isPressed ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.3)',
  };

  return (
    <button
      style={dynamicStyle}
      onClick={onPress}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
    >
      {icon}
      <span style={labelStyle}>{label}</span>
    </button>
  );
};

export default AddCardOption;
