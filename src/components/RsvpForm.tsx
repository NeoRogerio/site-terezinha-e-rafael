import React, { useState } from 'react';
import { WeddingData } from '../types/wedding';
import { CheckCircle2, MessageSquare, Send, UserCheck, Users } from 'lucide-react';

interface RsvpFormProps {
  weddingData: WeddingData;
  onSuccess?: () => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({
  weddingData,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestsCount, setGuestsCount] = useState('0');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappNumber = weddingData.rsvp?.whatsappNumber || '5591984795514';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    const statusText = attending === 'yes' ? 'Confirmado(a) com alegria!' : 'Infelizmente nao poderei comparecer';
    const guestsText =
      attending === 'yes'
        ? guestsCount === '0'
          ? 'Irei sozinho(a)'
          : `Irei com +${guestsCount} acompanhante(s)`
        : 'Nenhum';

    const formattedMessage =
      `*CONFIRMACAO DE PRESENCA - ${weddingData.couple.bride.toUpperCase()} & ${weddingData.couple.groom.toUpperCase()}*\n\n` +
      `*Nome:* ${name.trim()}\n` +
      `*Presenca:* ${statusText}\n` +
      (attending === 'yes' ? `*Acompanhantes:* ${guestsText}\n` : '') +
      (message.trim() ? `*Mensagem aos Noivos:* "${message.trim()}"\n` : '') +
      `\nData do Casamento: ${weddingData.event.dateFormatted}`;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setIsSubmitting(false);
      if (onSuccess) onSuccess();
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-wedding-olive/30 shadow-2xl relative overflow-hidden space-y-6 max-w-xl mx-auto animate-fade-in">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wedding-olive-dark via-wedding-olive to-wedding-sage" />

      {/* Header */}
      <div className="text-center pb-3 border-b border-wedding-olive/15">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-wedding-olive-dark">
          Confirmação de Presença
        </h2>
        <p className="text-xs sm:text-sm text-wedding-muted font-serif mt-1">
          Por favor, confirme sua presença até o prazo estipulado para organizarmos tudo com carinho.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-wedding-olive-dark font-bold flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-wedding-olive" />
            <span>Nome Completo *</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome completo"
            className="w-full px-4 py-3 rounded-xl border border-wedding-olive/30 focus:border-wedding-olive focus:ring-2 focus:ring-wedding-olive/15 outline-none text-wedding-charcoal placeholder:text-wedding-muted/60 bg-wedding-cream/30 text-sm transition-all"
          />
        </div>

        {/* Attendance Option */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-wedding-olive-dark font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-wedding-olive" />
            <span>Você irá ao casamento? *</span>
          </label>
          <div className="grid grid-cols-2 gap-3 pt-0.5">
            <button
              type="button"
              onClick={() => setAttending('yes')}
              className={`py-3 px-3 rounded-xl border font-serif font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                attending === 'yes'
                  ? 'bg-wedding-olive text-white border-wedding-olive shadow-sm'
                  : 'bg-wedding-cream/40 text-wedding-charcoal border-wedding-olive/25 hover:border-wedding-olive/50'
              }`}
            >
              <span>Sim, estarei lá!</span>
            </button>
            <button
              type="button"
              onClick={() => setAttending('no')}
              className={`py-3 px-3 rounded-xl border font-serif font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                attending === 'no'
                  ? 'bg-wedding-olive text-white border-wedding-olive shadow-sm'
                  : 'bg-wedding-cream/40 text-wedding-charcoal border-wedding-olive/25 hover:border-wedding-olive/50'
              }`}
            >
              <span>Não poderei ir</span>
            </button>
          </div>
        </div>

        {/* Guests Count (Only if attending) */}
        {attending === 'yes' && (
          <div className="space-y-1.5 animate-fade-in">
            <label className="text-xs uppercase tracking-wider text-wedding-olive-dark font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-wedding-olive" />
              <span>Acompanhantes</span>
            </label>
            <select
              value={guestsCount}
              onChange={(e) => setGuestsCount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-wedding-olive/30 focus:border-wedding-olive focus:ring-2 focus:ring-wedding-olive/15 outline-none text-wedding-charcoal bg-wedding-cream/30 text-sm transition-all cursor-pointer font-serif"
            >
              <option value="0">Vou sozinho(a)</option>
              <option value="1">+ 1 Acompanhante</option>
              <option value="2">+ 2 Acompanhantes</option>
              <option value="3">+ 3 Acompanhantes</option>
              <option value="4">+ 4 ou mais Acompanhantes</option>
            </select>
          </div>
        )}

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-wedding-olive-dark font-bold flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-wedding-olive" />
            <span>Mensagem aos Noivos (Opcional)</span>
          </label>
          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Deixe um recado carinhoso para Terezinha & Rafael..."
            className="w-full px-4 py-2.5 rounded-xl border border-wedding-olive/30 focus:border-wedding-olive focus:ring-2 focus:ring-wedding-olive/15 outline-none text-wedding-charcoal placeholder:text-wedding-muted/60 bg-wedding-cream/30 text-sm transition-all resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !name.trim()}
          className="w-full inline-flex items-center justify-center gap-2 bg-wedding-olive hover:bg-wedding-olive-dark disabled:opacity-50 text-white font-bold py-3.5 px-5 rounded-xl transition-all duration-300 shadow-md uppercase tracking-wider text-xs cursor-pointer mt-2"
        >
          <Send className="w-4 h-4 text-wedding-sage-light" />
          <span>Confirmar no WhatsApp</span>
        </button>
      </form>
    </div>
  );
};
