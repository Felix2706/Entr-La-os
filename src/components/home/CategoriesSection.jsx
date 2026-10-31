import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-primary text-xl mb-2"
          >
            Explore nossa coleção
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Categorias
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <Link
                to={`/catalogo?categoria=${cat.id}`}
                className="group block bg-white rounded-2xl p-6 text-center border border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out hover:border-primary/30"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                  className="text-4xl mb-3 inline-block"
                >
                  {cat.emoji}
                </motion.div>
                <h3 className="font-display font-semibold text-dark text-sm md:text-base group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="font-body text-medium text-xs mt-1">
                  {cat.description}
                </p>
              </Link>
            </motion.div>
          ))}

          {/* "Ver Tudo" card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: categories.length * 0.07 }}
          >
            <Link
              to="/catalogo"
              className="group block bg-gradient-primary rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-display font-semibold text-white text-sm md:text-base">
                Ver Tudo
              </h3>
              <p className="font-body text-white/80 text-xs mt-1">
                Todos os laços
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
