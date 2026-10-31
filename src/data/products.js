export const categories = [
  { 
    id: 'bico-de-pato', 
    name: 'Bico de Pato', 
    emoji: '🎀', 
    description: 'Presilhas confortáveis e acabamento impecável',
    image: 'https://images.unsplash.com/photo-1582709489510-0da2069cd09d?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'xuxinha', 
    name: 'Xuxinha', 
    emoji: '✨', 
    description: 'Elásticos com laços delicados que não marcam os fios',
    image: 'https://images.pexels.com/photos/20588095/pexels-photo-20588095/free-photo-of-woman-in-white-sweater-with-big-bow-in-her-hair.jpeg?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'faixa', 
    name: 'Faixa de Cabelo', 
    emoji: '🌸', 
    description: 'Ultra macias para bebês e ocasiões especiais',
    image: 'https://images.pexels.com/photos/20588093/pexels-photo-20588093/free-photo-of-back-view-of-a-woman-wearing-a-long-bow.jpeg?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'tiara', 
    name: 'Tiara', 
    emoji: '👑', 
    description: 'Armações anatômicas com laços e pedrarias',
    image: 'https://images.pexels.com/photos/30175222/pexels-photo-30175222/free-photo-of-blonde-hair-with-bow-on-minimalist-background.jpeg?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'presilha', 
    name: 'Presilha', 
    emoji: '🌺', 
    description: 'Fixação segura e muito charme para qualquer penteado',
    image: 'https://images.unsplash.com/photo-1759756655330-5c4f7567dc13?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'decoracao', 
    name: 'Laço Decorativo', 
    emoji: '🏠', 
    description: 'Laços volumosos e elegantes para quarto e berço',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80'
  },
  { 
    id: 'presente', 
    name: 'Laço para Presente', 
    emoji: '🎁', 
    description: 'Embrulhos nobres que valorizam cada lembrança',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80'
  },
];

export const colors = [
  { id: 'rosa', name: 'Rosa Delicado', hex: '#C9748D' },
  { id: 'lilas', name: 'Lilás Suave', hex: '#A78BCD' },
  { id: 'branco', name: 'Branco Perolado', hex: '#FFFFFF', border: true },
  { id: 'preto', name: 'Preto Clássico', hex: '#2D2D2D' },
  { id: 'azul', name: 'Azul Bebê', hex: '#87CEEB' },
  { id: 'verde', name: 'Verde Menta', hex: '#98D8C8' },
  { id: 'vermelho', name: 'Vermelho Paixão', hex: '#E05C6A' },
  { id: 'amarelo', name: 'Amarelo Sol', hex: '#F5C842' },
  { id: 'nude', name: 'Nude / Bege', hex: '#E8C9A0' },
  { id: 'dourado', name: 'Dourado Brilhante', hex: '#D4A843' },
];

export const materials = [
  { id: 'cetim', name: 'Cetim Premium', description: 'Toque sedoso com brilho nobre', image: 'https://images.unsplash.com/photo-1582709489510-0da2069cd09d?w=300&auto=format&fit=crop&q=80' },
  { id: 'veludo', name: 'Veludo Macio', description: 'Textura aveludada, encorpada e aconchegante', image: 'https://images.unsplash.com/photo-1759756655330-5c4f7567dc13?w=300&auto=format&fit=crop&q=80' },
  { id: 'gorgurao', name: 'Gorgurão Estruturado', description: 'Resistente, ótimo caimento para uniformes e escola', image: 'https://images.pexels.com/photos/20588095/pexels-photo-20588095/free-photo-of-woman-in-white-sweater-with-big-bow-in-her-hair.jpeg?w=300&auto=format&fit=crop&q=80' },
  { id: 'chiffon', name: 'Chiffon / Organza', description: 'Transparência suave e caimento etéreo', image: 'https://images.pexels.com/photos/20588093/pexels-photo-20588093/free-photo-of-back-view-of-a-woman-wearing-a-long-bow.jpeg?w=300&auto=format&fit=crop&q=80' },
];

export const products = [
  {
    id: '1',
    name: 'Laço Escolar Lilás Clássico',
    category: 'bico-de-pato',
    price: 15.90,
    priceFormatted: 'R$ 15,90',
    sizes: ['P (5cm)', 'Médio (8cm)', 'G (12cm)'],
    colors: ['lilas', 'rosa', 'branco'],
    material: 'gorgurao',
    description: 'Laço lilás em tecido acetinado de alto padrão, ideal para uniformes e ocasiões marcantes. Presilha antideslizante que não machuca o couro cabeludo.',
    images: [
      'https://images.unsplash.com/photo-1582709489510-0da2069cd09d?w=600&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1759756655330-5c4f7567dc13?w=600&auto=format&fit=crop&q=85'
    ],
    tags: ['destaque', 'novo', 'artesanal'],
    rating: 5,
    reviews: 38,
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Xuxinha Rosa Bebê Acetinada',
    category: 'xuxinha',
    price: 12.90,
    priceFormatted: 'R$ 12,90',
    sizes: ['Único'],
    colors: ['rosa', 'nude', 'branco'],
    material: 'cetim',
    description: 'Xuxinha super delicada em cetim suave tom pastel. Perfeita para rabos de cavalo elegantes e coques sem arrebentar nenhum fio de cabelo.',
    images: [
      'https://images.pexels.com/photos/20588095/pexels-photo-20588095/free-photo-of-woman-in-white-sweater-with-big-bow-in-her-hair.jpeg?w=600&auto=format&fit=crop&q=85',
      'https://images.pexels.com/photos/20588093/pexels-photo-20588093/free-photo-of-back-view-of-a-woman-wearing-a-long-bow.jpeg?w=600&auto=format&fit=crop&q=85'
    ],
    tags: ['destaque', 'bestseller'],
    rating: 5,
    reviews: 64,
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Laço Branco Minimalista Premium',
    category: 'bico-de-pato',
    price: 18.90,
    priceFormatted: 'R$ 18,90',
    sizes: ['Grande (12cm)', 'Médio (8cm)'],
    colors: ['branco', 'dourado', 'nude'],
    material: 'cetim',
    description: 'Laço branco sofisticado em cetim nobre estruturado. Dá um ar minimalista e luxuoso para batizados, comunhões ou eventos finos.',
    images: [
      'https://images.pexels.com/photos/30175222/pexels-photo-30175222/free-photo-of-blonde-hair-with-bow-on-minimalist-background.jpeg?w=600&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1582709489510-0da2069cd09d?w=600&auto=format&fit=crop&q=85'
    ],
    tags: ['destaque', 'luxo'],
    rating: 5,
    reviews: 29,
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Kit Laços Charmosos (Trio)',
    category: 'bico-de-pato',
    price: 35.90,
    priceFormatted: 'R$ 35,90',
    sizes: ['Médio (8cm)'],
    colors: ['lilas', 'rosa', 'nude'],
    material: 'gorgurao',
    description: 'Kit com 3 laços em composições harmônicas: lilás, rosa antigo e bege nude. Acabamento durável e resistente ao dia a dia.',
    images: [
      'https://images.unsplash.com/photo-1759756655330-5c4f7567dc13?w=600&auto=format&fit=crop&q=85',
      'https://images.pexels.com/photos/20588095/pexels-photo-20588095/free-photo-of-woman-in-white-sweater-with-big-bow-in-her-hair.jpeg?w=600&auto=format&fit=crop&q=85'
    ],
    tags: ['kit', 'destaque', 'economia'],
    rating: 5,
    reviews: 51,
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Xuxinha Nude Elegance com Caudas Longas',
    category: 'xuxinha',
    price: 14.90,
    priceFormatted: 'R$ 14,90',
    sizes: ['Único'],
    colors: ['nude', 'preto', 'branco'],
    material: 'chiffon',
    description: 'Xuxinha com caudas esvoaçantes que acompanham o movimento do cabelo. Tecido fluido em tons neutros que combinam com qualquer visual.',
    images: [
      'https://images.pexels.com/photos/20588093/pexels-photo-20588093/free-photo-of-back-view-of-a-woman-wearing-a-long-bow.jpeg?w=600&auto=format&fit=crop&q=85',
      'https://images.pexels.com/photos/30175222/pexels-photo-30175222/free-photo-of-blonde-hair-with-bow-on-minimalist-background.jpeg?w=600&auto=format&fit=crop&q=85'
    ],
    tags: ['popular', 'tendência'],
    rating: 5,
    reviews: 44,
    inStock: true,
    featured: true,
  },
  {
    id: '6',
    name: 'Faixa de Cabelo Baby Confort',
    category: 'faixa',
    price: 24.90,
    priceFormatted: 'R$ 24,90',
    sizes: ['RN (Recém Nascido)', 'P (0-6 meses)', 'M (6-18 meses)'],
    colors: ['rosa', 'branco', 'lilas'],
    material: 'veludo',
    description: 'Faixinha em meia de seda elástica que não aperta a cabecinha do bebê. Acompanha laço delicado com aplicação central feita à mão.',
    images: [
      'https://images.unsplash.com/photo-1582709489510-0da2069cd09d?w=600&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1759756655330-5c4f7567dc13?w=600&auto=format&fit=crop&q=85'
    ],
    tags: ['baby', 'conforto'],
    rating: 5,
    reviews: 73,
    inStock: true,
    featured: true,
  },
  {
    id: '7',
    name: 'Tiara Princesa Encanto em Veludo',
    category: 'tiara',
    price: 38.00,
    priceFormatted: 'R$ 38,00',
    sizes: ['Único Infantil/Adulto'],
    colors: ['rosa', 'lilas', 'dourado'],
    material: 'veludo',
    description: 'Tiara almofadada anatômica revestida em veludo nobre com laço lateral estruturado. Não machuca atrás das orelhas mesmo após horas de uso.',
    images: [
      'https://images.pexels.com/photos/30175222/pexels-photo-30175222/free-photo-of-blonde-hair-with-bow-on-minimalist-background.jpeg?w=600&auto=format&fit=crop&q=85',
      'https://images.pexels.com/photos/20588095/pexels-photo-20588095/free-photo-of-woman-in-white-sweater-with-big-bow-in-her-hair.jpeg?w=600&auto=format&fit=crop&q=85'
    ],
    tags: ['luxo', 'artesanal'],
    rating: 5,
    reviews: 31,
    inStock: true,
    featured: false,
  },
  {
    id: '8',
    name: 'Presilha Borboleta com Laço Duplo',
    category: 'presilha',
    price: 21.90,
    priceFormatted: 'R$ 21,90',
    sizes: ['Médio (7cm)'],
    colors: ['lilas', 'rosa', 'branco'],
    material: 'chiffon',
    description: 'Presilha bico de pato reforçado com sobreposição de laços e leveza do tecido chiffon translúcido. Fixa até nos fios mais fininhos.',
    images: [
      'https://images.unsplash.com/photo-1759756655330-5c4f7567dc13?w=600&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1582709489510-0da2069cd09d?w=600&auto=format&fit=crop&q=85'
    ],
    tags: ['delicado'],
    rating: 5,
    reviews: 19,
    inStock: true,
    featured: false,
  },
  {
    id: '9',
    name: 'Laço Decorativo Maxi para Berço e Porta',
    category: 'decoracao',
    price: 59.90,
    priceFormatted: 'R$ 59,90',
    sizes: ['G (25cm)', 'GG (35cm)'],
    colors: ['rosa', 'nude', 'branco', 'lilas'],
    material: 'veludo',
    description: 'Peça nobre para decoração de quarto infantil, ensaios newborn ou guirlanda de maternidade. Com enchimento suave e laço armado perfeito.',
    images: [
      'https://images.pexels.com/photos/20588093/pexels-photo-20588093/free-photo-of-back-view-of-a-woman-wearing-a-long-bow.jpeg?w=600&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=85'
    ],
    tags: ['decor', 'maternidade'],
    rating: 5,
    reviews: 26,
    inStock: true,
    featured: false,
  },
  {
    id: '10',
    name: 'Laço Nobre para Presente em Cetim Brilhante',
    category: 'presente',
    price: 11.90,
    priceFormatted: 'R$ 11,90',
    sizes: ['P', 'M', 'G'],
    colors: ['dourado', 'vermelho', 'rosa', 'verde'],
    material: 'cetim',
    description: 'Finalize caixas e presentes com um laço impecável e pronto para colar. O acabamento artesanal que faz toda a diferença.',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&auto=format&fit=crop&q=85'
    ],
    tags: ['presente', 'festa'],
    rating: 5,
    reviews: 48,
    inStock: true,
    featured: false,
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Camila Fernandes',
    text: 'A perfeição em forma de laço! Pedi para o batizado da minha filha e todo mundo na igreja elogiou o acabamento e o brilho do tecido.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=32',
    date: 'Semana passada',
  },
  {
    id: 2,
    name: 'Juliana Rocha',
    text: 'A xuxinha não quebra o cabelo e o laço fica sempre em pé, bem estruturado! Já virei cliente fiel, comprarei outros modelos.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=47',
    date: 'Há 2 semanas',
  },
  {
    id: 3,
    name: 'Letícia Albuquerque',
    text: 'Encomendei o kit de laços e chegou numa embalagem super cheirosa e com um bilhetinho lindo. Minha mãe amou o presente!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=25',
    date: 'Mês passado',
  },
];

export const getProductById = (id) => products.find(p => p.id === id);
export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getProductsByCategory = (category) => 
  category ? products.filter(p => p.category === category) : products;
export const getRelatedProducts = (product, limit = 4) =>
  products.filter(p => p.category === product.category && p.id !== product.id).slice(0, limit);
