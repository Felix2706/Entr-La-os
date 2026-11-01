import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BowVectorPreview({ selection, colors }) {
  const selectedColorObj = colors.find(c => c.id === selection.color) || {
    name: 'Rosa Delicado',
    hex: '#C9748D'
  };
  const colorHex = selectedColorObj.hex;
  const colorName = selectedColorObj.name;

  // Tamanhos relativos
  const scale = selection.size === 'P' ? 0.82 : selection.size === 'G' ? 1.18 : 1.0;

  // Determina acabamento conforme tecido
  const isSatin = selection.material === 'cetim' || !selection.material;
  const isVelvet = selection.material === 'veludo';

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EE] to-[#F5ECE1] border border-border shadow-sm flex flex-col justify-between p-6">
      
      {/* Topo da Pré-visualização Ilustrada */}
      <div className="flex items-center justify-between z-10 mb-2">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-primary/20">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
          <span className="text-xs font-body font-bold text-dark">
            Pré-visualização do Laço • Ilustração Artesanal
          </span>
        </div>

        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-border">
          <span
            className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shadow-inner"
            style={{ backgroundColor: colorHex }}
          />
          <span className="text-xs font-body font-bold text-dark">
            {colorName}
          </span>
        </div>
      </div>

      {/* Área Central: O Laço Vetorial SVG Dinâmico no Estilo da Logo */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center my-3 overflow-hidden">
        
        {/* Glow suave e partículas decorativas no estilo da marca */}
        <div
          className="absolute inset-8 rounded-full blur-3xl opacity-25 transition-colors duration-500"
          style={{ backgroundColor: colorHex }}
        />

        <motion.div
          animate={{
            scale: scale,
            y: [0, -6, 0],
          }}
          transition={{
            scale: { duration: 0.35, ease: 'easeOut' },
            y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="relative w-full max-w-sm flex items-center justify-center"
        >
          <svg
            viewBox="0 0 500 400"
            className="w-full h-auto drop-shadow-[0_12px_24px_rgba(201,116,141,0.18)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradiente da Fita com a Cor Selecionada */}
              <linearGradient id="bowRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colorHex} stopOpacity="1" />
                <stop offset="60%" stopColor={colorHex} stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8A4A5D" stopOpacity="0.85" />
              </linearGradient>

              {/* Sombra / Profundidade da Fita Interna */}
              <linearGradient id="innerFoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A202E" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
              </linearGradient>

              {/* Brilho do Cetim */}
              <linearGradient id="satinGleam" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity={isSatin ? 0.45 : 0.15} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              {/* Metal da presilha / clipe */}
              <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C4C4C4" />
                <stop offset="50%" stopColor="#F5F5F5" />
                <stop offset="100%" stopColor="#A8A8A8" />
              </linearGradient>
            </defs>

            {/* 1. SE FOR XUXINHA: Elástico Traseiro */}
            {selection.type === 'xuxinha' && (
              <g id="base-xuxinha" opacity="0.95">
                <ellipse cx="250" cy="180" rx="140" ry="85" stroke="#333333" strokeWidth="26" fill="none" strokeDasharray="16 8" />
                <ellipse cx="250" cy="180" rx="140" ry="85" stroke="#555555" strokeWidth="12" fill="none" />
              </g>
            )}

            {/* 2. SE FOR BICO DE PATO / PRESILHA: Clipe metálico aparecendo suavemente atrás */}
            {(selection.type === 'bico-de-pato' || selection.type === 'presilha') && (
              <g id="base-bico-de-pato">
                <rect x="140" y="185" width="220" height="24" rx="12" fill="url(#metalGrad)" stroke="#888" strokeWidth="2" transform="rotate(-6 250 197)" />
                <line x1="180" y1="197" x2="320" y2="197" stroke="#666" strokeWidth="2" strokeDasharray="6 4" transform="rotate(-6 250 197)" />
              </g>
            )}

            {/* 3. SE FOR TIARA OU FAIXA: Arco elegante */}
            {(selection.type === 'tiara' || selection.type === 'faixa') && (
              <g id="base-tiara">
                <path
                  d="M70 340 C90 120, 410 120, 430 340"
                  stroke={selection.type === 'tiara' ? '#D6C0A6' : colorHex}
                  strokeWidth={selection.type === 'tiara' ? '18' : '28'}
                  strokeLinecap="round"
                  fill="none"
                />
                {selection.type === 'tiara' && (
                  <path d="M70 340 C90 120, 410 120, 430 340" stroke="#FFF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6" />
                )}
              </g>
            )}

            {/* RAMINHOS DECORATIVOS DA MARCA ENTRE & LAÇOS */}
            <g opacity="0.6" stroke={colorHex} strokeWidth="2.5" strokeLinecap="round">
              {/* Ramo esquerdo */}
              <path d="M120 200 C80 180, 70 230, 40 210" fill="none" />
              <path d="M95 190 C85 180, 80 190, 85 195" fill={colorHex} opacity="0.3" />
              <path d="M65 215 C55 205, 50 215, 58 220" fill={colorHex} opacity="0.3" />

              {/* Ramo direito */}
              <path d="M380 200 C420 180, 430 230, 460 210" fill="none" />
              <path d="M405 190 C415 180, 420 190, 415 195" fill={colorHex} opacity="0.3" />
              <path d="M435 215 C445 205, 450 215, 442 220" fill={colorHex} opacity="0.3" />
            </g>

            {/* 4. CAUDA ESQUERDA DA FITA */}
            <g id="cauda-esquerda">
              <path
                d="M230 190 C210 240, 160 300, 110 340 L160 325 L190 355 C220 300, 240 240, 250 190 Z"
                fill="url(#bowRibbonGrad)"
                stroke="#682F40"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Vinco / Sombra da Cauda */}
              <path
                d="M230 190 C210 240, 175 285, 160 325"
                stroke="#682F40"
                strokeWidth="2"
                strokeDasharray="4 3"
                opacity="0.4"
              />
            </g>

            {/* 5. CAUDA DIREITA DA FITA */}
            <g id="cauda-direita">
              <path
                d="M270 190 C290 240, 340 300, 390 340 L340 325 L310 355 C280 300, 260 240, 250 190 Z"
                fill="url(#bowRibbonGrad)"
                stroke="#682F40"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <path
                d="M270 190 C290 240, 325 285, 340 325"
                stroke="#682F40"
                strokeWidth="2"
                strokeDasharray="4 3"
                opacity="0.4"
              />
            </g>

            {/* 6. ASA ESQUERDA DO LAÇO (Dobra & Volume) */}
            <g id="asa-esquerda">
              {/* Fundo interno da dobra (sombra escura) */}
              <path
                d="M240 160 C160 110, 80 120, 85 180 C90 230, 170 210, 240 180 Z"
                fill="#4E1E2D"
                opacity="0.5"
              />
              {/* Fita frontal da asa */}
              <path
                d="M245 155 C160 90, 80 110, 75 175 C70 235, 165 220, 245 185 C230 170, 230 165, 245 155 Z"
                fill="url(#bowRibbonGrad)"
                stroke="#682F40"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Brilho da curvatura */}
              <path
                d="M100 135 C150 110, 210 135, 225 155"
                stroke="url(#satinGleam)"
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Dobra de costura */}
              <path
                d="M75 175 C100 185, 140 180, 160 170"
                stroke="#682F40"
                strokeWidth="2.5"
                fill="none"
              />
            </g>

            {/* 7. ASA DIREITA DO LAÇO */}
            <g id="asa-direita">
              <path
                d="M260 160 C340 110, 420 120, 415 180 C410 230, 330 210, 260 180 Z"
                fill="#4E1E2D"
                opacity="0.5"
              />
              <path
                d="M255 155 C340 90, 420 110, 425 175 C430 235, 335 220, 255 185 C270 170, 270 165, 255 155 Z"
                fill="url(#bowRibbonGrad)"
                stroke="#682F40"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M400 135 C350 110, 290 135, 275 155"
                stroke="url(#satinGleam)"
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M425 175 C400 185, 360 180, 340 170"
                stroke="#682F40"
                strokeWidth="2.5"
                fill="none"
              />
            </g>

            {/* 8. NÓ CENTRAL FRANZIDO */}
            <g id="no-central">
              {/* Sombra de apoio do nó */}
              <ellipse cx="250" cy="173" rx="28" ry="34" fill="#3D1422" opacity="0.3" />
              {/* Miolo principal */}
              <rect
                x="226"
                y="142"
                width="48"
                height="62"
                rx="14"
                fill="url(#bowRibbonGrad)"
                stroke="#682F40"
                strokeWidth="4"
              />
              {/* Franzidos verticais do tecido */}
              <path d="M238 146 C236 160, 236 185, 238 198" stroke="#682F40" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
              <path d="M262 146 C264 160, 264 185, 262 198" stroke="#682F40" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
              
              {/* Brilho de cetim no nó */}
              <ellipse cx="250" cy="170" rx="8" ry="20" fill="#FFFFFF" opacity={isSatin ? 0.35 : 0.1} />

              {/* Ponto de luz / strass no centro */}
              <circle cx="250" cy="172" r="5" fill="#FFFFFF" stroke="#682F40" strokeWidth="1.5" />
            </g>

            {/* Estrelinhas / Pontos de Brilho da Logo */}
            <g fill={colorHex} opacity="0.7">
              <path d="M250 85 L252 92 L259 94 L252 96 L250 103 L248 96 L241 94 L248 92 Z" />
              <path d="M190 80 L191 85 L196 86 L191 87 L190 92 L189 87 L184 86 L189 85 Z" opacity="0.5" />
              <path d="M310 80 L311 85 L316 86 L311 87 L310 92 L309 87 L304 86 L309 85 Z" opacity="0.5" />
            </g>
          </svg>
        </motion.div>

      </div>

      {/* Rodapé com Dicas & Informações do Modelo Escolhido */}
      <div className="flex items-center justify-between z-10 pt-3 border-t border-border/80">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-body text-medium">
            Modelo: <strong className="text-dark uppercase">{selection.type ? selection.type.replace(/-/g, ' ') : 'Bico de Pato'}</strong>
          </span>
          <span className="text-medium text-xs">•</span>
          <span className="text-[11px] font-body text-medium">
            Tamanho: <strong className="text-dark">{selection.size || 'M'}</strong>
          </span>
        </div>

        <span className="text-xs font-accent font-bold text-primary">
          Feito à mão com amor 🎀
        </span>
      </div>

    </div>
  );
}
