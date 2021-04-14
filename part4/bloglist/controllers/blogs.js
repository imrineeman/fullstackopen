const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const saveBlog = async () => {
        let user = await User.findById(request.body.user)
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
                console.log('Error!');

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
