const { DeleteObjectCommand, ObjectVersionStorageClass } = require("@aws-sdk/client-s3");
const Post = require("../../model/PostModel");
const { s3Client } = require("../../utils/s3Utils");

const bucketName = process.env.AWS_BUCKET_NAME

exports.deletePost = async (req, res) => {
    try {
        const { postId, imageName } = req.params

        console.log(imageName)

        const params = {
            Bucket: bucketName,
            Key: imageName
        }

        const command = new DeleteObjectCommand(params)

        s3Client.send(command)

        const deleteResponse = await Post.findByIdAndDelete(postId)

        console.log(deleteResponse)

        res.status(201).json({
            message: 'Post Deleted Successfully'
        })

    } catch (error) {
        console.log(error)
    }

}