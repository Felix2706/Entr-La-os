/**
 * ARQUIVO DE FUNCIONALIDADES JAVASCRIPT
 * 
 * Todas as funções interativas do site estão aqui.
 */

// ============================================
// CARROSSEL - Página Inicial
// ============================================

let currentSlide = 0;

// Inicializar carrossel
function initCarousel() {
    showSlide(currentSlide);
    createIndicators();
    
    // Auto-play do carrossel (opcional)
    setInterval(() => {
        nextSlide();
    }, 5000); // Muda a cada 5 segundos
}

// Mostrar slide específico
function showSlide(index) {
    const carouselSlide = document.getElementById('carouselSlide');
    if (!carouselSlide) return;
    
    // Ajustar índice se necessário
    if (index >= carouselImages.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = carouselImages.length - 1;
    } else {
        currentSlide = index;
    }
    
    const image = carouselImages[currentSlide];
    
    carouselSlide.innerHTML = `
        <img src="${image.url}" alt="${image.alt}" class="carousel-image">
        <div class="carousel-overlay">
            <span class="carousel-badge">
                ✨ ${image.title}
            </span>
        </div>
    `;
    
    updateIndicators();
}

// Próximo slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Slide anterior
function previousSlide() {
    showSlide(currentSlide - 1);
}

// Criar indicadores
function createIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < carouselImages.length; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'indicator';
        indicator.onclick = () => showSlide(i);
        indicatorsContainer.appendChild(indicator);
    }
}

// Atualizar indicadores
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// ============================================
// PÁGINA INICIAL - Carregar textos
// ============================================

function initHomePage() {
    // Carregar textos
    document.getElementById('heroTitle').textContent = homeTexts.heroTitle;
    document.getElementById('heroSubtitle').textContent = homeTexts.heroSubtitle;
    document.getElementById('aboutTitle').textContent = homeTexts.aboutTitle;
    document.getElementById('aboutText').textContent = homeTexts.aboutText;
    document.getElementById('ctaTitle').textContent = homeTexts.ctaTitle;
    document.getElementById('ctaText').textContent = homeTexts.ctaText;
    
    // Inicializar carrossel
    initCarousel();
}

// ============================================
// PÁGINA DE CATÁLOGO
// ============================================

function initCatalogPage() {
    loadBowCategories();
    loadProducts();
}

// Carregar categorias de laços
function loadBowCategories() {
    const typesGrid = document.getElementById('typesGrid');
    if (!typesGrid) return;
    
    typesGrid.innerHTML = '';
    
    bowCategories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'type-card';
        categoryCard.innerHTML = `
            <div class="type-card-content">
                <div class="type-icon">📦</div>
                <h3 class="type-name">${category.name}</h3>
                <p class="type-description">${category.description}</p>
            </div>
        `;
        typesGrid.appendChild(categoryCard);
    });
}

// Carregar produtos
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const stockOverlay = !product.inStock ? 
            '<div class="out-of-stock-overlay"><span>Esgotado</span></div>' : '';
        
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                ${stockOverlay}
            </div>
            
            <div class="product-content">
                <div class="product-header">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-type-badge">${product.type}</span>
                </div>
                
                <p class="product-description">${product.description}</p>
                
                <div class="product-details">
                    <span class="detail-label">Tamanho:</span>
                    <span class="detail-value">${product.size}</span>
                </div>
                
                <div class="product-footer">
                    <span class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                    <button 
                        onclick="buyProduct(${product.id})" 
                        class="buy-button"
                        ${!product.inStock ? 'disabled' : ''}
                    >
                        🛒 Comprar
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Comprar produto
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Salvar produto no localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    
    // Redirecionar para página de compra
    window.location.href = 'purchase.html';
}

// ============================================
// PÁGINA DE COMPRA
// ============================================

function initPurchasePage() {
    loadSelectedProduct();
}

// Carregar produto selecionado
function loadSelectedProduct() {
    const productSummary = document.getElementById('productSummary');
    if (!productSummary) return;
    
    const selectedProductJson = localStorage.getItem('selectedProduct');
    
    if (!selectedProductJson) {
        // Nenhum produto selecionado
        productSummary.innerHTML = `
            <div class="no-product-message">
                <p>Nenhum produto selecionado.</p>
                <a href="catalog.html" class="cta-button">Ir para Catálogo</a>
            </div>
        `;
        return;
    }
    
    const product = JSON.parse(selectedProductJson);
    
    productSummary.innerHTML = `
        <div class="product-summary-content">
            <h2 class="summary-title">Resumo do Pedido</h2>
            <div class="summary-details">
                <img src="${product.image}" alt="${product.name}" class="summary-image">
                <div class="summary-info">
                    <h3 class="summary-product-name">${product.name}</h3>
                    <p class="summary-detail">Tipo: ${product.type}</p>
                    <p class="summary-detail">Tamanho: ${product.size}</p>
                    <p class="summary-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                </div>
            </div>
        </div>
    `;
}

// Processar formulário de compra
function handlePurchaseSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;

    if (!name) {
        alert("Preencha seu nome");
        return;
    }

    window.location.href = "pix.html";
}
function irParaPix() {
  window.location.href = "pix.html";
}




// ============================================
// FUNÇÕES AUXILIARES
// ============================================

// Formatar preço
function formatPrice(price) {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

// Limpar produto selecionado
function clearSelectedProduct() {
    localStorage.removeItem('selectedProduct');
}
