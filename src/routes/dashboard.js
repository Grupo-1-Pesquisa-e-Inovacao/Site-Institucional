var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/kpis", function (req, res) {
    dashboardController.getKPIs(req, res);
});

router.get("/chart1", (req, res) => {
    dashboardController.getChart1(req, res);
});

router.get("/chart2", (req, res) => {
    dashboardController.getChart2(req, res);
});

router.get("/distribuicao", (req, res) => {
    dashboardController.getDistribuicaoNotas(req, res);
});

router.get("/buscarEstados", (req, res) => {
    dashboardController.buscarEstados(req, res);
});

module.exports = router;