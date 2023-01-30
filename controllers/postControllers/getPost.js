const Post = require("../../model/PostModel");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { s3Client } = require("../../utils/s3Utils");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const awsBucketName = process.env.AWS_BUCKET_NAME;
const awsBucketRegion = process.env.AWS_BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;

exports.getPost = async (req, res) => {
  const {postId} = req.params

  const newPostId = postId.slice(1,)

  // 63d69e141f8bc71dba74a1f6

  const post = await Post.findById(newPostId);

  const getObjectParams = {
    Bucket: awsBucketName,
    Key: post.imageName,
  };

  const command = new GetObjectCommand(getObjectParams);

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  post.imageUrl = url;

  res.status(201).json({
    success: true,
    message: "Got post successfully",
    post,
  });
};
