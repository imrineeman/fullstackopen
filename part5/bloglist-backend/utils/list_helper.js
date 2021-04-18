const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const mostLoved = blogs => {
    res = blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog)
    return res
}

const mostBlogs = blogs => {
    let authors = blogs.map(b => b.author)
    res = authors.reduce((max, author) => {
        newAut = blogs.filter(b => b.author === author)
        currentAuth = blogs.filter(b => b.author === max)
        return currentAuth.length > newAut.length ? max : author
    })
    obj = {
        author: res,
        blogs: blogs.filter(b => b.author === res).length
    }
    return obj
}

module.exports = {
    dummy, totalLikes, mostLoved, mostBlogs
}

