const PostModel = require("../../model/PostModel")

exports.deleteComment = async (req, res) => {
    try {
        const { commentId, postId } = req.params

        console.log(commentId)
        console.log(postId)

        const response = await PostModel.findByIdAndUpdate(postId, {
            $pull: {
                comments: { _id: commentId }
            }
        })

        res.status(200).json({
            success: true,
            message: 'Comment Deleted Successfully',
            response
        })

    } catch (error) {
        console.log(error)
    }
}