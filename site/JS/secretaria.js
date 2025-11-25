let secretariaIdToHandle = null; 

function readSecretaria() {
    fetch('/secretarias', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Secretarias encontradas:', data);
        fillSecretariaTable(data);
    })
    .catch(error => {
        console.error('Erro ao buscar secretarias:', error);
    });
}

function fillSecretariaTable(data) {
    const tableBody = document.getElementById('secretaria-table-body');
    tableBody.innerHTML = '';

    data.forEach(secretaria => {
        const actualElement = `
            <tr id="secretaria_${secretaria.id}">
                <td>${secretaria.id}</td>
                <td>${secretaria.nome}</td>
                <td>${secretaria.email}</td>
                <td>${secretaria.estado}</td>
                <td>
                    <button class="delete-btn" onclick="openDeleteModal('${secretaria.id}')">Deletar</button>
                    <button class="edit-btn" onclick="openEditModal('${secretaria.id}')">Editar</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += actualElement;
    });
}

function deleteSecretaria(idSecretaria) {
    fetch(`/secretarias/deletar/${idSecretaria}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error('Erro ao deletar: ' + (err.sqlMessage || err.message || response.status));
            });
        }
        console.log("Secretaria deletada com sucesso.");
        alert("Secretaria deletada com sucesso!");
        readSecretaria();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert(`Falha ao deletar a secretaria: ${error.message}`);
    });
}

function createSecretaria() {
    const nome = document.getElementById('inputNomeSecretaria').value;
    const email = document.getElementById('inputEmailSecretaria').value;
    const estado = document.getElementById('inputEstadoSecretaria').value;
    const senha = document.getElementById('inputSenhaSecretaria').value;

    if (!nome || !email || !estado || !senha) {
        alert("Preencha todos os campos para cadastrar a secretaria.");
        return;
    }

    fetch(`/secretarias/cadastrar`, {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            estadoServer: estado,
            senhaServer: senha 
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.sqlMessage || err.message || 'Erro ao cadastrar secretaria.');
            });
        }
        return response.json();
    })
    .then(data => {
        alert("Secretaria cadastrada com sucesso!");
        readSecretaria();
    })
    .catch(error => {
        console.error('Erro no cadastro:', error);
        alert(`Falha no cadastro: ${error.message}`);
    });
}

function openEditModal(idSecretaria) {
    secretariaIdToHandle = idSecretaria;

    fetch(`/secretarias/${idSecretaria}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Secretaria não encontrada.');
        }
        return response.json();
    })
    .then(secretaria => {
        document.getElementById('editInputNomeSecretaria').value = secretaria.nome;
        document.getElementById('editInputEmailSecretaria').value = secretaria.email;
        document.getElementById('editInputEstadoSecretaria').value = secretaria.estado;
        
        document.getElementById("editSecretariaModal").style.display = "flex";
    })
    .catch(error => {
        console.error('Erro ao carregar dados para edição:', error);
        alert(`Erro ao buscar dados da secretaria: ${error.message}`);
    });
}

function updateSecretaria() {
    const idSecretaria = secretariaIdToHandle;

    const novoNome = document.getElementById('editInputNomeSecretaria').value;
    const novoEmail = document.getElementById('editInputEmailSecretaria').value;
    const novoEstado = document.getElementById('editInputEstadoSecretaria').value;
    
    if (!idSecretaria || !novoNome || !novoEmail || !novoEstado) {
        alert("Dados incompletos para atualização.");
        return;
    }

    fetch(`/secretarias/atualizar/${idSecretaria}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: novoNome,
            emailServer: novoEmail,
            estadoServer: novoEstado
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.sqlMessage || err.message || 'Erro ao atualizar secretaria.');
            });
        }
        alert("Secretaria atualizada com sucesso!");
        document.getElementById("editSecretariaModal").style.display = "none";
        readSecretaria();
    })
    .catch(error => {
        console.error('Erro na atualização:', error);
        alert(`Falha na atualização: ${error.message}`);
    });
}

function openDeleteModal(id) {
    secretariaIdToHandle = id;
    document.getElementById("deleteModal").style.display = "flex"; 
}

function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
    secretariaIdToHandle = null;
}

function confirmDelete() {
    if (secretariaIdToHandle !== null) {
        deleteSecretaria(secretariaIdToHandle);
    }
    closeDeleteModal();
}

function closeEditModal() {
    document.getElementById("editSecretariaModal").style.display = "none";
    secretariaIdToHandle = null;
}