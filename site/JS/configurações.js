
document.addEventListener("DOMContentLoaded", function () {
    const isAdmin = sessionStorage.USUARIO_ADMIN;
    if (Number(isAdmin) === 1) {
      const navList = document.querySelector(".navbar nav ul");
      const adminNavItem = document.createElement("li");
      adminNavItem.innerHTML = '<a href="../ADM-PAGES/admin.html">Administração</a>';
      navList.insertBefore(adminNavItem, navList.lastElementChild);
    }

    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function (event) {
        sessionStorage.clear();
        event.preventDefault();
        window.location.href = logoutBtn.getAttribute("href");
      });
    }

    const userId = sessionStorage.ID_USUARIO;
    let currentUser = null;
    if (userId) {
      fetch(`/usuarios/findById/${userId}`)
        .then((resp) => {
          if (!resp.ok) throw new Error('Erro ao buscar usuário');
          return resp.json();
        })
        .then((data) => {
          const user = Array.isArray(data) ? data[0] : data;
          if (!user) return;
          currentUser = user;
          const atualNome = document.getElementById('atualNome');
          const atualEmail = document.getElementById('atualEmail');
          const novoNome = document.getElementById('novoNome');
          const novoEmail = document.getElementById('novoEmail');
          if (atualNome) atualNome.textContent = user.nome || '';
          if (atualEmail) atualEmail.textContent = user.email || '';
          if (novoNome) novoNome.value = user.nome || '';
          if (novoEmail) novoEmail.value = user.email || '';
        })
        .catch((err) => {
          console.error('Não foi possível carregar dados do usuário:', err);
          const atualNome = document.getElementById('atualNome');
          const atualEmail = document.getElementById('atualEmail');
          if (atualNome) atualNome.textContent = 'Erro ao carregar';
          if (atualEmail) atualEmail.textContent = 'Erro ao carregar';
        });
    }

    const salvarNomeBtn = document.getElementById('salvarNome');
    if (salvarNomeBtn) {
      salvarNomeBtn.addEventListener('click', () => {
        if (!userId) return ('Usuário não identificado. Faça login.');
        if (!currentUser) return showToastErro('Dados do usuário ainda não carregados. Aguarde.');
        const novo = document.getElementById('novoNome').value.trim();
        if (!novo) return showToastErro('Digite um nome válido.');

        const payload = {
          nome: novo,
          email: currentUser.email,
          senha: currentUser.senha
        };

        fetch(`/usuarios/update/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then((resp) => {
            if (!resp.ok) throw new Error('Falha ao atualizar nome');
            return resp.json();
          })
          .then(() => {
            currentUser.nome = novo;
            const atualNome = document.getElementById('atualNome');
            if (atualNome) atualNome.textContent = novo;
            showToast('Nome atualizado com sucesso.');
          })
          .catch((err) => {
            console.error(err);
            showToast('Erro ao atualizar nome. Veja o console.');
          });
      });
    }

    const salvarEmailBtn = document.getElementById('salvarEmail');
    if (salvarEmailBtn) {
      salvarEmailBtn.addEventListener('click', () => {
        if (!userId) return showToastErro('Usuário não identificado. Faça login.');
        if (!currentUser) return showToastErro('Dados do usuário ainda não carregados. Aguarde.');
        const novo = document.getElementById('novoEmail').value.trim();
        if (!novo) return showToastErro('Digite um e-mail válido.');

        const payload = {
          nome: currentUser.nome,
          email: novo,
          senha: currentUser.senha
        };

        fetch(`/usuarios/update/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then((resp) => {
            if (!resp.ok) throw new Error('Falha ao atualizar e-mail');
            return resp.json();
          })
          .then(() => {
            currentUser.email = novo;
            const atualEmail = document.getElementById('atualEmail');
            if (atualEmail) atualEmail.textContent = novo;
            showToast('E-mail atualizado com sucesso.');
          })
          .catch((err) => {
            console.error(err);
            showToastErro('Erro ao atualizar e-mail. Veja o console.');
          });
      });
    }

    const salvarSenhaBtn = document.getElementById('salvarSenha');
    if (salvarSenhaBtn) {
      salvarSenhaBtn.addEventListener('click', () => {
        if (!userId) return showToastErro('Usuário não identificado. Faça login.');
        if (!currentUser) return showToastErro('Dados do usuário ainda não carregados. Aguarde.');

        const senhaAtualInput = document.getElementById('senhaAtual').value;
        const novaSenhaInput = document.getElementById('novaSenha').value.trim();
        const confirmarSenhaInput = document.getElementById('confirmarSenha').value.trim();

        if (!senhaAtualInput || !novaSenhaInput || !confirmarSenhaInput) return showToastErro('Preencha todos os campos de senha.');
        if (novaSenhaInput !== confirmarSenhaInput) return showToastErro('A nova senha e a confirmação não coincidem.');

        if (currentUser.senha && senhaAtualInput !== currentUser.senha) return showToastErro('Senha atual incorreta.');

        const payload = {
          nome: currentUser.nome,
          email: currentUser.email,
          senha: novaSenhaInput
        };

        fetch(`/usuarios/update/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then((resp) => {
            if (!resp.ok) throw new Error('Falha ao atualizar senha');
            return resp.json();
          })
          .then(() => {
            currentUser.senha = novaSenhaInput;
            document.getElementById('senhaAtual').value = '';
            document.getElementById('novaSenha').value = '';
            document.getElementById('confirmarSenha').value = '';
            showToast('Senha atualizada com sucesso.');
          })
          .catch((err) => {
            console.error(err);
            showToastErro('Erro ao atualizar senha. Veja o console.');
          });
      });
    }
  });

let canaisSlack = [];


document.addEventListener('DOMContentLoaded', () => {
  loadSlackCanais();

  const tabela = document.getElementById('tabelaSlack');
  if (tabela) {
    tabela.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('btnToggle')) {
        const index = Number(target.getAttribute('data-index'));
        toggleCanal(index);
      }
      if (target.classList.contains('btnDelete')) {
        const index = Number(target.getAttribute('data-index'));
        deletarCanal(index);
      }
    });
  }
});