//Phonebook web server

require('dotenv').config()
const { response } = require('express')
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        console.log(JSON.stringify(req.body))
    ].join(' ')
}))

const baseUrl = '/api/persons'

app.get('/info', (req, res) => {
    res.send(
        `<h3>phonebook has info for ${persons.length} people</h3>
        <h4>${date = new Date()}</h4>`
    )
})

app.get(baseUrl, (req, res) => {
    Person.find({}).then(p => res.json(p))
})

app.get(baseUrl + '/:id', (req, res) => {
    Person.findById(req.params.id).then(p => res.json(p))
})

app.post(baseUrl, (req, res) => {
    const instance = req.body
    if (instance === undefined) {
        return res.status(400).json({ error: 'content missing' })
    } else {
        const person = new Person({
            name: instance.name,
            number: instance.number
        })
        person.save().then(savedPerson => res.json(savedPerson))
    }
})

app.delete(baseUrl + '/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

