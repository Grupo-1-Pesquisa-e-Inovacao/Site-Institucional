var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    console.log("ENTREI EM AUTENTICAR")
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                    }
                    if (resultadoAutenticar.length > 0) {
                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            nome: resultadoAutenticar[0].nome,
                            administrador: resultadoAutenticar[0].administrador,
                            email: resultadoAutenticar[0].email,
                            estado: resultadoAutenticar[0].estado,
                        });
                    }

                    else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var estado = req.body.estadoServer;
    var senha = req.body.senhaServer;
    var idSecretaria = req.body.idSecretariaServer; // optional


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(idSecretaria, estado, nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function findAllCommonUsers(req, res) {
    usuarioModel.findAllCommonUsers()
        .then(response => {
            res.json(response);
        })
        .catch(erro => {
            console.log("Houve um erro ao encontrar os usuários.", erro);
            res.status(500).send("Erro ao buscar usuários.");
        });
}

function findAllAdminUsers(req, res) {
    usuarioModel.findAllAdminUsers()
        .then(response => {
            if (!response || response.length === 0) {
                return res.status(404).send("Não foi possível encontrar nenhum usuário.");
            }
            res.json(response);
        })
        .catch(erro => {
            console.log("Houve um erro ao encontrar os usuários.", erro);
            res.status(500).send("Erro ao buscar usuários.");
        });
}
function deleteById(req, res) {
    const id = req.params.id;   
    usuarioModel.deleteById(id).then(response => {
        res.json(response);
    }).catch(erro => {
        console.log("Houve um erro ao deletar o usuário.", erro);
        res.status(500).send("Erro ao deletar o usuário.");
    });
}

function updateById(req, res){
    const id = req.params.id;
    const { nome, email, senha, idSecretaria, idEstado } = req.body;
    usuarioModel.updateById(id, nome, email, senha, idSecretaria, idEstado).then(response => {
        res.json(response);
    }).catch(erro => {
        console.log("Houve um erro ao atualizar o usuário.", erro);
        res.status(500).send("Erro ao atualizar o usuário.");
    });
}

function findById(req, res){
    const id = req.params.id;
    usuarioModel.findById(id).then(response => {
        if (!response || response.length === 0) {
            return res.status(404).send("Usuário não encontrado.");
        }
        res.json(response);
    }).catch(erro => {
        console.log("Houve um erro ao encontrar o usuário.", erro);
        res.status(500).send("Erro ao buscar usuário.");
    });
}

module.exports = {
    autenticar,
    cadastrar,
    findAllCommonUsers,
    findAllAdminUsers,
    deleteById,
    updateById,
    findById,
    cadastrarAdmin
}

function cadastrarAdmin(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var idSecretaria = req.body.idSecretaria;
    var idEstado = req.body.idEstado;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrarAdmin(nome, email, senha, idSecretaria, idEstado)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao criar administrador! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}