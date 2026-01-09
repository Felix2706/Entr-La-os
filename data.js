/**
 * ARQUIVO DE DADOS
 * 
 * Todos os dados do site estão aqui.
 * Edite este arquivo para mudar produtos, imagens e textos.
 */

// Imagens do carrossel (Hero Section)
const carouselImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1582709489510-0da2069cd09d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxib3clMjBhY2Nlc3Nvcmllc3xlbnwwfHx8fDE3Njc5NjgzMjZ8MA&ixlib=rb-4.1.0&q=85",
    alt: "Laço Rosa Sofisticado",
    title: "Coleção Premium"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1759756655330-5c4f7567dc13?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxoYWlyJTIwYm93fGVufDB8fHx8MTc2Nzk2ODMxMHww&ixlib=rb-4.1.0&q=85",
    alt: "Laço Grande Elegante",
    title: "Novidade da Semana"
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/30175222/pexels-photo-30175222/free-photo-of-blonde-hair-with-bow-on-minimalist-background.jpeg",
    alt: "Laço Branco Minimalista",
    title: "Estilo Minimalista"
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/20588095/pexels-photo-20588095/free-photo-of-woman-in-white-sweater-with-big-bow-in-her-hair.jpeg",
    alt: "Laço Branco Grande",
    title: "Lançamento Especial"
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/20588093/pexels-photo-20588093/free-photo-of-back-view-of-a-woman-wearing-a-long-bow.jpeg",
    alt: "Laço de Seda Branco",
    title: "Exclusivo"
  }
];

// Categorias de laços
const bowCategories = [
  {
    id: 1,
    name: "Bico de Pato",
    description: "Presilhas com formato achatado, ideais para prender mechas de cabelo. Confortáveis e práticas para o dia a dia escolar."
  },
  {
    id: 2,
    name: "Xuxinha",
    description: "Elásticos decorados com laços, perfeitos para fazer rabos de cavalo e coques. Macios e não danificam os fios."
  }
];

// Catálogo de produtos (10 produtos)
const products = [
  {
    id: 1,
    name: "Laço Escolar Lilás Clássico",
    price: 15.90,
    size: "Médio (8cm)",
    type: "Bico de Pato",
    description: "Laço lilás em tecido acetinado, ideal para uniformes escolares. Acabamento de qualidade.",
    image: "https://images.unsplash.com/photo-1582709489510-0da2069cd09d?w=400",
    inStock: true
  },
  {
    id: 2,
    name: "Xuxinha Rosa Bebê",
    price: 12.90,
    size: "Único",
    type: "Xuxinha",
    description: "Xuxinha delicada em tons pastel, perfeita para criar penteados elegantes.",
    image: "https://images.pexels.com/photos/20588095/pexels-photo-20588095/free-photo-of-woman-in-white-sweater-with-big-bow-in-her-hair.jpeg?w=400",
    inStock: true
  },
  {
    id: 3,
    name: "Laço Branco Premium",
    price: 18.90,
    size: "Grande (12cm)",
    type: "Bico de Pato",
    description: "Laço branco sofisticado em cetim nobre, ideal para ocasiões especiais.",
    image: "https://images.pexels.com/photos/30175222/pexels-photo-30175222/free-photo-of-blonde-hair-with-bow-on-minimalist-background.jpeg?w=400",
    inStock: true
  },
  {
    id: 4,
    name: "Kit Laços Coloridos",
    price: 35.90,
    size: "Médio (8cm)",
    type: "Bico de Pato",
    description: "Kit com 3 laços em cores variadas: lilás, bege e branco. Economia garantida!",
    image: "https://images.unsplash.com/photo-1759756655330-5c4f7567dc13?w=400",
    inStock: true
  },
  {
    id: 5,
    name: "Xuxinha Bege Elegante",
    price: 14.90,
    size: "Único",
    type: "Xuxinha",
    description: "Xuxinha em tons neutros, combina com qualquer look escolar.",
    image: "https://images.pexels.com/photos/20588093/pexels-photo-20588093/free-photo-of-back-view-of-a-woman-wearing-a-long-bow.jpeg?w=400",
    inStock: true
  },
  {
    id: 6,
    name: "Laço Mini Lilás",
    price: 10.90,
    size: "Pequeno (5cm)",
    type: "Bico de Pato",
    description: "Laço pequeno e delicado, perfeito para crianças menores.",
    image: "https://images.unsplash.com/photo-1582709489510-0da2069cd09d?w=400",
    inStock: true
  },
  {
    id: 7,
    name: "Xuxinha Dupla Premium",
    price: 22.90,
    size: "Único",
    type: "Xuxinha",
    description: "Xuxinha com laço duplo, design sofisticado para um toque especial.",
    image: "https://images.pexels.com/photos/20588095/pexels-photo-20588095/free-photo-of-woman-in-white-sweater-with-big-bow-in-her-hair.jpeg?w=400",
    inStock: true
  },
  {
    id: 8,
    name: "Laço Escolar Tradicional",
    price: 13.90,
    size: "Médio (8cm)",
    type: "Bico de Pato",
    description: "Laço clássico para o dia a dia escolar, resistente e durável.",
    image: "https://images.pexels.com/photos/30175222/pexels-photo-30175222/free-photo-of-blonde-hair-with-bow-on-minimalist-background.jpeg?w=400",
    inStock: true
  },
  {
    id: 9,
    name: "Kit Xuxinhas Pastéis",
    price: 38.90,
    size: "Único",
    type: "Xuxinha",
    description: "Kit com 4 xuxinhas em tons pastel suaves. Variedade e economia!",
    image: "https://images.unsplash.com/photo-1759756655330-5c4f7567dc13?w=400",
    inStock: false
  },
  {
    id: 10,
    name: "Laço Luxo Acetinado",
    price: 24.90,
    size: "Grande (12cm)",
    type: "Bico de Pato",
    description: "Laço de luxo em acetinado brilhante, perfeito para eventos e apresentações.",
    image: "https://images.pexels.com/photos/20588093/pexels-photo-20588093/free-photo-of-back-view-of-a-woman-wearing-a-long-bow.jpeg?w=400",
    inStock: true
  }
];

// Textos da página inicial
const homeTexts = {
  heroTitle: "Laços que Encantam",
  heroSubtitle: "Elegância e qualidade para cada momento especial",
  aboutTitle: "Nossa História",
  aboutText: "Criamos laços artesanais com amor e dedicação há mais de 10 anos. Cada peça é cuidadosamente confeccionada para trazer beleza e praticidade ao dia a dia escolar e momentos especiais. Utilizamos apenas materiais de primeira qualidade, garantindo durabilidade e conforto.",
  ctaTitle: "Explore Nosso Catálogo",
  ctaText: "Descubra a variedade de modelos, cores e tamanhos perfeitos para você!"
};