import React from 'react';
import { SaveCancelBar } from './SaveCancelBar';

interface ScanActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export const ScanActions: React.FC<ScanActionsProps> = ({ onSave, onCancel }) => {
  return (
    <SaveCancelBar
      onSave={onSave}
      onCancel={onCancel}
      saveLabel="Save Card"
      cancelLabel="Cancel"
    />
  );
};

export default ScanActions;
