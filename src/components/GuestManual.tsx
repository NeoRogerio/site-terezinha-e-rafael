import React from 'react';
import { WeddingData } from '../types/wedding';
import {
  BookOpen,
  Shirt,
  Clock,
  CheckCircle2,
  UserX,
  PhoneOff,
  UtensilsCrossed,
  Camera,
  HeartHandshake,
  Sparkles,
  AlertCircle,
  Heart,
} from 'lucide-react';

interface GuestManualProps {
  weddingData: WeddingData;
}

export const GuestManual: React.FC<GuestManualProps> = ({ weddingData }) => {
  const { dressCode, couple } = weddingData;

  const etiquetteItems = [
    {
      icon: Clock,
      title: "Pontualidade",
      text: "A cerimônia começará pontualmente. Programe-se para chegar com 20 a 30 minutos de antecedência para se acomodar com calma.",
      highlight: false,
    },
    {
      icon: PhoneOff,
      title: "Cerimônia Desconectada",
      text: "Durante a entrada dos noivos e momento dos votos, guarde os celulares. Queremos ver seus olhares e sorrisos, não as telas dos aparelhos!",
      highlight: true,
    },
    {
      icon: CheckCircle2,
      title: "Confirmação de Presença",
      text: "A confirmação antecipada é indispensável para que tudo seja organizado com perfeição e carinho para receber você.",
      highlight: false,
    },
    {
      icon: UserX,
      title: "Convidado não Convida",
      text: "Cada convite foi planejado individualmente com muito carinho para as pessoas mais especiais da nossa trajetória. Respeite a lista de convidados.",
      highlight: true,
    },
    {
      icon: UtensilsCrossed,
      title: "Mesa de Doces e Bar",
      text: "Aguarde o momento oportuno e a liberação dos noivos após as fotos protocolares e o corte do bolo para se deliciar.",
      highlight: false,
    },
    {
      icon: Camera,
      title: "Fotos e Registros",
      text: "Tire muitas fotos e registre cada detalhe, apenas lembrando de não ficar na frente da equipe profissional de fotografia e vídeo.",
      highlight: false,
    },
    {
      icon: HeartHandshake,
      title: "Nosso Abraço",
      text: "Sua presença torna tudo completo! Antes de ir embora, não esqueça de nos dar um abraço bem apertado e registrar uma memória juntos.",
      highlight: true,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Introduction Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-wedding-olive/20 shadow-wedding relative overflow-hidden text-center space-y-4">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wedding-olive-dark via-wedding-olive to-wedding-sage" />
        
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-wedding-sage-tint border border-wedding-olive/20 text-wedding-olive shadow-xs">
          <BookOpen className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-wedding-olive">
            Manual do Convidado
          </h2>
          <p className="text-sm sm:text-base text-wedding-muted max-w-2xl mx-auto leading-relaxed">
            Preparamos com muito amor este guia com dicas e orientações para que você aproveite cada instante da nossa celebração em total harmonia e alegria!
          </p>
        </div>
      </div>

      {/* Dress Code Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-wedding-olive/20 shadow-wedding relative overflow-hidden space-y-8">
        <div className="flex items-center gap-3 pb-4 border-b border-wedding-olive/15">
          <div className="w-10 h-10 rounded-xl bg-wedding-olive text-white flex items-center justify-center shadow-xs">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest text-wedding-sage font-bold block">
              Orientações de Traje
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-wedding-olive">
              Dress Code: {dressCode.style}
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-wedding-muted leading-relaxed">
          {dressCode.description}
        </p>

        {/* Women & Men Dress Code Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Card: Para Elas */}
          <div className="bg-wedding-cream border border-wedding-olive/15 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-wedding-olive" />
                <h4 className="font-serif font-bold text-base sm:text-lg text-wedding-olive">
                  Para as Mulheres
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-wedding-charcoal leading-relaxed">
                {dressCode.women.rules}
              </p>
            </div>

            {/* Colors to Avoid for Women */}
            <div className="space-y-2.5 pt-3 border-t border-wedding-olive/15">
              <div className="flex items-center gap-1.5 text-xs font-bold text-wedding-marsala uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Cores a Evitar:</span>
              </div>
              <div className="space-y-2">
                {dressCode.women.avoid.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-wedding-olive/15 shadow-xs"
                  >
                    {/* Swatch */}
                    <div className="flex items-center -space-x-2 flex-shrink-0">
                      <div
                        className="w-7 h-7 rounded-full shadow-inner border"
                        style={{
                          backgroundColor: item.hex,
                          borderColor: item.border || '#cbd5e1',
                        }}
                      />
                      {item.hexSecondary && (
                        <div
                          className="w-7 h-7 rounded-full shadow-inner border"
                          style={{
                            backgroundColor: item.hexSecondary,
                            borderColor: item.border || '#cbd5e1',
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-xs text-wedding-charcoal block">
                        {item.colorName}
                      </span>
                      <span className="text-[11px] text-wedding-muted block">
                        {item.reason}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card: Para Eles */}
          <div className="bg-wedding-cream border border-wedding-olive/15 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-wedding-olive" />
                <h4 className="font-serif font-bold text-base sm:text-lg text-wedding-olive">
                  Para os Homens
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-wedding-charcoal leading-relaxed">
                {dressCode.men.rules}
              </p>
            </div>

            {/* Colors to Avoid for Men */}
            <div className="space-y-2.5 pt-3 border-t border-wedding-olive/15">
              <div className="flex items-center gap-1.5 text-xs font-bold text-wedding-marsala uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Cores a Evitar:</span>
              </div>
              <div className="space-y-2">
                {dressCode.men.avoid.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-wedding-olive/15 shadow-xs"
                  >
                    <div
                      className="w-7 h-7 rounded-full shadow-inner border flex-shrink-0"
                      style={{
                        backgroundColor: item.hex,
                        borderColor: item.border || '#cbd5e1',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-xs text-wedding-charcoal block">
                        {item.colorName}
                      </span>
                      <span className="text-[11px] text-wedding-muted block">
                        {item.reason}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Etiquette & Dicas Carinhosas */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-wedding-olive/20 shadow-wedding relative overflow-hidden space-y-6">
        <div className="text-center pb-4 border-b border-wedding-olive/15 space-y-1">
          <span className="text-[11px] uppercase tracking-widest text-wedding-sage font-bold block">
            Guia de Convivência
          </span>
          <h3 className="font-serif text-2xl font-bold text-wedding-olive">
            Dicas Carinhosas para os Convidados
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {etiquetteItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                  item.highlight
                    ? 'bg-wedding-sage-tint/70 border-wedding-olive/30 shadow-xs'
                    : 'bg-white border-wedding-olive/15 hover:border-wedding-olive/40 hover:bg-wedding-sage-tint/30'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs ${
                    item.highlight
                      ? 'bg-wedding-olive text-white'
                      : 'bg-wedding-sage-tint text-wedding-olive border border-wedding-olive/20'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif font-bold text-xs uppercase tracking-wider text-wedding-olive">
                      {item.title}
                    </span>
                    {item.highlight && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-wedding-olive/10 text-wedding-olive border border-wedding-olive/20">
                        <Sparkles className="w-3 h-3 text-wedding-sage" />
                        Especial
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-wedding-charcoal leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Love Note */}
        <div className="bg-wedding-cream p-6 rounded-2xl border border-wedding-olive/20 text-center space-y-2 mt-4">
          <Heart className="w-6 h-6 text-wedding-olive mx-auto fill-wedding-olive/20" />
          <p className="font-script text-3xl sm:text-4xl text-wedding-olive">
            Com todo o nosso amor e gratidão,
          </p>
          <p className="font-serif text-sm uppercase tracking-widest font-bold text-wedding-sage">
            {couple.bride} &amp; {couple.groom}
          </p>
        </div>
      </div>
    </div>
  );
};
