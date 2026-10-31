import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BowViewer3D({ selection, colors }) {
  const [viewSide, setViewSide] = useState('frente'); // 'frente' ou 'verso'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotationDeg, setRotationDeg] = useState(0);

  const currentColor = colors.find(c => c.id === selection.color)?.name || 'Rosa';
  const colorHex = colors.find(c => c.id === selection.color)?.hex || '#C9748D';

  const toggleSide = () => {
    setViewSide(prev => (prev === 'frente' ? 'verso' : 'frente'));
    setRotationDeg(prev => prev + 180);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#2E1A23] via-[#1E1419] to-[#120B0F] border border-primary/20 shadow-2xl p-5 flex flex-col justify-between">
      
      {/* Top Header do Visualizador */}
      <div className="flex items-center justify-between z-20 mb-3">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-body font-semibold text-white">
            Fotografia &amp; Detalhes Reais • Ateliê
          </span>
        </div>

        <button
          onClick={toggleSide}
          className="flex items-center gap-1.5 bg-primary/25 hover:bg-primary/40 border border-primary/40 text-white font-body text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-md"
        >
          <span>🔄 Ver {viewSide === 'frente' ? 'Verso (Bico de Pato)' : 'Frente (Laço Duplo)'}</span>
        </button>
      </div>

      {/* Área Central: O Laço Real Fotográfico com Efeito 3D e rotação interativa */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden rounded-2xl bg-black/20 my-2 group">
        
        {/* Glow atmosférico suave no fundo */}
        <div
          className="absolute inset-0 opacity-20 blur-3xl rounded-full transition-colors duration-500"
          style={{ background: colorHex }}
        />

        {/* Imagem do Laço Real com Animação de Giro Suave 3D */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewSide}
            initial={{ opacity: 0, rotateY: viewSide === 'frente' ? -90 : 90, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, scale: zoomLevel }}
            exit={{ opacity: 0, rotateY: viewSide === 'frente' ? 90 : -90, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-center justify-center p-2"
          >
            <img
              src={viewSide === 'frente' ? 'laco_real_frente.jpg' : 'laco_real_verso.jpg'}
              alt={viewSide === 'frente' ? 'Frente do Laço em Gorgurão Artesanal' : 'Verso com Bico de Pato em Aço Inox'}
              className="max-h-full max-w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.65)] rounded-xl transform transition-transform duration-500 group-hover:scale-105"
            />

            {/* Simulação de tingimento/cor selecionada sob a fita de gorgurão */}
            {selection.color !== 'rosa' && (
              <div
                className="absolute inset-4 rounded-xl mix-blend-color opacity-30 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: colorHex }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Hotspots explicativos reais */}
        {viewSide === 'frente' ? (
          <>
            <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-body font-bold text-dark shadow-md border border-white/60">
              🧵 Fita Estampada + Gorgurão Encorpado
            </div>
            <div className="absolute bottom-6 right-6 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-body font-bold text-primary shadow-md border border-white/60">
              🎀 Nó Central Franzido Firme
            </div>
          </>
        ) : (
          <>
            <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-body font-bold text-dark shadow-md border border-white/60">
              ⚡ Presilha Bico de Pato com Dentes Fortes
            </div>
            <div className="absolute bottom-6 right-6 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-body font-bold text-emerald-700 shadow-md border border-white/60">
              🛡️ Acabamento Antideslizante
            </div>
          </>
        )}

        {/* Controles de Zoom */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
          <button
            onClick={() => setZoomLevel(prev => Math.max(0.9, prev - 0.15))}
            className="text-white/80 hover:text-white px-1.5 text-xs font-bold"
            title="Diminuir"
          >
            -
          </button>
          <span className="text-[10px] text-white/60 font-body">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.15))}
            className="text-white/80 hover:text-white px-1.5 text-xs font-bold"
            title="Aumentar"
          >
            +
          </button>
        </div>
      </div>

      {/* Footer com especificações do modelo real */}
      <div className="flex items-center justify-between text-xs font-body text-white/70 pt-2 border-t border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border border-white/40" style={{ background: colorHex }} />
          <span className="text-white font-semibold">{currentColor}</span>
          <span className="text-white/40">•</span>
          <span>Gorgurão Texturizado</span>
        </div>

        <span className="text-primary-light font-accent font-bold text-sm">
          Feito à mão por Entre &amp; Laços
        </span>
      </div>

    </div>
  );
}
