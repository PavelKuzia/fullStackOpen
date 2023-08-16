require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.static('build'))

morgan.token('content', (req, res) => {
  const request = req.body
  const information = { name: request.name, number: request.number }
  return JSON.stringify(information)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.json())

const cors = require('cors')
app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(people => response.json(people))
})

app.get('/info', (request, response) => {
  Person.find({})
    .then(people => {
      response.send(
        `
        <div>Phonebook has info for ${people.length} people</div>
        <div>${Date()}</div>
        `
      )
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person.length !== 0) response.json(person)
      else response.status(404).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.id = Math.floor(Math.random() * 1000000)
  person.save().then(res => {
    response.json(res)
  })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const person = {
    name: name,
    number: number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(res => {
      response.json(res)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})