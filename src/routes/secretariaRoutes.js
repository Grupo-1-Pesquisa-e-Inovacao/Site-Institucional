var express = require("express");
var router = express.Router();

var secretariaController = require("../controllers/secretariaController");

router.post("/cadastrar", function (req, res) {
    secretariaController.cadastrar(req, res);
});

router.get("/listar", function (req, res) {
    secretariaController.listar(req, res);
});

router.get("/buscarPorId/:idSecretaria", function (req, res) {
    secretariaController.buscarPorId(req, res);
});

router.put("/atualizar/:idSecretaria", function (req, res) {
    secretariaController.atualizar(req, res);
});

router.delete("/deletar/:idSecretaria", function (req, res) {
    secretariaController.deletar(req, res);
});

module.exports = router;