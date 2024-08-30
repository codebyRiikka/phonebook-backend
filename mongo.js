require('dotenv').config();
const mongoose = require('mongoose');

const password = process.env.MONGODB_PASSWORD
const name = process.argv[2]
const number = process.argv[3]

if (!password) {
    console.log('Provide the password in the .env-file');
    process.exit(1)
}

const url = `mongodb+srv://rixuuu95:${password}@clustertest.v8xd5.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!name || !number) {
    Person.find({}).then(resutl => {
        console.log('Phonebook: ');
        resutl.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name,
        number,
    })

    person.save().then(() => {
        console.log(`added ${name} number ${number} to  the phonebook`);
        mongoose.connection.close();
    })
}