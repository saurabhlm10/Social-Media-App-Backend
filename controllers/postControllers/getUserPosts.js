const Post = require("../../model/PostModel");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3Client } = require("../../utils/s3Utils");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

exports.getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;

    let posts = await Post.find({ username:username });

    posts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const awsBucketName = process.env.AWS_BUCKET_NAME

    for (let post of posts) {
      const getObjectParams = {
        Bucket: awsBucketName,
        Key: post.imageName,
      };
      const command = new GetObjectCommand(getObjectParams);

      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

      post.imageUrl = url;
    }

    res.status(201).json({
      success: true,
      message: "Got posts successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};
