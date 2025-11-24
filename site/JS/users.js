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

}

// update

function updateUser(){

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
    console.log('Resultado:', data);
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
    console.log('Resultado:', data);
    fillTable(data, 'admin');
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}

function fillTable(data, bodyName){
  let tableBody = '';

  if (bodyName == 'user') {
    tableBody = document.getElementById('common-user-table');
  } else {
    tableBody = document.getElementById('admin-user-table');
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
          <button class="edit-btn">Editar</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += actualElement;
  });
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
