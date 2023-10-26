import { LocaleEnum, Location } from "@prisma/client"

export const getAddress = (location: Location, locale: LocaleEnum) => {
  switch (locale) {
    case LocaleEnum.RU:
      return location?.addressRu || location?.addressEn || ""
      break
    case LocaleEnum.EN:
      return location?.addressEn || location?.addressRu || ""
      break
    default:
      return location?.addressEn || location?.addressRu || ""
  }
}
