const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to ', url)
mongoose.connect(url)
  .then(() => {
    console.log('Connected to mongodb')
  })
  .catch((error) => {
    console.log('Error connecting to mongodb:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'The name must be atleast 3 characters long'],
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(\d{2,3})-\d{5,}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)