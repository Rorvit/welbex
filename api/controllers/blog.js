const Posts = require('../db_models/posts')
const Users = require('../db_models/users')
const Files = require('../db_models/files')
const Sequelize = require('sequelize')
const { v4 } = require('uuid')
const { verifyJWT } = require('../utils/jwt')

module.exports = {
  async getPosts(req, res, next) {
    try {
      let posts = await Posts.findAll({
        attributes: ['message', 'createdAt', 'id'],
        include: [{
          model: Users,
          as: 'author',
          attributes: ['nickname', 'id'],
          required: true
        },
          {
            model: Files,
            as: 'files',
            attributes: ['original_name', 'id']
          }]
      })

      //get plain js object from sequelize model
      posts = posts.map(el => el.get({ plain: true }))

      posts.forEach((post) => {
        post.files = post.files.map((file) => {
          const extension = /[^\\]*\.([\w\d]+)$/.exec(file.original_name)[1]
          return `/files/${file.id}.${extension}`
        })
      })

      res.send(posts)
    } catch (err) {
      console.log('error: ', err)
    }
  },
  async addPost(req, res, next) {
    try {
      if (!Object.keys(req.body).length) res.send(400, 'Request body is empty')
      if (!req.body.message || !req.body.files_id) res.send(400, 'Incorrect body')

      const post_id = v4()

      let payload = verifyJWT(req.headers.authorization)

      const data = {
        'author_id': payload.id,
        'message': req.body.message
      }

      await Posts.create({
        id: post_id,
        author_id: data.author_id,
        message: data.message
      })

      const updates = []

      req.body.files_id.forEach((file_id) => {
        updates.push(Files.update(
          {
            post_id: post_id
          },
          {
            where: { id: file_id }
          }
          )
        )
      })

      await Promise.all(updates)

      res.send(200, data)
    } catch (err) {
      console.log('error: ', err)
    }
  },
  async deletePost(req, res) {
    if (!Object.keys(req.body).length) res.send(400, 'Request body is empty')
    if (!req.body.id) res.send(400, 'Incorrect body')
    let payload = verifyJWT(req.headers.authorization)
    let post = await Posts.findByPk(req.body.id)
    if (!post) res.send(404, `Post with id ${req.body.id} not found`)
    if (post.author_id === payload.id) {
      await Posts.destroy({
        where: {
          id: req.body.id
        }
      })
      res.send(200, `Post was deleted`)
    }
    res.send(403)
  },
  async updatePost(req, res) {
    if (!Object.keys(req.body).length) res.send(400, 'Request body is empty')
    if (!req.body.id || !req.body.message) res.send(400, 'Incorrect body')
    let payload = verifyJWT(req.headers.authorization)
    let post = await Posts.findByPk(req.body.id)
    if (!post) res.send(404, `Post with id ${req.body.id} not found`)
    if (post.author_id === payload.id) {
      await Posts.update(
        {
          message: req.body.message
        },
        {
          where: { id: req.body.id }
        }
      )
      res.send(200)
    } else res.send(403)
  }

}