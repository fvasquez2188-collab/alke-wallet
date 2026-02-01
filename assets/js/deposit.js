const amountInput = document.getElementById("amount");
const saldoTxt = document.getElementById("saldoActual");
const resultBox = document.getElementById("depositResult");

let saldo =
  Number(sessionStorage.getItem("saldo")) ||
  Number(localStorage.getItem("saldo")) || 0;

saldoTxt.textContent = `$${saldo.toLocaleString()}`;

const confirmModal = new bootstrap.Modal(document.getElementById("confirmModal"));
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

document.getElementById("depositBtn").onclick = () => {
  const monto = Number(amountInput.value);
  if (monto <= 0) return;

  mostrarConfirmacion(`¿Confirmar depósito de $${monto.toLocaleString()}?`, () => {
    saldo += monto;
    localStorage.setItem("saldo", saldo);
    sessionStorage.setItem("saldo", saldo);

    guardarMovimiento("Depósito", monto);

    saldoTxt.textContent = `$${saldo.toLocaleString()}`;
    resultBox.innerHTML = `
      <div class="alert alert-success">
        Depósito realizado. Redirigiendo...
      </div>`;

    setTimeout(() => window.location.href = "menu.html", 2000);
  });
};

function guardarMovimiento(desc, monto) {
  let t = JSON.parse(localStorage.getItem("transactions")) || [];
  t.unshift({ desc, monto, fecha: new Date().toLocaleString() });
  localStorage.setItem("transactions", JSON.stringify(t));
}

