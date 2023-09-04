interface GetСountryFlag {
  country: "ru" | "us" | "eu"
  size?: 20 | 40 | 80
  ext?: "jpg" | "png"
}

export const getUrlСountryFlag = ({ size = 20, ext = "jpg", country }: GetСountryFlag) => {
  if (ext === "png") return `https://flagcdn.com/w${size}/${country}.${ext}`

  return `https://flagcdn.com/h${size}/${country}.${ext}`
}
