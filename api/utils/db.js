const Posts = require('../db_models/posts')
const Users = require('../db_models/users')
const Files = require('../db_models/files')
const setUpAssociations = require('../db_models/setUpAssociations')

function initializeDbModels(sequelize) {
  Users.initialize(sequelize)
  Posts.initialize(sequelize)
  Files.initialize(sequelize)

  setUpAssociations()
}

async function syncDbTables() {
  await Users.sync({ alter: true })
  await Posts.sync({ alter: true })
  await Files.sync({ alter: true })
}

module.exports = {
  initializeDbModels,
  syncDbTables
}