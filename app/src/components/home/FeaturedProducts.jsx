import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../../data/products';
import ProductCard from '../shared/ProductCard';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-primary text-xl mb-2"
          >
            Os mais amados
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Produtos em Destaque
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mt-3 max-w-lg mx-auto"
          >
            Escolhidos com carinho pelas clientes que mais amam nossos laços
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/catalogo" className="btn-primary">
            Ver todos os produtos →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
