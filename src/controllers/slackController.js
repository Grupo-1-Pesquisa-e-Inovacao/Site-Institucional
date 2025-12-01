var slackModel = require("../models/slackModel");

function findAll(req, res) {
    slackModel.findAll()
        .then(response => {
            if (!response || response.length === 0) {
                return res.status(200).json([]);
            }
            return res.status(200).json(response);
        })
        .catch(erro => {
            console.log("Houve um erro ao encontrar canais slack", erro);
            res.status(500).send("Erro ao buscar canais slack.");
        });
}

function updateStatus(req, res) {
    var id = req.params.id;
    var ligado = req.body.ligado;

    if (typeof id === 'undefined' || typeof ligado === 'undefined') {
        return res.status(400).send('Parâmetros inválidos.');
    }

    slackModel.updateStatus(id, ligado)
        .then(result => {
            return res.status(200).json({ message: 'Status atualizado.' });
        })
        .catch(err => {
            console.log('Erro ao atualizar status Slack:', err);
            return res.status(500).send('Erro ao atualizar status Slack.');
        });
}

function deleteById(req, res) {
    var id = req.params.id;
    if (typeof id === 'undefined') return res.status(400).send('ID inválido.');

    slackModel.deleteById(id)
        .then(result => {
            return res.status(200).json({ message: 'Canal deletado.' });
        })
        .catch(err => {
            console.log('Erro ao deletar canal Slack:', err);
            return res.status(500).send('Erro ao deletar canal Slack.');
        });
}
module.exports = {
    findAll,
    updateStatus,
    deleteById
}