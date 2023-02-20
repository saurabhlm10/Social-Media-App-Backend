const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const awsBucketName = process.env.AWS_BUCKET_NAME
const awsBucketRegion = process.env.AWS_BUCKET_REGION
const awsAccessKey = process.env.AWS_ACCESS_KEY 
const awsSecretKey =  process.env.AWS_SECRET_KEY

exports.s3Client = new S3Client({ 
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretKey
    },
    region: awsBucketRegion
 });
