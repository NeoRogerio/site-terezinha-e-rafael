import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { GiftItem, WeddingData } from '../types/wedding';
import { X, Copy, Check, Heart, Send, QrCode } from 'lucide-react';

interface PixModalProps {
  gift: GiftItem | null;
  weddingData: WeddingData;
  onClose: () => void;
}

export const PixModal: React.FC<PixModalProps> = ({ gift, weddingData, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!gift) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow || '';
    };
  }, [gift, onClose]);

  if (!gift) return null;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(weddingData.payment.pixKey);
    setCopied(true);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b462c', '#566443', '#82916b', '#a3b18a', '#ffffff'],
    });

    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  const handleNotifyWhatsapp = () => {
    const formattedPrice = gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    const message =
      `*PRESENTE DE CASAMENTO - ${weddingData.couple.bride.toUpperCase()} & ${weddingData.couple.groom.toUpperCase()}*\n\n` +
      `Ola ${weddingData.couple.bride} e ${weddingData.couple.groom}!\n` +
      `Gostaria de avisar que escolhi presentear voces com:\n\n` +
      `*Presente:* ${gift.title}\n` +
      `*Categoria:* ${gift.category}\n` +
      `*Valor:* R$ ${formattedPrice}\n\n` +
      `Que Deus abencoe ricamente a uniao e o novo lar de voces! Com muito carinho!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${weddingData.contact.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-wedding-charcoal/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-wedding-olive/30 relative overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wedding-olive-dark via-wedding-olive to-wedding-sage" />

        {/* Close Button */}
        <button
          id="pix-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-wedding-muted hover:text-wedding-olive hover:bg-wedding-sage-tint transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mt-2 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-wedding-sage-tint border border-wedding-olive/20 text-wedding-olive flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Heart className="w-7 h-7 text-wedding-olive fill-wedding-olive/20" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-wedding-olive">
            Presentear os Noivos
          </h3>
          <p className="text-xs text-wedding-muted mt-1 max-w-xs mx-auto">
            Sua contribuição ajudará {weddingData.couple.bride} &amp; {weddingData.couple.groom} a construir este sonho!
          </p>
        </div>

        {/* Selected Gift Summary Card */}
        <div className="bg-wedding-cream border border-wedding-olive/20 rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {gift.image && (
                <div className="w-14 h-14 rounded-xl bg-white border border-wedding-olive/15 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={gift.image}
                    alt={gift.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-wedding-sage font-bold block mb-0.5">
                  Presente Escolhido
                </span>
                <h4 className="font-serif text-base sm:text-lg font-bold text-wedding-charcoal truncate">
                  {gift.title}
                </h4>
                <span className="inline-block bg-wedding-olive/10 text-wedding-olive text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1 border border-wedding-olive/20">
                  {gift.category}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-[10px] uppercase tracking-wider text-wedding-muted font-bold block mb-0.5">
                Valor
              </span>
              <span className="text-lg sm:text-xl font-bold text-wedding-olive font-serif">
                R$ {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Pix Instructions & Key Box */}
        <div className="space-y-4">
          <div className="bg-white border-2 border-dashed border-wedding-olive/30 rounded-2xl p-4 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-wedding-olive font-serif font-bold text-xs uppercase tracking-wider">
              <QrCode className="w-4 h-4 text-wedding-sage" />
              <span>Chave Pix Oficial</span>
            </div>

            {/* Official Pix QR Code Image */}
            {weddingData.payment.qrCodeImage && (
              <div className="flex flex-col items-center justify-center p-3 bg-wedding-cream/50 rounded-2xl border border-wedding-olive/20 shadow-xs max-w-[210px] mx-auto">
                <img
                  src={weddingData.payment.qrCodeImage}
                  alt="QR Code Pix"
                  className="w-40 h-40 object-contain"
                />
                <span className="text-[10px] text-wedding-muted font-medium mt-1">
                  Aponte a câmera do aplicativo do seu banco
                </span>
              </div>
            )}

            <div className="bg-wedding-cream p-3 rounded-xl border border-wedding-olive/20 flex items-center justify-between gap-2">
              <div className="text-left overflow-hidden">
                <span className="text-[10px] text-wedding-muted block uppercase font-bold">
                  {weddingData.payment.pixKeyType}
                </span>
                <span className="font-mono text-xs sm:text-sm text-wedding-charcoal font-semibold truncate block select-all">
                  {weddingData.payment.pixKeyFormatted || weddingData.payment.pixKey}
                </span>
              </div>
              <button
                id="pix-copy-btn"
                onClick={handleCopyPix}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-wedding-olive hover:bg-wedding-olive-dark text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] text-wedding-muted flex flex-col gap-0.5 text-center">
              <span><strong>Favorecido:</strong> {weddingData.payment.recipientName}</span>
            </div>
          </div>

          {/* Action Button: WhatsApp Notification */}
          <button
            id="pix-whatsapp-btn"
            onClick={handleNotifyWhatsapp}
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm hover:shadow cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Avisar Noivos no WhatsApp</span>
          </button>

          <p className="text-[11px] text-center text-wedding-muted italic">
            Muito obrigado por fazer parte deste dia inesquecível em nossas vidas!
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};
