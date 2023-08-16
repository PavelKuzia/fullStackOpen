const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB Atlas')

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: [3, 'Too short of a name'],
      required: true
    },
    number: {
      type: String,
      minLength: [8, 'Bro, it is not a real number'],
      validate: {
        validator: v => /^\d{2,3}-\d+$/.test(v),
        message: props => `${props.value} is not a valid phone number!`
      }
    }, 
    id: Number
})
  
personSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)