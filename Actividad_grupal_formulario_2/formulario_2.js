// Obtener referencias a los elementos del DOM
var inputPedido = document.querySelector('#input-pedido');
var inputCantidad = document.querySelector('#input-cantidad');
var inputProducto = document.querySelector('#input-producto');
var inputValor = document.querySelector('#input-valor');
var botonAgregar = document.querySelector('#formulario_2 button');
var outputResultado = document.querySelector('#resultado');

// Verificar si ya existen pedidos guardados en el LocalStorage
var pedidosGuardados = localStorage.getItem('pedidos');
var pedidos = pedidosGuardados ? JSON.parse(pedidosGuardados) : [];

// Función para mostrar los pedidos en el output
function mostrarPedidos() {
  outputResultado.innerHTML = '';

  for (var i = 0; i < pedidos.length; i++) {
    var pedido = pedidos[i];

    var divPedido = document.createElement('div');
    divPedido.className = 'pedido';

    var pedidoTexto = document.createElement('span');
    pedidoTexto.textContent = 'Pedido: ' + ' ' + pedido.pedido;

    var cantidadTexto = document.createElement('span');
    cantidadTexto.textContent = ' Cantidad: ' + ' ' + pedido.cantidad;

    var productoTexto = document.createElement('span');
    productoTexto.textContent = ' Producto: ' + ' ' + pedido.producto;

    var valorTexto = document.createElement('span');
    valorTexto.textContent = ' Valor: ' + ' ' + pedido.valor + ' ';

    var botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'X';
    botonEliminar.dataset.index = i;

    botonEliminar.addEventListener('click', function() {
      var index = this.dataset.index;
      pedidos.splice(index, 1);
      localStorage.setItem('pedidos', JSON.stringify(pedidos));
      mostrarPedidos();
    });

    divPedido.appendChild(pedidoTexto);
    divPedido.appendChild(cantidadTexto);
    divPedido.appendChild(productoTexto);
    divPedido.appendChild(valorTexto);
    divPedido.appendChild(botonEliminar);

    outputResultado.appendChild(divPedido);
  }
}

// Función para agregar un pedido
function agregarPedido() {
  var pedido = inputPedido.value;
  var cantidad = inputCantidad.value;
  var producto = inputProducto.value;
  var valor = inputValor.value;

  if (pedido && cantidad && producto && valor) {
    var nuevoPedido = {
      pedido: pedido,
      cantidad: cantidad,
      producto: producto,
      valor: valor
    };

    pedidos.push(nuevoPedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    inputPedido.value = '';
    inputCantidad.value = '';
    inputProducto.value = '';
    inputValor.value = '';

    mostrarPedidos();
  }
}

// Agregar evento de clic al botón de agregar
botonAgregar.addEventListener('click', agregarPedido);

// Mostrar los pedidos guardados al cargar la página
mostrarPedidos();
