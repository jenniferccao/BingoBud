import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  bottomPadding?: boolean;
}

const containerStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '430px',
  margin: '0 auto',
  padding: '0 16px',
  overflowY: 'auto',
  overflowX: 'hidden',
  WebkitOverflowScrolling: 'touch',
};

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  bottomPadding = false,
}) => {
  return (
    <div
      style={{
        ...containerStyle,
        paddingBottom: bottomPadding ? '100px' : '24px',
      }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
