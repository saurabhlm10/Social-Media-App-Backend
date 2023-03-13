const Post = require("../../model/PostModel");

const { PutObjectCommand } = require("@aws-sdk/client-s3");

const crypto = require("crypto");

const { s3Client } = require("../../utils/s3Utils");

const awsBucketName = process.env.AWS_BUCKET_NAME;
const awsBucketRegion = process.env.AWS_BUCKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;

exports.addPost = async (req, res) => {
  try {
    const file = req.file;

    const {userId, username} = req.body

    const randomImageName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString("hex");

    const imageName = randomImageName();

    const params = {
      Bucket: awsBucketName,
      Key: imageName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3Client.send(command);

    const post = await Post.create({ imageName, userId, username });

    res.status(201).json({
      success: true,
      message: "post created successfully",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};
