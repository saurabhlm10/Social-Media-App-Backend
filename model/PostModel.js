const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    imageName: {
        type: String,
        require: [true, 'imageName is required'],
    },
    imageUrl: {
        type: String,
        require: [true, 'imageUrl is required'],
    },
    userId: {
        type: String,
        require: [true, 'userId is required'],
    },
    username: {
        type: String,
        require: [true, 'username is required'],
    },
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [{
            comment: {
                type: String,
                required: [true, 'comment is required']
            },
            username: {
                type: String,
                required: [true, 'username is required']
            },
            created_at: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
})

postSchema.set('timestamps', true)

module.exports = mongoose.model('post', postSchema)
