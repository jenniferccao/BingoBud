import React, { useEffect } from 'react';
import { PageContainer } from '../components/PageContainer';
import { BingoCardGrid } from '../components/BingoCardGrid';
import { useBingoStoreContext } from '../store/BingoStoreContext';
import { colors, fontSize, spacing } from '../styles/tokens';

/* ── Seed data (2 demo cards always present) ─────────────────────── */
// These values encode two realistic bingo cards.
const SEED_CARDS = [
  {
    name: 'Card 1',
    numbers: [
      [1,  16, 31, 46, 61],
      [8,  22, 38, 52, 70],
      [9,  28, null, 55, 72],
      [12, 30, 40, 58, 74],
      [15, 19, 44, 60, 75],
    ] as (number | null)[][],
  },
  {
    name: 'Card 2',
    numbers: [
      [3,  20, 35, 49, 63],
      [7,  24, 39, 53, 68],
      [11, 26, null, 56, 71],
      [14, 29, 42, 59, 73],
      [5,  18, 45, 47, 67],
    ] as (number | null)[][],
  },
];

/* ── Empty state ──────────────────────────────────────────────────── */

const emptyStateStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.md,
  opacity: 0.5,
};

const emptyIconStyle: React.CSSProperties = { fontSize: '48px' };

const emptyLabelStyle: React.CSSProperties = {
  fontSize: fontSize.md,
  color: colors.textSecondary,
  textAlign: 'center',
  letterSpacing: '1px',
};

/* ── Page ─────────────────────────────────────────────────────────── */

export const MainPage: React.FC = () => {
  const { cards, cellStatesMap, createCardFromGrid } = useBingoStoreContext();

  // Seed 2 demo cards on first render if the store is empty
  useEffect(() => {
    if (cards.length === 0) {
      for (const seed of SEED_CARDS) {
        createCardFromGrid(seed.numbers, seed.name);
      }
    }
    // Only run once on mount — intentional empty-dep omission
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (cards.length === 0) {
    return (
      <PageContainer bottomPadding>
        <div style={emptyStateStyle}>
          <span style={emptyIconStyle}>🎱</span>
          <p style={emptyLabelStyle}>No cards yet.{'\n'}Tap + Card to add one.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer bottomPadding>
      <BingoCardGrid
        cards={cards}
        cellStatesMap={cellStatesMap}
      />
    </PageContainer>
  );
};

export default MainPage;
