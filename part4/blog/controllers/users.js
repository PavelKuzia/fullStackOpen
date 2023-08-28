const UsersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

UsersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    const err = new Error()
    err.message = 'password is too short'
    err.name = 'InvalidPassword'
    next(err)
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

UsersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('notes', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

module.exports = UsersRouter