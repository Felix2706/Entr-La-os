import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories } from '../data/products';
import ProductCard from '../components/shared/ProductCard';

const sortOptions = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'mais-avaliados', label: 'Mais avaliados' },
];

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('relevancia');
  const [search, setSearch] = useState('');

  const activeCategory = searchParams.get('categoria') || '';

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory) result = result.filter(p => p.category === activeCategory);
    if (search) result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === 'menor-preco') result.sort((a, b) => a.price - b.price);
    if (sort === 'maior-preco') result.sort((a, b) => b.price - a.price);
    if (sort === 'mais-avaliados') result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    return result;
  }, [activeCategory, sort, search]);

  const setCategory = (catId) => {
    if (catId) setSearchParams({ categoria: catId });
    else setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-gradient-soft py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-4xl font-bold text-dark">Catálogo</h1>
          <p className="font-body text-medium mt-2">
            {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-medium pointer-events-none">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar laços..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-field w-full sm:w-48"
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => setCategory('')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold font-body transition-colors duration-200 ${
              !activeCategory
                ? 'bg-primary text-white shadow-md'
                : 'bg-secondary text-medium hover:bg-primary/10 hover:text-primary'
            }`}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold font-body transition-colors duration-200 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-secondary text-medium hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="text-6xl mb-4">🎀</div>
              <h3 className="font-display text-2xl font-semibold text-dark mb-2">
                Nenhum laço encontrado
              </h3>
              <p className="font-body text-medium mb-6">
                Tente outro filtro ou busca diferente
              </p>
              <button
                onClick={() => { setCategory(''); setSearch(''); }}
                className="btn-primary"
              >
                Limpar filtros
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
