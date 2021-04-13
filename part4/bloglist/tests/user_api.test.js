const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)
const helper = require('./test_helper')

describe('Blog tests api', () => {
    const invalidUsername = {
        "username": 'aa',
        "name": 'foofoofofoo',
        'password': '123123'
    }

    test('invalid id test', async () => {
        const res = await api
            .post('/api/users')
            .send(invalidUsername)
            .expect(400)
        expect(res.error.name).toBe('Error')
    })
})

afterAll(() => {
    mongoose.connection.close()
})
