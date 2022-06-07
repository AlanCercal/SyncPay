const Banco = require("../models/Banco");
const Operacao = Banco[3];

module.exports = class OperacaoController {
  static createOperacao(req, res) {
    res.render("operacao/create");
  }

  static createOperacaoSave(req, res) {
    const operacao = {
      descricao: req.body.descricao,
      valor: req.body.valor,
      status: false,
      id_carteira: "1", // mudar quando tiver o login funcionando
    };

    Operacao.create(operacao)
      .then(res.redirect("/pagamentos"))
      .catch((err) => console.log());
  }

  static showOperacoes(req, res) {
    Operacao.findAll({ raw: true, where: { id_carteira: "1" }, })
      .then((data) => {
        let emptyOperacoes = false;

        if (data.length === 0) {
          emptyOperacoes = true;
        }
        res.render("pagamentos/pagamentos", {
          operacoes: data,
          title: "SyncPay - Pagamentos",
          style: "stylesheets/Pagamentos.css",
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
