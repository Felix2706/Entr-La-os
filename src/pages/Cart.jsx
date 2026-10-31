import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store';
import { colors as allColors } from '../data/products';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal, getTotalItems } = useCartStore();
  const navigate = useNavigate();
  const total = getTotal();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center gap-5 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl"
        >
          🎀
        </motion.div>
        <h1 className="font-display text-3xl font-bold text-dark">Seu carrinho está vazio</h1>
        <p className="font-body text-medium text-center max-w-sm">
          Explore nosso catálogo de laços artesanais e adicione seus favoritos!
        </p>
        <Link to="/catalogo" className="btn-primary">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-dark mb-8">
          Carrinho ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map(item => {
                const color = allColors.find(c => c.id === item.color);
                return (
                  <motion.div
                    key={item.itemId}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                    className="bg-white rounded-2xl p-4 border border-border shadow-sm flex gap-4"
                  >
                    {/* Thumb */}
                    <Link to={`/produto/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/produto/${item.product.id}`}>
                        <h3 className="font-display font-semibold text-dark text-sm hover:text-primary transition-colors line-clamp-2">
                          {item.product.name}
                        </h3>
                      </Link>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.size && (
                          <span className="font-body text-xs text-medium bg-secondary px-2 py-0.5 rounded-full">
                            Tam: {item.size}
                          </span>
                        )}
                        {color && (
                          <span className="font-body text-xs text-medium bg-secondary px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: color.hex }} />
                            {color.name}
                          </span>
                        )}
                      </div>
                      <p className="font-display font-bold text-primary mt-1">
                        {item.product.priceFormatted}
                      </p>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => {
                          removeItem(item.itemId);
                          toast('Item removido', { icon: '🗑️' });
                        }}
                        className="text-medium hover:text-red-500 transition-colors p-1"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/><path d="M10,11v6m4-6v6"/><path d="M9,6V4h6v2"/>
                        </svg>
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg border border-border hover:border-primary flex items-center justify-center text-sm font-bold transition-colors"
                        >
                          −
                        </button>
                        <span className="font-body font-bold text-dark w-5 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg border border-border hover:border-primary flex items-center justify-center text-sm font-bold transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-display font-bold text-dark text-sm">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm sticky top-24">
              <h3 className="font-display text-lg font-bold text-dark mb-4">Resumo do pedido</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between font-body text-sm text-medium">
                  <span>Subtotal ({totalItems} itens)</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between font-body text-sm text-medium">
                  <span>Frete</span>
                  <span className="text-success font-semibold">A combinar</span>
                </div>
              </div>
              <hr className="border-border mb-4" />
              <div className="flex justify-between font-display font-bold text-dark text-xl mb-5">
                <span>Total</span>
                <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/pedido')}
                className="btn-primary w-full text-center text-base py-4"
              >
                Finalizar pedido →
              </motion.button>
              <Link to="/catalogo" className="block text-center font-body text-sm text-medium hover:text-primary mt-4 transition-colors">
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
