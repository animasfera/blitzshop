import { LocaleEnum, Location } from "@prisma/client"

export const getAddress = (location: Location, locale: LocaleEnum) => {
  switch (locale) {
    case LocalEnum.ru:
      return location.addressRu || location?.addressEn || location?.address || ""
      break
    case LocalEnum.en:
      return location?.addressEn || location?.address || ""
      break
    default:
      return location?.address
  }
}
