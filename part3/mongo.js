
const mongoose = require('mongoose')

let savePerson = false

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
} else if (process.argv.length === 4) {
    console.log('Username and password should be provided')
    process.exit(1)
} else if (process.argv.length === 5) {
    savePerson = true
    var username = process.argv[3]
    var phone = process.argv[4]
    var id = Math.floor(Math.random() * 1000000)
}

const password = process.argv[2]

const url =
  `mongodb+srv://testuser:${password}@cluster0.nmqh7bq.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

const Person = mongoose.model('Person', personSchema)

if (savePerson) {
    const person = new Person({
    name: username,
    number: phone,
    id: id
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(note => {
        console.log(note)
  })
  mongoose.connection.close()
})
}


