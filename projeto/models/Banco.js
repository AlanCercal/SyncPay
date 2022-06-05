const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Usuario = db.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  senha: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
})

const Cartoes = db.define('Cartoes', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valorTotal: {
    type: DataTypes.FLOAT,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
})

const Carteira = db.define('Carteira', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
  },
  id_cartoes: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
})

const Operacoes = db.define('Operacoes', {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
})

module.exports = Usuario, Cartoes, Carteira, Operacoes
