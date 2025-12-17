// CRUD usuarios

let userIdToDelete = null;

// delete

function deleteUser(id, pageName){
    fetch(`/usuarios/deleteById/${id}`, {
  method: 'DELETE'
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    console.log("Usuário deletado com sucesso.")
    showToast("Usuario Deletado Com Sucesso")
    if(pageName == 'user'){
      readUser();
    } else{
      readAdminUser();
    }
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

// create

function createUser(){
  const nome = document.getElementById('adminNome') ? document.getElementById('adminNome').value.trim() : '';
  const email = document.getElementById('adminEmail') ? document.getElementById('adminEmail').value.trim() : '';
  const senha = document.getElementById('adminSenha') ? document.getElementById('adminSenha').value.trim() : '';

  if (!nome || !email || !senha) {
    showToastErro('Preencha nome, email e senha para criar o administrador.');
    return;
  }

  fetch('/usuarios/cadastrarAdmin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha })
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
      return response.json();
    })
    .then(data => {
      fecharModalDefinitivo();
      readAdminUser();
      if (document.getElementById('adminNome')) document.getElementById('adminNome').value = '';
      if (document.getElementById('adminEmail')) document.getElementById('adminEmail').value = '';
      if (document.getElementById('adminSenha')) document.getElementById('adminSenha').value = '';
      showToast('Administrador criado com sucesso.');
    })
    .catch(error => {
      console.error('Erro:', error);
      showToast('Erro ao criar administrador. Veja o console.');
    });
}

function abrirModalUser() {
  // carregar secretarias e estados
  Promise.all([
    fetch('/secretaria/listar').then(r => r.ok ? r.json() : []),
      fetch('/dashboard/findAllEstados').then(r => r.ok ? r.json() : [])
  ]).then(([secretarias, estados]) => {
    const selSec = document.getElementById('userSecretaria');
    selSec.innerHTML = '<option value="">-- Selecionar --</option>';
    if (Array.isArray(secretarias)) {
      secretarias.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.idSecretaria;
        opt.text = s.nome;
        selSec.appendChild(opt);
      });
    }

    const selEst = document.getElementById('userEstado');
    selEst.innerHTML = '<option value="">-- Selecionar --</option>';
    if (Array.isArray(estados)) {
      estados.forEach(e => {
        let value = e.idUF || e.id || e.value || e;
        let label = e.nomeUf || e.estado || e.name || e;
        const opt = document.createElement('option');
        opt.value = value;
        opt.text = label;
        selEst.appendChild(opt);
      });
    }

    document.getElementById('modalCriacaoUser').style.display = 'flex';
  }).catch(err => {
    console.error('Erro ao carregar selects:', err);
    showToastErro('Erro ao carregar dados auxiliares. Veja o console.');
  });
}

function fecharModalUser() {
  document.getElementById('modalCriacaoUser').style.display = 'none';
}

function createCommonUser() {
  const nome = document.getElementById('userNome').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const senha = document.getElementById('userSenha').value.trim();
  const idSecretaria = document.getElementById('userSecretaria').value || null;
  const idEstado = document.getElementById('userEstado').value || null;

  if (!nome || !email || !senha) return showToastErro('Preencha nome, email e senha.');

  if (!idEstado) return showToastErro('Selecione um estado antes de criar o usuário.');

  const payload = {
    nomeServer: nome,
    emailServer: email,
    estadoServer: Number(idEstado),
    idSecretariaServer: idSecretaria ? Number(idSecretaria) : null,
    senhaServer: senha
  };

  fetch('/usuarios/cadastrar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(resp => {
      if (!resp.ok) throw new Error('Erro na requisição: ' + resp.status);
      return resp.json();
    })
    .then(() => {
      fecharModalUser();
      readUser();
      showToast('Usuário criado com sucesso.');
    })
    .catch(err => {
      console.error('Erro ao criar usuário:', err);
      showToastErro('Erro ao criar usuário. Veja o console.');
    });
}

// update

function updateUser(){
  const id = document.getElementById('editId') ? document.getElementById('editId').value : null;
  if (!id) return showToastErro('ID do usuário não informado.');

  const nome = document.getElementById('editNome').value.trim();
  const email = document.getElementById('editEmail').value.trim();
  const senha = document.getElementById('editSenha').value.trim();
  const idSecretaria = document.getElementById('editSecretaria').value || null;
  const idEstado = document.getElementById('editEstado').value || null;

  const payload = { nome, email };
  if (senha) payload.senha = senha;
  if (idSecretaria) payload.idSecretaria = Number(idSecretaria);
  if (idEstado) payload.idEstado = Number(idEstado);

  fetch(`/usuarios/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro na requisição: ' + response.status);
      return response.json();
    })
    .then(data => {
      closeEditModal();
      if (document.getElementById('admin-user-table')) {
        readAdminUser();
      }
      if (document.getElementById('common-user-table')) {
        readUser();
      }
      showToast('Usuário atualizado com sucesso.');
    })
    .catch(error => {
      console.error('Erro:', error);
      showToastErro('Erro ao atualizar usuário. Veja o console.');
    });
}

// read

function readUser(){
  fetch('/usuarios/findAllCommonUsers', {
  method: 'GET'
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    fillTable(data, 'user');
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function readAdminUser(){
  fetch('/usuarios/findAllAdminUsers', {
  method: 'GET'
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    fillTable(data, 'admin');
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function fillTable(data, bodyName){
  let tableBody = null;

  if (bodyName == 'user') {
    tableBody = document.getElementById('common-user-table');
  } else {
    tableBody = document.getElementById('admin-user-table');
  }

  if (!tableBody) {
    console.warn(`fillTable: table element for '${bodyName}' not found; skipping render.`);
    return;
  }

  tableBody.innerHTML = '';

  data.forEach(user => {
    const actualElement = `
      <tr>
        <td>${user.nomeUsuario}</td>
        <td>${user.email}</td>
        <td>${user.nomeSecretaria || user.nomeCargo || '-'}</td>
        <td>
          <button class="delete-btn" onclick="openDeleteModal('${user.idUsuario}')">Deletar</button>
          <button class="edit-btn" onclick="openEditModal('${user.idUsuario}')">Editar</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += actualElement;
  });
}

// --- Edição de usuário ---
function openEditModal(id) {
  fetch(`/usuarios/findById/${id}`)
    .then(resp => {
      if (!resp.ok) throw new Error('Falha ao buscar usuário: ' + resp.status);
      return resp.json();
    })
    .then(data => {
      const user = Array.isArray(data) ? data[0] : data;
      if (!user) return showToastErro('Usuário não encontrado.');

      document.getElementById('editId').value = user.idUsuario;
      document.getElementById('editNome').value = user.nome || '';
      document.getElementById('editEmail').value = user.email || '';
      document.getElementById('editSenha').value = '';

      Promise.all([
        fetch('/secretaria/listar').then(r => r.ok ? r.json() : []),
          fetch('/dashboard/findAllEstados').then(r => r.ok ? r.json() : [])
      ])
      .then(([secretarias, estados]) => {
        const selSec = document.getElementById('editSecretaria');
        selSec.innerHTML = '<option value="">-- Selecionar --</option>';
        if (Array.isArray(secretarias)) {
          secretarias.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.idSecretaria;
            opt.text = s.nome;
            if (user.idSecretaria == s.idSecretaria) opt.selected = true;
            selSec.appendChild(opt);
          });
        }

        const selEst = document.getElementById('editEstado');
        selEst.innerHTML = '<option value="">-- Selecionar --</option>';
        if (Array.isArray(estados)) {
          estados.forEach(e => {
            let value = e.idUF || e.id || e.value || e;
            let label = e.nomeUf || e.estado || e.name || e;
            const opt = document.createElement('option');
            opt.value = value;
            opt.text = label;
            if (user.idEstado == value) opt.selected = true;
            selEst.appendChild(opt);
          });
        }

        document.getElementById('modalEditar').style.display = 'flex';
      })
      .catch(err => {
        console.error('Erro ao carregar secretarias/estados:', err);
        showToastErro('Erro ao carregar dados auxiliares. Veja o console.');
      });
    })
    .catch(err => {
      console.error('Erro ao buscar usuário:', err);
      showToastErro('Erro ao buscar usuário. Veja o console.');
    });
}

function closeEditModal() {
  document.getElementById('modalEditar').style.display = 'none';
}


function openDeleteModal(id) {
    userIdToDelete = id;
    document.getElementById("deleteModal").style.display = "flex";
}

function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
    userIdToDelete = null;
}

function confirmDelete(pageName) {
    if (userIdToDelete !== null) {
        deleteUser(userIdToDelete, pageName);
    }
    closeDeleteModal();
}
