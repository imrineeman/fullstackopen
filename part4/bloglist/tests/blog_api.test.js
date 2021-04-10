const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

exampleBlog = {
    "__v": 0,
    "_id": "606f34a15987574870f1e065",
    "author": "Llo lili",
    "title": "Tests",
    "url": "https://reactpatterns.com/",
}

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogs = helper.initialBlogs.map(b => new Blog(b))
    blogPromises = blogs.map(b => b.save())
    await Promise.all(blogPromises)
})

describe('api tests', () => {

    test('GET all test', async () => {
        let response = await api.get('/api/blogs')
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(2)
    })

    test('verify id', async () => {
        let response = await helper.blogsInDb()
        expect(response[0]['_id']).toBeDefined()
    })

    test('post blogpost', async () => {

        const initDb = await helper.blogsInDb()
        await api
            .post('/api/blogs')
            .send(exampleBlog)
            .expect(201)
        const currentDb = await helper.blogsInDb()

        expect(currentDb.length).toEqual(initDb.length + 1)
    })

    test('verify likes', async () => {
        await api
            .post('/api/blogs')
            .send(exampleBlog)
            .expect(201)
        const blogsArr = await helper.blogsInDb()
        const testBlog = blogsArr.filter(b => b.title === 'Tests')[0]
        expect(testBlog.likes).toBe(0)
    })

})

afterAll(() => {
    mongoose.connection.close()
})