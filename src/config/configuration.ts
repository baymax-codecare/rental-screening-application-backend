export default () => {
  return {
    sendgrid: {
      apiKey: process.env.SEND_GRID_KEY,
    },
    awsS3Storage: {
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      publicBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
    },
  };
};
