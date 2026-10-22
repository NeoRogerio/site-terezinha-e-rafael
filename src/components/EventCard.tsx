import React from 'react';
import { WeddingData } from '../types/wedding';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';

interface EventCardProps {
  weddingData: WeddingData;
  type?: 'ceremony' | 'reception' | 'both';
}

export const EventCard: React.FC<EventCardProps> = ({
  weddingData,
  type = 'ceremony',
}) => {
  const { event, reception } = weddingData;

  const showCeremony = type === 'ceremony' || type === 'both';
  const showReception = type === 'reception' || type === 'both';

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
      {/* Cerimônia Card */}
      {showCeremony && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-wedding-olive/30 shadow-2xl relative overflow-hidden space-y-6">
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wedding-olive-dark via-wedding-olive to-wedding-sage" />

          {/* Title */}
          <div className="text-center pb-3 border-b border-wedding-olive/15">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wedding-olive-dark">
              Localização da Cerimônia
            </h2>
          </div>

          {/* Location Details */}
          <div className="bg-wedding-cream/60 p-5 rounded-2xl border border-wedding-olive/20 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-wedding-olive border border-wedding-olive/25 flex-shrink-0 shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-wedding-charcoal">
                {event.locationName || 'Igreja Matriz - Paróquia de São José'}
              </h3>
              <p className="text-xs sm:text-sm text-wedding-muted font-serif">
                {event.address || 'Castanhal - PA'}
              </p>
              <p className="text-xs sm:text-sm text-wedding-olive font-bold font-serif pt-1">
                Data: {event.dateFormatted} {event.timeFormatted ? `às ${event.timeFormatted}` : ''}
              </p>
            </div>
          </div>

          {/* Map Action */}
          <div className="text-center pt-1">
            <a
              href={event.googleMapsUrl || 'https://maps.app.goo.gl/tc8tHTHVsEagD2mC7'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-wedding-olive hover:bg-wedding-olive-dark text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-xs uppercase tracking-wider group/btn cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-wedding-sage-light" />
              <span>Abrir Cerimônia no Google Maps</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </div>
      )}

      {/* Recepção Card */}
      {showReception && reception && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-wedding-olive/30 shadow-2xl relative overflow-hidden space-y-6">
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wedding-olive-dark via-wedding-olive to-wedding-sage" />

          {/* Title */}
          <div className="text-center pb-3 border-b border-wedding-olive/15">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wedding-olive-dark">
              Localização da Recepção
            </h2>
          </div>

          {/* Location Details */}
          <div className="bg-wedding-cream/60 p-5 rounded-2xl border border-wedding-olive/20 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-wedding-olive border border-wedding-olive/25 flex-shrink-0 shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-wedding-charcoal">
                {reception.locationName}
              </h3>
              <p className="text-xs sm:text-sm text-wedding-muted font-serif">
                {reception.address}
              </p>
              <p className="text-xs sm:text-sm text-wedding-olive font-bold font-serif pt-1">
                Data: {event.dateFormatted} (Após a Cerimônia)
              </p>
            </div>
          </div>

          {/* Map Action */}
          <div className="text-center pt-1">
            <a
              href={reception.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-wedding-olive hover:bg-wedding-olive-dark text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-xs uppercase tracking-wider group/btn cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-wedding-sage-light" />
              <span>Abrir Recepção no Google Maps</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
