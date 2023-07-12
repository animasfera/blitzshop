import { getAntiCSRFToken } from "@blitzjs/auth"
import axios from "axios"
import Resizer from "react-image-file-resizer"

import { ImageVersions, UploadingImageProps } from "./index"

export const resize = (file: File, maxWidth = 9999999, maxHeight = 9999999): Promise<File> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      90,
      0,
      (file: File) => {
        resolve(file)
      },
      "file"
    )
  })
}

type ImageUploadProps = {
  maxWidth?: number
  maxHeight?: number
  file: File
  onUpload: (image: UploadingImageProps) => void
  s3Key: string
  versions?: ImageVersions
}

export const upload = async (props: ImageUploadProps) => {
  const { onUpload, s3Key, versions } = props
  let { file } = props
  var formData = new FormData()
  if (versions && versions.original) {
    file = await resize(file, versions.original.w, versions.original.h)
  }
  formData.append("image", file)
  formData.append("s3Key", s3Key)
  if (versions) {
    formData.append("versionsJson", JSON.stringify(versions))
  }
  const antiCSRFToken = getAntiCSRFToken()

  axios
    .post("/api/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "anti-csrf": antiCSRFToken,
      },
    })
    .then((res) => {
      if (res.status === 200 && res.data.url) {
        const fileUrl = res.data.url
        onUpload &&
          onUpload({
            filename: file.name,
            src: fileUrl,
            width: res.data.width,
            height: res.data.height,
          })
      }
    })
}
