const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  const userForToken = {
    username: 'JohnS',
    id: '64eb2c5cb2d9e94b4d1b61ce'
  }
  token = jwt.sign(userForToken, process.env.SECRET)
  await Promise.all(promiseArray)
}, 100000)

describe('step 1', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)
})

describe('step 2', () => {
  test('all blogs have an id field', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => expect(blog.id).toBeDefined())
  }, 100000)
})

describe('step 3', () => {
  test('a valid blog post is added', async () => {
    const newBlog = {
      title: 'Testing DB',
      author: 'Me',
      url: 'none',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Testing DB')
  }, 100000)
})

describe('step 4', () => {
  test('missing likes field does not cause problems', async () => {
    const newBlog = {
      title: 'Testing DB',
      author: 'Me',
      url: 'none'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
    expect(response.body.likes).toBe(0)
  }, 100000)
})

describe('step 5', () => {
  test('bad request test: title is missing', async () => {
    const newBlog = {
      author: 'Me',
      url: 'none'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  }, 100000)

  test('bad request test: url is missing', async () => {
    const newBlog = {
      title: 'Testing DB',
      author: 'Me',
      likes: 0
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  }, 100000)
})

describe('deletion of a single blog', () => {
  test('succeeds in deleting the first element', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  }, 100000)
})

describe('update likes of a blog', () => {
  test('valid id test', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const likesAtStart = blogsAtStart[0].likes
    const blogToUpdate = { ...blogsAtStart[0], likes: likesAtStart + 1 }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    expect(response.body.likes).toBe(likesAtStart + 1)
  }, 10000)

  test('unvali id test', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const likesAtStart = blogsAtStart[0].likes
    const blogToUpdate = { ...blogsAtStart[0], likes: likesAtStart + 1 }

    const response = await api
      .put('/api/blogs/false')
      .send(blogToUpdate)
      .expect(400)
  }, 10000)
})

describe('bro, authorize yourself please', () => {
  test('only John Snow might post a new blog post', async () => {
    const newBlog = {
      title: 'Testing DB',
      author: 'Me',
      url: 'none',
      user: '64eb2c5cb2d9e94b4d1b61ce',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})