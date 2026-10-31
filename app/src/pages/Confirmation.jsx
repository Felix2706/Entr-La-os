import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOrderStore } from '../store';

function ConfettiPiece({ style }) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-sm pointer-events-none"
      style={{ ...style, left: `${Math.random() * 100}%` }}
      animate={{
        y: ['0vh', '100vh'],
        rotate: [0, 720],
        opacity: [1, 0],
      }}
      transition={{
        duration: 2.5 + Math.random() * 2,
        delay: Math.random() * 1.5,
        ease: 'easeIn',
      }}
    />
  );
}

export default function Confirmation() {
  const { orderId, clearOrder } = useOrderStore();
  const navigate = useNavigate();

  const confettiColors = ['#C9748D', '#A78BCD', '#DDA0B5', '#C4AEDE', '#F5EDE3'];

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center px-4 relative overflow-hidden py-16">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <ConfettiPiece
            key={i}
            style={{ background: confettiColors[i % confettiColors.length], top: '-20px' }}
          />
        ))}
      </div>

      <div className="max-w-lg w-full text-center relative z-10">
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-28 h-28 bg-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-success/30"
        >
          <motion.svg
            width="56" height="56" viewBox="0 0 24 24" fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            <motion.path
              d="M5 13l4 4L19 7"
              stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
          </motion.svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-accent text-primary text-2xl mb-2">Pedido confirmado! 🎀</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-dark">
            Que alegria!
          </h1>
          <p className="font-body text-medium text-lg mt-4 leading-relaxed">
            Seu pedido foi recebido com muito carinho.{' '}
            <span className="font-semibold text-dark">Vamos preparar tudo com amor</span>{' '}
            e entrar em contato via WhatsApp em breve!
          </p>

          {orderId && (
            <div className="mt-5 inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-border shadow-sm">
              <span className="font-body text-medium text-sm">Número do pedido:</span>
              <span className="font-display font-bold text-primary text-lg">#{orderId}</span>
            </div>
          )}

          <div className="mt-6 bg-white rounded-2xl p-5 border border-border shadow-sm text-left">
            <h3 className="font-display font-semibold text-dark mb-3">Próximos passos:</h3>
            <ol className="space-y-2">
              {[
                '✅ Recebemos seu pedido e comprovante',
                '📲 Entraremos em contato via WhatsApp',
                '🎀 Seu laço será feito com muito carinho',
                '📦 Você receberá a confirmação de envio',
              ].map((step, i) => (
                <li key={i} className="font-body text-sm text-dark">{step}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <Link to="/" onClick={clearOrder} className="btn-primary">
              🏠 Voltar ao início
            </Link>
            <Link to="/catalogo" className="btn-secondary">
              Ver mais laços
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
