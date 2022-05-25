const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const hashKeyPath = path.join(__dirname, '..','keys','hash.key')
let hashKey = fs.readFileSync(hashKeyPath)

function generateSalt() {
  return Math.random().toString(36)
}

module.exports = {
  hashPassword(password){
    let salt  = generateSalt()
    const hashedPassword = crypto.createHash('sha256',hashKey)
      .update(password+salt)
      .digest('hex')
    return salt+'/'+hashedPassword
  },
  checkPassword(passwordToCheck,hash){
    let passwordPart = hash.split('/')[1]
    let saltPart = hash.split('/')[0]
    const hashedPassword = crypto.createHash('sha256',hashKey)
      .update(passwordToCheck+saltPart)
      .digest('hex')
    return hashedPassword === passwordPart
  }
}