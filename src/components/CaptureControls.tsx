import React from 'react';
import { borderRadius, fontSize } from '../styles/tokens';

interface CaptureControlsProps {
  isCaptured: boolean;
  onCapture: () => void;
  onRetake: () => void;
  onContinue: () => void;
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px 0',
  minHeight: '100px',
};

const captureButtonStyle: React.CSSProperties = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: 'rgba(90, 90, 160, 0.15)',
  border: '2px solid rgba(130, 130, 180, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.1s ease',
};

const captureInnerCircle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#BEBEFF', // Using a soft purple matching the mockup
};

const actionGroupStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  width: '100%',
};

const actionButtonStyle: React.CSSProperties = {
  width: '140px',
  padding: '16px 0',
  borderRadius: borderRadius.pill,
  border: 'none',
  fontSize: fontSize.md,
  fontWeight: 600,
  cursor: 'pointer',
  textAlign: 'center',
};

const retakeButtonStyle: React.CSSProperties = {
  ...actionButtonStyle,
  backgroundColor: 'transparent',
  border: `1px solid rgba(100, 100, 170, 0.4)`,
  color: '#BEBEFF',
};

const continueButtonStyle: React.CSSProperties = {
  ...actionButtonStyle,
  backgroundColor: 'rgba(90, 90, 160, 0.3)',
  border: `1px solid rgba(100, 100, 170, 0.4)`,
  color: '#BEBEFF',
};

export const CaptureControls: React.FC<CaptureControlsProps> = ({
  isCaptured,
  onCapture,
  onRetake,
  onContinue,
}) => {
  return (
    <div style={containerStyle}>
      {!isCaptured ? (
        <button
          style={captureButtonStyle}
          onClick={onCapture}
          aria-label="Capture Photo"
        >
          <div style={captureInnerCircle} />
        </button>
      ) : (
        <div style={actionGroupStyle}>
          <button style={retakeButtonStyle} onClick={onRetake}>
            Retake
          </button>
          <button style={continueButtonStyle} onClick={onContinue}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default CaptureControls;
