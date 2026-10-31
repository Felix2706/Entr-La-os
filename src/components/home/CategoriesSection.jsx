import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-secondary/40 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho da Seção com Efeito Scroll Reveal */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-accent text-primary text-2xl font-bold mb-2"
          >
            Descubra cada detalhe
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-dark"
          >
            Categorias em Destaque
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Grid com Imagens Reais de Cada Categoria e Hover Elegante */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            >
              <Link
                to={`/catalogo?categoria=${cat.id}`}
                className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-400 bg-white border border-border/80 hover:border-primary/40 transform hover:-translate-y-2"
              >
                {/* Imagem de Fundo com Zoom suave */}
                <div className="relative h-44 overflow-hidden bg-secondary">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                  
                  {/* Badge Emoji */}
                  <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-xl shadow-md group-hover:rotate-12 transition-transform">
                    {cat.emoji}
                  </div>

                  {/* Nome sobre a imagem */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-display font-bold text-white text-lg drop-shadow-md">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                {/* Conteúdo textual inferior */}
                <div className="p-4 bg-white flex items-center justify-between">
                  <p className="font-body text-xs text-medium line-clamp-1">
                    {cat.description}
                  </p>
                  <span className="text-primary font-bold text-sm ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
