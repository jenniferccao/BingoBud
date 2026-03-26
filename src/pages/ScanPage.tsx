import React, { useEffect, useRef } from 'react';
import { useNavigation } from '../store/navigation';
import { borderRadius, fontSize } from '../styles/tokens';
import { useCamera } from '../hooks/useCamera';
import { CameraView } from '../components/CameraView';
import { ImagePreview } from '../components/ImagePreview';
import { CaptureControls } from '../components/CaptureControls';
import { PageContainer } from '../components/PageContainer';

const topSectionStyle: React.CSSProperties = {
  paddingTop: '8px',
  paddingBottom: '16px',
  display: 'flex',
  justifyContent: 'flex-start',
  zIndex: 10,
};

const returnButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  borderRadius: borderRadius.pill,
  backgroundColor: 'transparent',
  border: `1px solid rgba(100, 100, 170, 0.4)`,
  color: '#BEBEFF',
  fontSize: fontSize.sm,
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
};

const cameraAreaStyle: React.CSSProperties = {
  flex: 1,
  position: 'relative',
  backgroundColor: '#000',
  display: 'flex',
  overflow: 'hidden',
  // Break out of the PageContainer's side padding to go edge-to-edge
  margin: '0 -16px',
};

const GridOverlay: React.FC = () => {
  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    maxWidth: '320px',
    aspectRatio: '1 / 1',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 1fr)',
    border: '1px solid rgba(255, 255, 255, 0.7)',
    pointerEvents: 'none',
    zIndex: 10,
  };

  const cellStyle: React.CSSProperties = {
    border: '1px solid rgba(255, 255, 255, 0.7)',
  };

  return (
    <div style={overlayStyle}>
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={i} style={cellStyle} />
      ))}
    </div>
  );
};

export const ScanPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const {
    stream,
    capturedImage,
    startCamera,
    stopCamera,
    capture,
    retake,
  } = useCamera();

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  return (
    <PageContainer>
      <div style={topSectionStyle}>
        <button style={returnButtonStyle} onClick={() => navigateTo('addCard')}>
          <span>←</span> Return
        </button>
      </div>

      <div style={cameraAreaStyle}>
        {!capturedImage ? (
          <CameraView stream={stream} videoRef={videoRef} />
        ) : (
          <ImagePreview imageSrc={capturedImage} />
        )}
        <GridOverlay />
      </div>

      <CaptureControls
        isCaptured={!!capturedImage}
        onCapture={() => capture(videoRef)}
        onRetake={retake}
        onContinue={() => navigateTo('addCard')}
      />
    </PageContainer>
  );
};

export default ScanPage;
