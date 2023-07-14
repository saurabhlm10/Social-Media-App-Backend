const PostModel = require("../../model/PostModel")

exports.likePost = async (req, res) => {
    try {
        const { username, postId } = req.params

        const { likes } = await PostModel.findById({ _id: postId })

        let likePostResponse;
        let message;

        if (likes.includes(username)) {
            likePostResponse = await PostModel.findOneAndUpdate({ _id: postId }, {
                $pull: { likes: username },
            }, {
                new: true
            })

            message = 'removed like successfully'

        } else {
            likePostResponse = await PostModel.findOneAndUpdate({ _id: postId }, {
                // $pull: { likes: username },
                $addToSet: { likes: username }
            }, {
                new: true
            })
            message = 'added like successfully'

        }

        res.status(201).json({
            success: true,
            message,
            likePostResponse
        })

    } catch (error) {
        console.log(error)
    }

}