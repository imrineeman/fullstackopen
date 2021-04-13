const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

usersRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
})

usersRouter.post('/', async (req, res) => {
    const body = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    res.json(savedUser)
})

module.exports = usersRouter
