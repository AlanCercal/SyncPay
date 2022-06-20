const banco = require("../models/Banco");
const carteira = banco[2];
const Cartao = banco[1];
let id_Usuario;
//console.log("\n\n\n", Cartao, "\n\n\n");// para testar os dados

module.exports = class CartaoController {
  static createCartao(req, res) {
    res.render("cartao/create");
  }

  static createCartaoSave(req, res) {
    const cartao = {
      nome: req.body.cartaoNome,
      valorTotal: req.body.cartaoSaldo,
      numcartao: req.body.numcartao,
      cvv: req.body.cvv,
      validade: req.body.validade,
      status: false,
      id_carteira: Number(id_Usuario), // mudar quando tiver o login funcionanado
    };

    Cartao.create(cartao)
      .then(() => {
        res.redirect(301, `/cartoes/user=${id_Usuario}`);
      })
      .catch((err) => console.log());
  }

  static showCartoes(req, res) {
    id_Usuario = Number(req.params.user);
    console.log(isNaN(id_Usuario) + "  " + id_Usuario + "\n\n\n");
    Cartao.findAll({ raw: true, where: { id_carteira: id_Usuario } })
      .then((data) => {
        let emptyCartoes = false;

        if (data.length === 0) {
          emptyCartoes = true;
        }
        res.render("cartoes/cartoes", {
          cartoes: data,
          idUsuario: id_Usuario,
          title: "SyncPay - Cartões",
          style: "/stylesheets/Cartoes.css",
          icons: "stylesheets/boxicons.min.css",
        });
      })
      .catch((err) => console.log(err));
  }

  static removeCartao(req, res) {
    const id = req.body.id;
    const id_Usuario = req.params.user;
    Cartao.destroy({raw:true,  where: { id: id } })
      .then(() =>{
        res.redirect(301, `/cartoes/user=${id_Usuario}`);
      })
      .catch((err) => console.log());
  }

  static updateCartao(req, res) {
    let id = req.params.id;
    let id_Usuario = req.params.user;
    console.log("entrou aqui");
    console.log("\n\n\nentrou aqui - " + req.originalUrl + "\n\n\n\n");
    Cartao.findOne({ where: { id: id } })
      .then((data) => {
        const cartao = {
          nome: req.query.nome,
          numcartao: req.query.numcartao,
          validade: req.query.validade,
          cvv: req.query.cvv,
          valorTotal: req.query.valorTotal,
        };
        console.log(cartao);
        Cartao.update(cartao, { where: { id: id } })
          .then(() => {
            res.redirect(301, `/cartoes/user=${id_Usuario}`);
          })
          .catch((err) => console.log(err));
        //res.render("cartoes/edit", { cartao: data });
      })
      .catch((err) => console.log(err));
  }


  static updateCartaoPost(req, res) {
    // const id = req.body.id;
    // console.log("\n\n\nPOST - " + id + "\n\n\n\n");
    // const cartao = {
    //   nome: req.body.nome,
    //   valorTotal: req.body.valorTotal,
    // };
    // Cartao.update(cartao, { where: { id: id } })
    //   .then(res.redirect("/cartoes"))
    //   .catch((err) => console.log());
  }

  static changeStatus(req, res) {
    const id = req.body.id;

    console.log(req.body);

    const cartao = {
      status: req.body.status === "0" ? true : false,
    };

    console.log(cartao);

    Cartao.update(cartao, { where: { id: id } })
      .then(res.redirect(301,"/cartoes"))
      .catch((err) => console.log());
  }
};
