$(document).ready(async () => {
	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("idProduto");

	var produto = await carregaProdutos(produto => (produto.idProduto == id));

	let html = await getComponente('produto');

	html = html.replace(/\${idProduto}/g, produto.idProduto);
	html = html.replace(/\${nome}/g, produto.nome);
	html = html.replace(/\${preco}/g, formataMoeda(produto.preco));
	html = html.replace(/\${modelo}/g, formataMoeda(produto.modelo));
	html = html.replace(/\${marca}/g, formataMoeda(produto.marca));
	html = html.replace(/\${descricao}/g, formataMoeda(produto.descricao));

	$('#produto').append(html);
	
});

function getComponente(nome) {
  return new Promise((resolve, reject) => {
    $.get(`/src/views/${nome}.html`)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
} 