const {Router} = require('express')
const {checkAuth} = require('../utils/authorization')
const authController = require('../controllers/auth')
const uploadController = require('../controllers/upload')

const router = Router()

router.use('/blog',checkAuth)
router.use('/blog',require('./blog'))
router.use('/upload',checkAuth)
router.post('/upload',uploadController.upload)
router.use('/login',authController.loginUser)
router.use('/register',authController.registerUser)

module.exports = router