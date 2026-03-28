import React, { useState, useCallback } from 'react';
import { PageContainer } from '../components/PageContainer';
import { ScannedCardPreview } from '../components/ScannedCardPreview';
import { ScanActions } from '../components/ScanActions';
import { useNavigation } from '../store/navigation';
import { useBingoStoreContext } from '../store/BingoStoreContext';
import { fontSize, spacing } from '../styles/tokens';

/* ── Mock data generation ──────────────────────────────────────────── */




/* ── Styles ────────────────────────────────────────────────────────── */

const headerContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  paddingTop: spacing.xl,
  paddingBottom: spacing.lg,
};

const titleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 400,
  color: '#BEBEFF',
  marginBottom: spacing.xs,
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: fontSize.xs,
  fontWeight: 600,
  color: '#BEBEFF',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  margin: 0,
  opacity: 0.7,
};

const cardContainerStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  padding: `${spacing.sm} 0`,
};

const cardWrapperStyle: React.CSSProperties = {
  width: '70%',
  maxWidth: '260px',
};

const actionsContainerStyle: React.CSSProperties = {
  paddingTop: spacing.xl,
  paddingBottom: spacing.sm,
};

/* ── Page ──────────────────────────────────────────────────────────── */

export const ScanReviewPage: React.FC = () => {
  const { navigateTo, navParams } = useNavigation();
  const { createCardFromGrid } = useBingoStoreContext();

  // Restore grid from navParams (after edit round-trip) or fallback to empty grid
  const [scannedGrid, setScannedGrid] = useState<(number | null)[][]>(
    () =>
      navParams.scannedGrids?.[0] ??
      Array.from({ length: 5 }, () => Array(5).fill(null)),
  );

  // Apply edited grid returned via navParams
  React.useEffect(() => {
    if (navParams.scannedGrids?.[0]) {
      setScannedGrid(navParams.scannedGrids[0]);
    }
  }, []); // Run once on mount

  const handleCardPress = useCallback(() => {
    navigateTo('editCard', {
      initialGrid: scannedGrid,
      returnTo: 'scanReview',
      scannedGrids: [scannedGrid],
      editCardIndex: 0,
    });
  }, [navigateTo, scannedGrid]);

  const handleSave = useCallback(() => {
    createCardFromGrid(scannedGrid, 'Scanned Card');
    navigateTo('main');
  }, [scannedGrid, createCardFromGrid, navigateTo]);

  const handleCancel = useCallback(() => {
    navigateTo('scan');
  }, [navigateTo]);

  return (
    <PageContainer>
      {/* Header */}
      <div style={headerContainerStyle}>
        <p style={titleStyle}>Card scanned okay?</p>
        <p style={subtitleStyle}>Click on card to edit</p>
      </div>

      {/* Single card preview */}
      <div style={cardContainerStyle}>
        <div style={cardWrapperStyle}>
          <ScannedCardPreview
            values={scannedGrid}
            label="SCANNED CARD"
            onPress={handleCardPress}
          />
        </div>
      </div>

      {/* Actions */}
      <div style={actionsContainerStyle}>
        <ScanActions onSave={handleSave} onCancel={handleCancel} />
      </div>
    </PageContainer>
  );
};

export default ScanReviewPage;

