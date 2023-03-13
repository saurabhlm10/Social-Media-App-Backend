const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    imageName: {
        type: String,
        require: [true, 'Image is required'],
    },
    imageUrl: {
        type: String
    },
    userId: {
        type: String,
        require: [true, 'userId is required'],
    },
    username: {
        type: String,
        require: [true, 'username is required'],
    },
})

postSchema.set('timestamps', true)

module.exports = mongoose.model('post', postSchema)
