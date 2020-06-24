$(document).ready(async () => {
  iniciarPagina();
  window.produtosPromocao = await carregaProdutos(produto => produto.isPromocao);
  console.log('window.produtosPromocao', window.produtosPromocao);
});

function iniciarPagina() {
  window.carregouNav = false;
  // Carrega o componente de navbar
  $.get('/src/components/navbar.html', data => {
    $('#nav').html(data);
    window.carregouNav = true;
  });
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
  $(`#${paginaAtual}`).addClass('active');
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