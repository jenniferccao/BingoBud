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

/** Column ranges: B=1-15, I=16-30, N=31-45, G=46-60, O=61-75 */
const COL_RANGES: [number, number][] = [
  [1, 15],
  [16, 30],
  [31, 45],
  [46, 60],
  [61, 75],
];

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

/** All filled cells must be within valid column ranges. */
function isGridRangesValid(grid: (number | null)[][]): boolean {
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (r === 2 && c === 2) continue;
      const val = grid[r][c];
      if (val !== null) {
        const [lo, hi] = COL_RANGES[c];
        if (val < lo || val > hi) return false;
      }
    }
  }
  return true;
}

type WarningType = null | 'incomplete' | 'invalid-range';

/* ── Page ──────────────────────────────────────────────────────────── */

export const EditCardPage: React.FC = () => {
  const { navigateTo, navParams } = useNavigation();
  const { createCardFromGrid } = useBingoStoreContext();

  const [gridValues, setGridValues] = useState<(number | null)[][]>(
    () => navParams.initialGrid ?? emptyGrid(),
  );
  const [warning, setWarning] = useState<WarningType>(null);

  const isFromScan = navParams.returnTo === 'scanReview';

  const handleCellChange = useCallback(
    (row: number, col: number, value: number | null) => {
      setGridValues((prev) =>
        prev.map((r, rIdx) =>
          r.map((v, cIdx) => (rIdx === row && cIdx === col ? value : v)),
        ),
      );
      setWarning(null);
    },
    [],
  );

  const handleSave = useCallback(() => {
    if (!isGridComplete(gridValues)) {
      setWarning('incomplete');
      return;
    }
    if (!isGridRangesValid(gridValues)) {
      setWarning('invalid-range');
      return;
    }

    if (isFromScan && navParams.scannedGrids && navParams.editCardIndex !== undefined) {
      // Return to scan review with the updated grid spliced in
      const updatedGrids = navParams.scannedGrids.map((g, i) =>
        i === navParams.editCardIndex ? gridValues : g,
      );
      navigateTo('scanReview', { scannedGrids: updatedGrids });
    } else {
      // Normal flow — save to store
      createCardFromGrid(gridValues);
      navigateTo('main');
    }
  }, [gridValues, createCardFromGrid, navigateTo, isFromScan, navParams]);

  const handleCancel = useCallback(() => {
    navigateTo(navParams.returnTo ?? 'addCard');
  }, [navigateTo, navParams.returnTo]);

  return (
    <PageContainer>
      <div style={containerStyle}>
        <EditableBingoGrid
          values={gridValues}
          onCellChange={handleCellChange}
        />

        <div style={labelContainerStyle}>
          <p style={editLabelStyle}>Edit card</p>
          <p style={warning ? warningSubLabelStyle : editSubLabelStyle}>
            {warning === 'incomplete'
              ? 'Incomplete card — fill all cells'
              : warning === 'invalid-range'
                ? 'Invalid numbers — check column ranges'
                : 'Tap a cell to enter a number'}
          </p>
        </div>

        <SaveCancelBar onSave={handleSave} onCancel={handleCancel} />
      </div>
    </PageContainer>
  );
};

export default EditCardPage;
