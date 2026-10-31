import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const steps = [
  { num: '01', label: 'Escolha o tipo' },
  { num: '02', label: 'Defina o tamanho' },
  { num: '03', label: 'Escolha a cor' },
  { num: '04', label: 'Selecione o material' },
  { num: '05', label: 'Receba via WhatsApp' },
];

export default function PersonalizerBanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-primary opacity-95" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-white/80 text-2xl mb-2"
          >
            Crie o seu
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-white"
          >
            Laço Personalizado
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-white/80 text-lg mt-3 max-w-md mx-auto"
          >
            Escolha o tipo, cor, tamanho e material. Receba seu orçamento direto no WhatsApp!
          </motion.p>
        </div>

        {/* Steps */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
            >
              <span className="font-display text-white/60 text-sm font-bold">{step.num}</span>
              <span className="font-body text-white text-sm font-medium">{step.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Link
            to="/personalizar"
            className="bg-white text-primary font-body font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            🎀 Criar meu laço personalizado
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
