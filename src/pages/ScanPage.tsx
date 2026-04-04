import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '../store/navigation';
import { borderRadius, fontSize, colors } from '../styles/tokens';
import { useCamera } from '../hooks/useCamera';
import { CameraView } from '../components/CameraView';
import { ImagePreview } from '../components/ImagePreview';
import { CaptureControls } from '../components/CaptureControls';
import { PageContainer } from '../components/PageContainer';
import { computeCardRegion, cropCellsFromImage } from '../utils/imageProcessing';
import { recognizeCells } from '../services/ocrService';
import { buildGridFromOcrResults } from '../utils/extractionHelpers';

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

const ScanningOverlay: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 20,
      color: '#fff',
    }}
  >
    <div
      style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(255,255,255,0.3)',
        borderTopColor: colors.accentLight,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '16px',
      }}
    />
    <p style={{ fontSize: fontSize.md, fontWeight: 500 }}>Scanning...</p>
    <style>{`
      @keyframes spin { 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

export const ScanPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  
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

  const handleContinue = async () => {
    if (!capturedImage || !containerRef.current) return;
    
    setIsScanning(true);
    try {
      // 1. Get a natural image reference to know exact pixel size
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = capturedImage;
      });

      // 2. Map the overlay from display coords to natural image coords
      const rect = containerRef.current.getBoundingClientRect();
      const region = computeCardRegion(
        img.naturalWidth,
        img.naturalHeight,
        rect.width,
        rect.height
      );

      // 3. Crop cells and run OCR
      const cellCanvases = await cropCellsFromImage(capturedImage, region);
      const ocrResults = await recognizeCells(cellCanvases);
      const grid = buildGridFromOcrResults(ocrResults);

      // 4. Pass results to review page
      navigateTo('scanReview', {
        scannedGrids: [grid],
        capturedImage, // pass image if review page wants it
      });
    } catch (err) {
      console.error('Scan extraction failed:', err);
      // Fallback: send empty grid so user is not dead-ended
      navigateTo('scanReview', {
        scannedGrids: [buildGridFromOcrResults([])],
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <PageContainer>
      <div style={topSectionStyle}>
        <button style={returnButtonStyle} onClick={() => navigateTo('addCard')} disabled={isScanning}>
          <span>←</span> Return
        </button>
      </div>

      <div style={cameraAreaStyle} ref={containerRef}>
        {!capturedImage ? (
          <CameraView stream={stream} videoRef={videoRef} />
        ) : (
          <ImagePreview imageSrc={capturedImage} />
        )}
        <GridOverlay />
        {!capturedImage && (
          <div style={{
            position: 'absolute',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: borderRadius.pill,
            fontSize: fontSize.sm,
            fontWeight: 500,
            zIndex: 15,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}>
            Line up bingo card with the grid
          </div>
        )}
        {isScanning && <ScanningOverlay />}
      </div>

      <CaptureControls
        isCaptured={!!capturedImage}
        onCapture={() => capture(videoRef)}
        onRetake={retake}
        onContinue={handleContinue}
      />
    </PageContainer>
  );
};

export default ScanPage;
