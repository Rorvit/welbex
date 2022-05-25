const { signJWT, verifyJWT } = require('../utils/jwt')
const { hashPassword, checkPassword } = require('../utils/hash')
const Users = require('../db_models/users')
const { v4 } = require('uuid')

module.exports = {
  async registerUser(req, res) {
    if (!Object.keys(req.body).length) res.send(400, 'Request body is empty')
    if (!req.body.login || !req.body.password || !req.body.nickname) res.send(400, 'Incorrect body')

    let user = await Users.findOne({ where: { login: req.body.login } })
    if (user) return res.send(503, 'this login is already in use')

    await Users.create({
      id: v4(),
      login: req.body.login,
      password: hashPassword(req.body.password),
      nickname: req.body.nickname
    })

    res.send(200, `User ${req.body.login} created`)

  },
  async loginUser(req, res) {
    try {
      if (!Object.keys(req.body).length) res.send(400, 'Request body is empty')
      if (!req.body.login || !req.body.password) res.send(400, 'Incorrect body')

      let user = await Users.findOne({ where: { login: req.body.login } })

      if (!user) return res.send(404, 'user not found')
      if (!checkPassword(req.body.password, user.password)) return res.send(403, 'wrong password')

      let token = signJWT({ id: user.id, nickname: user.nickname })
      let tokenObj = { 'token': token }
      res.send(tokenObj)
    } catch (err) {
      console.log('error: ', err)
    }
  }
}