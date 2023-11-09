import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
//import { Box, Button, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import { upload } from "src/core/images/frontend"
import { ImageVersions, UploadingImageProps } from "src/core/images"

type CustomDropzoneProps = {
  s3path: string
  onUpload?: (image: UploadingImageProps) => void
  resize?: {
    maxWidth: number
    maxHeight: number
  }
  versions?: ImageVersions
}

export function Dropzone(props: CustomDropzoneProps) {
  const { s3path, onUpload, resize, versions } = props

  const [files, setFiles] = useState<any>([])
  const { t } = useTranslation("experience")
  const [isUploading, setIsUploading] = useState(false)

  const onProgress = (files) => {
    setFiles(
      [...files].map((file) => {
        return { ...file }
      })
    )
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [".png"], "image/jpg": [".jpg"], "image/jpeg": [".jpeg"] },
    onDrop: async (acceptedFiles) => {
      setIsUploading(true)
      const filesUploaded = {} as any
      acceptedFiles.forEach((f) => {
        filesUploaded[f.name] = false
      })
      let filesToUploadCounter = acceptedFiles.length
      for (var file of acceptedFiles) {
        upload({
          s3Key: s3path,
          maxWidth: resize?.maxWidth,
          maxHeight: resize?.maxHeight,
          file: file,
          versions: versions || undefined,
          onUpload: (image) => {
            filesToUploadCounter--
            onUpload && onUpload(image)
            console.log(filesToUploadCounter)
            if (filesToUploadCounter === 0) {
              setIsUploading(false)
            }
          },
        })
      }
    },
  })

  return (
    <div>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="border-4 mb-4 p-15 rounded-xl min-h-[150px]"
      >
        <input {...getInputProps()} />
        <div className="text-center font-medium leading-[250%]">
          {!isUploading && t("edit.texts.dragNDropPhotos")}
          <br />
          {!isUploading && t("edit.texts.or")}
          <br />
          <button>
            {isUploading && (
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4
                border-[#4924FF]
                border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(255,0,0,0)]">
                  {t("translation:uploading")}
                </span>
              </div>
            )}
            {!isUploading && t("edit.texts.chooseFiles")}
          </button>
          {files.map((file, index) => {
            return (
              <div key={index}>
                <div>
                  <b>{file.file.name}:</b> {file.progress}%
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
