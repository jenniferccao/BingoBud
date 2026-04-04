import React, { useState, useCallback } from 'react';
import { ModalContainer } from './ModalContainer';
import { CallBoard } from './CallBoard';
import { CallBoardActions } from './CallBoardActions';
import { useBingoStoreContext } from '../store/BingoStoreContext';
import { colors, fontSize, spacing, borderRadius } from '../styles/tokens';

interface CallBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── Shared title / subtitle ─────────────────────────────────────── */

const titleStyle: React.CSSProperties = {
  fontSize: fontSize.lg,
  fontWeight: 400,
  color: '#BEBEFF',
  textAlign: 'center',
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: fontSize.xs,
  fontWeight: 600,
  color: '#BEBEFF',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  textAlign: 'center',
  margin: 0,
  opacity: 0.7,
};

/* ── Board view styles ───────────────────────────────────────────── */

const boardContainerStyle: React.CSSProperties = {
  overflowY: 'auto',
  maxHeight: 'calc(100dvh - 220px)',
  margin: '0 -4px',
  padding: '0 4px',
};

const closeButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  borderRadius: borderRadius.pill,
  backgroundColor: 'transparent',
  border: '1px solid rgba(90, 90, 160, 0.4)',
  color: '#BEBEFF',
  fontSize: fontSize.md,
  fontWeight: 700,
  fontFamily: 'inherit',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
};

/*
 * Clear All button — matches DeleteCardOverlay confirm style:
 * filled nearBingo background, dark text, pill shape.
 */
const clearAllButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  borderRadius: borderRadius.pill,
  backgroundColor: colors.nearBingo,
  color: colors.background,
  border: 'none',
  fontSize: fontSize.md,
  fontWeight: 'bold',
  fontFamily: 'inherit',
  cursor: 'pointer',
  transition: 'opacity 0.15s ease',
};

/* ── Confirmation view styles ────────────────────────────────────── */

const confirmMessageStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '2px',
  color: '#BEBEFF',
  margin: 0,
  textAlign: 'center',
};

const confirmActionsStyle: React.CSSProperties = {
  display: 'flex',
  gap: spacing.md,
  width: '100%',
  justifyContent: 'center',
};

const confirmCancelStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#BEBEFF',
  border: `1px solid ${colors.glassBorder}`,
  borderRadius: '25px',
  padding: `${spacing.sm} ${spacing.md}`,
  fontSize: fontSize.sm,
  fontWeight: 500,
  fontFamily: 'inherit',
  cursor: 'pointer',
};

const confirmClearStyle: React.CSSProperties = {
  backgroundColor: colors.nearBingo,
  color: colors.background,
  border: 'none',
  borderRadius: '25px',
  padding: `${spacing.sm} ${spacing.md}`,
  fontSize: fontSize.sm,
  fontWeight: 'bold',
  fontFamily: 'inherit',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

export const CallBoardModal: React.FC<CallBoardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { calledNumbers, removeCalledNumber, clearAllCalledNumbers } = useBingoStoreContext();
  const [confirming, setConfirming] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const handleSelectNumber = useCallback((n: number) => {
    setSelectedNumber((prev) => (prev === n ? null : n));
  }, []);

  const handleRemoveCall = useCallback(
    (n: number) => {
      removeCalledNumber(n);
      setSelectedNumber(null);
    },
    [removeCalledNumber],
  );

  const handleCancelSelection = useCallback(() => {
    setSelectedNumber(null);
  }, []);

  const handleClearPress = () => setConfirming(true);
  const handleCancelClear = () => setConfirming(false);

  const handleConfirmClear = () => {
    clearAllCalledNumbers();
    setSelectedNumber(null);
    setConfirming(false);
  };

  const handleClose = () => {
    setSelectedNumber(null);
    setConfirming(false);
    onClose();
  };

  /* ── Confirmation view ──────────────────────────────────────────── */
  if (confirming) {
    return (
      <ModalContainer isOpen={isOpen} onClose={handleCancelClear}>
        <p style={confirmMessageStyle}>CLEAR ALL CALLS?</p>
        <div style={confirmActionsStyle}>
          <button style={confirmCancelStyle} onClick={handleCancelClear}>
            Cancel
          </button>
          <button style={confirmClearStyle} onClick={handleConfirmClear}>
            Clear
          </button>
        </div>
      </ModalContainer>
    );
  }

  /* ── Default board view ─────────────────────────────────────────── */
  return (
    <ModalContainer isOpen={isOpen} onClose={handleClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
        <p style={titleStyle}>Call Board</p>
        <p style={subtitleStyle}>Tap number to edit</p>
      </div>
      <div style={boardContainerStyle}>
        <CallBoard
          calledNumbers={calledNumbers}
          selectedNumber={selectedNumber}
          onSelectNumber={handleSelectNumber}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {selectedNumber !== null && (
          <CallBoardActions
            selectedNumber={selectedNumber}
            onDelete={handleRemoveCall}
            onCancel={handleCancelSelection}
          />
        )}
        {calledNumbers.length > 0 && selectedNumber === null && (
          <button style={clearAllButtonStyle} onClick={handleClearPress}>
            Clear All
          </button>
        )}
        <button style={closeButtonStyle} onClick={handleClose}>
          Close
        </button>
      </div>
    </ModalContainer>
  );
};

export default CallBoardModal;
