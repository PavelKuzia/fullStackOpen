const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')
const middleware = require('../utils/middleware')

// routes with async/await
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (blog) response.json(blog)
  else response.status(404).end()
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body

  if (!body.title || !body.url || !body.author) {
    return response.status(400).send('Please provide all required information')
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user.id
  })

  const savedBlog = await blog.save()

  request.user.notes = request.user.notes.concat(savedBlog._id)
  await request.user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(400).json({ error: 'blog post is not found' })

  if (blog.user.toString() === request.user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
  } else {
    return response.status(401).json({ error: 'user is not authorized' })
  }
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(blog)
})

module.exports = blogsRouter