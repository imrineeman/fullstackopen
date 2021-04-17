const express = require('express')

const getTokenFrom = (req) => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}

const tokenExtractor = (req, res, next) => {
    const token = getTokenFrom(req)
    req.token = token
    next()
}

module.exports = tokenExtractor
