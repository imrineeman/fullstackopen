const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    await new Blog(request.body).save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter
