const Posts = require('../db_models/posts')
const Users = require('../db_models/users')
const Files = require('../db_models/files')

module.exports = () => {
  Posts.belongsTo(Users, { as: 'author', foreignKey: 'author_id' })
  Users.hasMany(Posts, { as: 'posts', foreignKey: 'author_id' })

  Files.belongsTo(Posts,{as: 'post', foreignKey: 'post_id'})
  Posts.hasMany(Files, { as: 'files', foreignKey: 'post_id' })

  Files.belongsTo(Users,{as: 'author', foreignKey: 'author_id'})
  Users.hasMany(Files, { as: 'files', foreignKey: 'author_id' })
}
