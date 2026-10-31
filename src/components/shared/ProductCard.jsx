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
    toast.success(`${product.name} adicionado! 🎀`, {
      style: {
        background: '#fff',
        color: '#2D2D2D',
        border: '1px solid #EDE0D4',
        borderRadius: '12px',
      },
    });
  };

  const tagColors = {
    'destaque': 'bg-primary/10 text-primary',
    'novo': 'bg-accent/10 text-accent',
    'bestseller': 'bg-success/10 text-success',
    'premium': 'bg-amber-100 text-amber-700',
    'kit': 'bg-blue-100 text-blue-700',
    'oferta': 'bg-red-100 text-red-600',
    'popular': 'bg-purple-100 text-purple-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
    >
      <Link to={`/produto/${product.id}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-350 ease-out">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                {product.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className={`text-xs font-semibold font-body px-2 py-0.5 rounded-full ${tagColors[tag] || 'bg-secondary text-medium'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Quick add button (visible on hover) */}
            <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <motion.button
                animate={addedEffect ? { scale: [1, 1.2, 0.9, 1] } : {}}
                transition={{ duration: 0.4 }}
                onClick={handleAddToCart}
                className="bg-white text-primary font-semibold text-sm px-5 py-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors duration-200"
              >
                + Carrinho
              </motion.button>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-display text-dark font-semibold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="font-body text-medium text-xs mt-1 capitalize">{product.category?.replace(/-/g, ' ')}</p>

            {/* Stars */}
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="12" height="12" viewBox="0 0 24 24"
                  fill={i < product.rating ? '#C9748D' : 'none'}
                  stroke={i < product.rating ? '#C9748D' : '#EDE0D4'}
                  strokeWidth="2"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              ))}
              <span className="text-xs text-medium font-body ml-0.5">({product.reviews})</span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="font-display text-primary font-bold text-lg">
                {product.priceFormatted}
              </span>
              <motion.button
                whileTap={{ scale: 0.88 }}
                animate={addedEffect ? { scale: [1, 1.25, 0.9, 1] } : {}}
                onClick={handleAddToCart}
                className="w-8 h-8 bg-primary/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200 group/btn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary group-hover/btn:text-white transition-colors">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
