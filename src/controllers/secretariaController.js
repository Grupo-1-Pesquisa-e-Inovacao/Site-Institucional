var secretariaModel = require("../models/secretariaModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var tipo = req.body.tipoServer;

    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("O tipo está undefined!");
    } else {
        secretariaModel.cadastrar(nome, tipo)
            .then(
                function (resultado) {
                    res.status(201).json(resultado);
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
    var tipo = req.body.tipoServer;
    var idSecretaria = req.params.idSecretaria;

    if (idSecretaria == undefined) {
        res.status(400).send("O ID da Secretaria é obrigatório para atualização!");
        return;
    }

    if (nome == undefined && tipo == undefined) {
        res.status(400).send("Pelo menos um dado (nome ou tipo) deve ser enviado para atualização!");
        return;
    }

    secretariaModel.atualizar(idSecretaria, nome, tipo)
        .then(
            function (resultado) {
                if (resultado.affectedRows > 0) {
                    res.json(resultado);
                } else {
                    res.status(404).send("Nenhum registro atualizado. ID não encontrado.");
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