$(document).ready(async () => {
  alterarNavbar('produtos');
  window.produtos = await carregaProdutos();

  console.log('window.produtos', window.produtos);
});
