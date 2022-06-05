const { DataTypes } = require('sequelize')

const db = require('../db/conn')

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

module.exports = Operacoes 
