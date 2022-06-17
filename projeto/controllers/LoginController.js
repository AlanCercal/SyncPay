const banco = require("../models/Banco");
const Usuarios = banco[0];

module.exports = class LoginController {
  static verificarLogin(req, res) {
    let erro = null;
    console.log(req.body.email, req.body.senha, "\n\n\n");
    if (req.body.email && req.body.senha) {
      Usuarios.findOne({
        raw: true,
        where: { email: req.body.email },
      }).then((data) => {
        //console.log(data);
        if (data) {
          if (req.body.senha === data.senha) res.redirect("/?id=" + data.id);
          else erro = "SENHA incorreta!!!!           Tente outra senha";
        } else erro = "EMAIL não encontrado!!!!           Tente outro email";
        res.render("Login/login", {
          title: "SyncPay - Login",
          layout: "layoutLogin",
          error: erro,
        });
      });
    }
  }
};
