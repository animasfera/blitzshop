import { LocaleEnum, Location } from "@prisma/client"

export const getAddress = (location: Location, locale: LocaleEnum) => {
  switch (locale) {
    case LocaleEnum.ru:
      return location.addressRu || location?.addressEn || ""
      break
    case LocaleEnum.en:
      return location?.addressEn || location?.addressRu || ""
      break
    default:
      return location?.addressEn || location?.addressRu || ""
  }
}
