var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("cartoes/cartoes", {
    title: "SyncPay - Cartões",
    style: "stylesheets/Cartoes.css",
  });
});

module.exports = router;
