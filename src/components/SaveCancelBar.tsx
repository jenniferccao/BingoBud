import React from 'react';
import { colors, borderRadius, fontSize, spacing } from '../styles/tokens';

interface SaveCancelBarProps {
  onSave: () => void;
  onCancel: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  saveDisabled?: boolean;
}

const saveButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px',
  borderRadius: borderRadius.pill,
  backgroundColor: colors.glass,
  border: `1px solid ${colors.surfaceBorder}`,
  color: '#BEBEFF',
  fontSize: fontSize.md,
  fontWeight: 600,
  cursor: 'pointer',
  marginBottom: spacing.md,
  transition: 'opacity 0.2s ease, transform 0.15s ease',
};

const saveDisabledStyle: React.CSSProperties = {
  ...saveButtonStyle,
  opacity: 0.4,
  cursor: 'not-allowed',
};

const cancelButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px',
  borderRadius: borderRadius.pill,
  backgroundColor: 'transparent',
  border: `1px solid ${colors.surfaceBorder}`,
  color: '#BEBEFF',
  fontSize: fontSize.md,
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'border-color 0.2s ease',
};

export const SaveCancelBar: React.FC<SaveCancelBarProps> = ({
  onSave,
  onCancel,
  saveLabel = 'Save',
  cancelLabel = 'Cancel',
  saveDisabled = false,
}) => {
  return (
    <div>
      <button
        style={saveDisabled ? saveDisabledStyle : saveButtonStyle}
        onClick={saveDisabled ? undefined : onSave}
        disabled={saveDisabled}
      >
        {saveLabel}
      </button>
      <button style={cancelButtonStyle} onClick={onCancel}>
        {cancelLabel}
      </button>
    </div>
  );
};

export default SaveCancelBar;
