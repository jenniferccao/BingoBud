import React from 'react';
import { CallBoardItem } from './CallBoardItem';
import { colors, fontSize, spacing } from '../styles/tokens';

interface CallBoardSectionProps {
  /** The bingo column letter. */
  letter: string;
  /** Numbers that have been called in this column, sorted ascending. */
  calledNumbers: number[];
  /** Full range of possible numbers in this column (e.g. 1–15 for B). */
  range: [number, number];
  /** The currently selected number across the whole board, or null. */
  selectedNumber: number | null;
  /** Fired when a called item is tapped. */
  onSelectNumber: (n: number) => void;
}

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2px',
  flex: 1,
  minWidth: 0,
};

const letterStyle: React.CSSProperties = {
  fontSize: fontSize.md,
  fontWeight: 700,
  color: colors.accentLight,
  lineHeight: 1,
  marginBottom: spacing.xs,
};

const numberListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2px',
  width: '100%',
};

export const CallBoardSection: React.FC<CallBoardSectionProps> = ({
  letter,
  calledNumbers,
  range,
  selectedNumber,
  onSelectNumber,
}) => {
  const calledSet = new Set(calledNumbers);
  const allNumbers: number[] = [];
  for (let n = range[0]; n <= range[1]; n++) {
    allNumbers.push(n);
  }

  return (
    <div style={sectionStyle}>
      <span style={letterStyle}>{letter}</span>
      <div style={numberListStyle}>
        {allNumbers.map((n) => (
          <CallBoardItem
            key={n}
            number={n}
            isCalled={calledSet.has(n)}
            isSelected={selectedNumber === n}
            onSelect={onSelectNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default CallBoardSection;
