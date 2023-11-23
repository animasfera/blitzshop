import { Image } from "@prisma/client"

export enum versionTypes {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
  original = "original",
}

export type ImageVersion = {
  w?: number
  h?: number
  fit?: "cover" | "inside"
}

export type ImageVersions = {
  [key in versionTypes]: ImageVersion
}

export type UploadingImageProps = {
  image: Image
  src: number
  filename: string
  width: number
  height: number
}
