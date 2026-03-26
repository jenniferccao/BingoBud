import React, { useState, useRef, useEffect } from 'react';
import { colors, fontSize } from '../styles/tokens';

interface EditableCellProps {
  value: number | null;
  row: number;
  col: number;
  isFree: boolean;
  onValueChange: (row: number, col: number, value: number | null) => void;
  /** Valid range [min, max] for this column, e.g. [1, 15] for B. */
  validRange: [number, number];
}

const cellBaseStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  aspectRatio: '1',
  border: `1px solid ${colors.surfaceBorderLight}`,
  borderRadius: '4px',
  fontSize: fontSize.md,
  fontWeight: 500,
  color: '#BEBEFF',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, border-color 0.15s ease',
  backgroundColor: 'rgba(15, 15, 35, 0.4)',
  position: 'relative',
};

const freeCellStyle: React.CSSProperties = {
  ...cellBaseStyle,
  backgroundColor: colors.freeCell,
  color: colors.background,
  fontSize: fontSize.lg,
  fontWeight: 600,
  cursor: 'default',
};

const editingCellStyle: React.CSSProperties = {
  ...cellBaseStyle,
  borderColor: colors.accentLight,
  backgroundColor: 'rgba(124, 108, 240, 0.15)',
};

const filledCellStyle: React.CSSProperties = {
  ...cellBaseStyle,
  backgroundColor: 'rgba(20, 20, 45, 0.7)',
};

const errorCellStyle: React.CSSProperties = {
  ...cellBaseStyle,
  borderColor: '#f06292',
  backgroundColor: 'rgba(240, 98, 146, 0.1)',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  textAlign: 'center',
  fontSize: fontSize.md,
  fontWeight: 600,
  color: '#BEBEFF',
  caretColor: colors.accentLight,
};

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  row,
  col,
  isFree,
  onValueChange,
  validRange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (isFree) {
    return <div style={freeCellStyle}>FREE</div>;
  }

  const handleTap = () => {
    setIsEditing(true);
    setInputValue(value !== null ? String(value) : '');
    setHasError(false);
  };

  const parseAndValidate = (raw: string): number | null | 'invalid' => {
    // Strip spaces, trim
    const cleaned = raw.replace(/\s/g, '').trim();

    if (cleaned === '') return 'invalid'; // Empty input is invalid

    // Allow optional letter prefix (case-insensitive)
    const withLetterMatch = cleaned.match(/^[bingoGBINO](\d+)$/i);
    const numStr = withLetterMatch ? withLetterMatch[1] : cleaned;

    const num = parseInt(numStr, 10);
    if (isNaN(num)) return 'invalid';
    if (num < validRange[0] || num > validRange[1]) return 'invalid';

    return num;
  };

  const commit = () => {
    const result = parseAndValidate(inputValue);
    if (result === 'invalid') {
      setHasError(true);
      // Auto-dismiss error after a short delay and revert
      setTimeout(() => {
        setIsEditing(false);
        setHasError(false);
      }, 800);
      return;
    }
    onValueChange(row, col, result);
    setIsEditing(false);
    setHasError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      commit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setHasError(false);
    }
  };

  if (isEditing) {
    return (
      <div style={hasError ? errorCellStyle : editingCellStyle}>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setHasError(false);
          }}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          style={inputStyle}
          maxLength={5}
          placeholder={`${validRange[0]}–${validRange[1]}`}
        />
      </div>
    );
  }

  return (
    <div
      style={value !== null ? filledCellStyle : cellBaseStyle}
      onClick={handleTap}
    >
      {value !== null ? value : ''}
    </div>
  );
};

export default EditableCell;
