(() => {

  const SALDO_INICIAL = 350000;

  const saldoEl = document.getElementById("saldo");
  const logoutBtn = document.getElementById("logoutBtn");
  const navLinks = document.querySelectorAll(".nav-confirm");

  const modalEl = document.getElementById("confirmModal");
  const modalMsg = document.getElementById("confirmMessage");
  const confirmBtn = document.getElementById("confirmActionBtn");

  const confirmModal = new bootstrap.Modal(modalEl);
  let accionConfirmada = null;

  function init() {
    if (!localStorage.getItem("saldo")) {
      localStorage.setItem("saldo", SALDO_INICIAL);
    }
    renderSaldo();
    bindEventos();
  }

  function renderSaldo() {
    const saldo = Number(localStorage.getItem("saldo")) || 0;
    saldoEl.textContent = `$${saldo.toLocaleString()}`;
  }

  function bindEventos() {
    navLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        mostrarConfirmacion(
          link.dataset.msg,
          () => window.location.href = link.href
        );
      });
    });

    logoutBtn.addEventListener("click", () => {
      mostrarConfirmacion(
        logoutBtn.dataset.msg,
        () => window.location.href = "login.html"
      );
    });

    confirmBtn.addEventListener("click", ejecutarAccion);
  }

  function mostrarConfirmacion(msg, accion) {
    modalMsg.textContent = msg;
    accionConfirmada = accion;
    confirmModal.show();
  }

  function ejecutarAccion() {
    confirmModal.hide();
    if (accionConfirmada) accionConfirmada();
    accionConfirmada = null;
  }

  init();
})();
