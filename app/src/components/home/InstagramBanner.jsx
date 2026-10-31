import { motion } from 'framer-motion';

export default function InstagramBanner() {
  const placeholderImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
  ];

  return (
    <section className="py-16 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Siga no{' '}
            <span className="text-gradient">Instagram</span>
          </motion.h2>
          <motion.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-primary font-semibold hover:underline"
          >
            @entrelacos
          </motion.a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {placeholderImages.map((img, index) => (
            <motion.a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.06 }}
              className="group relative aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src={img}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            Ver mais no Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
