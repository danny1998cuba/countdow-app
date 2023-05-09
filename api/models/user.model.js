const { model, Schema } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLenght: 8
    },
    password: {
        type: String,
        required: true,
        minLenght: 8
    }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, storedHash) => {
    return await bcrypt.compare(password, storedHash)
}

module.exports = model('User', userSchema)