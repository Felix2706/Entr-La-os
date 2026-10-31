import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, colors, materials } from '../data/products';
import BowViewer3D from '../components/shared/BowViewer3D';
import confetti from 'canvas-confetti';

const sizes = [
  { id: 'P', label: 'Pequeno', desc: 'Bebês (0–12m)', size: 'w-8 h-8' },
  { id: 'M', label: 'Médio', desc: 'Crianças (1–6 anos)', size: 'w-12 h-12' },
  { id: 'G', label: 'Grande', desc: 'Maiores e adultas', size: 'w-16 h-16' },
];

const stepTitles = [
  'Tipo do Laço',
  'Tamanho',
  'Cor Principal',
  'Material',
  'Detalhes Finais',
];

function StepIndicator({ step, totalSteps }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-body transition-all duration-300 ${
            i < step ? 'bg-primary text-white' :
            i === step ? 'bg-primary text-white ring-4 ring-primary/30 scale-110' :
            'bg-secondary text-medium border border-border'
          }`}>
            {i < step ? '✓' : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`h-0.5 w-6 md:w-10 rounded-full transition-all duration-500 ${
              i < step ? 'bg-primary' : 'bg-border'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Personalizer() {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState({
    type: 'bico-de-pato',
    size: 'M',
    color: 'rosa',
    material: 'cetim',
    details: '',
  });

  const update = (key, value) => {
    setSelection(prev => ({ ...prev, [key]: value }));
  };

  const canNext = [
    !!selection.type, !!selection.size, !!selection.color, !!selection.material, true,
  ];

  const handleNext = () => {
    if (step === 3) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#C9748D', '#A78BCD', '#F5EDE3', '#FFFFFF']
      });
    }
    setStep(s => s + 1);
  };

  const generateWhatsAppMessage = () => {
    const type = categories.find(c => c.id === selection.type)?.name || '';
    const color = colors.find(c => c.id === selection.color)?.name || '';
    const material = materials.find(m => m.id === selection.material)?.name || '';
    const msg = `Olá! Montei meu laço personalizado no site da Entre & Laços e gostaria de um orçamento:\n\n🎀 *Tipo:* ${type}\n📏 *Tamanho:* ${selection.size}\n🎨 *Cor:* ${color}\n✨ *Material:* ${material}${selection.details ? `\n📝 *Detalhes:* ${selection.details}` : ''}\n\nPoderia me passar o valor e prazo de confecção? Muito obrigada! 💖`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/5500000000000?text=${encoded}`, '_blank');
  };

  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="min-h-screen bg-secondary/40 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-accent text-primary text-2xl font-bold mb-1">Ateliê Sob Medida</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark">
            Monte Seu Laço em 3D
          </h1>
          <p className="font-body text-medium mt-2 text-sm sm:text-base">
            Visualize em tempo real como o laço ou acessório vai ficar conforme suas escolhas!
          </p>
        </div>

        <StepIndicator step={step} totalSteps={stepTitles.length} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Lado Esquerdo: Painel de Passos Interativos (7 colunas) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
              <AnimatePresence mode="wait">
                
                {/* Passo 0: Tipo */}
                {step === 0 && (
                  <motion.div key="step0" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display text-2xl font-bold text-dark">1. Qual modelo você deseja?</h2>
                      <span className="text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">Passo 1/5</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => update('type', cat.id)}
                          className={`p-3.5 rounded-2xl border-2 text-center transition-all duration-200 flex flex-col items-center gap-1.5 ${
                            selection.type === cat.id
                              ? 'border-primary bg-primary/10 shadow-md scale-102 ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/40 bg-white hover:bg-secondary/40'
                          }`}
                        >
                          <span className="text-3xl">{cat.emoji}</span>
                          <span className="font-display font-bold text-xs sm:text-sm text-dark">{cat.name}</span>
                          <span className="font-body text-[10px] text-medium line-clamp-1">{cat.description}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Passo 1: Tamanho */}
                {step === 1 && (
                  <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display text-2xl font-bold text-dark">2. Escolha o tamanho:</h2>
                      <span className="text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">Passo 2/5</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {sizes.map(s => (
                        <button
                          key={s.id}
                          onClick={() => update('size', s.id)}
                          className={`p-5 rounded-2xl border-2 text-center transition-all duration-200 ${
                            selection.size === s.id
                              ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/40 bg-white'
                          }`}
                        >
                          <div className={`mx-auto rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary mb-3 ${s.size}`}>
                            {s.id}
                          </div>
                          <span className="font-display font-bold text-base text-dark block">{s.label}</span>
                          <span className="font-body text-xs text-medium mt-1 block">{s.desc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Passo 2: Cor */}
                {step === 2 && (
                  <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display text-2xl font-bold text-dark">3. Selecione a cor da fita:</h2>
                      <span className="text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">Passo 3/5</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {colors.map(c => (
                        <button
                          key={c.id}
                          onClick={() => update('color', c.id)}
                          className={`p-3 rounded-2xl border-2 text-center transition-all duration-200 flex flex-col items-center gap-2 ${
                            selection.color === c.id
                              ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/40 bg-white'
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                            style={{ background: c.hex }}
                          />
                          <span className="font-body text-xs font-semibold text-dark">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Passo 3: Material */}
                {step === 3 && (
                  <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display text-2xl font-bold text-dark">4. Qual tecido você prefere?</h2>
                      <span className="text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">Passo 4/5</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {materials.map(m => (
                        <button
                          key={m.id}
                          onClick={() => update('material', m.id)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-4 ${
                            selection.material === m.id
                              ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/40 bg-white'
                          }`}
                        >
                          <img
                            src={m.image}
                            alt={m.name}
                            className="w-16 h-16 rounded-xl object-cover shadow-sm flex-shrink-0"
                          />
                          <div>
                            <span className="font-display font-bold text-base text-dark block">{m.name}</span>
                            <span className="font-body text-xs text-medium mt-0.5 block">{m.description}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Passo 4: Detalhes */}
                {step === 4 && (
                  <motion.div key="step4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display text-2xl font-bold text-dark">5. Observações Especiais</h2>
                      <span className="text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">Passo 5/5</span>
                    </div>
                    <p className="font-body text-xs text-medium mb-3">
                      Quer adicionar bordado com nome, pedrarias, fita dupla ou algum detalhe específico? Escreva abaixo:
                    </p>
                    <textarea
                      value={selection.details}
                      onChange={e => update('details', e.target.value)}
                      placeholder="Ex: Gostaria de bordar o nome 'Helena' na ponta direita e incluir mini pérolas no miolo central..."
                      className="w-full p-4 rounded-2xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none font-body text-sm text-dark h-36 resize-none"
                    />
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Botões de Navegação */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                {step > 0 ? (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    className="btn-secondary text-sm px-6 py-2.5"
                  >
                    ← Voltar
                  </button>
                ) : <div />}

                {step < stepTitles.length - 1 ? (
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNext}
                    disabled={!canNext[step]}
                    className="btn-primary text-sm px-7 py-3 disabled:opacity-40"
                  >
                    Continuar →
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={generateWhatsAppMessage}
                    className="bg-emerald-600 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <span>Solicitar Orçamento no WhatsApp</span>
                    <span>💬</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Lado Direito: Preview 3D Interativo + Resumo (5 colunas) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
            
            {/* O Canvas 3D em tempo real */}
            <BowViewer3D selection={selection} colors={colors} />

            {/* Cartão de Resumo das Opções */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-dark text-base">Composição do Acessório</h3>
                <span className="text-xs text-primary font-bold">100% Personalizado</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-body">
                <div className="bg-secondary/60 p-2.5 rounded-xl">
                  <span className="text-medium block text-[10px] uppercase">Modelo</span>
                  <strong className="text-dark capitalize">
                    {categories.find(c => c.id === selection.type)?.name || 'Não selecionado'}
                  </strong>
                </div>

                <div className="bg-secondary/60 p-2.5 rounded-xl">
                  <span className="text-medium block text-[10px] uppercase">Tamanho</span>
                  <strong className="text-dark">
                    {sizes.find(s => s.id === selection.size)?.label || 'Não selecionado'}
                  </strong>
                </div>

                <div className="bg-secondary/60 p-2.5 rounded-xl">
                  <span className="text-medium block text-[10px] uppercase">Cor Principal</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className="w-3 h-3 rounded-full border border-border inline-block flex-shrink-0"
                      style={{ background: colors.find(c => c.id === selection.color)?.hex }}
                    />
                    <strong className="text-dark truncate">
                      {colors.find(c => c.id === selection.color)?.name || 'Não selecionado'}
                    </strong>
                  </div>
                </div>

                <div className="bg-secondary/60 p-2.5 rounded-xl">
                  <span className="text-medium block text-[10px] uppercase">Acabamento</span>
                  <strong className="text-dark capitalize truncate">
                    {materials.find(m => m.id === selection.material)?.name || 'Não selecionado'}
                  </strong>
                </div>
              </div>

              {selection.details && (
                <div className="mt-3 p-2.5 bg-primary/5 rounded-xl border border-primary/10">
                  <span className="text-[10px] font-bold text-primary block uppercase">Notas Especiais:</span>
                  <p className="text-xs text-dark mt-0.5 line-clamp-2">{selection.details}</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
