import { useState } from "react"
import { getAntiCSRFToken } from "@blitzjs/auth"
import { Input } from "@chakra-ui/input"
import { Box, Button, Icon, Stack } from "@chakra-ui/react"
import { FiCamera } from "react-icons/fi"
import { useTranslation } from "react-i18next"
import Resizer from "react-image-file-resizer"
import { User } from "@prisma/client"
import axios from "axios"

import { UserAvatar } from "./UserAvatar"

type UserAvatarUploaderProps = {
  user: Partial<User>
  onChange?: (url: string) => void
  size?: string
}

export const UserAvatarUploader = (props: UserAvatarUploaderProps) => {
  const { size, user, onChange } = props
  const [avatar, setAvatar] = useState(user.avatarUrl)
  const { t, i18n } = useTranslation(["user", "translation"])
  const [isUploading, setIsUploading] = useState(false)

  const versions = {
    original: { w: 812, h: 812, fit: "inside" },
    xs: { w: 64, h: 64, fit: "cover" },
    sm: { w: 128, h: 128, fit: "cover" },
    md: { w: 256, h: 256, fit: "cover" },
    lg: { w: 512, h: 512, fit: "cover" },
    xl: { w: 812, h: 812, fit: "cover" },
  }

  const resizeFile = (file): Promise<string> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        versions.original.w,
        versions.original.h,
        "JPEG",
        90,
        0,
        (uri: string) => {
          resolve(uri)
        },
        "file"
      )
    })

  const upload = async (e) => {
    e.preventDefault()
    const reader = new FileReader()

    const filename = user.username + "_" + Date.now()
    const file = e.target.files[0] as File

    var formData = new FormData()
    const image = await resizeFile(file)
    formData.append("image", image)
    formData.append("s3Key", "u/" + user.id + "/ava/")
    formData.append("versionsJson", JSON.stringify(versions))
    const antiCSRFToken = getAntiCSRFToken()

    setIsUploading(true)
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
          setAvatar(fileUrl)
          setIsUploading(false)
          onChange && onChange(fileUrl)
        }
      })
  }

  return (
    <Box>
      <Input
        id={"imgupload"}
        onChange={upload}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
      />
      <Stack textAlign={"center"}>
        <label htmlFor="imgupload">
          <UserAvatar id="OpenImgUpload" size={size} src={avatar} cursor={"pointer"} />
        </label>
        <Button
          isLoading={isUploading}
          loadingText={t("translation:uploading")}
          onClick={() =>
            // @ts-ignore
            document.getElementById("imgupload").click()
          }
        >
          {t("form.fields.avatar.label")}
          <Icon as={FiCamera} ml={2} />
        </Button>
      </Stack>
    </Box>
  )
}

export default UserAvatarUploader
