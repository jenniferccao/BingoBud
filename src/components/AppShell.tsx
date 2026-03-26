import React, { useState } from 'react';
import { Header } from './Header';
import { BottomActionBar } from './BottomActionBar';
import { useNavigation } from '../store/navigation';
import { useBingoStoreContext } from '../store/BingoStoreContext';
import { MarkNumberModal } from './MarkNumberModal';

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
  const { undoLastCalledNumber } = useBingoStoreContext();
  const [markModalOpen, setMarkModalOpen] = useState(false);

  const showBottomBar = currentPage === 'main';

  return (
    <div style={shellStyle}>
      <Header />
      {children}
      {showBottomBar && (
        <>
          <BottomActionBar
            onMarkPress={() => setMarkModalOpen(true)}
            onUndoPress={undoLastCalledNumber}
          />
          <MarkNumberModal
            isOpen={markModalOpen}
            onClose={() => setMarkModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default AppShell;
