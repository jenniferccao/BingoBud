import React, { useState, useMemo, useCallback } from 'react';
import { CallBoardSection } from './CallBoardSection';
import { CallBoardActions } from './CallBoardActions';
import { spacing } from '../styles/tokens';
import { BINGO_COLUMNS, groupCalledByLetter } from '../utils/bingoHelpers';
import type { CalledNumber } from '../types/CalledNumber';

interface CallBoardProps {
  /** The full list of called numbers from the store. */
  calledNumbers: CalledNumber[];
  /** Called when the user removes a called number via the action bar. */
  onRemoveCall?: (number: number) => void;
}

const boardStyle: React.CSSProperties = {
  display: 'flex',
  gap: spacing.sm,
  width: '100%',
};

export const CallBoard: React.FC<CallBoardProps> = ({
  calledNumbers,
  onRemoveCall,
}) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const calledByLetter = useMemo(
    () => groupCalledByLetter(calledNumbers),
    [calledNumbers],
  );

  const handleSelect = useCallback((n: number) => {
    setSelectedNumber((prev) => (prev === n ? null : n));
  }, []);

  const handleCancelSelection = useCallback(() => {
    setSelectedNumber(null);
  }, []);

  const handleDelete = useCallback(
    (n: number) => {
      onRemoveCall?.(n);
      setSelectedNumber(null);
    },
    [onRemoveCall],
  );

  /** Clear selection when the board area (outside items) is clicked. */
  const handleBoardClick = useCallback(() => {
    if (selectedNumber !== null) {
      setSelectedNumber(null);
    }
  }, [selectedNumber]);

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
            onSelectNumber={handleSelect}
          />
        ))}
      </div>

      {selectedNumber !== null && (
        <div style={{ marginTop: spacing.md }}>
          <CallBoardActions
            selectedNumber={selectedNumber}
            onDelete={handleDelete}
            onCancel={handleCancelSelection}
          />
        </div>
      )}
    </div>
  );
};

export default CallBoard;
