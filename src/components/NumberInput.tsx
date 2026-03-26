import React, { useRef, useEffect } from 'react';
import { colors, borderRadius, fontSize } from '../styles/tokens';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Set to true to show error highlight */
  hasError?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const inputBaseStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '14px 16px',
  borderRadius: borderRadius.md,
  border: `1px solid rgba(90, 90, 160, 0.5)`,
  backgroundColor: 'rgba(10, 10, 30, 0.6)',
  color: '#BEBEFF',
  fontSize: fontSize.xl,
  fontWeight: 600,
  textAlign: 'center',
  letterSpacing: '4px',
  outline: 'none',
  caretColor: colors.accentLight,
  transition: 'border-color 0.15s ease, background-color 0.15s ease',
};

const inputErrorStyle: React.CSSProperties = {
  ...inputBaseStyle,
  borderColor: colors.nearBingo,
  backgroundColor: 'rgba(240, 98, 146, 0.08)',
};

const hintStyle: React.CSSProperties = {
  fontSize: fontSize.xs,
  color: colors.bodyTextMuted,
  textAlign: 'center',
  letterSpacing: '1px',
};

const errorHintStyle: React.CSSProperties = {
  ...hintStyle,
  color: colors.nearBingo,
};

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  hasError = false,
  placeholder = 'B12',
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      // Small delay to let the modal animation finish first
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [autoFocus]);

  return (
    <div style={wrapperStyle}>
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={5}
        style={hasError ? inputErrorStyle : inputBaseStyle}
        aria-label="Bingo call input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="characters"
        spellCheck={false}
      />
      <p style={hasError ? errorHintStyle : hintStyle}>
        {hasError ? 'Invalid call — try B12 or N35' : 'Enter a call like B12 or O72'}
      </p>
    </div>
  );
};

export default NumberInput;
