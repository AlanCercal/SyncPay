const Aluno = require('../models/Aluno')

module.exports = class AlunoController {
  static createAluno(req, res) {
    res.render('alunos/create')
  }

  static createAlunoSave(req, res) {
    const aluno = {
      nome: req.body.nome,
      matricula: req.body.matricula,
      status: false,
    }

    Aluno.create(aluno)
      .then(res.redirect('/alunos'))
      .catch((err) => console.log())
  }

  static showAlunos(req, res) {
    Aluno.findAll({ raw: true })
      .then((data) => {
        let emptyAlunos = false

        if (data.length === 0) {
          emptyAlunos = true
        }

        res.render('alunos/all', { alunos: data, emptyAlunos })
      })
      .catch((err) => console.log(err))
  }

  static removeAluno(req, res) {
    const id = req.body.id

    Aluno.destroy({ where: { id: id } })
      .then(res.redirect('/alunos'))
      .catch((err) => console.log())
  }

  static updateAluno(req, res) {
    const id = req.params.id

    Aluno.findOne({ where: { id: id }, raw: true })
      .then((data) => {
        res.render('alunos/edit', { aluno: data })
      })
      .catch((err) => console.log())
  }

  static updateAlunoPost(req, res) {
    const id = req.body.id

    const aluno = {
      nome: req.body.nome,
      matricula: req.body.matricula,
    }

    Aluno.update(aluno, { where: { id: id } })
      .then(res.redirect('/alunos'))
      .catch((err) => console.log())
  }

  static changeStatus(req, res) {
    const id = req.body.id

    console.log(req.body)

    const aluno = {
      status: req.body.status === '0' ? true : false,
    }

    console.log(aluno)

    Aluno.update(aluno, { where: { id: id } })
      .then(res.redirect('/alunos'))
      .catch((err) => console.log())
  }
}
