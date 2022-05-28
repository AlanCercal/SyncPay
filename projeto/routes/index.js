var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("principal/all", {title: 'SyncPay - Principal', style: 'stylesheets/Principal.css', icons: 'stylesheets/boxicons.min.css'});
});

router.post("/", function (req, res, next) {
  console.log(req.body.typeEmailX);
  console.log(req.body.typePasswordX);
  if (
    req.body.typeEmailX === "gab@gmail.com" &&
    req.body.typePasswordX === "123"
  ) {
    console.log("login aceito");
    res.render("index", {
      title: "formulário entregue",
      email: req.body.typeEmailX,
      senha: req.body.typePasswordX,
    });
  } else {
    res.render("error", {
      message: "FOI ENCONTRADO UM ERRO",
    });
  }
});

module.exports = router;
