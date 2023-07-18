// Obtener referencias a los elementos del formulario
const categoriaInput = document.querySelector('input');
const agregarButton = document.querySelector('button');
const resultadoOutput = document.getElementById('resultado');

// Obtener datos guardados en el LocalStorage o inicializar un arreglo vacío si no hay datos
let categoriasAgregadas = JSON.parse(localStorage.getItem('categoriasAgregadas')) || [];

// Función para mostrar las categorías guardadas en el resultadoOutput
function mostrarCategorias() {
  resultadoOutput.innerHTML = '';
  categoriasAgregadas.forEach((categoria, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = "Categoria " + categoria + " ";

    // Crear un botón de eliminación para cada categoría
    const eliminarButton = document.createElement('button');
    eliminarButton.textContent = "x";
    eliminarButton.addEventListener('click', () => eliminarCategoria(index));

    // Agregar el botón de eliminación al listItem
    listItem.appendChild(eliminarButton);

    resultadoOutput.appendChild(listItem);
  });
}

// Función para agregar una categoría
function agregarCategoria() {
  const categoria = categoriaInput.value.trim();

  if (categoria !== '') {
    categoriasAgregadas.push(categoria);
    localStorage.setItem('categoriasAgregadas', JSON.stringify(categoriasAgregadas));
    mostrarCategorias();
    categoriaInput.value = '';
  }
}

// Función para eliminar una categoría
function eliminarCategoria(index) {
  categoriasAgregadas.splice(index, 1);
  localStorage.setItem('categoriasAgregadas', JSON.stringify(categoriasAgregadas));
  mostrarCategorias();
}

// Asignar el evento click al botón agregar
agregarButton.addEventListener('click', agregarCategoria);

// Mostrar las categorías al cargar la página
mostrarCategorias();
