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

router.get("/findAllEstados", (req, res) => {
  dashboardController.findAllEstados(req, res);
});

router.get("/getKPIsPorEstado", function (req, res) {
  dashboardController.getKPIsPorEstado(req, res);
});

router.get("/municipios", function (req, res) {
  dashboardController.getMunicipiosMenoresMedias(req, res);
});

router.get("/mediaAno", function (req, res) {
  dashboardController.getMediaAnoPorEstado(req, res);
});




module.exports = router;