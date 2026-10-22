import React, { useState, useEffect } from 'react';
import { WeddingData } from '../types/wedding';
import { EventCard } from './EventCard';
import { RsvpForm } from './RsvpForm';
import { GuestManual } from './GuestManual';
import { GiftList } from './GiftList';
import { Footer } from './Footer';
import { ArrowLeft, BookOpen, CheckCircle2, Gift, MapPin, X } from 'lucide-react';

interface HomeProps {
  weddingData: WeddingData;
  onNavigateToTab?: (tab: 'manual' | 'gifts') => void;
}

type ActiveSection = 'none' | 'ceremony' | 'reception' | 'rsvp' | 'gifts' | 'manual';

export const Home: React.FC<HomeProps> = ({
  weddingData,
  onNavigateToTab,
}) => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('none');
  const { couple, event } = weddingData;

  // Close section on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveSection('none');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when modal section is open
  useEffect(() => {
    if (activeSection !== 'none') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow || '';
      };
    }
  }, [activeSection]);

  const handleOpenSection = (section: ActiveSection) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-wedding-cream text-wedding-charcoal selection:bg-wedding-olive selection:text-white flex flex-col justify-between relative overflow-x-hidden">
      {/* Background Subtle Watermark Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#566443_1px,transparent_1px)] [background-size:20px_20px] z-0" />

      {/* Main Interactive Digital Invitation Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 my-auto">
        {/* Main Digital Invitation Container */}
        <div className="relative w-full max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-wedding-olive/30 shadow-2xl flex flex-col items-center my-auto overflow-hidden">
          {/* Subtle Decorative Top Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wedding-olive-dark via-wedding-olive to-wedding-sage rounded-t-3xl" />

          {/* 1. Monograma no Topo */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 mb-4 sm:mb-6 transition-transform duration-500 hover:scale-105 filter drop-shadow-xs flex items-center justify-center">
            <img
              src="/elementos/Monograma.png"
              alt={`Monograma ${couple.bride} & ${couple.groom}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* 2. Nome do Casal em fonte caligráfica English 111 */}
          <div className="flex flex-col items-center my-2 mb-6 sm:mb-8 text-center">
            <span className="font-script text-5xl sm:text-7xl text-wedding-olive leading-tight">
              {couple.bride}
            </span>
            <span className="font-script text-3xl sm:text-4xl text-wedding-sage font-normal my-0.5">
              e
            </span>
            <span className="font-script text-5xl sm:text-7xl text-wedding-olive leading-tight">
              {couple.groom}
            </span>

            <p className="font-serif text-xs uppercase tracking-[0.25em] text-wedding-muted font-bold mt-3">
              {event.dateFormatted}
            </p>
          </div>

          {/* 3. Botoeira de Ação em Pílula */}
          <div className="w-full space-y-3 sm:space-y-3.5 my-2">
            {/* Localização da Cerimônia */}
            <button
              id="btn-home-ceremony"
              onClick={() => handleOpenSection('ceremony')}
              className="w-full py-3.5 px-5 rounded-full border-2 border-wedding-olive/70 hover:bg-wedding-olive hover:text-white text-wedding-olive font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xs group cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-wedding-sage group-hover:text-white transition-colors flex-shrink-0" />
              <span>LOCALIZAÇÃO DA CERIMÔNIA</span>
            </button>

            {/* Localização da Recepção */}
            <button
              id="btn-home-reception"
              onClick={() => handleOpenSection('reception')}
              className="w-full py-3.5 px-5 rounded-full border-2 border-wedding-olive/70 hover:bg-wedding-olive hover:text-white text-wedding-olive font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xs group cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-wedding-sage group-hover:text-white transition-colors flex-shrink-0" />
              <span>LOCALIZAÇÃO DA RECEPÇÃO</span>
            </button>

            {/* Confirmação de Presença */}
            <button
              id="btn-home-rsvp"
              onClick={() => handleOpenSection('rsvp')}
              className="w-full py-3.5 px-5 rounded-full border-2 border-wedding-olive/70 hover:bg-wedding-olive hover:text-white text-wedding-olive font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xs group cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-wedding-sage group-hover:text-white transition-colors flex-shrink-0" />
              <span>CONFIRMAÇÃO DE PRESENÇA</span>
            </button>

            {/* Lista de Presentes */}
            <button
              id="btn-home-gifts"
              onClick={() => {
                if (onNavigateToTab) {
                  onNavigateToTab('gifts');
                } else {
                  handleOpenSection('gifts');
                }
              }}
              className="w-full py-3.5 px-5 rounded-full border-2 border-wedding-olive/70 hover:bg-wedding-olive hover:text-white text-wedding-olive font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xs group cursor-pointer"
            >
              <Gift className="w-4 h-4 text-wedding-sage group-hover:text-white transition-colors flex-shrink-0" />
              <span>LISTA DE PRESENTES</span>
            </button>

            {/* Manual dos Convidados */}
            <button
              id="btn-home-manual"
              onClick={() => {
                if (onNavigateToTab) {
                  onNavigateToTab('manual');
                } else {
                  handleOpenSection('manual');
                }
              }}
              className="w-full py-3.5 px-5 rounded-full border-2 border-wedding-olive/70 hover:bg-wedding-olive hover:text-white text-wedding-olive font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-xs group cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-wedding-sage group-hover:text-white transition-colors flex-shrink-0" />
              <span>MANUAL DOS CONVIDADOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal / Overlay for Active Interactive Sections */}
      {activeSection !== 'none' && (
        <div
          className="fixed inset-0 z-50 bg-wedding-charcoal/70 backdrop-blur-md flex flex-col justify-start overflow-y-auto animate-fade-in"
          onClick={() => setActiveSection('none')}
        >
          {/* Top Sticky Bar */}
          <div
            className="sticky top-0 z-50 bg-wedding-olive text-white border-b border-wedding-olive-dark/40 px-4 py-3.5 sm:px-6 flex items-center justify-between shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveSection('none')}
              className="inline-flex items-center gap-2 text-white hover:text-wedding-sage-light font-serif font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-wedding-sage-light" />
              <span>Voltar ao Convite</span>
            </button>

            <button
              onClick={() => setActiveSection('none')}
              className="p-1.5 rounded-full text-white hover:text-wedding-sage-light hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Container Content */}
          <div
            className="relative z-10 w-full max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {activeSection === 'ceremony' && (
              <EventCard weddingData={weddingData} type="ceremony" />
            )}
            {activeSection === 'reception' && (
              <EventCard weddingData={weddingData} type="reception" />
            )}
            {activeSection === 'rsvp' && (
              <RsvpForm
                weddingData={weddingData}
                onSuccess={() => setActiveSection('none')}
              />
            )}
            {activeSection === 'gifts' && (
              <div className="space-y-4">
                <GiftList weddingData={weddingData} />
              </div>
            )}
            {activeSection === 'manual' && (
              <div className="space-y-4">
                <GuestManual weddingData={weddingData} />
              </div>
            )}
          </div>

          {/* Bottom Floating Return Button */}
          <div
            className="relative z-10 pb-10 pt-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveSection('none')}
              className="inline-flex items-center gap-2 bg-wedding-olive hover:bg-wedding-olive-dark text-white font-serif font-bold px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-105 border border-wedding-sage/40 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-wedding-sage-light" />
              <span>Voltar ao Convite Principal</span>
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer weddingData={weddingData} />
    </div>
  );
};
