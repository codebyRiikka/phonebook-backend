require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI
const name = process.argv[2]
const number = process.argv[3]


mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to mongodb');

        if (!name || !number) {
            return Person.find({})
        } else {
            const person = new Person({
                name,
                number,
            })
            return person.save()
        }
    })
    .then (result => {
        if (Array.isArray(result)) {
            console.log('Phonebook:');
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            })
        } else {
            console.log(`Added ${name} number ${number} to the phonebook`);
        }
    })
    .catch(error => {
        console.error('Error: ', error.message);
    })
    .finally(() => {
        mongoose.connection.close();
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)