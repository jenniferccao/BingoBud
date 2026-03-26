import React, { useState, useCallback } from 'react';
import { ModalContainer } from './ModalContainer';
import { NumberInput } from './NumberInput';
import { colors, borderRadius, fontSize, spacing } from '../styles/tokens';
import { parseCallString } from '../utils/bingoHelpers';
import { useBingoStoreContext } from '../store/BingoStoreContext';

interface MarkNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const titleStyle: React.CSSProperties = {
  fontSize: fontSize.lg,
  fontWeight: 500,
  color: '#BEBEFF',
  textAlign: 'center',
  margin: 0,
};

const actionsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
};

const saveButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  borderRadius: borderRadius.pill,
  backgroundColor: colors.accent,
  border: `1px solid rgba(90, 90, 160, 0.4)`,
  color: colors.background,
  fontSize: fontSize.md,
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
};

const cancelButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  borderRadius: borderRadius.pill,
  backgroundColor: 'transparent',
  border: `1px solid rgba(90, 90, 160, 0.4)`,
  color: '#BEBEFF',
  fontSize: fontSize.md,
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
};

export const MarkNumberModal: React.FC<MarkNumberModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addCalledNumber } = useBingoStoreContext();
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleClose = useCallback(() => {
    setInputValue('');
    setHasError(false);
    onClose();
  }, [onClose]);

  const handleSave = useCallback(() => {
    // Normalize: strip spaces, uppercase the letter
    const normalized = inputValue.replace(/\s/g, '').toUpperCase();
    const parsed = parseCallString(normalized);

    if (!parsed) {
      setHasError(true);
      return;
    }

    addCalledNumber(parsed.number);
    setInputValue('');
    setHasError(false);
    onClose();
  }, [inputValue, addCalledNumber, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleClose();
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    setHasError(false);
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={handleClose}>
      <p style={titleStyle}>Mark a new number</p>

      <div onKeyDown={handleKeyDown}>
        <NumberInput
          value={inputValue}
          onChange={handleInputChange}
          hasError={hasError}
          placeholder="Enter cell number"
          autoFocus={isOpen}
        />
      </div>

      <div style={actionsStyle}>
        <button style={saveButtonStyle} onClick={handleSave}>
          Save
        </button>
        <button style={cancelButtonStyle} onClick={handleClose}>
          Cancel
        </button>
      </div>
    </ModalContainer>
  );
};

export default MarkNumberModal;
