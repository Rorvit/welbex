const Sequelize = require('sequelize')

class Files extends Sequelize.Model{
  static initialize(sequelize) {
    Files.init({
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false
        },
        original_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        post_id: {
          type: Sequelize.UUID,
          references: { model: 'posts', key: 'id' }
        },
        author_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'users', key: 'id' }
        }
      },
      {
        sequelize: sequelize,
        modelName: 'Files',
        tableName: 'files'
      })
  }
}

module.exports = Files

