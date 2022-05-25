const Files = require('../db_models/files')
const { v4 } = require('uuid')
const { createFile } = require('../utils/createFile')
const { verifyJWT } = require('../utils/jwt')

module.exports = {
  async upload(req, res) {
    const body = req.files
    const id = v4()
    let payload = verifyJWT(req.headers.authorization)

    console.log(body.file)

    await Files.create({
      id: id,
      original_name: body.file.name,
      author_id: payload.id
    })

    await createFile(body.file, id)

    res.json({ id: id })
  }
}