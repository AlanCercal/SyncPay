const banco = require("../models/Banco");
const carteira = banco[2];
const Cartao = banco[1];

console.log("\n\n\n", Cartao, "\n\n\n");

module.exports = class CartaoController {
  static createCartao(req, res) {
    res.render("cartao/create");
  }

  static createCartaoSave(req, res) {
    const cartao = {
      nome: req.body.nome,
      valorTotal: req.body.valorTotal,
      status: false,
    };

    Cartao.create(cartao)
      .then(res.redirect("/cartoes"))
      .catch((err) => console.log());
  }

  static showCartoes(req, res) {
    Cartao.findAll({ raw: true, where: { id_carteira: "1" } })
      .then((data) => {
        let emptyCartoes = false;

        if (data.length === 0) {
          emptyCartoes = true;
        }
        console.log(data, "\n\n\n");
        res.render("cartoes/cartoes", {
          cartoes: data,
          title: "SyncPay - Cartões",
          style: "stylesheets/Cartoes.css",
        });
      })
      .catch((err) => console.log(err));
  }

  static removeCartao(req, res) {
    const id = req.body.id;

    Cartao.destroy({ where: { id: id } })
      .then(res.redirect("/cartoes"))
      .catch((err) => console.log());
  }

  static updateCartao(req, res) {
    const id = req.params.id;

    Cartao.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render("cartoes/edit", { cartao: data });
      })
      .catch((err) => console.log());
  }

  static updateCartaoPost(req, res) {
    const id = req.body.id;

    const cartao = {
      nome: req.body.nome,
      valorTotal: req.body.valorTotal,
    };

    Cartao.update(cartao, { where: { id: id } })
      .then(res.redirect("/cartoes"))
      .catch((err) => console.log());
  }

  static changeStatus(req, res) {
    const id = req.body.id;

    console.log(req.body);

    const cartao = {
      status: req.body.status === "0" ? true : false,
    };

    console.log(cartao);

    Cartao.update(cartao, { where: { id: id } })
      .then(res.redirect("/cartoes"))
      .catch((err) => console.log());
  }
};
