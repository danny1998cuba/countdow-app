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
        const { username, password } = req.body
        let user = await User.findById(req.params.id)

        if (!user) {
            res.status(404).json({ msg: 'No existe en user' })
        }

        user.username = username

        const matchPass = await User.comparePassword(password, user.password)
        if (!matchPass)
            user.password = await User.encryptPassword(password)

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

        await User.findByIdAndRemove({ _id: req.params.id })
        res.json({ msg: 'User eliminado con exito' })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}