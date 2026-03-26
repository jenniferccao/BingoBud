import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { BackButton } from '../components/BackButton';
import { AddCardOption } from '../components/AddCardOption';
import { useNavigation } from '../store/navigation';
import { fontSize, spacing } from '../styles/tokens';

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: fontSize.xl,
  fontWeight: 400,
  color: '#BEBEFF',
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

const iconStyle: React.CSSProperties = {
  color: '#BEBEFF',
  marginBottom: spacing.sm,
};

const bottomAreaStyle: React.CSSProperties = {
  paddingBottom: spacing.xl,
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

export const AddCardPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <PageContainer>
      <h2 style={titleStyle}>Add a card</h2>
      <div style={optionsGridStyle}>
        <AddCardOption
          icon={<ManualIcon />}
          label="Manual"
          onPress={() => navigateTo('editCard')}
        />
        <AddCardOption
          icon={<ScanIcon />}
          label="Scan"
          onPress={() => navigateTo('scan')}
        />
      </div>
      <div style={bottomAreaStyle}>
        <BackButton label="← Return" onClick={() => navigateTo('main')} />
      </div>
    </PageContainer>
  );
};

export default AddCardPage;
