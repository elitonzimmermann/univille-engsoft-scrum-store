$(document).ready(async () => {
  alterarNavbar('produtos');
  window.produtos = await carregaProdutos();

  window.produtosFiltrados = [...window.produtos];
  // TODO: Trocar "componente"
  mostraProdutos(window.produtosFiltrados, 'produtoDestaque');
  
  window.filtrosAplicados = [];
  window.filtros = await carregaFiltros();
  mostraFiltros(window.filtros);
});

function aplicaFiltro(idFiltro) {
  // Verifica se está na lista de filtros aplicados
  const index = window.filtrosAplicados.findIndex(i => i === idFiltro);

  if (index >= 0) {
    window.filtrosAplicados.splice(index, 1);
  } else {
    window.filtrosAplicados.push(idFiltro);
  }

  this.resetFiltros();

  if (window.filtrosAplicados.length > 0) {
    window.filtrosAplicados.forEach(idFiltro => {
      filtrarProdutos(idFiltro);
    });
  }

  // TODO: Trocar "componente"
  // ? Renderiza novamente os produtos
  mostraProdutos(window.produtosFiltrados, 'produtoDestaque');
}

function resetFiltros() {
  window.produtosFiltrados = [...window.produtos];
}

function filtrarProdutos(idFiltro) {
  const filtro = window.filtros[idFiltro];
  
  if (filtro.action) {
    window.produtosFiltrados = filtro.action(window.produtosFiltrados);
  } else {
    window.produtosFiltrados = window.produtosFiltrados.filter(i => {
      if (i.categoria.includes(filtro)) return true;
  
      return false;
    })
  }
}