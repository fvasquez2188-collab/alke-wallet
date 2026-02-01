$(document).ready(function () {

  const USER_EMAIL = "tucorreo@email.com";
  const USER_PASSWORD = "1234";

  $('#loginForm').submit(function (e) {
    e.preventDefault();

    const email = $('#email').val();
    const password = $('#password').val();

    if (email === USER_EMAIL && password === USER_PASSWORD) {

      if (!localStorage.getItem("saldo")) {
        localStorage.setItem("saldo", "350000");
      }

      mostrarAlerta("Inicio de sesión exitoso. Redirigiendo...", "success");

      setTimeout(() => {
        $(location).attr('href', 'menu.html');
      }, 1500);

    } else {
      mostrarAlerta("Correo o contraseña incorrectos", "danger");
    }
  });

  function mostrarAlerta(mensaje, tipo) {
    $('#alertContainer').html(`
      <div class="alert alert-${tipo} alert-dismissible fade show">
        ${mensaje}
        <button class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `);
  }

});
