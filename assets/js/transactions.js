/* ===============================
   CONFIGURACIÓN
=============================== */
const ITEMS_PER_PAGE = 6;
let currentPage = 1;

/* ===============================
   ELEMENTOS DOM
=============================== */
const list = document.getElementById("transactionList");
const filterSelect = document.getElementById("filterType");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");
const backBtn = document.getElementById("btnBackMenu");

/* ===============================
   MODAL CONFIRMACIÓN
=============================== */
const confirmModal = new bootstrap.Modal(
  document.getElementById("confirmModal")
);
const modalMsg = document.getElementById("confirmMessage");
const confirmBtn = document.getElementById("confirmActionBtn");

let accionConfirmada = null;

function mostrarConfirmacion(msg, accion) {
  modalMsg.textContent = msg;
  accionConfirmada = accion;
  confirmModal.show();
}

confirmBtn.onclick = () => {
  confirmModal.hide();
  if (accionConfirmada) accionConfirmada();
};

/* ===============================
   DATOS
=============================== */
function obtenerMovimientos() {
  try {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  } catch {
    return [];
  }
}

function aplicarFiltro(transactions) {
  const filtro = filterSelect.value;

  return transactions.filter(t => {
    if (filtro === "deposit") {
      return t.desc.toLowerCase().includes("depósito");
    }
    if (filtro === "transfer") {
      return t.desc.toLowerCase().includes("transferencia");
    }
    return true;
  });
}

/* ===============================
   RENDER
=============================== */
function renderMovimientos() {
  const all = aplicarFiltro(obtenerMovimientos());
  const totalPages = Math.max(
    1,
    Math.ceil(all.length / ITEMS_PER_PAGE)
  );

  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = all.slice(start, start + ITEMS_PER_PAGE);

  list.innerHTML = "";

  if (pageItems.length === 0) {
    list.innerHTML = `
      <li class="list-group-item text-center text-muted">
        No hay movimientos
      </li>`;
  } else {
    pageItems.forEach(t => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `
        <strong>${t.desc}</strong><br>
        $${Number(t.monto).toLocaleString()}
        <small class="d-block text-muted">${t.fecha}</small>
      `;
      list.appendChild(li);
    });
  }

  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

/* ===============================
   EVENTOS
=============================== */
filterSelect.onchange = () => {
  currentPage = 1;
  renderMovimientos();
};

prevBtn.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    renderMovimientos();
  }
};

nextBtn.onclick = () => {
  currentPage++;
  renderMovimientos();
};

backBtn.onclick = () =>
  mostrarConfirmacion(
    "¿Deseas volver al menú principal?",
    () => window.location.href = "menu.html"
  );

/* ===============================
   INIT
=============================== */
document.addEventListener("DOMContentLoaded", renderMovimientos);

