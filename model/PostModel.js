const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    imageName: {
        type: String,
        require: [true, 'Image is required'],
    },
    imageUrl: {
        type: String
    }
})

postSchema.set('timestamps', true)

module.exports = mongoose.model('post', postSchema)
