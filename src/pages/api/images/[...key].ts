import { AuthorizationError } from "blitz"
import { NextApiResponse, NextApiRequest } from "next"
import { UserRoleEnum } from "@prisma/client"

import { getS3 } from "src/core/s3/S3"
import { api } from "src/blitz-server"

export default api(async (req: NextApiRequest, res: NextApiResponse, ctx) => {
  if (req.method === "GET") {
    const {
      query: { key },
    } = req

    if (!ctx.session.$isAuthorized(UserRoleEnum.ADMIN)) {
      throw new AuthorizationError()
    }

    const s3 = getS3()

    const Key = (key as string[]).join("/")
    const Bucket = "omkar-leela-private"

    const type =
      Key.indexOf("jpeg") !== -1 || Key.indexOf("jpg") !== -1
        ? "image/jpeg"
        : Key.indexOf("png") !== -1
        ? "image/png"
        : "image/jpeg"

    const image = await new Promise((resolve, reject) => {
      s3.getObject({ Key, Bucket }, (err, data) => {
        // console.log(err)
        // console.log(data.Body)
        if (data.Body) {
          // console.log(data.Body?.toString('base64').substring(0,100))

          // let imgData = 'data:image/jpeg;base64,' + data.Body?.toString('base64');
          let imgData = data.Body

          // res.write(imgData);
          // res.end(null);
          resolve(imgData)
        } else {
          console.error(err)
        }
      })
    })

    //
    // console.log(image)

    res.statusCode = 200
    res.setHeader("Content-Type", type)
    // res.end(image)

    // res.write(image, 'binary');
    res.end(image, "binary")
  } else {
    return res.status(405).end()
  }
})
