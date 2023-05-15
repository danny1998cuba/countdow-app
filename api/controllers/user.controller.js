const { Countdown } = require('../models')

const User = require('../models').User

exports.crearUser = async (req, res) => {
    try {
        let user

        // crear user
        user = new User(req.body)

        await user.save()
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarUser = async (req, res) => {
    try {
        const { username, email } = req.body
        let user = await User.findById(req.params.id)

        if (!user) {
            res.status(404).json({ msg: 'No existe en user' })
        }

        user.username = username
        user.email = email

        user = await User.findOneAndUpdate({ _id: req.params.id }, user, { new: true })

        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)

        if (!user) {
            res.status(404).json({ msg: 'No existe en user' })
        }

        res.json(user)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.eliminarUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)

        if (!user) {
            res.status(404).json({ msg: 'No existe en user' })
        }

        let counts = await Countdown.find({ _userId: user.id })

        counts.forEach(async (count) => {
            await Countdown.findByIdAndRemove(count.id)
        })

        await User.findByIdAndRemove({ _id: req.params.id })
        res.json({ msg: 'User eliminado con exito' })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body
        if (password && newPassword) {

            let user = await User.findById(req.userId)

            if (!user) return res.status(404).send('The username doesn\'t exists')

            const matchPass = await User.comparePassword(password, user.password)

            if (!matchPass) return res.status(401).send('Wrong old password')

            user.password = await User.encryptPassword(newPassword)
            user = await User.findOneAndUpdate({ _id: req.userId }, user, { new: true })

            res.status(200).json("Password updated")
        } else {
            res.status(400).send('Bad request')
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}