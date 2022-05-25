const {Router} = require('express')

const blogController = require('../controllers/blog')

const router = Router()

router.get('/', blogController.getPosts)
router.post('/',blogController.addPost)
router.delete('/',blogController.deletePost)
router.put('/',blogController.updatePost)

module.exports = router