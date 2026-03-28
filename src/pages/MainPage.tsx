import React, { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { BingoCardGrid } from '../components/BingoCardGrid';
import { useBingoStoreContext } from '../store/BingoStoreContext';
import { useNavigation } from '../store/navigation';
import { fontSize, spacing, borderRadius, glassEffect } from '../styles/tokens';

/* ── Empty state ──────────────────────────────────────────────────── */

/* ── Empty state ──────────────────────────────────────────────────── */

const emptyStateStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.md,
  padding: `${spacing.lg} 0`,
};

const emptyCardButtonStyle: React.CSSProperties = {
  ...glassEffect,
  borderRadius: borderRadius.md,
  width: '100%',
  aspectRatio: '0.8',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.sm,
  cursor: 'pointer',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
};

const emptyCardLabelStyle: React.CSSProperties = {
  fontSize: fontSize.md,
  fontWeight: 700,
  letterSpacing: '2px',
  color: '#BEBEFF',
};

/* ── Page ─────────────────────────────────────────────────────────── */

export const MainPage: React.FC = () => {
  const { cards, cellStatesMap, deleteCard } = useBingoStoreContext();
  const { navigateTo } = useNavigation();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState<string | null>(null);
  const [isAddPressed, setIsAddPressed] = useState(false);

  // Outside click handler: clicking anywhere in the background clears selection
  const handleBackgroundClick = () => {
    if (selectedCardId) {
      setSelectedCardId(null);
      setIsConfirmingDelete(false);
    }
  };

  const handleSelectCard = (cardId: string) => {
    if (selectedCardId === cardId && !isConfirmingDelete) {
      // Clicking the checked card again hides the X
      setSelectedCardId(null);
      return;
    }
    setSelectedCardId(cardId);
    setIsConfirmingDelete(false);
  };

  const handleDeleteClick = (_cardId: string) => {
    setIsConfirmingDelete(true);
  };

  const handleDeleteConfirm = (cardId: string) => {
    setDeletingCardId(cardId);
    setSelectedCardId(null);
    setIsConfirmingDelete(false);

    // Give the fade animation time to complete before tearing down the component
    setTimeout(() => {
      deleteCard(cardId);
      setDeletingCardId((prev) => (prev === cardId ? null : prev));
    }, 250);
  };

  const handleDeleteCancel = (_cardId: string) => {
    setIsConfirmingDelete(false);
  };

  // Removed SEED_CARDS initialization

  if (cards.length === 0) {
    return (
      <div 
        onClick={handleBackgroundClick} 
        style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <PageContainer bottomPadding>
          <div style={emptyStateStyle}>
            <div
              style={{
                ...emptyCardButtonStyle,
                transform: isAddPressed ? 'scale(0.96)' : 'scale(1)',
                boxShadow: isAddPressed ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
              onClick={() => navigateTo('addCard')}
              onPointerDown={() => setIsAddPressed(true)}
              onPointerUp={() => setIsAddPressed(false)}
              onPointerLeave={() => setIsAddPressed(false)}
            >
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#BEBEFF" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span style={emptyCardLabelStyle}>ADD CARD</span>
            </div>
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div
      onClick={handleBackgroundClick}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <PageContainer bottomPadding>
        <BingoCardGrid
          cards={cards}
          cellStatesMap={cellStatesMap}
          selectedCardId={selectedCardId}
          deletingCardId={deletingCardId}
          isConfirmingDelete={isConfirmingDelete}
          onSelectCard={handleSelectCard}
          onDeleteClick={handleDeleteClick}
          onDeleteConfirm={handleDeleteConfirm}
          onDeleteCancel={handleDeleteCancel}
        />
      </PageContainer>
    </div>
  );
};

export default MainPage;
