import aws from "aws-sdk"

let s3: aws.S3

export const getS3 = () => {
  if (!s3) {
    const spacesEndpoint = new aws.Endpoint("https://s3.timeweb.com")

    s3 = new aws.S3({
      endpoint: spacesEndpoint,
      s3ForcePathStyle: true,
      accessKeyId: "omkar",
      secretAccessKey: "ipeplffdutv7dehpwghlcpssqxcrqhtb",
      region: "ru-1",
    })
  }
  return s3
}
