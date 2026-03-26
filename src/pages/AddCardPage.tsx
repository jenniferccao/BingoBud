import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { BackButton } from '../components/BackButton';
import { useNavigation } from '../store/navigation';
import { colors, borderRadius, fontSize, spacing, glassEffect } from '../styles/tokens';

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: fontSize.xl,
  fontWeight: 400,
  color: colors.bodyText,
  marginTop: spacing.xxxl,
  marginBottom: spacing.xl,
};

const optionsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.lg,
  flex: 1,
  marginBottom: spacing.xl,
};

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
  transition: 'border-color 0.2s ease, background-color 0.2s ease',
  minHeight: '280px',
};

const iconStyle: React.CSSProperties = {
  color: colors.bodyTextMuted,
  marginBottom: spacing.sm,
};

const optionLabelStyle: React.CSSProperties = {
  fontSize: fontSize.lg,
  fontWeight: 500,
  color: colors.bodyText,
};

const ManualIcon: React.FC = () => (
  <svg style={iconStyle} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ScanIcon: React.FC = () => (
  <svg style={iconStyle} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const bottomAreaStyle: React.CSSProperties = {
  paddingBottom: spacing.xl,
};

export const AddCardPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <PageContainer>
      <h2 style={titleStyle}>Add a card</h2>
      <div style={optionsGridStyle}>
        <button
          style={optionCardStyle}
          onClick={() => navigateTo('editCard')}
        >
          <ManualIcon />
          <span style={optionLabelStyle}>Manual</span>
        </button>
        <button
          style={optionCardStyle}
          onClick={() => navigateTo('scan')}
        >
          <ScanIcon />
          <span style={optionLabelStyle}>Scan</span>
        </button>
      </div>
      <div style={bottomAreaStyle}>
        <BackButton label="← Return" onClick={() => navigateTo('main')} />
      </div>
    </PageContainer>
  );
};

export default AddCardPage;
