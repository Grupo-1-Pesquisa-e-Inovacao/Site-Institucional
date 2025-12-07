var express = require("express");
var router = express.Router();

var slackController= require("../controllers/slackController");

router.get("/status/:id", function (req, res) {
    slackController.findStatus(req, res);
})

router.put("/update/:id/:estado", function (req, res) {
    slackController.updateStatus(req, res);
});

module.exports = router;
