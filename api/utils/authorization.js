const {verifyJWT} = require('../utils/jwt')

module.exports = {
  checkAuth(req,res,next){
    try {
      verifyJWT(req.headers.authorization)
      next()
    }
    catch (e){
      return res.sendStatus(401)
    }
  }
}