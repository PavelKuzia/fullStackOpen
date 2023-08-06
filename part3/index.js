const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('content', (req, res) => {
  const request = req.body
  const information = {name: request.name, number: request.number} 
  return JSON.stringify(information)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.json())

const cors = require('cors')
app.use(cors())


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
      "id": 5,
      "name": "John Snow", 
      "number": "39-23-6423132"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {    
    response.send(
        `
        <div>Phonebook has info for ${persons.length} people</div>
        <div>${Date()}</div>
        `
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)    
    if (person) response.json(person)
    else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    if (!person.name || !person.number) {
        return response.status(400).json({error: 'The name or number is missing'})
    } else if (persons.find(p => p.name === person.name)) {
        return response.status(400).json({error: 'The name already exists in the phonebook'})
    }
    person.id = Math.floor(Math.random() * 1000000)
    persons = persons.concat(person)
    response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})