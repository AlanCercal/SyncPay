const banco = require("../models/Banco");
const carteira = banco[2];
const Cartao = banco[1];

//console.log("\n\n\n", Cartao, "\n\n\n");// para testar os dados

module.exports = class PrincipalController {

  static showCartoes(req, res) {
    Cartao.findAll({ raw: true, where: { id_carteira: "1" } })
      .then((data) => {
        let emptyCartoes = false;

        if (data.length === 0) {
          emptyCartoes = true;
        }

        let soma = 0;
        data.forEach(element => {
           soma += element.valorTotal;
        });

        //console.log(data, "\n\n\n");
        res.render("principal/principal", {
          soma:soma,
          cartoes: data,
          title: "SyncPay - Principal",
          style: "stylesheets/Principal.css",
          icons: "stylesheets/boxicons.min.css",
        });
      })
      .catch((err) => console.log(err));
  }

};
