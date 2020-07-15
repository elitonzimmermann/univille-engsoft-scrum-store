$(document).ready(async () => {
	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var id = url.searchParams.get("idProduto");

	const [produto] = await carregaProdutos(produto => produto.idProduto == id);

	let html = await getComponente('produto');

	html = html.replace(/\${idProduto}/g, produto.idProduto);
	html = html.replace(/\${nome}/g, produto.nome);
	html = html.replace(/\${preco}/g, formataMoeda(produto.preco));
	html = html.replace(/\${modelo}/g, produto.modelo);
	html = html.replace(/\${marca}/g, produto.marca);
	html = html.replace(/\${descricao}/g, produto.descricao);

	$('#produto').append(html);
});
