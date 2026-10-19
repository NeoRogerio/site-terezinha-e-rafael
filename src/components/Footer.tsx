import React from 'react';
import { WeddingData } from '../types/wedding';
import { Heart } from 'lucide-react';

interface FooterProps {
  weddingData: WeddingData;
}

export const Footer: React.FC<FooterProps> = ({ weddingData }) => {
  const { couple, event } = weddingData;

  return (
    <footer className="relative w-full overflow-hidden mt-16 pt-8 pb-12 border-t border-wedding-olive/15 bg-wedding-cream flex flex-col items-center text-center">
      <div className="max-w-md mx-auto px-4 space-y-3">
        <div className="w-12 h-12 relative mx-auto opacity-75">
          <img
            src="/elementos/Monograma.png"
            alt={`Monograma ${couple.bride} e ${couple.groom}`}
            className="w-full h-full object-contain"
          />
        </div>

        <p className="font-script text-3xl sm:text-4xl text-wedding-olive">
          {couple.bride} &amp; {couple.groom}
        </p>

        <p className="font-serif text-xs uppercase tracking-widest text-wedding-sage font-bold">
          {event.dateFormatted}
        </p>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-wedding-muted pt-2">
          <span>Feito com carinho para celebrar este dia especial</span>
          <Heart className="w-3.5 h-3.5 text-wedding-olive fill-wedding-olive/30" />
        </div>
      </div>
    </footer>
  );
};
