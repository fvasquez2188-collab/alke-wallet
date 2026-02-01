/* ===============================
   CONTACTOS (PERSISTENCIA)
=============================== */
const defaultContacts = [
  { name: "Juan Pérez", alias: "Juancho", bank: "BancoEstado", account: "12345678" },
  { name: "María González", alias: "Mari", bank: "Banco de Chile", account: "87654321" }
];

let contacts = [];

try {
  contacts = JSON.parse(localStorage.getItem("contacts")) || defaultContacts;
} catch {
  contacts = defaultContacts;
}

function guardarContactos() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

let selectedContact = null;

/* ===============================
   ELEMENTOS DOM
=============================== */
const contactList = document.getElementById("contactList");
const searchInput = document.getElementById("searchInput");
const transferBtn = document.getElementById("transferBtn");
const amountInput = document.getElementById("amount");
const saldoTxt = document.getElementById("saldoActual");
const resultBox = document.getElementById("transferResult");

/* ===============================
   SALDO
=============================== */
let saldo = Number(localStorage.getItem("saldo")) || 0;
saldoTxt.textContent = `$${saldo.toLocaleString()}`;

/* ===============================
   MODAL CONFIRMACIÓN
=============================== */
const confirmModal = new bootstrap.Modal(
  document.getElementById("confirmModal")
);

let accionConfirmada = null;

function mostrarConfirmacion(msg, accion) {
  document.getElementById("confirmMessage").textContent = msg;
  accionConfirmada = accion;
  confirmModal.show();
}

document.getElementById("confirmActionBtn").onclick = () => {
  confirmModal.hide();
  if (accionConfirmada) accionConfirmada();
};

/* ===============================
   RENDER CONTACTOS
=============================== */
function renderContacts() {
  const search = searchInput.value.toLowerCase();
  contactList.innerHTML = "";
  selectedContact = null;
  transferBtn.classList.add("d-none");

  contacts
    .filter(c =>
      c.name.toLowerCase().includes(search) ||
      c.alias.toLowerCase().includes(search) ||
      c.bank.toLowerCase().includes(search)
    )
    .forEach(c => {
      const li = document.createElement("li");
      li.className = "list-group-item list-group-item-action";
      li.innerHTML = `<strong>${c.name}</strong><br>${c.alias} | ${c.bank}`;

      li.onclick = () => {
        document
          .querySelectorAll("#contactList li")
          .forEach(i => i.classList.remove("active"));

        li.classList.add("active");
        selectedContact = c;
        transferBtn.classList.remove("d-none");
      };

      contactList.appendChild(li);
    });
}

/* ===============================
   EVENTOS
=============================== */
searchInput.addEventListener("input", renderContacts);

document.getElementById("btnAddContact").onclick = () =>
  new bootstrap.Modal(
    document.getElementById("addContactModal")
  ).show();

document.getElementById("saveContactBtn").onclick = () => {
  const c = {
    name: cName.value,
    alias: cAlias.value,
    bank: cBank.value,
    account: cAccount.value
  };

  if (!c.name || !c.alias || !c.bank || !c.account) return;

  contacts.push(c);
  guardarContactos();

  bootstrap.Modal.getInstance(
    document.getElementById("addContactModal")
  ).hide();

  renderContacts();
};

transferBtn.onclick = () => {
  const monto = Number(amountInput.value);

  if (!selectedContact || monto <= 0 || monto > saldo) return;

  mostrarConfirmacion(
    `¿Enviar $${monto.toLocaleString()} a ${selectedContact.name}?`,
    () => {
      saldo -= monto;
      localStorage.setItem("saldo", saldo);

      guardarMovimiento(
        `Transferencia a ${selectedContact.name}`,
        monto
      );

      resultBox.innerHTML = `
        <div class="alert alert-success">
          Transferencia realizada.<br>
          Redirigiendo al menú...
        </div>
      `;

      setTimeout(() => {
        window.location.href = "menu.html";
      }, 2000);
    }
  );
};

document.getElementById("btnVolver").onclick = () =>
  mostrarConfirmacion(
    "¿Deseas volver al menú principal?",
    () => window.location.href = "menu.html"
  );

/* ===============================
   MOVIMIENTOS
=============================== */
function guardarMovimiento(desc, monto) {
  let t = JSON.parse(localStorage.getItem("transactions")) || [];
  t.unshift({ desc, monto, fecha: new Date().toLocaleString() });
  localStorage.setItem("transactions", JSON.stringify(t));
}

document.addEventListener("DOMContentLoaded", renderContacts);

