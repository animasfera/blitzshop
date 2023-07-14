import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import fs from "fs"
import axios from "axios"

import { resizeAndUpload } from "src/core/images/backend"
import { ImageVersion } from "src/core/images"
import { ImagesQueue } from "src/core/queues"

const os = require("os")
const path = require("path")
const url = require("url")
var mime = require("mime-types")

export default resolver.pipe(async (input: { userId: number }, ctx) => {
  const { userId } = input

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw new NotFoundError()
  }
  if (!user.avatarUrl) {
    return
  }

  const versions = {
    original: { w: 812, h: 812, fit: "inside" },
    xs: { w: 64, h: 64, fit: "cover" },
    sm: { w: 128, h: 128, fit: "cover" },
    md: { w: 256, h: 256, fit: "cover" },
    lg: { w: 512, h: 512, fit: "cover" },
    xl: { w: 812, h: 812, fit: "cover" },
  }

  var parsedUrl = url.parse(user.avatarUrl)
  const fileNameFromUrl = path.basename(parsedUrl.pathname)
  const filePathTemp = os.tmpdir() + "/" + fileNameFromUrl
  const mimeType = mime.lookup(filePathTemp) || "image/jpeg"
  const s3Key = "u/" + user.id + "/ava/" + Date.now() + "" + Math.floor(Math.random() * 1000000)

  try {
    const res = await axios({
      method: "get",
      url: user.avatarUrl,
      responseType: "stream",
    })
    const writer = fs.createWriteStream(filePathTemp)
    res.data.pipe(writer)
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve)
      writer.on("error", reject)
    })
  } catch (e) {
    console.log(e)
  }

  let uploadedImageUrl = ""

  for (let key in versions) {
    const version = versions[key] as ImageVersion
    if (version) {
      let imageData: any

      if (key === "original") {
        imageData = {
          filepath: filePathTemp,
          mimeType: mimeType,
          fit: version.fit,
          s3Key: s3Key,
        }
      } else {
        imageData = {
          filepath: filePathTemp,
          mimeType: mimeType,
          fit: version.fit,
          s3Key: s3Key + "-" + key,
          width: version.w || null,
          height: version.h || null,
        }
      }
      if (key === "original") {
        let data = await resizeAndUpload(imageData)
        uploadedImageUrl = data?.Location || ""
      } else {
        ImagesQueue.add("resizeAndUploadImage", imageData)
      }
    }
  }

  await db.user.update({ where: { id: user.id }, data: { avatarUrl: uploadedImageUrl } })
  return uploadedImageUrl
})
