const User = require('../models').User
const jwt = require('jsonwebtoken')

const secret = (process.env.SECRET_KEY || 'secretKey')

exports.signup = async (req, res) => {
    const { username, password } = req.body
    const newUser = new User({
        username,
        password: await User.encryptPassword(password)
    })

    const saved = await newUser.save()

    const token = jwt.sign({ _id: saved._id }, secret, {
        expiresIn: 86400
    })

    res.status(200).json({ token })
}

exports.signin = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) return res.status(404).send('The username doesn\'t exists')

    const matchPass = await User.comparePassword(password, user.password)

    if (!matchPass) return res.status(401).send('Wrong password')

    const token = jwt.sign({ _id: user._id }, secret, {
        expiresIn: 86400
    })

    res.status(200).json({ token })
}

