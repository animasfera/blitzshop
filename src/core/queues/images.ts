import { NotFoundError } from "blitz"
import { UserRoleEnum } from "@prisma/client"
import db from "db"
import Queue from "bull"

import createMockContext from "src/auth/components/CreateMockContext"
import processAvatar from "src/users/mutations/processAvatar"
import { resizeAndUpload } from "../images/backend"
import { GlobalRef } from "../index"

const resizeAndUploadImage = (job) => {
  const { url, filepath, mimeType, fit, width, height, s3Key } = job.data

  void resizeAndUpload({
    url: url,
    filepath: filepath,
    mimeType: mimeType,
    fit: fit,
    width: width,
    height: height,
    s3Key: s3Key,
  })
  return true
}

const processAvatarJob = async (job) => {
  const { userId } = job.data
  const user = await db.user.findFirst({ where: { role: UserRoleEnum.ADMIN } })
  if (!user) {
    throw new NotFoundError()
  }
  const { ctx } = await createMockContext({ user })

  void processAvatar({ userId }, ctx)
  return true
}

export const initImagesQueue = () => {
  console.log("Started Images Queue")

  const imagesQ = new Queue("images")

  void imagesQ.process("resizeAndUploadImage", resizeAndUploadImage)
  void imagesQ.process("processAvatar", processAvatarJob)

  return imagesQ
}

let queueRef = new GlobalRef<Queue.Queue<any>>(`leela.queue.images`)
if (!queueRef.value) {
  queueRef.value = initImagesQueue()
}
export const ImagesQueue = queueRef.value
