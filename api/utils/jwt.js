const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
let keyPath = path.join(__dirname, '..', '/', 'keys')
let privateKey = fs.readFileSync(path.join(keyPath, 'jwt_private.key'))
let publicKey = fs.readFileSync(path.join(keyPath, 'jwt_public.key'))


module.exports = {
  signJWT(payload) {
    let token = jwt.sign(payload, privateKey, {algorithm: 'RS256'})
    return token;
  },
  verifyJWT(token) {
    let payload = jwt.verify(token, publicKey, {algorithm: ['RS256']})
    if (!payload) throw new Error('403')
    return payload
  }
}