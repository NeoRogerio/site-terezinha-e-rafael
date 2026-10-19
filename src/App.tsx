import { useState, useEffect } from 'react';
import weddingDataRaw from './data/wedding.json';
import { WeddingData } from './types/wedding';
import { Header } from './components/Header';
import { GuestManual } from './components/GuestManual';
import { GiftList } from './components/GiftList';
import { Footer } from './components/Footer';

const weddingData: WeddingData = weddingDataRaw as WeddingData;

export default function App() {
  const [activeTab, setActiveTab] = useState<'manual' | 'gifts'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#presentes') {
      return 'gifts';
    }
    return 'manual';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#presentes') {
        setActiveTab('gifts');
      } else if (window.location.hash === '#manual') {
        setActiveTab('manual');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: 'manual' | 'gifts') => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab === 'gifts' ? 'presentes' : 'manual';
    }
  };

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
