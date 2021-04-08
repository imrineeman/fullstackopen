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

module.exports = {
    dummy, totalLikes, mostLoved
}

