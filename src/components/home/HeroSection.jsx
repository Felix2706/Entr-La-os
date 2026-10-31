import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const floatingIcons = ['🎀', '✨', '🌸', '💜', '🎀', '🪄'];

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-soft pt-20 pb-12">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary/60 rounded-full blur-2xl" />
      </div>

      {/* Partículas flutuantes com movimento orgânico */}
      {floatingIcons.map((icon, i) => (
        <motion.span
          key={i}
          className="absolute text-xl md:text-2xl pointer-events-none select-none opacity-60"
          style={{
            top: `${15 + (i * 14)}%`,
            left: i % 2 === 0 ? `${4 + (i * 3)}%` : 'auto',
            right: i % 2 !== 0 ? `${4 + (i * 4)}%` : 'auto',
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, i % 2 === 0 ? 15 : -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4 + (i * 0.7),
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        >
          {icon}
        </motion.span>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Textos & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 self-start bg-white/80 border border-primary/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 shadow-sm"
            >
              <span className="text-primary text-base">✨</span>
              <span className="font-accent text-primary-dark font-bold text-lg">
                Feito à mão com carinho
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-dark leading-[1.15]"
            >
              Laços que{' '}
              <span className="text-gradient relative inline-block">
                encantam
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="#C9748D" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{' '}
              cada momento
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-body text-medium text-lg md:text-xl mt-6 leading-relaxed max-w-xl"
            >
              Artesanato delicado com cetim, veludo e gorgurão de alto padrão. Peças únicas para bebês, crianças, eventos especiais e personalizações sob medida.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <Link
                to="/catalogo"
                className="btn-primary text-base px-8 py-4 shadow-lg shadow-primary/25 hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Explorar Catálogo</span>
                <span>🎀</span>
              </Link>
              
              <Link
                to="/personalizar"
                className="btn-secondary text-base px-8 py-4 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Montar Laço Personalizado</span>
                <span>🪄</span>
              </Link>
            </motion.div>

            {/* Selo de qualidade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-border/80 max-w-lg"
            >
              <div>
                <p className="font-display text-2xl md:text-3xl font-bold text-primary">+150</p>
                <p className="text-xs text-medium font-body mt-0.5">Modelos Exclusivos</p>
              </div>
              <div>
                <p className="font-display text-2xl md:text-3xl font-bold text-accent-dark">100%</p>
                <p className="text-xs text-medium font-body mt-0.5">Feito à Mão</p>
              </div>
              <div>
                <p className="font-display text-2xl md:text-3xl font-bold text-primary">5.0 ★</p>
                <p className="text-xs text-medium font-body mt-0.5">Clientes Apaixonadas</p>
              </div>
            </motion.div>

          </div>

          {/* Lado Direito: Hero Product Reveal com Efeito Shimmer e Imagem Real */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Glow de fundo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-3xl blur-2xl transform scale-95" />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.25,
              }}
              className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 shimmer-effect glow-on-hover bg-white"
            >
              {/* Imagem real com acabamento de laço */}
              <img
                src="https://images.unsplash.com/photo-1582709489510-0da2069cd09d?w=800&auto=format&fit=crop&q=85"
                alt="Laço artesanal sofisticado em destaque"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />

              {/* Vinheta suave */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-black/10 pointer-events-none" />

              {/* Tag Superior: Lançamento */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white/95 backdrop-blur-md text-primary font-accent font-bold text-base px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <span>✨</span> Destaque da Semana
                </span>
              </div>

              {/* Card Flutuante Inferior com Informações do Kit */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-dark text-lg leading-tight">
                      Coleção Cetim &amp; Veludo
                    </h3>
                    <p className="font-body text-xs text-medium">
                      Acabamento antideslizante • Não amassa
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-medium block">a partir de</span>
                    <span className="font-display font-bold text-primary text-xl">R$ 15,90</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Badge Flutuante Lateral 1 (Logo/Handmade) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:flex absolute -left-8 top-16 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-primary/20 items-center gap-3 z-30"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl overflow-hidden shadow-inner">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="pr-2">
                <p className="font-accent font-bold text-primary text-base leading-none">Entre &amp; Laços</p>
                <p className="text-[11px] text-medium font-body mt-0.5">Ateliê Artesanal</p>
              </div>
            </motion.div>

            {/* Badge Flutuante Lateral 2 (Avaliação) */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="hidden sm:flex absolute -right-6 bottom-24 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-accent/30 flex-col gap-1 z-30"
            >
              <div className="flex text-primary text-sm gap-0.5">
                {'★'.repeat(5)}
              </div>
              <p className="font-body text-xs text-dark font-bold">100% Satisfação</p>
              <span className="text-[10px] text-medium font-body">Costura reforçada</span>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
