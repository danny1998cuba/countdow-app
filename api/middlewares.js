const jwt = require('jsonwebtoken')
const User = require('./models').User
const { ObjectId } = require('mongoose').Types

const secret = (process.env.SECRET_KEY || 'secretKey')

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']

        if (!token) return res.status(403).send('No token Provided')

        const decoded = jwt.verify(token, secret)
        req.userId = decoded._id

        const user = await User.findById(req.userId, { password: 0 })

        if (!user) return res.status(404).send('User not found')

        next()
    } catch (error) {
        return res.status(401).send('Unauthorized')
    }
}

exports.checkDuplicatedUsername = async (req, res, next) => {
    const user = await User.findOne({ _id: { $ne: new ObjectId(req.params.id) }, username: req.body.username })
    if (user) return res.status(400).send("The user already exists")

    next()
}

exports.validateObjectId = async (req, res, next) => {
    if (ObjectId.isValid(req.params.id)) {
        next()
    } else {
        return res.status(400).send('Invalid Id')
    }
}