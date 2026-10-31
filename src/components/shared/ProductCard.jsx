import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCartStore } from '../../store';
import toast from 'react-hot-toast';

export default function ProductCard({ product, index = 0 }) {
  const [addedEffect, setAddedEffect] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, {
      size: product.sizes?.[0],
      color: product.colors?.[0],
      quantity: 1,
    });
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 600);
    toast.success(`${product.name} adicionado ao carrinho! 🎀`, {
      style: {
        background: '#fff',
        color: '#2D2D2D',
        border: '1px solid #EDE0D4',
        borderRadius: '12px',
      },
    });
  };

  const tagColors = {
    'destaque': 'bg-primary/10 text-primary border-primary/20',
    'novo': 'bg-accent/15 text-accent-dark border-accent/30',
    'bestseller': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'luxo': 'bg-amber-50 text-amber-800 border-amber-200',
    'kit': 'bg-blue-50 text-blue-700 border-blue-200',
    'artesanal': 'bg-rose-50 text-rose-700 border-rose-200',
    'baby': 'bg-purple-50 text-purple-700 border-purple-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link to={`/produto/${product.id}`} className="block group h-full">
        <div className="bg-white rounded-2xl overflow-hidden border border-border/80 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-400 ease-out flex flex-col h-full transform hover:-translate-y-2">
          
          {/* Container da Imagem com Shimmer Effect no hover */}
          <div className="relative aspect-square overflow-hidden bg-secondary shimmer-effect">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* Overlay sutil com gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Badges / Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 z-10">
                {product.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className={`text-[11px] font-semibold font-body px-2.5 py-0.5 rounded-full border shadow-sm backdrop-blur-sm ${tagColors[tag] || 'bg-white/90 text-medium'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Botão flutuante rápido para adicionar ao carrinho */}
            <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10 px-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                animate={addedEffect ? { scale: [1, 1.15, 0.95, 1] } : {}}
                onClick={handleAddToCart}
                className="w-full bg-white/95 backdrop-blur-md text-primary font-bold text-xs py-2.5 rounded-xl shadow-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-1.5 border border-primary/20"
              >
                <span>Adicionar</span>
                <span>🎀</span>
              </motion.button>
            </div>
          </div>

          {/* Dados do Produto */}
          <div className="p-4 flex flex-col flex-grow justify-between">
            <div>
              <p className="font-body text-medium text-xs uppercase tracking-wider font-semibold">
                {product.category?.replace(/-/g, ' ')}
              </p>
              
              <h3 className="font-display text-dark font-bold text-base mt-1 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                {product.name}
              </h3>

              {/* Avaliações */}
              <div className="flex items-center gap-1 mt-2">
                <div className="flex text-primary text-xs">
                  {'★'.repeat(product.rating || 5)}
                </div>
                <span className="text-[11px] text-medium font-body ml-1">({product.reviews})</span>
              </div>
            </div>

            {/* Rodapé do Card */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
              <div>
                <span className="text-[10px] text-medium block uppercase tracking-wide">Valor</span>
                <span className="font-display text-primary font-bold text-lg leading-none">
                  {product.priceFormatted}
                </span>
              </div>

              <span className="text-xs text-primary font-body font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                Ver detalhes →
              </span>
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}
