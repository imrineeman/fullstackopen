const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {

    if (request.body.likes) {
        res = await new Blog(request.body).save()
        response.status(201).json(res)

    } else {
        request.body.likes = 0
        res = await new Blog(request.body).save()
        response.status(201).json(res)
    }
})

module.exports = blogsRouter
