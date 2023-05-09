const Countdown = require('../models').Countdown
const { ObjectId } = require('mongoose').Types

exports.crearCountdown = async (req, res) => {
    try {
        let countdown

        // crear countdown
        countdown = new Countdown(req.body)
        countdown._userId = req.userId

        await countdown.save()
        res.send(countdown)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerCountdowns = async (req, res) => {
    try {
        const countdowns = await Countdown.find({ _userId: new ObjectId(req.userId) })
        res.json(countdowns)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarCountdown = async (req, res) => {
    try {
        const { date, text, back_portrait, back_landscape } = req.body
        let countdown = await Countdown.findById(req.params.id)

        if (!countdown) {
            res.status(404).json({ msg: 'No existe en countdown' })
        }

        if (countdown._userId._id != req.userId) {
            res.status(403).json({ msg: 'Not authorized' })
        }

        countdown.date = date
        countdown.text = text
        countdown.back_portrait = back_portrait
        countdown.back_landscape = back_landscape

        countdown = await Countdown.findOneAndUpdate({ _id: req.params.id }, countdown, { new: true })

        res.json(countdown)
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerCountdown = async (req, res) => {
    try {
        let countdown = await Countdown.findById(req.params.id)

        if (!countdown) {
            res.status(404).json({ msg: 'No existe en countdown' })
        }

        res.json(countdown)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.eliminarCountdown = async (req, res) => {
    try {
        let countdown = await Countdown.findById(req.params.id)

        if (!countdown) {
            res.status(404).json({ msg: 'No existe en countdown' })
        }

        if (countdown._userId._id != req.userId) {
            res.status(403).json({ msg: 'Not authorized' })
        }

        await Countdown.findByIdAndRemove({ _id: req.params.id })
        res.json({ msg: 'Countdown eliminado con exito' })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}