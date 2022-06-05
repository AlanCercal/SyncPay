const Operacao = require('../models/Banco')

module.exports = class OperacaoController {
  static createOperacao(req, res) {
    res.render('operacao/create')
  }

  static createOperacaoSave(req, res) {
    const operacao = {
      descricao: req.body.descricao,
      valor: req.body.valor,
      status: false,
    }

    Operacao.create(operacao)
      .then(res.redirect('/operacoes'))
      .catch((err) => console.log())
  }

  static showOperacoes(req, res) {
    Operacao.findAll({ raw: true })
      .then((data) => {
        let emptyOperacoes = false

        if (data.length === 0) {
          emptyOperacoes = true
        }

        res.render('operacoes/all', { operacoes: data, emptyOperacoes })
      })
      .catch((err) => console.log(err))
  }

  static removeOperacao(req, res) {
    const id = req.body.id

    Operacao.destroy({ where: { id: id } })
      .then(res.redirect('/operacoes'))
      .catch((err) => console.log())
  }

  static updateOperacao(req, res) {
    const id = req.params.id

    Operacao.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('operacoes/edit', { operacao: data })
      })
      .catch((err) => console.log())
  }

  static updateOperacaoPost(req, res) {
    const id = req.body.id

    const operacao = {
      descricao: req.body.descricao,
      valor: req.body.valor,
    }

    Operacao.update(operacao, { where: { id: id } })
      .then(res.redirect('/operacoes'))
      .catch((err) => console.log())
  }

  static changeStatus(req, res) {
    const id = req.body.id

    console.log(req.body)

    const operacao = {
      status: req.body.status === '0' ? true : false,
    }

    console.log(operacao)

    Operacao.update(operacao, { where: { id: id } })
      .then(res.redirect('/operacoes'))
      .catch((err) => console.log())
  }
}
