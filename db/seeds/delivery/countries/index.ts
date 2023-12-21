import { AuthenticationError, NotFoundError } from "blitz"
import { Cdek, ApiError, HttpError } from "cdek"
import db, { DeliveryCountry } from "db"

import { saveJson } from "db/seeds/helpers/saveJson"
import { Countries } from "src/auth/components/Countries"
import { BoxberryCountry } from "src/boxberry/queries/getBoxberryListCountries"
import { getUrlСountryFlag } from "src/core/helpers/getUrlСountryFlag"

const getCdekCountries = async () => {
  const cdek = new Cdek({
    account: process.env.CDEK_CLIENT_ID ?? "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
    password: process.env.CDEK_CLIENT_SECRET ?? "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG",
    url_base: "https://api.cdek.ru/v2",
  })

  // TODO: add text err + translate
  if (!cdek) throw new AuthenticationError()

  try {
    // @ts-ignore
    const regions: {
      country_code: string
      country: string
      region: string
      region_code: number
    }[] = await cdek.getRegions({
      lang: "rus",
    })

    if (!regions) throw new NotFoundError()

    let countries: DeliveryCountry[] = []

    for (let index = 0; index < regions.length; index++) {
      const element = regions[index]

      const exist = countries.some((country) => country.id === element?.country_code)

      if (
        !exist &&
        (element?.country_code === "KZ" ||
          element?.country_code === "RU" ||
          element?.country_code === "BY")
      ) {
        const titleEn = Countries.find((el) => el.code === element.country_code)?.name
        const flag = element?.country_code
          ? getUrlСountryFlag({ country: element?.country_code })
          : null

        const codes = {
          BY: "112",
          KZ: "398",
          RU: "643",
        }

        countries.push({
          id: element.country_code,
          code: codes[element.country_code] ?? null,
          titleRu: element.country,
          titleEn: titleEn ?? "",
          flag,
        })
      }
    }

    return countries
  } catch (err) {
    if (err instanceof ApiError) {
      // returned in case of Api Error like invalid data, contains api message
      console.error(err.response)
      throw new Error(err.message)
    } else if (err instanceof HttpError) {
      // returned in case of method not found
      console.error(err)
      throw new Error(err.message)
    } else {
      console.error("Unknown Error", err)
      throw new Error(JSON.stringify(err))
    }
  }
}

const getBoxberryCountries = async () => {
  const token = process.env.BOXBERRY_PRIVAT_TOKEN
  const url = process.env.BOXBERRY_PRIVAT_URL

  if (!token) {
    // TODO: add translate text err
    throw new AuthenticationError("нет токена")
  }

  if (!url) {
    // TODO: add translate text err
    throw new NotFoundError()
  }

  try {
    const data = await fetch(`${url}/export-api?token=${token}&method=Countries`, {})

    if (data.ok) {
      const res: {
        result: BoxberryCountry[]
        error: { isError: boolean; errorCode?: string; errorMessage?: string }
      } = await data.json()

      if (res.error.isError) {
        console.error("Unknown Error", res.error.errorMessage)
        throw new Error(`Error code: ${res.error.errorCode}. Message: ${res.error.errorMessage}`)
      }

      let countries: DeliveryCountry[] = []

      for (let index = 0; index < res.result.length; index++) {
        const element = res.result[index]

        const exist = countries.some((country) => country?.code === element?.Code)

        if (!exist) {
          const country = Countries?.find((el) => {
            const name = el.name ?? null
            const nameEng = element?.NameEng ?? null

            return !name || !nameEng ? false : name.toLowerCase() === nameEng.toLowerCase()
          })
          const flag = country?.code ? getUrlСountryFlag({ country: country?.code }) : null
          const isCdek = country?.code === "KZ" || country?.code === "RU" || country?.code === "BY"

          if (!isCdek && !!country)
            countries.push({
              id: country?.code ?? "",
              code: element?.Code ?? null,
              titleRu: element?.NameRu ?? "",
              titleEn: element?.NameEng ?? "",
              flag,
            })
        }
      }

      const otherCountries = [
        {
          id: "AM",
          code: "051",
          titleRu: "Армения",
          titleEn: "Armenia",
          flag: getUrlСountryFlag({ country: "AM" }) ?? "",
        },
        {
          id: "KG",
          code: "417",
          titleRu: "Киргизия",
          titleEn: "Kyrgyzstan",
          flag: getUrlСountryFlag({ country: "KG" }) ?? "",
        },
        {
          id: "TJ",
          code: "762",
          titleRu: "Таджикистан",
          titleEn: "Tajikistan",
          flag: getUrlСountryFlag({ country: "TJ" }) ?? "",
        },
        {
          id: "UZ",
          code: "860",
          titleRu: "Узбекистан",
          titleEn: "Uzbekistan",
          flag: getUrlСountryFlag({ country: "UZ" }) ?? "",
        },
      ]

      return [...countries, ...otherCountries]
    }

    throw new Error(`Error code: ${data.status}. Message: ${data.statusText}`)
  } catch (err) {
    console.error("Unknown Error", err)
    throw new Error(JSON.stringify(err))
  }
}

export const createCountriesForDelivery = async () => {
  try {
    const cdekCountries = await getCdekCountries()
    // TODO: add Boxberry
    const boxberryCountries = await getBoxberryCountries()

    let countries: DeliveryCountry[] = []
    const arr = [...cdekCountries, ...boxberryCountries]

    for (let index = 0; index < arr.length; index++) {
      const element = arr[index]

      const exist = countries.some((el) => el.id === element?.id)
      const findCountry = await db.deliveryCountry.findUnique({ where: { id: element?.id } })

      if (!!element && !exist && !findCountry) {
        countries.push(element)
      }
    }

    await db.deliveryCountry.createMany({ data: countries })

    const data = await db.deliveryCountry.findMany({})
    const path = "layout/countries.json"
    let obj = { countries: data }
    await saveJson({ path, data: obj })
  } catch (err: unknown) {
    console.error("Unknown Error", err)
    throw new Error(JSON.stringify(err))
  }
}

export default createCountriesForDelivery
