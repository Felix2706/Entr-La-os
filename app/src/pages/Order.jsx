import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore, useOrderStore } from '../store';
import { colors as allColors } from '../data/products';

export default function Order() {
  const navigate = useNavigate();
  const { items, getTotal } = useCartStore();
  const { setOrderData } = useOrderStore();
  const total = getTotal();

  const [form, setForm] = useState({
    name: '', phone: '', deliveryType: 'retirada', address: '', city: '', notes: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nome obrigatório';
    if (!form.phone.trim()) e.phone = 'Telefone obrigatório';
    if (form.deliveryType === 'entrega' && !form.address.trim()) e.address = 'Endereço obrigatório';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setOrderData({ ...form, items, total });
    navigate('/pagamento');
  };

  const set = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  if (items.length === 0) {
    navigate('/carrinho');
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-dark mb-8">Finalizar Pedido</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 border border-border shadow-sm space-y-5">
              <h2 className="font-display text-xl font-semibold text-dark">Seus dados</h2>

              <div>
                <label className="font-body text-sm font-semibold text-dark block mb-1.5">Nome completo *</label>
                <input type="text" placeholder="Seu nome" value={form.name} onChange={e => set('name', e.target.value)}
                  className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="font-body text-sm font-semibold text-dark block mb-1.5">WhatsApp / Telefone *</label>
                <input type="tel" placeholder="(00) 00000-0000" value={form.phone} onChange={e => set('phone', e.target.value)}
                  className={`input-field ${errors.phone ? 'border-red-400' : ''}`} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="font-body text-sm font-semibold text-dark block mb-2">Tipo de entrega</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'retirada', label: '🏠 Retirar no local', desc: 'Sem frete' },
                    { id: 'entrega', label: '📦 Receber em casa', desc: 'Frete a combinar' },
                  ].map(opt => (
                    <button
                      key={opt.id} type="button"
                      onClick={() => set('deliveryType', opt.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        form.deliveryType === opt.id
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <p className="font-body font-semibold text-dark text-sm">{opt.label}</p>
                      <p className="font-body text-medium text-xs mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {form.deliveryType === 'entrega' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                  <div>
                    <label className="font-body text-sm font-semibold text-dark block mb-1.5">Endereço completo *</label>
                    <input type="text" placeholder="Rua, número, bairro" value={form.address} onChange={e => set('address', e.target.value)}
                      className={`input-field ${errors.address ? 'border-red-400' : ''}`} />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="font-body text-sm font-semibold text-dark block mb-1.5">Cidade / Estado</label>
                    <input type="text" placeholder="Cidade - UF" value={form.city} onChange={e => set('city', e.target.value)} className="input-field" />
                  </div>
                </motion.div>
              )}

              <div>
                <label className="font-body text-sm font-semibold text-dark block mb-1.5">Observações (opcional)</label>
                <textarea placeholder="Alguma observação sobre o pedido..." rows={3} value={form.notes}
                  onChange={e => set('notes', e.target.value)} className="input-field resize-none" />
              </div>

              <motion.button whileTap={{ scale: 0.97 }} type="submit" className="btn-primary w-full py-4 text-base">
                Ir para pagamento →
              </motion.button>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-5 border border-border shadow-sm sticky top-24">
              <h3 className="font-display font-semibold text-dark mb-4">Resumo</h3>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto scrollbar-hide">
                {items.map(item => {
                  const color = allColors.find(c => c.id === item.color);
                  return (
                    <div key={item.itemId} className="flex gap-3">
                      <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-xs font-semibold text-dark line-clamp-1">{item.product.name}</p>
                        <p className="font-body text-xs text-medium">
                          {item.size && `${item.size}`}{color && ` · ${color.name}`} × {item.quantity}
                        </p>
                        <p className="font-display text-primary text-xs font-bold">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr className="border-border my-3" />
              <div className="flex justify-between font-display font-bold text-dark">
                <span>Total</span>
                <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
