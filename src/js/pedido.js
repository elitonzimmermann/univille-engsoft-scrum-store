$(document).ready(async () => {
  alterarNavbar('pedido');

  $("#formulario").submit(pedidoComSucesso);
});

async function pedidoComSucesso(event) {
  event.preventDefault();

  const pedidoSucesso = await getComponente('pedidoSucesso');
  $('#principal').html(pedidoSucesso);
}
