import { AuthenticationError, NotFoundError } from "blitz"
import { Cdek, ApiError, HttpError } from "cdek"
import db from "db"

import { saveJson } from "db/seeds/helpers/saveJson"
import citiesJson from "layout/cities.json"
/*
  async ({ country_code, city_code }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant



    try {


      const data: {
        code: number
        postal_codes: string[]
      } = await res.json()

      const postalCodes = data.postal_codes.map((code) => ({
        value: code,
        label: code,
      }))

      return postalCodes
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
*/

const getCdekostalCodes = async () => {
  const id = process.env.CDEK_CLIENT_ID ?? "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI"
  const secret = process.env.CDEK_CLIENT_SECRET ?? "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG"

  // TODO: add text err + translate
  if (!id || !secret) throw new AuthenticationError()

  try {
    const path = "layout/postalCodes.json"

    const cities: {
      code: number
      titleRu: string
      titleEn: string
      lat: number | undefined
      lng: number | undefined
      regionId: number
      // @ts-ignore
    }[] = citiesJson.cities

    await saveJson({ path, data: {} })

    const credentials = await fetch(
      `https://api.cdek.ru/v2/oauth/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`,
      { method: "POST" }
    )

    if (!credentials.ok) {
      throw new NotFoundError()
    }

    const access: {
      access_token: string
      token_type: string
      expires_in: number
      scope: string
      jti: string
    } = await credentials.json()

    let postalCodes: {
      codes: string[]
      cityId: number
    }[] = []

    for (let index = 0; index < cities.length; index++) {
      const city = cities[index]

      // @ts-ignore
      const res = await fetch(`https://api.cdek.ru/v2/location/postalcodes?code=${city?.code}`, {
        headers: {
          Authorization: `Bearer ${access.access_token}`,
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) throw new NotFoundError()

      const data: { code: number; postal_codes: string[] } = await res.json()

      postalCodes.push({
        cityId: data.code,
        codes: data.postal_codes,
      })

      console.log(
        `${index + 1}) Загрузка почтовых индексов - ${city?.titleRu}: ${Math.round(
          ((index + 1) * 100) / cities.length
        )}%, осталось ${cities.length - (index - 1)} городов`
      )
    }

    let obj = { postalCodes }
    await saveJson({ path, data: obj })
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

export const createPostalCodesForDelivery = async () => {
  try {
    await getCdekostalCodes()
  } catch (err: unknown) {
    console.error("Unknown Error", err)
    throw new Error(JSON.stringify(err))
  }
}

export default createPostalCodesForDelivery
