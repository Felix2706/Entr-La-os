import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, colors, materials } from '../data/products';

const sizes = [
  { id: 'P', label: 'Pequeno', desc: 'Para bebês (0–12m)', size: 'w-8 h-8' },
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
    type: null, size: null, color: null, material: null, details: '',
  });

  const update = (key, value) => setSelection(prev => ({ ...prev, [key]: value }));

  const canNext = [
    !!selection.type, !!selection.size, !!selection.color, !!selection.material, true,
  ];

  const generateWhatsAppMessage = () => {
    const type = categories.find(c => c.id === selection.type)?.name || '';
    const color = colors.find(c => c.id === selection.color)?.name || '';
    const material = materials.find(m => m.id === selection.material)?.name || '';
    const msg = `Olá! Gostaria de solicitar um laço personalizado:\n\n🎀 *Tipo:* ${type}\n📏 *Tamanho:* ${selection.size}\n🎨 *Cor:* ${color}\n✨ *Material:* ${material}${selection.details ? `\n📝 *Detalhes:* ${selection.details}` : ''}\n\nPoderia me dar um orçamento? 😊`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/5500000000000?text=${encoded}`, '_blank');
  };

  const stepVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen bg-secondary py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-accent text-primary text-xl mb-1">Crie o seu</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-dark">
            Laço Personalizado
          </h1>
          <p className="font-body text-medium mt-2">
            Passo {step + 1} de {stepTitles.length}: <strong>{stepTitles[step]}</strong>
          </p>
        </div>

        <StepIndicator step={step} totalSteps={stepTitles.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border min-h-[360px]">
              <AnimatePresence mode="wait">
                {/* Step 0: Type */}
                {step === 0 && (
                  <motion.div key="step0" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-display text-2xl font-bold text-dark mb-5">Qual tipo de laço?</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => update('type', cat.id)}
                          className={`p-4 rounded-2xl border-2 text-center transition-all duration-200 ${
                            selection.type === cat.id
                              ? 'border-primary bg-primary/5 scale-[1.02] shadow-md'
                              : 'border-border hover:border-primary/40 hover:bg-secondary'
                          }`}
                        >
                          <div className="text-3xl mb-2">{cat.emoji}</div>
                          <p className="font-body font-semibold text-dark text-sm">{cat.name}</p>
                          <p className="font-body text-medium text-xs mt-0.5">{cat.description}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Size */}
                {step === 1 && (
                  <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-display text-2xl font-bold text-dark mb-5">Qual tamanho?</h2>
                    <div className="space-y-3">
                      {sizes.map(sz => (
                        <button
                          key={sz.id}
                          onClick={() => update('size', sz.id)}
                          className={`w-full flex items-center gap-5 p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                            selection.size === sz.id
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-border hover:border-primary/40'
                          }`}
                        >
                          <div className={`${sz.size} rounded-full bg-gradient-primary flex-shrink-0 flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">{sz.id}</span>
                          </div>
                          <div>
                            <p className="font-display font-semibold text-dark text-base">{sz.label} ({sz.id})</p>
                            <p className="font-body text-medium text-sm">{sz.desc}</p>
                          </div>
                          {selection.size === sz.id && (
                            <span className="ml-auto text-primary text-xl">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Color */}
                {step === 2 && (
                  <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-display text-2xl font-bold text-dark mb-5">Escolha a cor</h2>
                    <div className="flex flex-wrap gap-3">
                      {colors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => update('color', color.id)}
                          title={color.name}
                          className={`group relative flex flex-col items-center gap-1.5 transition-all duration-200 ${
                            selection.color === color.id ? 'scale-110' : 'hover:scale-105'
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-full border-2 transition-all ${
                              selection.color === color.id
                                ? 'border-primary shadow-lg ring-2 ring-primary/40'
                                : color.border ? 'border-gray-300' : 'border-transparent shadow-sm'
                            }`}
                            style={{ background: color.hex }}
                          />
                          <span className="font-body text-xs text-medium">{color.name}</span>
                          {selection.color === color.id && (
                            <div className="absolute inset-0 flex items-start justify-center pt-1">
                              <span className="text-white text-sm drop-shadow-md">✓</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Material */}
                {step === 3 && (
                  <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-display text-2xl font-bold text-dark mb-5">Escolha o material</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {materials.map(mat => (
                        <button
                          key={mat.id}
                          onClick={() => update('material', mat.id)}
                          className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 text-left ${
                            selection.material === mat.id
                              ? 'border-primary shadow-md scale-[1.02]'
                              : 'border-border hover:border-primary/40'
                          }`}
                        >
                          <img src={mat.image} alt={mat.name} className="w-full h-28 object-cover" />
                          <div className="p-3">
                            <p className="font-body font-semibold text-dark text-sm">{mat.name}</p>
                            <p className="font-body text-medium text-xs mt-0.5">{mat.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Details */}
                {step === 4 && (
                  <motion.div key="step4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                    <h2 className="font-display text-2xl font-bold text-dark mb-2">Detalhes adicionais</h2>
                    <p className="font-body text-medium text-sm mb-5">Opcional — Conta pra gente se tiver alguma preferência especial!</p>
                    <textarea
                      value={selection.details}
                      onChange={e => update('details', e.target.value)}
                      placeholder="Ex: Para minha filha de 3 anos, preferência por cores mais claras, usar para festa de aniversário..."
                      rows={5}
                      className="input-field resize-none"
                    />
                    <p className="font-body text-medium text-xs mt-2">{selection.details.length}/500 caracteres</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-4 gap-3">
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Voltar
              </button>
              {step < stepTitles.length - 1 ? (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canNext[step]}
                  className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed px-8"
                >
                  Próximo →
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={generateWhatsAppMessage}
                  disabled={!selection.type || !selection.size || !selection.color || !selection.material}
                  className="bg-success text-white px-8 py-3 rounded-full font-semibold hover:bg-success/90 transition-colors shadow-md flex items-center gap-2 disabled:opacity-40"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Solicitar via WhatsApp
                </motion.button>
              )}
            </div>
          </div>

          {/* Preview panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-border sticky top-24">
              <h3 className="font-display font-semibold text-dark mb-4">Seu laço 🎀</h3>
              <div className="space-y-3">
                {[
                  { label: 'Tipo', value: categories.find(c => c.id === selection.type)?.name, icon: '🎀' },
                  { label: 'Tamanho', value: selection.size ? sizes.find(s => s.id === selection.size)?.label : null, icon: '📏' },
                  { label: 'Cor', value: colors.find(c => c.id === selection.color)?.name, icon: '🎨', colorHex: colors.find(c => c.id === selection.color)?.hex },
                  { label: 'Material', value: materials.find(m => m.id === selection.material)?.name, icon: '✨' },
                ].map(item => (
                  <div key={item.label} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${item.value ? 'bg-primary/5' : 'bg-secondary'}`}>
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="font-body text-xs text-medium">{item.label}</p>
                      {item.value ? (
                        <div className="flex items-center gap-1.5">
                          {item.colorHex && (
                            <span className="w-3 h-3 rounded-full border border-border inline-block flex-shrink-0" style={{ background: item.colorHex }} />
                          )}
                          <p className="font-body font-semibold text-dark text-sm">{item.value}</p>
                        </div>
                      ) : (
                        <p className="font-body text-medium text-sm italic">Ainda não escolhido</p>
                      )}
                    </div>
                  </div>
                ))}
                {selection.details && (
                  <div className="p-3 rounded-xl bg-primary/5">
                    <p className="font-body text-xs text-medium">📝 Detalhes</p>
                    <p className="font-body text-sm text-dark mt-0.5 line-clamp-3">{selection.details}</p>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-xs font-body text-medium mb-1">
                  <span>Progresso</span>
                  <span>{Math.round([selection.type, selection.size, selection.color, selection.material].filter(Boolean).length / 4 * 100)}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-primary rounded-full"
                    animate={{ width: `${[selection.type, selection.size, selection.color, selection.material].filter(Boolean).length / 4 * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
