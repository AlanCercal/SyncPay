const Carteira = require('../models/Carteira')

module.exports = class CarteiraController {
  static createCarteira(req, res) {
    res.render('carteira/create')
  }

  static createCarteiraSave(req, res) {
    const carteira = {
      nome: req.body.nome,
      id_usuario: req.body.id_usuario,
      id_cartoes: req.body.id_cartoes,
      status: false,
    }

    Carteira.create(carteira)
      .then(res.redirect('/carteiras'))
      .catch((err) => console.log())
  }

  static showCarteiras(req, res) {
    Carteira.findAll({ raw: true })
      .then((data) => {
        let emptyCarteiras = false

        if (data.length === 0) {
          emptyCarteiras = true
        }

        res.render('carteiras/all', { carteiras: data, emptyCarteiras })
      })
      .catch((err) => console.log(err))
  }

  static removeCarteira(req, res) {
    const id = req.body.id

    Carteira.destroy({ where: { id: id } })
      .then(res.redirect('/carteiras'))
      .catch((err) => console.log())
  }

  static updateCarteira(req, res) {
    const id = req.params.id

    Carteira.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('carteiras/edit', { carteira: data })
      })
      .catch((err) => console.log())
  }

  static updateCarteiraPost(req, res) {
    const id = req.body.id

    const carteira = {
      nome: req.body.nome,
      id_usuario: req.body.id_usuario,
      id_cartoes: req.body.id_cartoes,
    }

    Carteira.update(carteira, { where: { id: id } })
      .then(res.redirect('/carteiras'))
      .catch((err) => console.log())
  }

  static changeStatus(req, res) {
    const id = req.body.id

    console.log(req.body)

    const carteira = {
      status: req.body.status === '0' ? true : false,
    }

    console.log(carteira)

    Carteira.update(carteira, { where: { id: id } })
      .then(res.redirect('/carteiras'))
      .catch((err) => console.log())
  }
}
