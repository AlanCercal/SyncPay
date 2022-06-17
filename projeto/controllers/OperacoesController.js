const Banco = require("../models/Banco");
const Operacao = Banco[3];
const Cartao = Banco[1];
const Carteira = Banco[2];
let idUsuario;

function modificarValor(idIni, idDest, valor, res) {
  Carteira.findOne({ raw: true, where: { id: idIni } }).then((dataIni) => {
    Carteira.findOne({ raw: true, where: { id: idDest } }).then((dataDest) => {
      dataIni.valor -= Number(valor);
      dataDest.valor += Number(valor);
      Carteira.update(dataIni, { where: { id: idIni } }).then(() =>
        Carteira.update(dataDest, { where: { id: idDest } }).then(() =>
          res.redirect(301, "/pagamentos")
        )
      );
    });
  });
}

module.exports = class OperacaoController {
  static createOperacao(req, res) {
    res.render("operacao/create");
  }

  static createOperacaoSave(req, res) {
    Carteira.findOne({
      raw: true,
      where: { id: req.body.idCarteira },
    })
      .then((data) => {
        const operacaoIda = {
          descricao: `para ${data.nome}`,
          valor: -req.body.valorTransf,
          status: false,
          id_carteira: idUsuario, // mudar quando tiver o login funcionando
        };
        const operacaoVolta = {
          descricao: `recebido de ${data.nome}`, // mudar depois
          valor: req.body.valorTransf,
          status: false,
          id_carteira: req.body.idCarteira, // mudar quando tiver o login funcionando
        };
        Operacao.create(operacaoIda)
          .then(
            Operacao.create(operacaoVolta)
              .then(
                modificarValor(idUsuario, data.id, req.body.valorTransf, res)
              )
              .catch((err) => console.log(err))
          )
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  static showOperacoes(req, res) {
    let valor = 0;
    let valorTotal = 0;
    idUsuario = Number(req.query.id);
    Cartao.findAll({ raw: true, where: { id_carteira: idUsuario } }).then(
      (data) => {
        data.forEach((element) => {
          valorTotal += element.valorTotal;
        });
      }
    );
    Carteira.findOne({ raw: true, where: { id: idUsuario } }).then((data) => {
      valor = data.valor;
    });

    Operacao.findAll({ raw: true, where: { id_carteira: idUsuario } })
      .then((data) => {
        let emptyOperacoes = false;
        if (data.length === 0) {
          emptyOperacoes = true;
        }
        res.render("pagamentos/pagamentos", {
          soma: valor,
          somaCartao: valorTotal,
          operacoes: data,
          idUsuario: idUsuario,
          title: "SyncPay - Pagamentos",
          style: "/stylesheets/Pagamentos.css",
        });
      })
      .catch((err) => console.log(err));
  }

  static removeOperacao(req, res) {
    const id = req.body.id;

    Operacao.destroy({ where: { id: id } })
      .then(res.redirect("/pagamentos"))
      .catch((err) => console.log());
  }

  static updateOperacao(req, res) {
    const id = req.params.id;

    Operacao.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        const transacao = {
          descricao: req.body.descricao,
          valor: req.body.valor,
        };
        Operacao.update(transacao, { where: { id: id } })
          .then(res.redirect("/pagamentos"))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  static updateOperacaoPost(req, res) {
    const id = req.body.id;

    const operacao = {
      descricao: req.body.descricao,
      valor: req.body.valor,
    };

    Operacao.update(operacao, { where: { id: id } })
      .then(res.redirect("/pagamentos"))
      .catch((err) => console.log());
  }

  static changeStatus(req, res) {
    const id = req.body.id;

    //console.log(req.body);

    const operacao = {
      status: req.body.status === "0" ? true : false,
    };

    //console.log(operacao);

    Operacao.update(operacao, { where: { id: id } })
      .then(res.redirect("/pagamentos"))
      .catch((err) => console.log());
  }
};
