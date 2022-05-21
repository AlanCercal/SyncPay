const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('crud', 'Erudhir', 'fxqR4fsqzc*6eTtZp83F6i%6Pi5N5Gt9MPLVNg&t', {
  host: 'localhost',
  dialect: 'mysql',
})

try {
  sequelize.authenticate()
  console.log('Conectamos com o Sequelize!')
} catch (error) {
  console.error('Não foi possível conectar:', error)
}

module.exports = sequelize
