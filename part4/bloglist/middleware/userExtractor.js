const User = require('../models/user')
const jwt = require('jsonwebtoken')


const userExtractor = async (req, res, next) => {
    let decodedToken
    try {
        decodedToken = jwt.verify(req.token, process.env.SECRET)
    }
    catch (e) { return next(e) }
    const user = await User.findById(decodedToken.id)
    req.user = user
    next()
}

module.exports = userExtractor
