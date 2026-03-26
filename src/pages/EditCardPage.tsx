import React, { useState, useCallback } from 'react';
import { PageContainer } from '../components/PageContainer';
import { EditableBingoGrid } from '../components/EditableBingoGrid';
import { SaveCancelBar } from '../components/SaveCancelBar';
import { useNavigation } from '../store/navigation';
import { useBingoStoreContext } from '../store/BingoStoreContext';
import { fontSize, spacing } from '../styles/tokens';

/* ── Styles ────────────────────────────────────────────────────────── */

const containerStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: spacing.xl,
};

const labelContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: spacing.xl,
  marginBottom: spacing.xl,
};

const editLabelStyle: React.CSSProperties = {
  fontSize: fontSize.lg,
  fontWeight: 400,
  color: '#BEBEFF',
  marginBottom: spacing.xs,
};

const editSubLabelStyle: React.CSSProperties = {
  fontSize: fontSize.xs,
  fontWeight: 600,
  color: '#BEBEFF',
  letterSpacing: '2px',
  textTransform: 'uppercase',
};

const warningSubLabelStyle: React.CSSProperties = {
  ...editSubLabelStyle,
  color: '#f06292',
};

/* ── Helpers ───────────────────────────────────────────────────────── */

function emptyGrid(): (number | null)[][] {
  return Array.from({ length: 5 }, () => Array(5).fill(null));
}

/** All 24 non-FREE cells must have a value. */
function isGridComplete(grid: (number | null)[][]): boolean {
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (r === 2 && c === 2) continue; // FREE cell
      if (grid[r][c] === null) return false;
    }
  }
  return true;
}

/* ── Page ──────────────────────────────────────────────────────────── */

export const EditCardPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { createCardFromGrid } = useBingoStoreContext();

  const [gridValues, setGridValues] = useState<(number | null)[][]>(emptyGrid);
  const [showWarning, setShowWarning] = useState(false);

  const handleCellChange = useCallback(
    (row: number, col: number, value: number | null) => {
      setGridValues((prev) =>
        prev.map((r, rIdx) =>
          r.map((v, cIdx) => (rIdx === row && cIdx === col ? value : v)),
        ),
      );
      setShowWarning(false);
    },
    [],
  );

  const handleSave = useCallback(() => {
    if (!isGridComplete(gridValues)) {
      setShowWarning(true);
      return;
    }
    // Add card to the shared store so MainPage sees it immediately
    createCardFromGrid(gridValues);
    navigateTo('main');
  }, [gridValues, createCardFromGrid, navigateTo]);

  const handleCancel = useCallback(() => {
    navigateTo('addCard');
  }, [navigateTo]);

  return (
    <PageContainer>
      <div style={containerStyle}>
        <EditableBingoGrid
          values={gridValues}
          onCellChange={handleCellChange}
        />

        <div style={labelContainerStyle}>
          <p style={editLabelStyle}>Edit card</p>
          <p style={showWarning ? warningSubLabelStyle : editSubLabelStyle}>
            {showWarning
              ? 'Incomplete card — fill all cells'
              : 'Tap a cell to enter a number'}
          </p>
        </div>

        <SaveCancelBar onSave={handleSave} onCancel={handleCancel} />
      </div>
    </PageContainer>
  );
};

export default EditCardPage;
