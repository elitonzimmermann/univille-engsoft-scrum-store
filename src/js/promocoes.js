$(document).ready(async () => {
  alterarNavbar('promocoes');

  // ? Filtra da lista de produtos apenas os que estão marcados como "Em promoção"
  window.produtosPromocao = await carregaProdutos(produto => produto.isPromocao);

  mostraProdutos(window.produtosPromocao, 'produtoPromocao');
});

