const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Aluno = db.define('Aluno', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  matricula: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
})

module.exports = Aluno
