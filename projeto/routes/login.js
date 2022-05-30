var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("Login/login", {
    title: "SyncPay - Principal",
    icons: "stylesheets/boxicons.min.css",
    layout: "layoutLogin",
  });
});

module.exports = router;
