const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const countPersons = persons.length
    const currentDate = new Date()
    const response = 
    `<p>Phonebook has info for ${countPersons} people</p>
    <p>${currentDate}</p>`

    res.send(response)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const pNumber = persons.find(person => person.id === id)

    if (pNumber) {
        res.json(pNumber)
    } else {
        res.status(404).json({ error: 'Person not found' })
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    //Is name and number already given -check
    if (!body.name ||!body.number) {
        return res.status(400).json({ error: 'Name or number is missing' })
    }

    //Does name already exists -check
    const nameExists = persons.some(person => person.name === body.name)
    if (nameExists) {
        return res.status(400).json({ error: 'Name already exists, try another' })
    }

    //Creating a new person
    const newPerson = {
        id: Math.floor(Math.random() * 10000), 
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)

    res.json(newPerson)

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})