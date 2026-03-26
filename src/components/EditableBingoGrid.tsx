import React from 'react';
import { borderRadius, fontSize, spacing, glassEffect } from '../styles/tokens';
import { EditableCell } from './EditableCell';

const BINGO_HEADERS = ['B', 'I', 'N', 'G', 'O'];

/** Valid number ranges per column index. */
const COL_RANGES: [number, number][] = [
  [1, 15],   // B
  [16, 30],  // I
  [31, 45],  // N
  [46, 60],  // G
  [61, 75],  // O
];

interface EditableBingoGridProps {
  /** 5×5 grid of values (null = empty, FREE cell at [2][2]). */
  values: (number | null)[][];
  /** Called when a cell value changes. */
  onCellChange: (row: number, col: number, value: number | null) => void;
}

const cardStyle: React.CSSProperties = {
  ...glassEffect,
  borderRadius: borderRadius.lg,
  padding: spacing.md,
  overflow: 'hidden',
};

const headerRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '2px',
  marginBottom: '2px',
};

const headerCellStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: fontSize.xl,
  fontWeight: 700,
  color: '#BEBEFF',
  padding: `${spacing.md} 0`,
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '2px',
};

export const EditableBingoGrid: React.FC<EditableBingoGridProps> = ({
  values,
  onCellChange,
}) => {
  return (
    <div style={cardStyle}>
      {/* B-I-N-G-O header */}
      <div style={headerRowStyle}>
        {BINGO_HEADERS.map((letter) => (
          <div key={letter} style={headerCellStyle}>
            {letter}
          </div>
        ))}
      </div>

      {/* 5×5 editable grid */}
      <div style={gridStyle}>
        {values.map((row, rowIdx) =>
          row.map((cellValue, colIdx) => {
            const isFree = rowIdx === 2 && colIdx === 2;
            return (
              <EditableCell
                key={`${rowIdx}-${colIdx}`}
                value={cellValue}
                row={rowIdx}
                col={colIdx}
                isFree={isFree}
                onValueChange={onCellChange}
                validRange={COL_RANGES[colIdx]}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default EditableBingoGrid;
