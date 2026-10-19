import React from 'react';
import { WeddingData } from '../types/wedding';
import { BookOpen, Gift, Calendar } from 'lucide-react';

interface HeaderProps {
  weddingData: WeddingData;
  activeTab: 'manual' | 'gifts';
  onTabChange: (tab: 'manual' | 'gifts') => void;
}

export const Header: React.FC<HeaderProps> = ({
  weddingData,
  activeTab,
  onTabChange,
}) => {
  const { couple, event } = weddingData;

  return (
    <header className="relative w-full overflow-hidden pt-8 sm:pt-12 pb-6 sm:pb-8 flex flex-col items-center">
      {/* Main Couple Branding Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto space-y-4">
        {/* Monogram Badge */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center p-2 hover:scale-105 transition-transform duration-500">
          <img
            src="/elementos/Monograma.png"
            alt={`Monograma ${couple.bride} e ${couple.groom}`}
            className="w-full h-full object-contain drop-shadow-sm"
          />
        </div>

        {/* Couple Names */}
        <div className="space-y-1">
          <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.25em] text-wedding-olive/75 font-semibold">
            Casamento de
          </p>
          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl font-normal text-wedding-olive leading-[1.1] tracking-normal py-1">
            {couple.bride} <span className="text-4xl sm:text-5xl md:text-6xl text-wedding-sage font-normal px-1">&amp;</span> {couple.groom}
          </h1>
        </div>

        {/* Date & Subtitle */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-wedding-olive/25 shadow-xs text-xs sm:text-sm font-serif font-bold text-wedding-olive uppercase tracking-widest">
          <Calendar className="w-4 h-4 text-wedding-sage" />
          <span>{event.dateFormatted}</span>
        </div>

        {/* Tab Navigation Controls */}
        <nav className="pt-4 w-full flex justify-center sticky top-2 z-30">
          <div className="inline-flex p-1.5 bg-white/95 backdrop-blur-md rounded-2xl border border-wedding-olive/25 shadow-wedding max-w-md w-full sm:w-auto">
            <button
              id="tab-manual-btn"
              onClick={() => {
                onTabChange('manual');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-3 rounded-xl font-serif text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'manual'
                  ? 'bg-wedding-olive text-white shadow-md'
                  : 'text-wedding-muted hover:text-wedding-olive hover:bg-wedding-sage-tint'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'manual' ? 'text-white' : 'text-wedding-olive'}`} />
              <span>Manual do Convidado</span>
            </button>

            <button
              id="tab-gifts-btn"
              onClick={() => {
                onTabChange('gifts');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-3 rounded-xl font-serif text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'gifts'
                  ? 'bg-wedding-olive text-white shadow-md'
                  : 'text-wedding-muted hover:text-wedding-olive hover:bg-wedding-sage-tint'
              }`}
            >
              <Gift className={`w-4 h-4 ${activeTab === 'gifts' ? 'text-white' : 'text-wedding-olive'}`} />
              <span>Sugestão de Presentes</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
