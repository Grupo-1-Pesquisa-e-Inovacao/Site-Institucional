var secretariaModel = require("../models/secretariaModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var estado = req.body.estadoServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        secretariaModel.cadastrar(estado, nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da secretaria! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listar(req, res) {
    secretariaModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhuma secretaria encontrada!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as secretarias: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPorId(req, res) {
    var idSecretaria = req.params.idSecretaria;

    secretariaModel.buscarPorId(idSecretaria)
        .then(function (resultado) {
            if (resultado.length == 1) {
                res.status(200).json(resultado[0]);
            } else if (resultado.length == 0) {
                res.status(404).send("Secretaria não encontrada!");
            } else {
                res.status(500).send("Mais de um resultado encontrado para o mesmo ID!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar a secretaria: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var estado = req.body.estadoServer;
    var idSecretaria = req.params.idSecretaria;

    if (nome == undefined && email == undefined && estado == undefined) {
        res.status(400).send("Nenhum dado para atualização foi enviado!");
        return;
    }

    secretariaModel.atualizar(idSecretaria, nome, email, estado)
        .then(
            function (resultado) {
                if (resultado.affectedRows > 0) {
                    res.json(resultado);
                } else {
                    res.status(404).send("Nenhum registro atualizado. ID não encontrado ou dados idênticos.");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao atualizar a secretaria! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deletar(req, res) {
    var idSecretaria = req.params.idSecretaria;

    secretariaModel.deletar(idSecretaria)
        .then(
            function (resultado) {
                if (resultado.affectedRows > 0) {
                    res.status(200).send("Secretaria deletada com sucesso!");
                } else {
                    res.status(404).send("Nenhum registro deletado. ID não encontrado.");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao deletar a secretaria! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    deletar
}