import { useState, useEffect } from 'react';
import weddingDataRaw from './data/wedding.json';
import { WeddingData } from './types/wedding';
import { Header } from './components/Header';
import { GuestManual } from './components/GuestManual';
import { GiftList } from './components/GiftList';
import { Home } from './components/Home';
import { Footer } from './components/Footer';

const weddingData: WeddingData = weddingDataRaw as WeddingData;

type ActiveTab = 'home' | 'manual' | 'gifts';

const getInitialTab = (): ActiveTab => {
  if (typeof window === 'undefined') return 'manual';

  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();

  // 1. Preservar estritamente as rotas já existentes e em uso:
  if (hash === '#presentes' || hash === '#/presentes') {
    return 'gifts';
  }
  if (hash === '#manual' || hash === '#/manual') {
    return 'manual';
  }

  // 2. Rota /home solicitada (suporta /home, /home/, #home, #/home):
  if (
    path.endsWith('/home') ||
    path.endsWith('/home/') ||
    path.includes('/home') ||
    hash === '#home' ||
    hash === '#/home'
  ) {
    return 'home';
  }

  // 3. Fallback padrão seguro (mantém o manual como antes)
  return 'manual';
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(getInitialTab);

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (hash === '#presentes' || hash === '#/presentes') {
        setActiveTab('gifts');
      } else if (hash === '#manual' || hash === '#/manual') {
        setActiveTab('manual');
      } else if (
        path.endsWith('/home') ||
        path.endsWith('/home/') ||
        path.includes('/home') ||
        hash === '#home' ||
        hash === '#/home'
      ) {
        setActiveTab('home');
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      if (tab === 'gifts') {
        window.location.hash = 'presentes';
      } else if (tab === 'manual') {
        window.location.hash = 'manual';
      } else if (tab === 'home') {
        window.location.hash = 'home';
      }
    }
  };

  // Se a rota for /home, renderizamos a experiência do convite digital baseada em Rayra e Rafael
  if (activeTab === 'home') {
    return (
      <Home
        weddingData={weddingData}
        onNavigateToTab={(tab) => handleTabChange(tab)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-wedding-cream text-wedding-charcoal flex flex-col justify-between selection:bg-wedding-olive selection:text-white relative">
      {/* Subtle background texture / watermark */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#566443_1px,transparent_1px)] [background-size:20px_20px] z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header with Navigation */}
        <Header
          weddingData={weddingData}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {activeTab === 'manual' ? (
            <GuestManual weddingData={weddingData} />
          ) : (
            <GiftList weddingData={weddingData} />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer weddingData={weddingData} />
    </div>
  );
}
