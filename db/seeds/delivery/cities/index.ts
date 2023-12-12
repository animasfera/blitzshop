import { AuthenticationError, NotFoundError } from "blitz"
import { ApiError, HttpError } from "cdek"
import { GetCities } from "cdek/src/types/api/response"

import { saveJson } from "db/seeds/helpers/saveJson"
import regionsJson from "layout/regions.json"

const getCdekCities = async (page = 0) => {
  const url = process.env.CDEK_URL_PROD
  const id = process.env.CDEK_CLIENT_ID
  const secret = process.env.CDEK_CLIENT_SECRET

  if (!url || !id || !secret) {
    // TODO: add translate text err
    throw new NotFoundError()
  }

  const auth = await fetch(
    `${url}/oauth/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )

  if (!auth.ok) {
    // TODO: add translate text err
    throw new AuthenticationError()
  }

  const token = await auth.json()

  try {
    const path = "layout/cities.json"

    await saveJson({ path, data: {} })

    const regions = regionsJson.regions

    let arr: {
      code: number
      titleRu: string
      titleEn: string
      lat: number | undefined
      lng: number | undefined
      regionId: number
    }[] = []

    for (let index = 0; index < regions.length; index++) {
      const region = regions[index]

      if (!region?.code) throw new NotFoundError()

      const resRu = await fetch(
        `https://api.edu.cdek.ru/v2/location/cities/?lang=rus&country_codes=RU,KZ,BY&region_code=${region.code}&size=10000`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      )

      const resEn = await fetch(
        `https://api.edu.cdek.ru/v2/location/cities/?lang=eng&country_codes=RU,KZ,BY&region_code=${region?.code}&size=10000`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      )

      if (!resRu.ok || !resEn.ok) throw new NotFoundError()

      const citiesRu: GetCities[] = await resRu.json()
      const citiesEn: GetCities[] = await resEn.json()

      const cities = citiesRu.map(({ code, city, latitude, longitude, region_code }) => {
        const elEng = citiesEn.find((el) => el.code === code)

        return {
          code,
          titleRu: city,
          titleEn: elEng?.city ?? city,
          lat: latitude,
          lng: longitude,
          regionId: region?.code, // region?.id,
        }
      })

      console.log(
        `${index + 1}) ${region?.titleRu}: загружено ${
          cities.length
        } городов (Загружено ${Math.round(((index + 1) * 100) / regions.length)}%, осталось ${
          regions.length - (index - 1)
        } регионов)`
      )
      arr = [...arr, ...cities]
    }

    let obj = { cities: arr }
    await saveJson({ path, data: obj })

    console.log("Загрузка городов завершена")
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

export const createCitiesForDelivery = async () => {
  try {
    await getCdekCities()
  } catch (err: unknown) {
    console.error("Unknown Error", err)
    throw new Error(JSON.stringify(err))
  }
}

export default createCitiesForDelivery
