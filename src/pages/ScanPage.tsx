import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { useNavigation } from '../store/navigation';
import { colors, borderRadius, fontSize, spacing, glassEffect } from '../styles/tokens';

const containerStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.xl,
};

const cameraPlaceholderStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.lg,
  width: '100%',
  flex: 1,
  minHeight: '300px',
  ...glassEffect,
  borderRadius: borderRadius.lg,
  marginTop: spacing.xl,
};

const iconStyle: React.CSSProperties = {
  color: '#BEBEFF',
};

const CameraIcon: React.FC = () => (
  <svg style={iconStyle} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const labelStyle: React.CSSProperties = {
  fontSize: fontSize.md,
  color: '#BEBEFF',
  textAlign: 'center',
};

const buttonRowStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.md,
  paddingBottom: spacing.xl,
};

const cancelButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px',
  borderRadius: borderRadius.pill,
  backgroundColor: 'transparent',
  border: `1px solid ${colors.surfaceBorder}`,
  color: '#BEBEFF',
  fontSize: fontSize.md,
  fontWeight: 500,
  cursor: 'pointer',
};

export const ScanPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <PageContainer>
      <div style={containerStyle}>
        <div style={cameraPlaceholderStyle}>
          <CameraIcon />
          <p style={labelStyle}>Camera access required</p>
          <p style={{ ...labelStyle, fontSize: fontSize.sm }}>
            Scanning will be available in a future update
          </p>
        </div>
        <div style={buttonRowStyle}>
          <button
            style={cancelButtonStyle}
            onClick={() => navigateTo('addCard')}
          >
            Cancel
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default ScanPage;
