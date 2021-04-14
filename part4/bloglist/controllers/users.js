const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { response } = require('express')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs')
    res.status(200).json(users)
})

usersRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
})

usersRouter.post('/', async (req, res, next) => {
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    if (body.password.length < 3) {
        return res.status(400).json({ error: 'bad password' })
    }
    try {
        const savedUser = await user.save()
        res.status(201).json(savedUser)
    } catch (err) {
        next(err)
    }
})


module.exports = usersRouter
