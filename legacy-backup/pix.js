const CODIGO_PIX = `00020126580014BR.GOV.BCB.PIX0136ad93dda1-ed0d-40ec-82eb-cef7f19c10c652040000530398654041.005802BR5925Gustavo Henrique Felix Co6009SAO PAULO62140510KDmv5VVJNq63048E82`;

const planos = {
  iniciante: {
    nome: 'Plano Iniciante',
    preco: 10,
    desc: 'Ideal para quem está começando sua jornada de bem-estar e busca orientação básica.',
    recursos: [
      '✔ Acesso ao assistente IA para montar rotinas personalizadas',
      '✔ Planos de exercícios básicos para iniciantes',
      '✔ Dicas de nutrição e alimentação saudável',
      '✔ Conteúdo educativo sobre bem-estar físico e mental',
      '✔ Cancelamento a qualquer momento'
    ]
  },
  premium: {
    nome: 'Plano Premium',
    preco: 15,
    desc: 'Experiência completa com todos os recursos e acompanhamento prioritário para resultados.',
    recursos: [
      '✔ Tudo do Plano Iniciante',
      '✔ Planos de treino avançados e personalizados',
      '✔ Acompanhamento nutricional detalhado',
      '✔ Sessões de mindfulness e meditação guiadas',
      '✔ Suporte prioritário via e-mail e chat',
      '✔ Cancelamento a qualquer momento'
    ]
  },
  master: {
    nome: 'Plano Master',
    preco: 20,
    desc: 'Experiência máxima com acompanhamento individual e recursos exclusivos para transformação completa.',
    recursos: [
      '✔ Tudo do Plano Premium',
      '✔ Consultoria individual com especialistas',
      '✔ Planos de treino ultra-personalizados',
      '✔ Acompanhamento psicológico e emocional',
      '✔ Acesso exclusivo a workshops e eventos ao vivo',
      '✔ Cancelamento a qualquer momento'
    ]
  }
};


function inicializarPlano() {
  const urlParams = new URLSearchParams(window.location.search);
  const planoSelecionado = urlParams.get('plano') || 'premium';
  
  const plano = planos[planoSelecionado] || planos.premium;
  

  document.getElementById('nomePlano').textContent = plano.nome;
  document.getElementById('precoPlano').textContent = `$${plano.preco}`;
  document.getElementById('precoTotal').textContent = `$${plano.preco}`;
  document.getElementById('descPlano').textContent = plano.desc;
  document.getElementById('subtotal').textContent = `$${plano.preco}`;
  document.getElementById('totalFinal').textContent = `$${plano.preco}`;
  
 
  const listaRecursos = document.getElementById('listaRecursos');
  listaRecursos.innerHTML = plano.recursos.map(rec => `<li>${rec}</li>`).join('');
}


document.addEventListener('DOMContentLoaded', inicializarPlano);


const btnAssinar = document.getElementById('btnAssinar');
const overlay = document.getElementById('overlay');
const alertBox = overlay.querySelector('.alert-box');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const alertIcon = document.getElementById('alertIcon'); 
const alertTitle = document.getElementById('alertTitle');
const alertMensagem = document.getElementById('alertMensagem');
const btnVoltar = document.getElementById('btnVoltar');
const btnFechar = document.getElementById('btnFechar');
const form = document.getElementById('formPagamento');

let lastFocused = null;


function openOverlay() {
  lastFocused = document.activeElement;
  overlay.classList.add('open');
  alertBox.classList.remove('showResult');
 
  loading.style.display = 'flex';
  result.style.display = 'none';

  loading.setAttribute('tabindex','-1');
  loading.focus?.();
}


function showResult() {
  // Esconde loading
  loading.style.display = 'none';

  // Mostra resultado
  result.style.display = 'flex';

  // Preenche o PIX
  document.getElementById("codigoPix").value = CODIGO_PIX;

  alertTitle.textContent = 'Pagamento via PIX';
  alertMensagem.textContent =
    'Copie o código PIX abaixo e cole no aplicativo do seu banco para finalizar o pagamento.';

  alertBox.classList.add('showResult');

  alertTitle.setAttribute('tabindex','-1');
  alertTitle.focus?.();
}


function closeOverlay(navigate = false) {

  alertBox.classList.add('hide');
  overlay.classList.remove('open');

  setTimeout(() => {
    alertBox.classList.remove('hide','showResult');
    loading.style.display = 'flex';
    result.style.display = 'none';

    if (lastFocused) lastFocused.focus?.();
    if (navigate) window.location.href = '/index.html';
  }, 280);
}


function formIsValid() {
  const inputs = Array.from(form.querySelectorAll('input,select'));
  for (const el of inputs) {
    if (el.hasAttribute('required') && !el.value.trim()) {
      el.focus();
      return false;
    }
  }
  return true;
}


btnAssinar.addEventListener('click', (e) => {
  e.preventDefault();
  if (!formIsValid()) {
  
    return;
  }

  openOverlay();

 
  setTimeout(() => {
  showResult();
}, 1500);

});


btnVoltar.addEventListener('click', () => {
  closeOverlay(true); 
});


btnFechar.addEventListener('click', () => {
  const ok = confirm('Deseja realmente cancelar o pagamento?');
  if (ok) window.location.href = '/index.html';
});


overlay.addEventListener('click', (ev) => {
  if (ev.target === overlay) {
  
    closeOverlay(false);
  }
});


document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && overlay.classList.contains('open')) {
    closeOverlay(false);
  }
});


form.addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter') {
    ev.preventDefault();
    btnAssinar.click();
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const produto = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!produto) {
    alert("Nenhum produto selecionado.");
    window.location.href = "catalog.html";
    return;
  }

  document.getElementById("nomeProduto").textContent = produto.name;
  document.getElementById("descProduto").textContent = produto.description;
  document.getElementById("precoProduto").textContent =
    `R$ ${produto.price.toFixed(2).replace('.', ',')}`;

  document.getElementById("imagemProduto").src = produto.image;

  // CÓDIGO PIX (COPIA E COLA - NUBANK)
  document.getElementById("codigoPix").value =
`00020126580014BR.GOV.BCB.PIX0136ad93dda1-ed0d-40ec-82eb-cef7f19c10c652040000530398654041.005802BR5925Gustavo Henrique Felix Co6009SAO PAULO62140510KDmv5VVJNq63048E82`;
});

// Copiar PIX
function copiarPix() {
  const campo = document.getElementById("codigoPix");
  campo.select();
  campo.setSelectionRange(0, 99999); // mobile
  document.execCommand("copy");

  alert("Código PIX copiado! 💜\nAgora cole no app do seu banco.");
}

