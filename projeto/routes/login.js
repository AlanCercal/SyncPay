var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Login/login", {
    title: "SyncPay - Principal",
    icons: "stylesheets/boxicons.min.css",
    layout: "layoutLogin",
  });
});

module.exports = router;
