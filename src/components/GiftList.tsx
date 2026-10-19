import React, { useState, useMemo } from 'react';
import { GiftItem, WeddingData } from '../types/wedding';
import giftsDataRaw from '../data/gifts.json';
import { PixModal } from './PixModal';
import {
  Gift,
  Sparkles,
  Search,
  Utensils,
  Flame,
  Cpu,
  UtensilsCrossed,
  Wind,
  Soup,
  Croissant,
  Coffee,
  Box,
  Zap,
  Bath,
  BedDouble,
  Shirt,
  Waves,
  Maximize2,
  Layers,
  Smile,
  HeartHandshake,
  Flower2,
  ShieldAlert,
  CupSoda,
  Tag,
  ShoppingBag,
} from 'lucide-react';

interface GiftListProps {
  weddingData: WeddingData;
}

// Icon mapper for gift cards
const iconMap: Record<string, React.ElementType> = {
  Blender: Utensils,
  Utensils: Utensils,
  Flame: Flame,
  Cpu: Cpu,
  UtensilsCrossed: UtensilsCrossed,
  Wind: Wind,
  Soup: Soup,
  Croissant: Croissant,
  Coffee: Coffee,
  Box: Box,
  Zap: Zap,
  Bath: Bath,
  BedDouble: BedDouble,
  Shirt: Shirt,
  Waves: Waves,
  Maximize2: Maximize2,
  Layers: Layers,
  Smile: Smile,
  HeartHandshake: HeartHandshake,
  Flower2: Flower2,
  ShieldAlert: ShieldAlert,
  CupSoda: CupSoda,
  Gift: Gift,
  Sparkles: Sparkles,
};

export const GiftList: React.FC<GiftListProps> = ({ weddingData }) => {
  const gifts: GiftItem[] = giftsDataRaw as GiftItem[];
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeGiftModal, setActiveGiftModal] = useState<GiftItem | null>(null);

  const categories = ['Todos', 'Cozinha', 'Cama, Mesa e Banho', 'Interativo'];

  const filteredGifts = useMemo(() => {
    return gifts.filter((gift) => {
      const matchesCategory =
        selectedCategory === 'Todos' || gift.category === selectedCategory;
      const matchesSearch =
        gift.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gift.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [gifts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Introduction Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-wedding-olive/20 shadow-wedding relative overflow-hidden text-center space-y-4">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wedding-olive-dark via-wedding-olive to-wedding-sage" />

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-wedding-sage-tint border border-wedding-olive/20 text-wedding-olive shadow-xs">
          <Gift className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-wedding-olive">
            Sugestão de Presentes
          </h2>
          <p className="text-sm sm:text-base text-wedding-muted max-w-2xl mx-auto leading-relaxed">
            A sua presença é o maior e mais precioso presente! Caso deseje nos presentear com uma contribuição para o nosso novo lar e vida a dois, selecionamos algumas opções com muito carinho.
          </p>
        </div>

        {/* Quick Pix summary reminder */}
        <div className="inline-flex items-center gap-2 bg-wedding-sage-tint/80 border border-wedding-olive/20 rounded-full px-4 py-2 text-xs text-wedding-charcoal">
          <Sparkles className="w-4 h-4 text-wedding-olive" />
          <span>
            Contribuições via <strong>PIX</strong> direto para os noivos com total praticidade.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-wedding-olive/20 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Categories Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-wedding-olive text-white shadow-xs'
                  : 'bg-wedding-sage-tint/50 hover:bg-wedding-sage-tint text-wedding-muted hover:text-wedding-olive border border-wedding-olive/15'
              }`}
            >
              {cat}
              {cat === 'Todos' ? ` (${gifts.length})` : ` (${gifts.filter(g => g.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-wedding-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar presente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-wedding-olive/25 focus:outline-none focus:ring-2 focus:ring-wedding-olive/30 bg-wedding-sage-tint/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-wedding-muted hover:text-wedding-olive cursor-pointer"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between px-2 text-xs text-wedding-muted">
        <span>Exibindo <strong>{filteredGifts.length}</strong> itens</span>
        {selectedCategory !== 'Todos' && (
          <span className="text-wedding-olive font-semibold">Categoria: {selectedCategory}</span>
        )}
      </div>

      {/* Gifts Grid */}
      {filteredGifts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGifts.map((gift) => {
            const IconComponent = iconMap[gift.icon] || Gift;

            return (
              <div
                key={gift.id}
                className="bg-white rounded-3xl border border-wedding-olive/20 shadow-xs hover:shadow-wedding-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 relative"
              >
                {/* Top Subtle Line */}
                <div className="h-1 w-full bg-gradient-to-r from-wedding-sage/30 via-wedding-olive to-wedding-sage/30 group-hover:from-wedding-olive group-hover:to-wedding-sage transition-colors" />

                {/* Product Image Header (Pure Solid White Background) */}
                <div className="relative h-48 sm:h-52 w-full bg-white flex items-center justify-center p-3.5 overflow-hidden border-b border-wedding-olive/10">
                  {gift.image ? (
                    <img
                      src={gift.image}
                      alt={gift.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-wedding-sage-tint text-wedding-olive flex items-center justify-center">
                      <IconComponent className="w-7 h-7" />
                    </div>
                  )}

                  {/* Category Pill Tag */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-xs border border-wedding-olive/20 text-wedding-olive text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-xs">
                    <Tag className="w-3 h-3 text-wedding-sage" />
                    {gift.category}
                  </span>

                  {/* ID badge */}
                  <span className="absolute top-3 right-3 text-[10px] font-mono font-semibold text-wedding-muted bg-white/90 border border-wedding-olive/15 px-2 py-0.5 rounded-md shadow-2xs">
                    #{gift.id.padStart(2, '0')}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-wedding-charcoal leading-snug line-clamp-2 min-h-[2.7rem]">
                      {gift.title}
                    </h3>
                    <p className="text-xs text-wedding-muted mt-1 leading-relaxed line-clamp-2 min-h-[2rem]">
                      {gift.description}
                    </p>
                  </div>

                  {/* Price and Action Footer */}
                  <div className="pt-3 border-t border-wedding-olive/15 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-wedding-muted font-bold">
                        Valor
                      </span>
                      <span className="text-lg sm:text-xl font-bold text-wedding-olive font-serif">
                        R$ {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <button
                      id={`gift-btn-${gift.id}`}
                      onClick={() => setActiveGiftModal(gift)}
                      className="w-full bg-wedding-olive hover:bg-wedding-olive-dark text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-xs hover:shadow cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-wedding-sage-tint" />
                      <span>Presentear</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-wedding-olive/20 shadow-xs space-y-3">
          <ShoppingBag className="w-12 h-12 text-wedding-muted mx-auto stroke-1" />
          <h3 className="font-serif text-lg font-bold text-wedding-charcoal">
            Nenhum presente encontrado
          </h3>
          <p className="text-xs text-wedding-muted">
            Tente buscar com outro termo ou selecione uma categoria diferente.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Todos');
              setSearchQuery('');
            }}
            className="text-xs text-wedding-olive hover:underline font-bold"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {/* Pix Modal Render */}
      {activeGiftModal && (
        <PixModal
          gift={activeGiftModal}
          weddingData={weddingData}
          onClose={() => setActiveGiftModal(null)}
        />
      )}
    </div>
  );
};
