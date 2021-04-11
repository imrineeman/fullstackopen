const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const saveBlog = async () => {
        await new Blog(request.body).save()
        response.status(201).json(request.body)
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
