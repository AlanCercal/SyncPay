const { DataTypes } = require('sequelize')

const db = require('../db/conn')

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

module.exports = Cartoes
