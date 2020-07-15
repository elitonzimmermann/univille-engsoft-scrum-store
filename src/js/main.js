$(document).ready(async () => {
  // ? Inicializa a página
  iniciarPagina();

  // ? Filtra da lista de produtos apenas os que estão marcados como "Em destaque"
  window.produtosDestaque = await carregaProdutos(produto => produto.isDestaque);

  mostraProdutos(window.produtosDestaque, 'produtoDestaque');
});

async function iniciarPagina() {
  window.carregouNav = false;
  // Carrega o componente de navbar
  const nav = await getComponente('navbar');
  $('#nav').html(nav);
  window.carregouNav = true;

  const footer = await getComponente('footer');
  $('#footer').replaceWith(footer);
}

function alterarNavbar(paginaAtual, tentativas = 0) {
  // se atingiu o limite de tentativas, para a recursividade, deu problema na navbar.
  if (tentativas > 5) return;

  // se a navbar ainda não carregou (processo assíncrono) tenta novamente.
  if (!window.carregouNav) return setTimeout(() => alterarNavbar(paginaAtual, tentativas + 1), 50);

  // Remove as classes de ativo de todos os links
  $('#nav #navbarSupportedContent > ul > li.nav-item').each((index, node) => {
    $(node).removeClass('active');
  });
  // Seta a classe de ativo para o link da página atual
  $(`#${paginaAtual}-nav-item`).addClass('active');
}

function carregaProdutos(filtro) {
  return new Promise((resolve, reject) => {
    window.carregouProdutos = false;
  
    $.get('/src/database/produtos.json', data => {
      console.log('data', data);
  
      window.carregouProdutos = true;

      const produtos = filtro ? data.filter(filtro) : data;
      return resolve(produtos);
    });
  });
}

function carregaFiltros() {
  return new Promise(async (resolve, reject) => {
    window.carregouFiltros = false;

    const categorias = await carregaCategorias();
  
    window.carregouFiltros = true;

    const filtros = [
      {
        label: 'Mouses até R$50,00',
        action: lista => lista.filter(i => i.preco < 50)
      },
      {
        label: 'Mouses de R$50,00 até R$200,00',
        action: lista => lista.filter(i => i.preco >= 50 && i.preco < 200)
      },
      {
        label: 'Mouses superiores a R$200,00',
        action: lista => lista.filter(i => i.preco > 200)
      }
    ];

    return resolve([...categorias, ...filtros]);
  });
}

function carregaCategorias() {
  return new Promise((resolve, reject) => {
    window.carregouCategorias = false;
  
    $.get('/src/database/categoria.json', data => {
      window.carregouCategorias = true;
      return resolve(data);
    });
  });
}

function mostraProdutos(produtos, componente = 'produto') {
  // ? Verifica se o elemento existe
  if (!$('#produtos').length) return;

  $('#produtos').empty();

  produtos.forEach(async produto => {
    let html = await getComponente(componente);

    html = html.replace(/\${idProduto}/g, produto.idProduto);
    html = html.replace(/\${nome}/g, produto.nome);
    html = html.replace(/\${preco}/g, formataMoeda(produto.preco));

    $('#produtos').append(html);
  });
}

function mostraFiltros(filtros) {
  // ? Verifica se o elemento existe
  if (!$('#filtros').length) return;

  filtros.forEach(async (filtro, index) => {
    let html = await getComponente('filtro');

    html = html.replace(/\${id}/g, index);
    html = html.replace(/\${label}/g, filtro.label || filtro);

    $('#filtros').append(html);
  });
}

function getComponente(nome) {
  return new Promise((resolve, reject) => {
    $.get(`/src/components/${nome}.html`)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
} 

function formataMoeda(valor) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}