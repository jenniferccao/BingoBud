import React, { useEffect } from 'react';
import { borderRadius } from '../styles/tokens';

interface CameraViewProps {
  stream: MediaStream | null;
  videoRef: React.RefObject<HTMLVideoElement>;
}

const containerStyle: React.CSSProperties = {
  width: '100%',
  flex: 1,
  backgroundColor: '#000',
  borderRadius: borderRadius.md,
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

const videoStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export const CameraView: React.FC<CameraViewProps> = ({ stream, videoRef }) => {
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef]);

  return (
    <div style={containerStyle}>
      {!stream ? (
        <p style={{ color: '#fff', opacity: 0.5 }}>Loading camera...</p>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={videoStyle}
        />
      )}
    </div>
  );
};

export default CameraView;
