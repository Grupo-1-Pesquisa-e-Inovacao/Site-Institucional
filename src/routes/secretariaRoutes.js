var express = require("express");
var router = express.Router();

var secretariaController = require("../controllers/secretariaController");

//Recebendo os dados do html e direcionando para a função cadastrar de secretariaController.js
router.post("/cadastrar", function (req, res) {
    secretariaController.cadastrar(req, res);
})

router.get("/listar", function (req, res) {
    secretariaController.listar(req, res);
});

router.get("/buscarPorId", function (req, res) {
    secretariaController.buscarPorId(req, res);
});

router.patch("/atualizar", function (req, res) {
    secretariaController.atualizar(req, res);
});

router.delete("/deletar", function (req, res) {
    secretariaController.deletar(req, res);
});

module.exports = router;