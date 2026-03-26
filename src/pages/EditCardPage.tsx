import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { useNavigation } from '../store/navigation';
import { colors, borderRadius, fontSize, spacing, glassEffect } from '../styles/tokens';

const BINGO_HEADERS = ['B', 'I', 'N', 'G', 'O'];

const gridContainerStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: spacing.xl,
};

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
  color: colors.headerText,
  padding: `${spacing.md} 0`,
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '2px',
};

const cellStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  aspectRatio: '1',
  border: `1px solid ${colors.surfaceBorderLight}`,
  borderRadius: '4px',
  fontSize: fontSize.md,
  fontWeight: 500,
  color: colors.bodyTextMuted,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',
  backgroundColor: 'rgba(15, 15, 35, 0.4)',
};

const freeCellStyle: React.CSSProperties = {
  ...cellStyle,
  backgroundColor: colors.freeCell,
  color: colors.bodyText,
  fontSize: fontSize.lg,
  fontWeight: 600,
};

const labelContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: spacing.xl,
  marginBottom: spacing.xl,
};

const editLabelStyle: React.CSSProperties = {
  fontSize: fontSize.lg,
  fontWeight: 400,
  color: colors.bodyText,
  marginBottom: spacing.xs,
};

const editSubLabelStyle: React.CSSProperties = {
  fontSize: fontSize.xs,
  fontWeight: 600,
  color: colors.headerText,
  letterSpacing: '2px',
  textTransform: 'uppercase',
};

const saveButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px',
  borderRadius: borderRadius.pill,
  backgroundColor: colors.accent,
  border: 'none',
  color: colors.bodyText,
  fontSize: fontSize.md,
  fontWeight: 600,
  cursor: 'pointer',
  marginBottom: spacing.md,
  transition: 'opacity 0.2s ease',
};

const cancelButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px',
  borderRadius: borderRadius.pill,
  backgroundColor: 'transparent',
  border: `1px solid ${colors.surfaceBorder}`,
  color: colors.bodyText,
  fontSize: fontSize.md,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
};

export const EditCardPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <PageContainer>
      <div style={gridContainerStyle}>
        <div style={cardStyle}>
          <div style={headerRowStyle}>
            {BINGO_HEADERS.map((letter) => (
              <div key={letter} style={headerCellStyle}>
                {letter}
              </div>
            ))}
          </div>
          <div style={gridStyle}>
            {Array.from({ length: 25 }).map((_, idx) => {
              const row = Math.floor(idx / 5);
              const col = idx % 5;
              const isFree = row === 2 && col === 2;

              return (
                <div
                  key={idx}
                  style={isFree ? freeCellStyle : cellStyle}
                >
                  {isFree ? 'FREE' : ''}
                </div>
              );
            })}
          </div>
        </div>

        <div style={labelContainerStyle}>
          <p style={editLabelStyle}>Edit card</p>
          <p style={editSubLabelStyle}>Click on number to edit</p>
        </div>

        <button
          style={saveButtonStyle}
          onClick={() => navigateTo('main')}
        >
          Save
        </button>
        <button
          style={cancelButtonStyle}
          onClick={() => navigateTo('addCard')}
        >
          Cancel
        </button>
      </div>
    </PageContainer>
  );
};

export default EditCardPage;
