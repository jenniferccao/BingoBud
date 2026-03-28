import React from 'react';
import { borderRadius, fontSize, spacing, glassEffect, colors } from '../styles/tokens';

interface ScannedCardPreviewProps {
  /** 5×5 grid of number values (null for FREE cell). */
  values: (number | null)[][];
  /** Display label, e.g. "Card 1". */
  label: string;
  /** Called when the card is tapped. */
  onPress: () => void;
}

const BINGO_HEADERS = ['B', 'I', 'N', 'G', 'O'];

const cardStyle: React.CSSProperties = {
  ...glassEffect,
  borderRadius: borderRadius.md,
  padding: spacing.sm,
  cursor: 'pointer',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const headerRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '1px',
};

const headerCellStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: fontSize.xs,
  fontWeight: 700,
  color: '#BEBEFF',
  padding: '4px 0',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '1px',
};

const cellStyle: React.CSSProperties = {
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '9px',
  fontWeight: 600,
  color: colors.bodyTextMuted,
  backgroundColor: 'rgba(15, 15, 35, 0.6)',
  border: `1px solid ${colors.surfaceBorderLight}`,
  borderRadius: '2px',
};

const freeCellStyle: React.CSSProperties = {
  ...cellStyle,
  backgroundColor: colors.freeCell,
  color: colors.background,
  fontWeight: 700,
  fontSize: '7px',
};

const labelStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: fontSize.xs,
  fontWeight: 700,
  letterSpacing: '2px',
  color: '#BEBEFF',
  marginTop: '4px'
};

export const ScannedCardPreview: React.FC<ScannedCardPreviewProps> = ({
  values,
  label,
  onPress,
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const dynamicStyle: React.CSSProperties = {
    ...cardStyle,
    transform: isPressed ? 'scale(0.96)' : 'scale(1)',
    boxShadow: isPressed ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.3)',
  };

  return (
    <div
      style={dynamicStyle}
      onClick={onPress}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
    >
      {/* B-I-N-G-O header */}
      <div style={headerRowStyle}>
        {BINGO_HEADERS.map((letter) => (
          <div key={letter} style={headerCellStyle}>
            {letter}
          </div>
        ))}
      </div>

      {/* 5×5 mini grid */}
      <div style={gridStyle}>
        {values.map((row, rIdx) =>
          row.map((val, cIdx) => {
            const isFree = rIdx === 2 && cIdx === 2;
            return (
              <div
                key={`${rIdx}-${cIdx}`}
                style={isFree ? freeCellStyle : cellStyle}
              >
                {isFree ? 'FREE' : val ?? ''}
              </div>
            );
          }),
        )}
      </div>

      {/* Label */}
      <div style={labelStyle}>{label}</div>
    </div>
  );
};

export default ScannedCardPreview;
