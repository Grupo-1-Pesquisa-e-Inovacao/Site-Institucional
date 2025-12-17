   // Modal de Criação
    function openModalCreate() {
        document.getElementById("modalCriacao").style.display = "flex";
    }
    function closeModalCreate() {
        document.getElementById("modalCriacao").style.display = "none";
    }


    // Modal de Edit
    function openEditModal(idSecretaria) {
        secretariaIdToHandle = idSecretaria;

        fetch(`/secretarias/buscarPorId/${idSecretaria}`, {
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

                document.getElementById("modalEdit").style.display = "flex";
            })
            .catch(error => {
                console.error('Erro ao carregar dados para edição:', error);
                toastErro(`Erro ao buscar dados da secretaria: ${error.message}`);
            });
    }
    function closeModalEdit() {
        document.getElementById("modalEdit").style.display = "none";
    }


    // Modal de Delete
    function openDeleteModal(id) {
        secretariaIdToHandle = id;
        document.getElementById("modalDelete").style.display = "flex";
    }
    function closeDeleteModal() {
        document.getElementById("modalDelete").style.display = "none";
    }

    let secretariaIdToHandle = null;

    function readSecretaria() {
        fetch('/secretarias/listar', {
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
                <button class="edit-btn" onclick="openEditModal('${secretaria.idSecretaria}')">Editar</button>
                <button class="delete-btn" onclick="openDeleteModal('${secretaria.idSecretaria}')">Deletar</button>
                </td>
            </tr>
        `;
            tableBody.innerHTML += actualElement;
        });
    }


    function createSecretaria() {
        const nome = document.getElementById('inputNomeSecretaria').value;
        const tipo = document.getElementById('inputTipoSecretaria').value;

        if (!nome || !tipo) {
            showToastErro("Preencha todos os campos (Nome e Tipo) para cadastrar a secretaria.");
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
                showToast("Secretaria cadastrada com sucesso!");
                readSecretaria();
                closeModalCreate();
            })
            .catch(error => {
                console.error('Erro no cadastro:', error);
                showToastErro(`Falha no cadastro: ${error.message}`);
            });
    }

    function updateSecretaria() {
        const idSecretaria = secretariaIdToHandle;

        const novoNome = document.getElementById('editInputNomeSecretaria').value;
        const novoTipo = document.getElementById('editInputTipoSecretaria').value;

        if (!idSecretaria || !novoNome || !novoTipo) {
            showToastErro("Dados incompletos para atualização (Nome e Tipo são obrigatórios).");
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
                showToast("Secretaria atualizada com sucesso!");
                // document.getElementById("editSecretariaModal").style.display = "none";
                readSecretaria();
                closeModalEdit()
            })
            .catch(error => {
                console.error('Erro na atualização:', error);
                showToastErro(`Falha na atualização: ${error.message}`);
            });
    }

    function confirmDelete() {
        if (secretariaIdToHandle !== null) {
            deleteSecretaria(secretariaIdToHandle);
        }
        closeDeleteModal();
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
                showToast("Secretaria deletada com sucesso!");
                readSecretaria();
            })
            .catch(error => {
                console.error('Erro:', error);
                s(`Falha ao deletar a secretaria: ${error.message}`);
            });
    }
