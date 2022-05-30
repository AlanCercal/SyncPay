var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("principal/principal", {title: 'SyncPay - Principal', style: 'stylesheets/Principal.css', icons: 'stylesheets/boxicons.min.css'});
});

module.exports = router;
