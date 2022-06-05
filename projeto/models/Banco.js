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


Carteira.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "usuarios",
});

// Carteira.hasMany(Cartoes, { as: "cartoes" });
Cartoes.belongsTo(Carteira, {
  foreignKey: "id_carteira",
  as: "carteira",
});


// Carteira.hasMany(Operacoes, { as: "operacoes" });
Operacoes.belongsTo(Carteira, {
  foreignKey: "id_carteira",
  as: "carteira",
});

module.exports = Usuario, Cartoes, Carteira, Operacoes
