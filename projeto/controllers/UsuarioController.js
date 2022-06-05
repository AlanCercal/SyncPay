const Usuario = require('../models/Usuario')

module.exports = class UsuarioController {
  static createUsuario(req, res) {
    res.render('usuario/create')
  }

  static createUsuarioSave(req, res) {
    const usuario = {
      nome: req.body.nome,
      cpf: req.body.cpf,
      email: req.body.email,
      senha: req.body.senha,
      status: false,
    }

    Usuario.create(usuario)
      .then(res.redirect('/usuarios'))
      .catch((err) => console.log())
  }

  static showUsuarios(req, res) {
    Usuario.findAll({ raw: true })
      .then((data) => {
        let emptyUsuarios = false

        if (data.length === 0) {
          emptyUsuarios = true
        }

        res.render('usuarios/all', { usuarios: data, emptyUsuarios })
      })
      .catch((err) => console.log(err))
  }

  static removeUsuario(req, res) {
    const id = req.body.id

    Usuario.destroy({ where: { id: id } })
      .then(res.redirect('/usuarios'))
      .catch((err) => console.log())
  }

  static updateUsuario(req, res) {
    const id = req.params.id

    Usuario.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('usuarios/edit', { usuario: data })
      })
      .catch((err) => console.log())
  }

  static updateUsuarioPost(req, res) {
    const id = req.body.id

    const usuario = {
      nome: req.body.nome,
      cpf: req.body.cpf,
      email: req.body.email,
      senha: req.body.senha,
    }

    Usuario.update(usuario, { where: { id: id } })
      .then(res.redirect('/usuarios'))
      .catch((err) => console.log())
  }

  static changeStatus(req, res) {
    const id = req.body.id

    console.log(req.body)

    const usuario = {
      status: req.body.status === '0' ? true : false,
    }

    console.log(usuario)

    Usuario.update(usuario, { where: { id: id } })
      .then(res.redirect('/usuarios'))
      .catch((err) => console.log())
  }
}
