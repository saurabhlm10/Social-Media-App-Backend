const Post = require("../../model/PostModel");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3Client } = require("../../utils/s3Utils");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const awsBucketName = process.env.AWS_BUCKET_NAME;
const awsBucketRegion = process.env.AWS_BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;

exports.getPosts = async (req, res) => {
  try {
    const { followersArray } = req.params

    const newFollowersArray = followersArray.split(',')

    let posts = await Post.find({
      username: {$in: newFollowersArray}
    })

    //sort array according to createdAt
    posts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    
    // Add ImageUrl from S3
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
      message: "Got post successfully",
      posts,
    });

  } catch (error) {
    console.log(error)
  }
};
