import { LocaleEnum, Location } from "@prisma/client"

export const getAddress = (location: Location, locale: LocaleEnum) => {
  switch (locale) {
    case LocaleEnum.RU:
      return location.addressRu || location?.addressEn || location?.address || ""
      break
    case LocaleEnum.EN:
      return location?.addressEn || location?.address || ""
      break
    default:
      return location?.address
  }
}
