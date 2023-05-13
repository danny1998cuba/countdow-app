const jwt = require('jsonwebtoken')
const { generate } = require('randomstring')

const User = require('../models').User
const mainMail = require('./mail.controller')

const secret = (process.env.SECRET_KEY || 'secretKey')

const signIn = async (username, password) => {
    const user = await User.findOne({ username })

    // if (!user) return res.status(404).send('The username doesn\'t exists')
    if (!user) throw new Error('404')

    const matchPass = await User.comparePassword(password, user.password)

    // if (!matchPass) return res.status(401).send('Wrong password')
    if (!matchPass) throw new Error('401')

    const token = jwt.sign({ _id: user._id }, secret, {
        expiresIn: 86400
    })

    return token
}

exports.signup = async (req, res) => {
    const { username, email, password } = req.body
    const newUser = new User({
        username,
        email,
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
    try {
        let token = await signIn(username, password)
        res.status(200).json({ token })
    } catch (error) {
        switch (error.message) {
            case '404':
                return res.status(404).send('The username doesn\'t exists')
            case '401':
                return res.status(401).send('Wrong password')
            default:
                return res.status(500).send('Internal server error')

        }
    }

}

exports.forgetPass = async (req, res) => {
    let password = ''
    let user
    const { username } = req.body

    try {
        if (username) {
            user = await User.findOne({ username })
            if (!user) return res.status(404).send('The username doesn\'t exists')

            password = generate({ length: 10 })
            user.password = await User.encryptPassword(password);
            user = await User.findOneAndUpdate({ username }, user, { new: true })
        } else {
            res.status(400).send('Bad request')
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

    let mailSended = false
    try {
        const mail = `
        <h1>
            d98c_sw - Time To
            </h1>

        <p>
            You have requested a password change to our system. Your new password is:
        </p>
        <h4 class="pass">${password}</h4>

        <p>
            Please, we highly recommend to change this self-generated password in your settings page.
        </p>

        <h3>Thank you.</h3>`

        await mainMail(user.email, 'Time To - Password changed', mail)
        mailSended = true
    } catch (error) {
        console.log(error);
    }

    try {
        let token = await signIn(username, password)
        res.status(200).json({ token, mailSended })
    } catch (error) {
        switch (error.message) {
            case '404':
                return res.status(404).send('The username doesn\'t exists')
            case '401':
                return res.status(401).send('Wrong password')
            default:
                return res.status(500).send('Internal server error')

        }
    }
}

exports.profile = async (req, res) => {
    const user = await User.findOne({ _id: req.userId }, { password: 0 })

    if (!user) return res.status(404).send('The username doesn\'t exists')

    return res.status(200).json(user)
}

