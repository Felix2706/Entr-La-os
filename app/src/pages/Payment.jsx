import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore, useOrderStore } from '../store';

const PIX_KEY = '00.000.000/0001-00'; // Placeholder CNPJ key
const PIX_NAME = 'Entre & Laços Artesanais';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function Payment() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { orderData, generateOrderId, orderId } = useOrderStore();
  const total = getTotal();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    if (!orderData) { navigate('/pedido'); return; }
    if (!orderId) generateOrderId();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const copyPixKey = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sendWhatsApp = () => {
    const itemsText = items.map(i => `  • ${i.product.name} (x${i.quantity}) — R$ ${(i.product.price * i.quantity).toFixed(2).replace('.', ',')}`).join('\n');
    const msg = `Olá! Acabei de realizar o pagamento do pedido *#${orderId}*.\n\n*Itens:*\n${itemsText}\n\n*Total:* R$ ${total.toFixed(2).replace('.', ',')}\n\n*Nome:* ${orderData?.name}\n*Tel:* ${orderData?.phone}\n*Entrega:* ${orderData?.deliveryType === 'entrega' ? `${orderData?.address}, ${orderData?.city}` : 'Retirada no local'}\n\nSegue o comprovante em anexo! 📎`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/5500000000000?text=${encoded}`, '_blank');
    clearCart();
    navigate('/confirmacao');
  };

  const timerPercent = (timeLeft / (30 * 60)) * 100;

  return (
    <div className="min-h-screen bg-secondary py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="font-accent text-primary text-xl">Quase lá! ✨</p>
          <h1 className="font-display text-4xl font-bold text-dark mt-1">Pagamento via PIX</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* QR + Key */}
          <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
            <h2 className="font-display text-lg font-semibold text-dark mb-4 text-center">QR Code PIX</h2>

            {/* Placeholder QR */}
            <div className="w-48 h-48 mx-auto bg-dark rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
              <div className="grid grid-cols-8 gap-1 p-3 w-full h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-dark'}`} />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl">🎀</div>
              </div>
            </div>

            {/* Timer */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-body text-medium mb-1">
                <span>QR Code expira em</span>
                <span className={timeLeft < 300 ? 'text-red-500 font-bold' : 'text-dark font-semibold'}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full transition-colors ${timerPercent > 50 ? 'bg-success' : timerPercent > 20 ? 'bg-amber-400' : 'bg-red-400'}`}
                  animate={{ width: `${timerPercent}%` }}
                />
              </div>
            </div>

            {/* PIX key */}
            <div className="bg-secondary rounded-xl p-3">
              <p className="font-body text-xs text-medium mb-1">Chave PIX (CNPJ)</p>
              <div className="flex items-center gap-2">
                <code className="font-body text-dark text-sm font-semibold flex-1 break-all">{PIX_KEY}</code>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={copyPixKey}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    copied ? 'bg-success text-white' : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  {copied ? '✓ Copiado!' : 'Copiar'}
                </motion.button>
              </div>
              <p className="font-body text-xs text-medium mt-1.5">{PIX_NAME}</p>
            </div>
          </div>

          {/* Summary + Instructions */}
          <div className="space-y-4">
            {/* Total */}
            <div className="bg-white rounded-2xl p-5 border border-border shadow-sm text-center">
              <p className="font-body text-medium text-sm">Valor a pagar</p>
              <p className="font-display text-4xl font-bold text-primary mt-1">
                R$ {total.toFixed(2).replace('.', ',')}
              </p>
              <p className="font-body text-xs text-medium mt-1">Pedido #{orderId}</p>
            </div>

            {/* Steps */}
            <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
              <h3 className="font-display font-semibold text-dark mb-3 text-sm">Como pagar:</h3>
              <ol className="space-y-2">
                {[
                  'Abra o app do seu banco',
                  'Acesse a área PIX',
                  'Escaneie o QR Code ou cole a chave',
                  'Confira o valor e confirme',
                  'Envie o comprovante via WhatsApp',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 bg-primary rounded-full text-white text-xs font-bold flex-shrink-0 flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="font-body text-sm text-dark">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* WA button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={sendWhatsApp}
              className="w-full bg-success text-white font-body font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-success/90 transition-colors shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Enviar comprovante via WhatsApp
            </motion.button>

            <p className="font-body text-xs text-medium text-center">
              Ao clicar, seu pedido será confirmado e você será direcionado para o WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
