// FUNÇÃO DE LOGOUT
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.querySelector(".logout-btn");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", function (event) {
        // Limpa o sessionStorage
        sessionStorage.clear();

        // Redireciona manualmente após limpar
        event.preventDefault(); // impede o redirecionamento automático
        window.location.href = logoutBtn.getAttribute("href");
      });
    }
  });
