var express = require("express");
var router = express.Router();

var slackController= require("../controllers/slackController");

router.get("/findAll", function (req, res) {
    slackController.findAll(req, res);
})

router.put("/update/:id", function (req, res) {
    slackController.updateStatus(req, res);
});

router.delete("/delete/:id", function (req, res) {
    slackController.deleteById(req, res);
});

module.exports = router;
