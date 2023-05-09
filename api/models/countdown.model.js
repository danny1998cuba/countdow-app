const mongoose = require('mongoose')

const countdownSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    back_portrait: {
        type: String
    },
    back_landscape: {
        type: String
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {
    versionKey: false,
});

module.exports = mongoose.model('Countdown', countdownSchema)