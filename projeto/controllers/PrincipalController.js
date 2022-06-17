const banco = require("../models/Banco");
const Carteira = banco[2];
const Cartao = banco[1];

module.exports = class PrincipalController {
  static showCartoes(req, res) {
    const idUsuario = Number(req.query.id);
    console.log(idUsuario, "----", req.query, "\n\n\n");
    Cartao.findAll({ raw: true, where: { id_carteira: idUsuario } }).then(
      (data1) => {
        Carteira.findOne({ raw: true, Where: { id_usuario: idUsuario } })
          .then((data2) => {
            let emptyCartoes = false;
            if (data1.length === 0) {
              emptyCartoes = true;
            }

            let soma = 0;
            data1.forEach((element) => {
              soma += element.valorTotal;
            });
            let somaTotal = soma + data2.valor;
            res.render("principal/principal", {
              soma: somaTotal,
              somaCredito: soma,
              somaDebito: data2.valor,
              cartoes: data1,
              idUsuario: idUsuario,
              title: "SyncPay - Principal",
              style: "/stylesheets/Principal.css",
              icons: "stylesheets/boxicons.min.css",
            });
          })
          .catch((err) => console.log(err));
      }
    );
  }
};
