import React, { useMemo, useCallback } from 'react';
import { CallBoardSection } from './CallBoardSection';
import { spacing } from '../styles/tokens';
import { BINGO_COLUMNS, groupCalledByLetter } from '../utils/bingoHelpers';
import type { CalledNumber } from '../types/CalledNumber';

interface CallBoardProps {
  /** The full list of called numbers from the store. */
  calledNumbers: CalledNumber[];
  /** The currently selected number, managed by the parent. */
  selectedNumber: number | null;
  /** Fired when a called item is tapped. */
  onSelectNumber: (n: number) => void;
}

const boardStyle: React.CSSProperties = {
  display: 'flex',
  gap: spacing.sm,
  width: '100%',
};

export const CallBoard: React.FC<CallBoardProps> = ({
  calledNumbers,
  selectedNumber,
  onSelectNumber,
}) => {
  const calledByLetter = useMemo(
    () => groupCalledByLetter(calledNumbers),
    [calledNumbers],
  );

  /** Clear selection when the board area (outside items) is clicked. */
  const handleBoardClick = useCallback(() => {
    if (selectedNumber !== null) {
      onSelectNumber(selectedNumber); // toggle off
    }
  }, [selectedNumber, onSelectNumber]);

  return (
    <div onClick={handleBoardClick}>
      <div style={boardStyle}>
        {BINGO_COLUMNS.map(({ letter, range }) => (
          <CallBoardSection
            key={letter}
            letter={letter}
            calledNumbers={calledByLetter[letter]}
            range={range}
            selectedNumber={selectedNumber}
            onSelectNumber={onSelectNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default CallBoard;
