import { Schema, model } from 'mongoose'

const countdownSchema = new Schema({
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
}, {
    versionKey: false,
});

export default model('Countdown', countdownSchema)