import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById, getRelatedProducts, colors as allColors, categories } from '../data/products';
import { useCartStore } from '../store';
import ProductCard from '../components/shared/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const addItem = useCartStore(state => state.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addedEffect, setAddedEffect] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">🎀</div>
        <h1 className="font-display text-2xl font-bold text-dark">Produto não encontrado</h1>
        <Link to="/catalogo" className="btn-primary">Ver catálogo</Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const category = categories.find(c => c.id === product.category);

  const handleAddToCart = () => {
    addItem(product, { size: selectedSize, color: selectedColor, quantity });
    setAddedEffect(true);
    setTimeout(() => setAddedEffect(false), 600);
    toast.success(`${product.name} adicionado ao carrinho! 🎀`, {
      style: { background: '#fff', color: '#2D2D2D', border: '1px solid #EDE0D4', borderRadius: '12px' }
    });
  };

  const productColors = allColors.filter(c => product.colors.includes(c.id));

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center gap-2 text-sm font-body text-medium">
          <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          <span>/</span>
          <Link to="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
          <span>/</span>
          {category && (
            <>
              <Link to={`/catalogo?categoria=${category.id}`} className="hover:text-primary transition-colors">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-dark truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-3">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0.7, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl overflow-hidden bg-secondary"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      i === selectedImage ? 'border-primary' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {/* Tags */}
            <div className="flex gap-2 mb-3">
              {product.tags.slice(0, 3).map(tag => (
                <span key={tag} className="badge">{tag}</span>
              ))}
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-dark leading-tight">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24"
                    fill={i < product.rating ? '#C9748D' : 'none'}
                    stroke={i < product.rating ? '#C9748D' : '#EDE0D4'}
                    strokeWidth="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                  </svg>
                ))}
              </div>
              <span className="font-body text-sm text-medium">({product.reviews} avaliações)</span>
            </div>

            {/* Price */}
            <div className="mt-5">
              <span className="font-display text-4xl font-bold text-primary">{product.priceFormatted}</span>
              <p className="font-body text-sm text-medium mt-1">✅ Pagamento via PIX ou WhatsApp</p>
            </div>

            <hr className="border-border my-6" />

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div className="mb-5">
                <p className="font-body font-semibold text-dark mb-2 text-sm">
                  Tamanho: <span className="text-primary">{selectedSize}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl border-2 font-body font-semibold text-sm transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white shadow-md scale-105'
                          : 'border-border text-dark hover:border-primary/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {productColors.length > 0 && (
              <div className="mb-5">
                <p className="font-body font-semibold text-dark mb-2 text-sm">
                  Cor: <span className="text-primary">{allColors.find(c => c.id === selectedColor)?.name}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {productColors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      title={color.name}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        selectedColor === color.id
                          ? 'border-primary scale-110 shadow-lg'
                          : 'border-border hover:scale-105'
                      } ${color.border ? 'border-gray-300' : ''}`}
                      style={{ background: color.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="font-body font-semibold text-dark mb-2 text-sm">Quantidade</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center font-bold text-dark transition-colors"
                >
                  −
                </button>
                <span className="font-body font-bold text-dark text-lg w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 rounded-xl border border-border hover:border-primary hover:bg-primary/5 flex items-center justify-center font-bold text-dark transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                animate={addedEffect ? { scale: [1, 1.05, 0.97, 1] } : {}}
                onClick={handleAddToCart}
                className="btn-primary flex-1 text-base py-4 flex items-center justify-center gap-2"
              >
                🛍️ Adicionar ao Carrinho
              </motion.button>
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate('/carrinho');
                }}
                className="btn-secondary flex-1 text-base py-4"
              >
                Comprar agora
              </button>
            </div>

            {/* Description */}
            <div className="mt-8 bg-secondary rounded-2xl p-5">
              <h3 className="font-display font-semibold text-dark mb-2">Descrição</h3>
              <p className="font-body text-medium text-sm leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold text-dark mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
