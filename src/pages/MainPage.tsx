import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { colors, borderRadius, fontSize, spacing, glassEffect } from '../styles/tokens';

const BINGO_HEADERS = ['B', 'I', 'N', 'G', 'O'];

const SAMPLE_CARDS = [
  {
    id: '1',
    numbers: [
      [1, null, null, null, null],
      [8, null, null, null, null],
      [9, null, 'FREE', null, null],
      [12, null, null, null, null],
      [15, null, null, null, null],
    ],
    markedCells: [
      [false, true, false, false, false],
      [true, false, false, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
      [false, false, false, false, true],
    ],
  },
  {
    id: '2',
    numbers: [
      [1, null, null, null, null],
      [8, null, null, null, null],
      [9, null, 'FREE', null, null],
      [12, null, null, null, null],
      [15, null, null, null, null],
    ],
    markedCells: [
      [false, false, false, false, false],
      [false, false, false, false, true],
      [false, false, true, false, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
    ],
    nearBingoCells: [
      [false, false, false, false, false],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
    ],
  },
];

const gridWrapperStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: spacing.md,
  padding: `${spacing.lg} 0`,
};

const cardStyle: React.CSSProperties = {
  ...glassEffect,
  borderRadius: borderRadius.md,
  padding: spacing.sm,
  overflow: 'hidden',
};

const headerRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '1px',
  marginBottom: '1px',
};

const headerCellStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: fontSize.xs,
  fontWeight: 700,
  color: colors.headerText,
  padding: '4px 0',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '1px',
};

interface MiniCellProps {
  value: string | number | null;
  isMarked: boolean;
  isNearBingo: boolean;
  isFree: boolean;
}

const MiniCell: React.FC<MiniCellProps> = ({ value, isMarked, isNearBingo, isFree }) => {
  let bgColor: string = 'rgba(15, 15, 35, 0.6)';
  if (isNearBingo && isMarked) {
    bgColor = colors.nearBingo;
  } else if (isMarked) {
    bgColor = isFree ? colors.freeCell : colors.marked;
  } else if (isFree) {
    bgColor = colors.freeCell;
  }

  const cellStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '9px',
    fontWeight: 500,
    color: isMarked || isFree ? colors.bodyText : colors.bodyTextMuted,
    aspectRatio: '1',
    borderRadius: '2px',
    border: `1px solid ${colors.surfaceBorderLight}`,
  };

  return (
    <div style={cellStyle}>
      {isFree ? (
        <span style={{ fontSize: '7px', fontWeight: 600 }}>FREE</span>
      ) : (
        value
      )}
    </div>
  );
};

export const MainPage: React.FC = () => {
  const cards = [...SAMPLE_CARDS, ...SAMPLE_CARDS, ...SAMPLE_CARDS];

  return (
    <PageContainer bottomPadding>
      <div style={gridWrapperStyle}>
        {cards.map((card, cardIdx) => (
          <div key={`${card.id}-${cardIdx}`} style={cardStyle}>
            <div style={headerRowStyle}>
              {BINGO_HEADERS.map((letter) => (
                <div key={letter} style={headerCellStyle}>
                  {letter}
                </div>
              ))}
            </div>
            <div style={gridStyle}>
              {card.numbers.map((row, rowIdx) =>
                row.map((cell, colIdx) => {
                  const isFree = cell === 'FREE';
                  const isMarked = card.markedCells[rowIdx][colIdx];
                  const isNearBingo = card.nearBingoCells?.[rowIdx]?.[colIdx] ?? false;
                  return (
                    <MiniCell
                      key={`${rowIdx}-${colIdx}`}
                      value={isFree ? null : cell}
                      isMarked={isMarked || isFree}
                      isNearBingo={isNearBingo}
                      isFree={isFree}
                    />
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default MainPage;
