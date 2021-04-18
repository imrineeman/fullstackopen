const User = require('../models/user')
const jwt = require('jsonwebtoken')


const userExtractor = async (req, res, next) => {
    let decodedToken
    try {
        decodedToken = jwt.verify(req.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        req.user = user
    }
    catch (e) {
        next(e)
    }
    next()
}

module.exports = userExtractor
