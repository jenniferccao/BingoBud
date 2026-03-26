import React from 'react';
import { borderRadius } from '../styles/tokens';

interface ImagePreviewProps {
  imageSrc: string;
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
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageSrc }) => {
  return (
    <div style={containerStyle}>
      <img src={imageSrc} alt="Captured Bingo Card" style={imageStyle} />
    </div>
  );
};

export default ImagePreview;
