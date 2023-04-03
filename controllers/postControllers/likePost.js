const PostModel = require("../../model/PostModel")

exports.likePost = async (req, res) => {
    try {
        const { username, postId } = req.params

        console.log('runnedd')

        console.log(username)
        console.log(postId)

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

        console.log(likePostResponse)

        res.status(201).json({
            success: true,
            message,
            likePostResponse
        })

    } catch (error) {
        console.log(error)
    }

}