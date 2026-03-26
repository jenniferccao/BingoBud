import React from 'react';
import { colors, glassEffect, borderRadius } from '../styles/tokens';
import { ActionButton } from './ActionButton';
import { useNavigation } from '../store/navigation';

const barStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'calc(100% - 32px)',
  maxWidth: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  ...glassEffect,
  borderRadius: borderRadius.pill,
  padding: '6px 8px',
  zIndex: 100,
};

const dividerStyle: React.CSSProperties = {
  width: '1px',
  height: '32px',
  backgroundColor: colors.glassBorder,
};

const UndoIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 14 4 9 9 4" />
    <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
  </svg>
);

const MarkIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8 2 6 5 6 8c0 4 6 10 6 10s6-6 6-10c0-3-2-6-6-6z" />
    <circle cx="12" cy="8" r="2" />
    <line x1="8" y1="22" x2="16" y2="22" />
  </svg>
);

const CardIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

export const BottomActionBar: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <nav style={barStyle}>
      <ActionButton
        icon={<UndoIcon />}
        label="Undo"
        onClick={() => {}}
      />
      <div style={dividerStyle} />
      <ActionButton
        icon={<MarkIcon />}
        label="Mark"
        onClick={() => {}}
        variant="primary"
      />
      <div style={dividerStyle} />
      <ActionButton
        icon={<CardIcon />}
        label="+ Card"
        onClick={() => navigateTo('addCard')}
      />
    </nav>
  );
};

export default BottomActionBar;
