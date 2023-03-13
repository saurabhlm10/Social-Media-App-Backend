const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: [true, 'username is required'],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'email is required'],
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    },
    followers: {
        type: [String],
    },
    following: {
        type: [String],
    },
    token: {
        type: String,
        trim: true,
    }
})

userSchema.set('timestamps', true)

module.exports = mongoose.model('user', userSchema)