import { motion } from 'framer-motion';
import { testimonials } from '../../data/products';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-primary text-xl mb-2"
          >
            O que dizem nossas clientes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Avaliações com Amor
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>

              <p className="font-body text-dark text-sm leading-relaxed mb-4 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <p className="font-display font-semibold text-dark text-sm">{t.name}</p>
                  <p className="font-body text-medium text-xs">{t.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
