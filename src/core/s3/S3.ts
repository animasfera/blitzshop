import aws from "aws-sdk"

let s3: aws.S3

export const getS3 = () => {
  if (!s3) {
    const spacesEndpoint = new aws.Endpoint(process.env.NEXT_PUBLIC_S3_DOMAIN || "")

    s3 = new aws.S3({
      endpoint: spacesEndpoint,
      s3ForcePathStyle: true,
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: "ru-1",
    })
  }
  return s3
}
