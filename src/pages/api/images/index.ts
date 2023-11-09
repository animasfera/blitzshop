import { AuthenticationError } from "blitz"
import { getSession } from "@blitzjs/auth"
import { NextApiRequest, NextApiResponse } from "next"
import { IncomingForm } from "formidable"

import { api } from "src/blitz-server"
import { getSize, resizeAndUpload } from "src/core/images/backend"
import { ImageVersion, ImageVersions } from "src/core/images"
import { ImagesQueue } from "src/core/queues"
import { UserRoleEnum } from "@prisma/client"
import db from "db"

const sharp = require("sharp")

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  if (req.method == "POST") {
    let {
      query: { versionsJson, s3Key },
    } = req

    const session = await getSession(req, res)
    const user = session.user
    if (user?.role !== UserRoleEnum.ADMIN) {
      throw new AuthenticationError()
    }

    const form = new IncomingForm({ multiples: true })

    return await new Promise<{ url: string }>((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          res.writeHead(err.httpCode || 400, { "Content-Type": "text/plain" })
          res.end(String(err))
          return
        }

        let versions: ImageVersions | null

        if (fields.versionsJson) {
          versions = JSON.parse(fields.versionsJson as string)
        } else {
          versions = null
        }

        // type = type || 'images' // also can be "avatars","experiences", etc.

        s3Key = fields.s3Key.replace(/\/?$/, "/") // add trailaing slash
        const fileName = s3Key + "" + Date.now() + "" + Math.floor(Math.random() * 1000000)
        const imageUrl =
          "https://" +
          process.env.NEXT_PUBLIC_S3_DOMAIN +
          "/" +
          process.env.NEXT_PUBLIC_S3_BUCKET +
          "/" +
          process.env.NEXT_PUBLIC_S3PREFIX +
          fileName

        const image = await db.image.create({ data: { url: imageUrl } })

        const imageData = {
          filepath: files.image.filepath,
          mimeType: files.image.mimetype,
          fit: sharp.fit.cover,
          s3Key: fileName,
        } as {
          filepath: string
          mimeType: string
          fit: string
          s3Key: string
          width?: number | null
          height?: number | null
        }

        let firstImage = { ...imageData }
        let response = {
          first: "",
          original: "",
        }

        if (typeof versions !== "undefined") {
          let i = 0
          for (let key in versions) {
            const version = versions[key] as ImageVersion
            if (version) {
              let newImageData = { ...imageData }

              if (key === "original") {
                newImageData.s3Key = fileName
              } else {
                newImageData.width = version.w || null
                newImageData.height = version.h || null
                newImageData.s3Key = fileName + "-" + key
              }

              if (i !== 0) {
                void ImagesQueue.add("resizeAndUploadImage", newImageData)
              } else {
                firstImage = newImageData
              }
              i++
            }
          }
        }

        const data = await resizeAndUpload(firstImage)
        const { width, height } = await getSize(firstImage.filepath)

        if (data) {
          console.log("prepare for response")

          let fileUrl = data.Location as any
          // response.first = data.Location
          // response.original = "https://s3.timeweb.com/omkar-bbd83e05-17d9-4b61-8f32-8d4c68c07f63/" + firstImage.s3Key

          if (fileUrl) {
            console.log("resolve")
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ url: fileUrl, width, height, image }, null, 2))
            resolve({ url: fileUrl })
          } else {
            res.writeHead(500, { "Content-Type": "application/json" })
            res.end(JSON.stringify({}))
            reject()
          }
        }
      })
    })
  }
})

// VV important VV
export const config = {
  api: {
    bodyParser: false,
  },
}
