const PostModel = require("../../model/PostModel")

exports.addComment = async (req, res) => {
    try {
        const { username, postId } = req.params

        const { comment } = req.body

        const commentObject = {
            comment,
            username
        }

        const addCommentResponse = await PostModel.findByIdAndUpdate({ _id: postId }, { $push: { comments: commentObject }, $set: { created_at: new Date() } }, { new: true })

        res.status(201).json({
            success: true,
            message: 'Added comment successfully',
            addCommentResponse
        })

    } catch (error) {
        console.log(error)
    }
}