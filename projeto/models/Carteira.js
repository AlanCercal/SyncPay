const { DataTypes } = require('sequelize')

const db = require('../db/conn')

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

module.exports = Carteira
