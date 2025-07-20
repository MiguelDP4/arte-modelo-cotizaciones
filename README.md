# Cotizador “Arte Modelo Dubois”

Una aplicación simple en **HTML + CSS + JavaScript** (vanilla) para crear cotizaciones sin base de datos, pensada para uso local (sin servidor).

---

## 📁 Estructura del proyecto

├── index.html # Página principal
├── script.js # Lógica de interacción y PDF
├── fondo.png # Imagen de fondo para el PDF
└── src/
└── styles.css # Estilos de la página y el PDF

markdown
Copy
Edit

---

## ⚙️ ¿Cómo usar?

1. **Clona o descarga** el repositorio.
2. Verifica que `index.html`, `fondo.png` y `script.js` estén en la raíz, y `styles.css` en `src/`.
3. Abre `index.html` en un navegador (Chrome, Firefox, Edge…).
4. Ingresa los datos de cada producto (nombre, cantidad, precio).
5. Haz clic en **Agregar producto** para ver la lista actualizada.
6. Usa **✏️** para editar un producto y **🗑️** para eliminar (con confirmación).
7. Una vez lista la cotización, haz clic en **Exportar a PDF** para generar un documento con fondo e información.

---

## 🧩 Detalles técnicos

- **HTML** maneja el formulario y la estructura del documento.
- **styles.css** define estilos para:
  - Tabla y tipografía.
  - Modal de confirmación.
  - Fondo en la zona `#cotizacion`.
  - Reglas para impresión/PDF (`@media print`).
- **script.js** contiene la lógica:
  - Gestión del arreglo `productos`.
  - Funciones para agregar, editar, eliminar.
  - Modal de confirmación de borrado.
  - Generación del PDF mediante [html2pdf.js] (sin servidor).

---

## 🛠️ Instalación y uso local

No necesita instalación en servidor:

1. Clona:

   ```bash
   git clone https://github.com/MiguelDP4/arte-modelo-cotizaciones.git
   cd arte-modelo-cotizaciones
   ```

Abre index.html directamente en tu navegador con doble clic o arrastrándolo a la ventana.

Ya estás listo para usarla.

🚀 Próximas mejoras (posibles)

- Encabezado: agregar logo, fecha, cliente y número de cotización.
- Validación avanzada: alertas si campos están incompletos.
- Ordenar/Borrar múltiple: seleccionar varios productos.
- Guardar localmente: usar localStorage para conservar cotizaciones.
- Seleccionar formatos: PDF carta o A4, ajustes de márgenes.
- Imprimir directamente.

📄 Licencia
Proyecto creado para uso interno y adaptación libre según tus necesidades.