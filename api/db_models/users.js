const Sequelize = require('sequelize')

class Users extends Sequelize.Model{
  static initialize(sequelize) {
    Users.init({
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false
        },
        login: {
          type: Sequelize.STRING,
          allowNull: false,
          uniqueKey: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      {
        sequelize: sequelize,
        modelName: 'Users',
        tableName: 'users'
      })
  }
}

module.exports = Users

