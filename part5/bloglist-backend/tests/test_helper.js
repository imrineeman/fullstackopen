const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: '6076a4a2efa2b31ca075b2ee'

    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        user: '6076a4a2efa2b31ca075b2ee'
    }
]

const initialUsers = [
    {
        "username": "Test Testy",
        "password": "123456",
        "name": "Lolo",
        "_id": "6076a4a2efa2b31ca075b2ee",
        "blogs": ['5a422a851b54a676234d17f7']
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    arr = blogs.map(b => b.toJSON())
    return arr
}

const usersInDb = async () => {
    const users = await User.find({})
    arr = users.map(b => b.toJSON())
    return arr
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb, initialUsers
}