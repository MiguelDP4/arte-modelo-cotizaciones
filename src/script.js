const form = document.getElementById('product-form');
const tableBody = document.querySelector('#product-table tbody');
const grandTotalCell = document.getElementById('grand-total');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');

let productos = [];
let productoAEliminar = null;

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const nombre = document.getElementById('product-name').value.trim();
  const cantidad = parseInt(document.getElementById('product-qty').value);
  const precio = parseFloat(document.getElementById('product-price').value);

  if (!nombre || cantidad <= 0 || precio < 0) return;

  const total = cantidad * precio;

  const producto = {
    nombre,
    cantidad,
    precio,
    total
  };

  productos.push(producto);
  renderizarTabla();
  form.reset();
});

function renderizarTabla() {
  tableBody.innerHTML = '';
  productos.forEach((producto, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.cantidad}</td>
      <td>Q${producto.precio.toFixed(2)}</td>
      <td>Q${producto.total.toFixed(2)}</td>
      <td>
        <button onclick="editarProducto(${index})">✏️</button>
        <button onclick="mostrarModalEliminar(${index})">🗑️</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  actualizarTotal();
}

function actualizarTotal() {
  const total = productos.reduce((sum, p) => sum + p.total, 0);
  grandTotalCell.textContent = `Q${total.toFixed(2)}`;
}

function editarProducto(index) {
  const producto = productos[index];
  const row = tableBody.rows[index];

  row.innerHTML = `
    <td><input value="${producto.nombre}" id="edit-nombre-${index}" /></td>
    <td><input type="number" value="${producto.cantidad}" min="1" id="edit-cantidad-${index}" /></td>
    <td><input type="number" value="${producto.precio}" min="0" step="0.01" id="edit-precio-${index}" /></td>
    <td>Q${producto.total.toFixed(2)}</td>
    <td>
      <button onclick="guardarEdicion(${index})">Aceptar</button>
    </td>
  `;
}

function guardarEdicion(index) {
  const nombre = document.getElementById(`edit-nombre-${index}`).value.trim();
  const cantidad = parseInt(document.getElementById(`edit-cantidad-${index}`).value);
  const precio = parseFloat(document.getElementById(`edit-precio-${index}`).value);

  if (!nombre || cantidad <= 0 || precio < 0) return;

  const total = cantidad * precio;

  productos[index] = { nombre, cantidad, precio, total };
  renderizarTabla();
}

function mostrarModalEliminar(index) {
  productoAEliminar = index;
  deleteModal.style.display = 'block';
}

confirmDeleteBtn.addEventListener('click', () => {
  if (productoAEliminar !== null) {
    productos.splice(productoAEliminar, 1);
    productoAEliminar = null;
    renderizarTabla();
  }
  deleteModal.style.display = 'none';
});

cancelDeleteBtn.addEventListener('click', () => {
  productoAEliminar = null;
  deleteModal.style.display = 'none';
});
