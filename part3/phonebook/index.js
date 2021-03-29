//Phonebook web server

const { response } = require('express')
const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
app.use(morgan('tiny'))

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

const person = {

}

const baseUrl = '/api/persons'

const findInstance = (resource, id) => {
    const instance = resource.find(p => Number(p.id) === Number(id))
    console.log(instance);
    return instance
}

const generateId = (arr) => {
    const maxId = arr.length > 0
        ? Math.max(...arr.map(n => n.id)) : 0
    return maxId + 1
}

const randId = (min, max) => {
    return (Math.random() * (max - min) + min)
}

app.get('/info', (req, res) => {
    res.send(
        `<h3>phonebook has info for ${persons.length} people</h3>
        <h4>${date = new Date()}</h4>`
    )
})

app.get(baseUrl, (req, res) => {
    res.json(persons)
})

app.get(baseUrl + '/:id', (req, res) => {
    const personInstance = findInstance(persons, req.params.id)
    if (personInstance) {
        res.json(personInstance)
    } else {
        res.status(404).end()
    }
})

app.post(baseUrl, (req, res) => {
    const personInstance = req.body
    const dupePerson = persons.find(p => p.name === personInstance.name)
    if (dupePerson) {
        res.status(400).json({
            error: 'Name should be unique'
        })
    } else if (personInstance.name === undefined) {
        res.status(400).json({
            error: 'Missing name field'
        })
    } else if (personInstance.number === undefined) {
        res.status(400).json({
            error: 'Missing number field'
        })
    } else {
        personInstance.id = randId(5, 100)
        persons = persons.concat(personInstance)
        console.log(persons);
    }
})

app.delete(baseUrl + '/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})
