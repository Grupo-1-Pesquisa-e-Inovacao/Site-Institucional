let secretariaIdToHandle = null; 

function readSecretaria() {
    fetch('/secretarias', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 204) {
                 console.log('Nenhuma secretaria encontrada.');
                 fillSecretariaTable([]);
                 return null;
            }
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            console.log('Secretarias encontradas:', data);
            fillSecretariaTable(data);
        }
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
            <tr id="secretaria_${secretaria.idSecretaria}">
                <td>${secretaria.idSecretaria}</td>
                <td>${secretaria.nome}</td>
                <td>${secretaria.tipo}</td> 
                <td>${new Date(secretaria.data_criacao).toLocaleDateString()}</td>
                <td>
                    <button class="delete-btn" onclick="openDeleteModal('${secretaria.idSecretaria}')">Deletar</button>
                    <button class="edit-btn" onclick="openEditModal('${secretaria.idSecretaria}')">Editar</button>
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
    const tipo = document.getElementById('inputTipoSecretaria').value;

    if (!nome || !tipo) {
        alert("Preencha todos os campos (Nome e Tipo) para cadastrar a secretaria.");
        return;
    }

    fetch(`/secretarias/cadastrar`, {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            tipoServer: tipo
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
        document.getElementById('editInputTipoSecretaria').value = secretaria.tipo;
        
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
    const novoTipo = document.getElementById('editInputTipoSecretaria').value;
    
    if (!idSecretaria || !novoNome || !novoTipo) {
        alert("Dados incompletos para atualização (Nome e Tipo são obrigatórios).");
        return;
    }

    fetch(`/secretarias/atualizar/${idSecretaria}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: novoNome,
            tipoServer: novoTipo
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

function openCreateModal() {
    document.getElementById("createSecretariaModal").style.display = "flex";
}

function closeCreateModal() {
    document.getElementById("createSecretariaModal").style.display = "none";
}

function closeEditModal() {
    document.getElementById("editSecretariaModal").style.display = "none";
    secretariaIdToHandle = null;
}