const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.zsaza.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

const saveDoc = () => person.save().then(res => {
    console.log('person saved!');
    mongoose.connection.close()
})

const fetchCollection = () => {
    Person.find({}).then(res => {
        res.forEach(p => console.log(p.name, p.number))
        mongoose.connection.close()
    })
}

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
} else if (process.argv.length < 4) {
    fetchCollection()
} else {
    saveDoc()
}

