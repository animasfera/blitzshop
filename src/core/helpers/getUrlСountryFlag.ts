interface GetСountryFlag {
  // "ru" | "us" | "eu"
  country: string
  size?: 20 | 40 | 80
  ext?: "jpg" | "png"
}

export const getUrlСountryFlag = ({ size = 20, ext = "jpg", country }: GetСountryFlag) => {
  const value = country.toLowerCase()

  if (ext === "png") return `https://flagcdn.com/w${size}/${value}.${ext}`

  return `https://flagcdn.com/h${size}/${value}.${ext}`
}
