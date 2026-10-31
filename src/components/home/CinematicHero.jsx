import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CinematicHero() {
  return (
    <section className="relative w-full min-h-screen bg-[#0C070A] overflow-hidden flex items-center justify-center">
      
      {/* VÍDEO CINEMATOGRÁFICO DE FUNDO (Loop, Autoplay, Muted, Playsinline) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transform scale-105 filter brightness-75 contrast-110"
        >
          <source src="hero_video.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>
      </div>

      {/* Overlay Escurecido e Vinheta Gradiente de Luxo para Leitura Impecável */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C070A] via-[#0C070A]/50 to-[#0C070A]/70 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 z-10 pointer-events-none" />

      {/* Conteúdo Tipográfico Editorial de Alta Costura */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full pt-24 pb-12 flex flex-col justify-between min-h-screen">
        
        {/* Topo da Campanha */}
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex items-center gap-3.5"
          >
            <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden shadow-2xl bg-black/40 backdrop-blur-md p-0.5">
              <img src="logo.jpg" alt="Logo Entre & Laços" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <span className="font-accent text-3xl sm:text-4xl text-white font-bold tracking-wider block leading-none drop-shadow-md">
                Entre &amp; Laços
              </span>
              <span className="text-[10px] text-white/70 uppercase tracking-[0.25em] font-body mt-1 block font-medium">
                Ateliê de Acessórios Nobres
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-body tracking-wider uppercase text-white/90 font-medium">
              Feito à mão com carinho
            </span>
          </motion.div>
        </div>

        {/* Centro: Títulos e Conceito Visual Cinematográfico */}
        <div className="max-w-2xl mt-12 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md mb-5 shadow-lg">
              <span className="text-xs text-primary-light font-bold">✨ Coleção Alta Costura 2026</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight drop-shadow-lg">
              A elegância viva em cada movimento.
            </h1>
            
            <p className="font-body text-white/80 text-base sm:text-lg mt-5 leading-relaxed max-w-xl font-light drop-shadow-md">
              A delicadeza do cetim e o charme do artesanal reunidos em laços e acessórios únicos. Criados à mão para transformar qualquer momento em uma celebração inesquecível.
            </p>
          </motion.div>

          {/* Botões de Ação com Efeito Glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <Link
              to="/catalogo"
              className="relative group overflow-hidden px-8 py-4 rounded-full bg-white text-dark font-body font-bold text-sm tracking-wide transition-all shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:shadow-[0_0_45px_rgba(201,116,141,0.6)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Explorar Catálogo</span>
                <span>→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            <Link
              to="/personalizar"
              className="px-8 py-4 rounded-full bg-black/40 hover:bg-black/60 text-white font-body font-semibold text-sm backdrop-blur-md border border-white/25 transition-all active:scale-95 flex items-center gap-2 shadow-lg"
            >
              <span>Monte Seu Modelo</span>
              <span className="text-primary-light">🎀</span>
            </Link>
          </motion.div>
        </div>

        {/* Rodapé do Hero */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/15">
          <div className="flex items-center gap-6 text-xs text-white/70 font-body">
            <div>
              <p className="font-display text-xl font-bold text-white leading-none">+150</p>
              <span className="text-[11px] text-white/60">Modelos Exclusivos</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div>
              <p className="font-display text-xl font-bold text-white leading-none">100%</p>
              <span className="text-[11px] text-white/60">Feito à Mão</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div>
              <p className="font-display text-xl font-bold text-white leading-none">5.0 ★</p>
              <span className="text-[11px] text-white/60">Avaliação das Clientes</span>
            </div>
          </div>

          <div className="text-xs text-white/50 font-body">
            <span>© Entre &amp; Laços • Todos os direitos reservados</span>
          </div>
        </div>

      </div>

    </section>
  );
}
