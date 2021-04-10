const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const saveBlog = async () => {
        res = await new Blog(request.body).save()
        response.status(201).json(res)
    }

    if (!request.body.title || !request.body.url) {
        response.status(400).end('Bad request')
    }

    if (request.body.likes) {
        saveBlog()

    } else {
        request.body.likes = 0
        saveBlog()
    }
})

module.exports = blogsRouter
