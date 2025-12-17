var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/findAllCommonUsers", function(req, res){
    usuarioController.findAllCommonUsers(req, res);
});

router.get("/findAllAdminUsers", function(req, res){
    usuarioController.findAllAdminUsers(req, res);
});

router.get("/findById/:id", function(req, res) {
    usuarioController.findById(req, res);
});

router.delete("/deleteById/:id", function(req, res) {
    usuarioController.deleteById(req, res);
});

router.put("/update/:id", function(req, res) {
    usuarioController.updateById(req, res);
});

router.post("/cadastrarAdmin", function (req, res) {
    usuarioController.cadastrarAdmin(req, res);
});

module.exports = router;