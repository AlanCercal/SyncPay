const express = require("express");
const router = express.Router();
//const passport = require("passport");

const LoginController = require("../controllers/LoginController");

router.get("/", function (req, res, next) {
  console.log("ENTORU NO GET\n\n\n\n");
  res.render("Login/login", {
    title: "SyncPay - Login",
    layout: "layoutLogin",
  });
});

router.get("/cadastro", function (req, res, next) {
  res.render("Login/cadastro", {
    title: "SyncPay - Cadastro",
    layout: "layoutLogin",
  });
});

router.post("/login", LoginController.verificarLogin);
router.post("/cadastro", LoginController.verificarCadastro);

module.exports = router;
