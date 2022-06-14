const banco = require("../models/Banco");
const Carteira = banco[2];
const Cartao = banco[1];
const idUsuario = 1;
//console.log("\n\n\n", Cartao, "\n\n\n");// para testar os dados

module.exports = class PrincipalController {
  static showCartoes(req, res) {
    Cartao.findAll({ raw: true, where: { id_carteira: idUsuario } }).then(
      (data1) =>{ 
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
            console.log(data2);
            //console.log(data, "\n\n\n");
            res.render("principal/principal", {
              soma: somaTotal,
              somaCredito: soma,
              somaDebito: data2.valor,
              cartoes: data1,
              title: "SyncPay - Principal",
              style: "stylesheets/Principal.css",
              icons: "stylesheets/boxicons.min.css",
            });
          })
          .catch((err) => console.log(err))
        });
  }
};
