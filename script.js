function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(val);
    }
  }
  return null;
}

function setCookie(name, value, days) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

let cliente = null;

const btnGuardarCliente = document.getElementById("btn-guardar-cliente");
const spanNombre = document.getElementById("nombre-cliente");
const spanTelefono = document.getElementById("telefono-cliente");
const spanNit = document.getElementById("nit-cliente");
const divDatosCliente = document.getElementById("datos-cliente");

btnGuardarCliente.addEventListener("click", () => {
  const nombre = document.getElementById("c-nombre").value;
  const telefono = document.getElementById("c-telefono").value;
  const nit = document.getElementById("c-nit").value;
  if (!nombre || !telefono || !nit) {
    alert("Por favor completa todos los datos del cliente");
    return;
  }

  cliente = { nombre, telefono, nit };
  setCookie("cliente", JSON.stringify(cliente), 30);

  spanNombre.textContent = nombre;
  spanTelefono.textContent = telefono;
  spanNit.textContent = nit;

  divDatosCliente.style.display = "block";
});

const form = document.getElementById("product-form");
const tableBody = document.querySelector("#product-table tbody");
const grandTotalCell = document.getElementById("grand-total");
const deleteModal = document.getElementById("delete-modal");
const confirmDeleteBtn = document.getElementById("confirm-delete");
const cancelDeleteBtn = document.getElementById("cancel-delete");

let productos = [];
let productoAEliminar = null;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("product-name").value.trim();
  const cantidad = parseInt(document.getElementById("product-qty").value);
  const precio = parseFloat(document.getElementById("product-price").value);

  if (!nombre || cantidad <= 0 || precio < 0) return;

  const total = cantidad * precio;

  const producto = {
    nombre,
    cantidad,
    precio,
    total,
  };

  productos.push(producto);
  setCookie("productos", JSON.stringify(productos), 30);
  renderizarTabla();
  form.reset();
  document.getElementById("product-name").focus();
});

function renderizarTabla() {
  tableBody.innerHTML = "";
  productos.forEach((producto, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.cantidad}</td>
      <td>Q${producto.precio.toFixed(2)}</td>
      <td>Q${producto.total.toFixed(2)}</td>
      <td>
        <div class="acciones">
          <button class="btn-editar" onclick="editarProducto(${index})">✏️</button>
          <button class="btn-eliminar" onclick="mostrarModalEliminar(${index})">🗑️</button>
        </div>
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
    <td><input type="number" value="${
      producto.cantidad
    }" min="1" id="edit-cantidad-${index}" /></td>
    <td><input type="number" value="${
      producto.precio
    }" min="0" step="0.01" id="edit-precio-${index}" /></td>
    <td>Q${producto.total.toFixed(2)}</td>
    <td>
      <button onclick="guardarEdicion(${index})">Aceptar</button>
    </td>
  `;
}

function guardarEdicion(index) {
  const nombre = document.getElementById(`edit-nombre-${index}`).value.trim();
  const cantidad = parseInt(
    document.getElementById(`edit-cantidad-${index}`).value
  );
  const precio = parseFloat(
    document.getElementById(`edit-precio-${index}`).value
  );

  if (!nombre || cantidad <= 0 || precio < 0) return;

  const total = cantidad * precio;

  productos[index] = { nombre, cantidad, precio, total };
  renderizarTabla();
}

function mostrarModalEliminar(index) {
  productoAEliminar = index;
  deleteModal.style.display = "block";
}

confirmDeleteBtn.addEventListener("click", () => {
  if (productoAEliminar !== null) {
    productos.splice(productoAEliminar, 1);
    productoAEliminar = null;
    renderizarTabla();
  }
  deleteModal.style.display = "none";
});

cancelDeleteBtn.addEventListener("click", () => {
  productoAEliminar = null;
  deleteModal.style.display = "none";
});

function exportarPDF() {
  const cotizacion = document.getElementById("cotizacion");

  // Ocultar botones u otras acciones antes de exportar
  const acciones = cotizacion.querySelectorAll(".acciones");
  acciones.forEach((el) => (el.style.display = "none"));

  const opciones = {
    margin: 0,
    filename: "cotizacion.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf()
    .set(opciones)
    .from(cotizacion)
    .save()
    .then(() => {
      // Mostrar botones después de exportar
      acciones.forEach((el) => (el.style.display = ""));
    })
    .catch((error) => {
      console.error("Error al exportar a PDF:", error);
      acciones.forEach((el) => (el.style.display = ""));
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const fechaHoy = document.getElementById("fecha-hoy");
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const hoy = new Date();
  const dia = hoy.getDate();
  const mes = meses[hoy.getMonth()];
  const año = hoy.getFullYear();

  fechaHoy.textContent = `${dia} de ${mes} de ${año}`;

  const cookieCliente = getCookie("cliente");
  console.log(cookieCliente);
  if (cookieCliente) {
    cliente = JSON.parse(cookieCliente);
    spanNombre.textContent = cliente.nombre;
    spanTelefono.textContent = cliente.telefono;
    spanNit.textContent = cliente.nit;

    divDatosCliente.style.display = "block";
  }

  const cookieProductos = getCookie("productos");
  console.log(cookieProductos);
  if (cookieProductos) {
    productos = JSON.parse(cookieProductos);
    renderizarTabla();
    form.reset();
  }
});

function abrirModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}

document.getElementById("btn-borrar-cliente").addEventListener("click", () => {
  abrirModal("modal-borrar-cliente");
});

document.getElementById("btn-borrar-todo").addEventListener("click", () => {
  abrirModal("modal-borrar-todo");
});

document
  .getElementById("confirmar-borrar-cliente")
  .addEventListener("click", () => {
    cliente = null;

    spanNombre.textContent = "";
    spanTelefono.textContent = "";
    spanNit.textContent = "";

    divDatosCliente.style.display = "none";

    cerrarModal("modal-borrar-cliente");
  });

document
  .getElementById("confirmar-borrar-todo")
  .addEventListener("click", () => {
    productos = [];
    renderizarTabla();
    cerrarModal("modal-borrar-todo");
  });
