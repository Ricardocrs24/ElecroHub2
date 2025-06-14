let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = {};

fetch("productos.json")
  .then((res) => res.json())
  .then((data) => {
    productos = data;
    renderizarProductos();
    renderizarCarrito();
  });

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderizarProductos() {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;

  const tipo = contenedor.dataset.tipo;
  const productosPagina = productos[tipo]?.slice(0, 2) || [];

  contenedor.innerHTML = ""; // Limpiar antes de renderizar

  productosPagina.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card m-2";
    card.style.width = "16rem";
    card.innerHTML = `
      <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>
        <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
      </div>
    `;
    contenedor.appendChild(card);
  });

  // Agregar eventos después de insertar los elementos
  contenedor.querySelectorAll(".agregar-carrito").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const allProducts = Object.values(productos).flat();
      const producto = allProducts.find((p) => p.id === id);
      if (producto) {
        const existe = carrito.find((item) => item.id === producto.id);
        if (existe) {
          existe.cantidad++;
        } else {
          carrito.push({ ...producto, cantidad: 1 });
        }
        guardarCarrito();
        renderizarCarrito(); // Actualiza el resumen si estamos en carrito.html
        alert("Producto agregado al carrito");
      }
    });
  });
}

function renderizarCarrito() {
  const lista = document.getElementById("carrito-items");
  const resumen = document.getElementById("carrito-resumen");
  if (!lista || !resumen) return;

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((producto) => {
    const item = document.createElement("div");
    item.className = "d-flex justify-content-between align-items-center border-bottom py-2";
    item.innerHTML = `
      <div>
        <strong>${producto.nombre}</strong><br>
        $${producto.precio} x ${producto.cantidad}
      </div>
      <div>
        <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad('${producto.id}', -1)">-</button>
        <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad('${producto.id}', 1)">+</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito('${producto.id}')">Eliminar</button>
      </div>
    `;
    lista.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  resumen.textContent = "Total: $" + total.toFixed(2);
}

function cambiarCantidad(id, cambio) {
  const item = carrito.find((p) => p.id === id);
  if (item) {
    item.cantidad += cambio;
    if (item.cantidad <= 0) {
      carrito = carrito.filter((p) => p.id !== id);
    }
    guardarCarrito();
    renderizarCarrito();
  }
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter((p) => p.id !== id);
  guardarCarrito();
  renderizarCarrito();
}
// contacto //

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefono = document.getElementById("phone").value.trim();
      const asunto = document.getElementById("subject").value;
      const mensaje = document.getElementById("message").value.trim();

      if (!nombre || !email || !asunto || !mensaje) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
      }

      // Aquí podrías enviar los datos a un backend si lo tuvieras
      alert("Gracias por contactarnos. Te responderemos pronto.");

      // Limpiar formulario
      form.reset();
    });
  }
});
// Inicio de sesion //
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  if (form) {
    // Cargar usuario recordado
    const rememberedEmail = localStorage.getItem("usuarioRecordado");
    if (rememberedEmail) {
      document.getElementById("email").value = rememberedEmail;
      document.getElementById("remember").checked = true;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const remember = document.getElementById("remember").checked;

      if (!email || !password) {
        alert("Por favor, completa ambos campos.");
        return;
      }

      // Simulación de login exitoso
      if (remember) {
        localStorage.setItem("usuarioRecordado", email);
      } else {
        localStorage.removeItem("usuarioRecordado");
      }

      alert("Inicio de sesión exitoso. ¡Bienvenido!");
      form.reset();
    });
  }
});


