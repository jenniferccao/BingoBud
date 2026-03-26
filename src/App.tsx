import { useState, useCallback } from 'react';
import { NavigationContext } from './store/navigation';
import { BingoStoreProvider } from './store/BingoStoreContext';
import { AppShell } from './components/AppShell';
import { MainPage } from './pages/MainPage';
import { AddCardPage } from './pages/AddCardPage';
import { EditCardPage } from './pages/EditCardPage';
import { ScanPage } from './pages/ScanPage';
import { ScanReviewPage } from './pages/ScanReviewPage';
import type { Page, NavParams } from './types';
import './styles/global.css';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [navParams, setNavParams] = useState<NavParams>({});

  const navigateTo = useCallback((page: Page, params?: NavParams) => {
    setNavParams(params ?? {});
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
      case 'scanReview':
        return <ScanReviewPage />;
      default:
        return <MainPage />;
    }
  };

  return (
    <BingoStoreProvider>
      <NavigationContext.Provider value={{ currentPage, navParams, navigateTo }}>
        <AppShell>
          {renderPage()}
        </AppShell>
      </NavigationContext.Provider>
    </BingoStoreProvider>
  );
}

export default App;
