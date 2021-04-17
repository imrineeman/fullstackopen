const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {

    const body = request.body
    const token = request.token
    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    }
    catch (e) {
        return next(e)
    }

    const user = await User.findById(decodedToken.id)

    const saveBlog = async () => {
        let newBlog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        }
        const savedBlog = await new Blog(newBlog).save()
        user.blogs = user.blogs.concat(savedBlog._id)
        try {
            await user.save()
            response.status(201).json(savedBlog)
        }
        catch {
            e => {
                next(e)
            }
        }
    }
    if (!request.body.title || !request.body.url) {
        response.status(400).end('Bad request')
    } else if (request.body.likes) {
        saveBlog()

    } else {
        request.body.likes = 0
        saveBlog()

    }
})

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
    const newBlog = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog)
    res.json(updatedBlog)
})

module.exports = blogsRouter
