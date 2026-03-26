import { useState, useCallback } from 'react';
import { NavigationContext } from './store/navigation';
import { AppShell } from './components/AppShell';
import { MainPage } from './pages/MainPage';
import { AddCardPage } from './pages/AddCardPage';
import { EditCardPage } from './pages/EditCardPage';
import { ScanPage } from './pages/ScanPage';
import type { Page } from './types';
import './styles/global.css';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('main');

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage />;
      case 'addCard':
        return <AddCardPage />;
      case 'editCard':
        return <EditCardPage />;
      case 'scan':
        return <ScanPage />;
      default:
        return <MainPage />;
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo }}>
      <AppShell>
        {renderPage()}
      </AppShell>
    </NavigationContext.Provider>
  );
}

export default App;
