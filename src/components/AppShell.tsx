import React from 'react';
import { Header } from './Header';
import { BottomActionBar } from './BottomActionBar';
import { useNavigation } from '../store/navigation';

interface AppShellProps {
  children: React.ReactNode;
}

const shellStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  position: 'relative',
};

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { currentPage } = useNavigation();
  const showBottomBar = currentPage === 'main';

  return (
    <div style={shellStyle}>
      <Header />
      {children}
      {showBottomBar && <BottomActionBar />}
    </div>
  );
};

export default AppShell;
