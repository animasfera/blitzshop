import { getS3 } from "../s3/S3"
const sharp = require("sharp")

export const getS3Key = (key: string) => {
  return (process.env.S3PREFIX || "") + key
}

export const resizeAndUpload = async (props: any) => {
  const { filepath, fit, mimeType, width, height, s3Key } = props

  const sharp = require("sharp")

  let data: Buffer

  try {
    const needResize = width && height
    let filename = s3Key

    const s3 = getS3()

    let image = sharp(filepath)
    if (needResize) {
      image = image
        .resize(width, height, {
          fit: fit || (width === height ? sharp.fit.cover : sharp.fit.inside),
        })
        .jpeg({
          quality: 90,
        })
        .sharpen()
    }
    const outputBuffer = await image.toBuffer()

    return s3
      .upload(
        {
          Bucket: "omkar-bbd83e05-17d9-4b61-8f32-8d4c68c07f63", // Add bucket name here
          ACL: "public-read", // Specify whether anyone with link can access the file
          Key: getS3Key(s3Key), // Specify folder and file name
          Body: outputBuffer,
          ContentType: mimeType,
        },
        {
          partSize: 10 * 1024 * 1024,
          queueSize: 10,
        }
      )
      .promise()
  } catch (e) {
    console.log(e)
  }
}

export const getSize = async (filepath) => {
  let image = sharp(filepath)
  const { width, height } = await image.metadata()
  return { width, height }
}
