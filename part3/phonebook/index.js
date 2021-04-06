//Phonebook web server

require('dotenv').config()
require('express')
require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons')
require('./models/persons')
require('./models/persons')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
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
  Person.find({}).then(p => {
    res.send(
      `<h3>phonebook has info for ${p.length} people</h3>
        <h4>${new Date()}</h4>`)
  })
})

app.get(baseUrl, (req, res) => {
  Person.find({}).then(p => res.json(p))
})

app.get(baseUrl + '/:id', (req, res, next) => {
  Person.findById(req.params.id).then(p => res.json(p)).catch(err => next(err))
})

app.post(baseUrl, (req, res, next) => {
  const instance = req.body
  if (instance === undefined) {
    return res.status(400).json({ error: 'content missing' })
  } else {
    const person = new Person({
      name: instance.name,
      number: instance.number
    })
    person.save()
      .then(savedPerson => res.json(savedPerson))
      .catch(err => next(err))
  }
})

app.put(baseUrl + '/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    }).catch(err => next(err))
})

app.delete(baseUrl + '/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end
    }).catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } if (err.name === 'ValidationError') {
    return res.status(400).send({ error: 'validation error' })
  }

  next(err)
}
app.use(errorHandler)


