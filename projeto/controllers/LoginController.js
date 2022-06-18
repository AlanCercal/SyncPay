const banco = require("../models/Banco");
const Usuarios = banco[0];
const Carteira = banco[2];

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
          if (req.body.senha === data.senha) res.redirect("/user=" + data.id);
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

  static verificarCadastro(req, res, next) {
    let erro = null;
    let localErro = null;
    console.log(req.body);
    if (!req.body.email) localErro = "EMAIL";
    if (!req.body.nome) localErro = "NOME";
    if (!req.body.cpf) localErro = "CPF";
    erro = `${localErro} vazio!!!!       coloque um valor de ${localErro}`;
    if (req.body.senha !== req.body.senhaRep)
      erro = "SENHA incorreta!!!!           Tente outra senha";
    if (localErro) {
      res.render("Login/cadastro", {
        title: "SyncPay - Cadastro",
        layout: "layoutLogin",
        error: erro,
      });
    } else {
      let usuario = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        senha: req.body.senha,
      };
      Usuarios.create(usuario).then((user) => {
        let carteira = {
          id: user.id,
          nome: `carteira_${usuario.nome}`,
          id_usuario: user.id,
          status: 0,
          valor: 0,
        };
        Carteira.create(carteira).then(() => {
          res.redirect(301, `/user=${user.id}`);
        });
      });
    }
  }
};
