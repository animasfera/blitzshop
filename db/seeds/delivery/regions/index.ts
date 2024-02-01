import { AuthenticationError, NotFoundError } from "blitz"
import { Cdek, ApiError, HttpError } from "cdek"
import db from "db"

import { saveJson } from "db/seeds/helpers/saveJson"

const getCdekRegions = async () => {
  const cdek = new Cdek({
    account: process.env.CDEK_CLIENT_ID ?? "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
    password: process.env.CDEK_CLIENT_SECRET ?? "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG",
    url_base: "https://api.cdek.ru/v2",
  })

  // TODO: add text err + translate
  if (!cdek) throw new AuthenticationError()

  try {
    // @ts-ignore
    const regionsRu: {
      country_code: string
      country: string
      region: string
      region_code: number
    }[] = await cdek.getRegions({
      country_codes: ["RU", "KZ", "BY"],
      lang: "rus",
    })

    cdek.get
    // @ts-ignore
    const regionsEn: {
      country_code: string
      country: string
      region: string
      region_code: number
    }[] = await cdek.getRegions({
      country_codes: ["RU", "KZ", "BY"],
      lang: "eng",
    })

    if (!regionsRu || !regionsEn) throw new NotFoundError()

    const regions = regionsRu.map(({ region, region_code, country_code }) => {
      const elEng = regionsEn.find((el) => el.region_code === region_code)

      return {
        code: region_code,
        titleRu: region,
        titleEn: elEng?.region ?? region,
        countryId: country_code,
      }
    })

    return regions
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

export const createRegionsForDelivery = async () => {
  try {
    const regionsCdek = await getCdekRegions()

    const path = "layout/regions.json"
    let obj = { regions: [...regionsCdek] }

    await saveJson({ path, data: obj })
  } catch (err: unknown) {
    console.error("Unknown Error", err)
    throw new Error(JSON.stringify(err))
  }
}

export default createRegionsForDelivery
