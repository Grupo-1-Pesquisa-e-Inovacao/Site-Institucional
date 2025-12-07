const e = require("express");
var slackModel = require("../models/slackModel");

function findStatus(req, res) {
    slackModel.findStatus()
        .then(response => {
            if (!response || response.length === 0) {
                // Se não houver nada, retorna desligado
                return res.status(200).json({ ligado: false });
            }
            // Supondo que o model retorne algo como [{ ligado: 1 }]
            const ligado = response[0].ligado === 1 || response[0].ligado === true;
            return res.status(200).json({ ligado });
        })
        .catch(erro => {
            console.log("Houve um erro ao encontrar status do Slack", erro);
            res.status(500).send("Erro ao buscar status do Slack.");
        });
}

function updateStatus(req, res) {
    const id = req.params.id;
    let estado = req.params.estado;

    // Converte string para boolean se vier "true"/"false"
    if (estado === 'true') estado = true;
    else if (estado === 'false') estado = false;

    slackModel.updateStatus(id , estado)
        .then(() => {
            res.status(200).json({ message: 'Status atualizado.' });
        })
        .catch(err => {
            console.error('Erro ao atualizar status Slack:', err);
            res.status(500).json({ erro: 'Erro ao atualizar status Slack.' });
        });
}

module.exports = {
    findStatus,
    updateStatus,
}