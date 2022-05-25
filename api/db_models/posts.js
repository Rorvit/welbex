const Sequelize = require('sequelize')

class Posts extends Sequelize.Model {
  static initialize(sequelize) {
    Posts.init({
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false
        },
        author_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'users', key: 'id' }
        },
        message: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      {
        sequelize: sequelize,
        paranoid: true,
        modelName: 'Posts',
        tableName: 'posts'
      })
  }
}

module.exports = Posts

