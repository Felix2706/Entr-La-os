import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Floating bow particles
const bows = ['🎀', '🎀', '✨', '🌸', '🎀', '💕', '🎀', '✨'];

function FloatingParticle({ emoji, style }) {
  return (
    <motion.span
      className="absolute text-xl pointer-events-none select-none"
      style={style}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 15, -10, 0],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: style.duration || 4,
        repeat: Infinity,
        delay: style.delay || 0,
        ease: 'easeInOut',
      }}
    >
      {emoji}
    </motion.span>
  );
}

export default function HeroSection() {
  const particles = [
    { emoji: '🎀', style: { top: '10%', left: '5%', duration: 3.5, delay: 0 } },
    { emoji: '✨', style: { top: '20%', right: '8%', duration: 4, delay: 0.5 } },
    { emoji: '🌸', style: { bottom: '30%', left: '3%', duration: 3, delay: 1 } },
    { emoji: '🎀', style: { bottom: '15%', right: '5%', duration: 4.5, delay: 0.2 } },
    { emoji: '💕', style: { top: '50%', left: '10%', duration: 3.8, delay: 0.8 } },
    { emoji: '✨', style: { top: '40%', right: '12%', duration: 3.2, delay: 1.5 } },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-soft">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-light/10 rounded-full blur-2xl" />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} emoji={p.emoji} style={p.style} />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-24 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="order-2 md:order-1">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-accent text-primary text-2xl mb-3"
            >
              Handmade with love ✨
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-dark leading-tight"
            >
              Laços que{' '}
              <span className="text-gradient">encantam</span>{' '}
              e adornam
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="font-body text-medium text-lg mt-6 leading-relaxed max-w-md"
            >
              Cada laço é uma obra de arte feita à mão com materiais selecionados e muito carinho. Para bebês, crianças, adultos e decoração.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link to="/catalogo" className="btn-primary text-base px-8 py-3.5">
                Ver Catálogo 🎀
              </Link>
              <Link to="/personalizar" className="btn-secondary text-base px-8 py-3.5">
                Personalizar
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-8 mt-10"
            >
              {[
                { value: '+200', label: 'Modelos' },
                { value: '+1.2k', label: 'Clientes felizes' },
                { value: '100%', label: 'Artesanal' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="font-body text-medium text-xs">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative mx-auto w-full max-w-md">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=700&fit=crop"
                  alt="Laços artesanais Entre & Laços"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/20" />
              </div>

              {/* Floating card badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-6 top-1/4 glass rounded-2xl px-4 py-3 shadow-xl border border-white/60"
              >
                <p className="font-accent text-primary text-sm font-semibold">Feito à mão 🎀</p>
                <p className="font-body text-xs text-medium">com amor artesanal</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-4 bottom-1/4 glass rounded-2xl px-4 py-3 shadow-xl border border-white/60"
              >
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary text-xs">★</span>
                  ))}
                </div>
                <p className="font-body text-xs text-dark font-semibold">+1.200 avaliações</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
