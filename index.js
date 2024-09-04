require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(( req, res, next) => {
  if (['POST', 'GET', 'DELETE'].includes(req.method)) {
    morgan(':method :url :status :res[content-length] - :response-time ms :body')(req, res, next)
  } else {
    next()
  }
})

const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB')

    // Starting the server only after a successful connection
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1) // Exiting the application if the connection fails for some reason
  })

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      const currentDate = new Date()
      const response =
            `<p>Phonebook has info for ${count} people</p>
            <p>${currentDate}</p>`

      res.send(response)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({ error: 'Person not found' })
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  const updatedPerson = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true })
    .then(updatedPerson => {
      if (!updatedPerson) {
        return res.status(404).json({ error: 'Person not found' })
      }
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  //Is name and number already given -check
  if (!body.name ||!body.number) {
    return res.status(400).json({ error: 'Name or number is missing' })
  }

  //Does name already exists in database -check
  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        return res.status(400).json({ error: 'Name already exists, try another' })
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      })

      return person.save()
    })
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

//Handling the unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

//Middleware errorhandling
const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.message === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})