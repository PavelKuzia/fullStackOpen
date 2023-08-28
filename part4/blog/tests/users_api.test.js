const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')


beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
}, 100000)


describe('test invalid user', () => {
  test('short username', async () => {
    const user = {
      username: 'a',
      name: 'Alex',
      password: '12345'
    }
    const response = await api
      .post('/api/users')
      .send(user)
    expect(response.status).toBe(400)
    expect(response.body.error).toMatch(/username length should be at least 3/)
  }, 100000)

  test('absent username', async () => {
    const user = {
      name: 'Alex',
      password: '12345'
    }
    const response = await api
      .post('/api/users')
      .send(user)
    expect(response.status).toBe(400)
    expect(response.body.error).toMatch(/username is a required field/)
  }, 100000)

  test('not unique username', async () => {
    const user = {
      username: 'EddardS',
      name: 'Eddard Snow',
      password: 'de3e3dd'
    }
    const response = await api
      .post('/api/users')
      .send(user)
    expect(response.status).toBe(400)
    expect(response.body.error).toMatch(/username must be unique/)
  }, 100000)

  test('invalid password', async () => {
    const user = {
      username: 'Alexander',
      name: 'Alex',
      password: '1'
    }
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  }, 100000)
})