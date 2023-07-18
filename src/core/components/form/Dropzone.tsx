import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Box, Button, Text } from "@chakra-ui/react"
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
    <Box>
      <Box
        {...getRootProps({ className: "dropzone" })}
        bg={"gray.50"}
        border={"1px dashed #DDD"}
        p={15}
        pt={10}
        pb={10}
        mt={4}
        mb={4}
        borderRadius={5}
        color={"gray"}
        minHeight={"150px"}
      >
        <input {...getInputProps()} />
        <Text textAlign={"center"} lineHeight={"250%"}>
          {t("edit.texts.dragNDropPhotos")}
          <br />
          {t("edit.texts.or")}:
          <Button
            as={"a"}
            isLoading={isUploading}
            loadingText={t("translation:uploading")}
            cursor={"pointer"}
          >
            {t("edit.texts.chooseFiles")}
          </Button>
          {files.map((file, index) => {
            return (
              <Box key={index}>
                <Text>
                  <b>{file.file.name}:</b> {file.progress}%
                </Text>
              </Box>
            )
          })}
        </Text>
      </Box>
    </Box>
  )
}
