const fs = require('fs')

module.exports = {
  async createFile(file, id) {
    const extension = /[^\\]*\.([\w\d]+)$/.exec(file.name)[1]
    fs.writeFileSync(`${__dirname}/../files/${id}.${extension}`, file.data, {})
  }
}