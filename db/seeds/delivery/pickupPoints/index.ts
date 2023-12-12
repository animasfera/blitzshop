import { AuthenticationError, NotFoundError } from "blitz"
import { ApiError, Cdek, HttpError } from "cdek"
import { GetPickupPoints } from "cdek/src/types/api/response"

import { saveJson } from "db/seeds/helpers/saveJson"

const getCdekPickupPoints = async (page = 0) => {
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
    const path = "layout/pickupPoints.json"
    await saveJson({ path, data: {} })

    const resRusRu = await fetch(
      `https://api.cdek.ru/v2/deliverypoints?country_code=RU&lang=rus&size=10000`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    )

    const resRusEn = await fetch(
      `https://api.cdek.ru/v2/deliverypoints?country_code=RU&lang=eng&size=10000`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    )

    const resKazRu = await fetch(
      `https://api.cdek.ru/v2/deliverypoints?country_code=KZ&lang=rus&size=10000`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    )

    const resKazEn = await fetch(
      `https://api.cdek.ru/v2/deliverypoints?country_code=KZ&lang=eng&size=10000`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    )

    const resBlrRu = await fetch(
      `https://api.cdek.ru/v2/deliverypoints?country_code=BY&lang=rus&size=10000`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    )

    const resBlrEn = await fetch(
      `https://api.cdek.ru/v2/deliverypoints?country_code=BY&lang=eng&size=10000`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    )

    if (
      !resRusRu.ok ||
      !resRusEn.ok ||
      !resKazRu.ok ||
      !resKazEn.ok ||
      !resBlrRu.ok ||
      !resBlrEn.ok
    )
      throw new NotFoundError()

    const deliverypointsRusRu: GetPickupPoints[] = await resRusRu.json()
    const deliverypointsRusEn: GetPickupPoints[] = await resRusEn.json()
    const deliverypointsKazRu: GetPickupPoints[] = await resKazRu.json()
    const deliverypointsKazEn: GetPickupPoints[] = await resKazEn.json()
    const deliverypointsBlrRu: GetPickupPoints[] = await resBlrRu.json()
    const deliverypointsBlrEn: GetPickupPoints[] = await resBlrEn.json()

    const deliverypointsRu = [
      ...deliverypointsRusRu,
      ...deliverypointsKazRu,
      ...deliverypointsBlrRu,
    ]
    const deliverypointsEn = [
      ...deliverypointsRusEn,
      ...deliverypointsKazEn,
      ...deliverypointsBlrEn,
    ]

    const pickupPoints = deliverypointsRu.map(({ code, location, type }) => {
      const { address, address_full, city_code, latitude, longitude } = location
      const pointEn = deliverypointsEn.find((el) => code === el.code)

      return {
        code,
        addressRu: address,
        addressEn: pointEn?.location.address ?? address,
        fullAddressRu: address_full,
        fullAddressEn: pointEn?.location.address_full ?? address_full,
        lat: latitude,
        lng: longitude,
        type,
        cityid: city_code,
      }
    })

    /*
    for (let index = 0; index < cities.length; index++) {
      const city = cities[index]

      if (!city?.code) throw new NotFoundError()


      const resRu = await fetch(`https://api.cdek.ru/v2/offices?lang=rus&cityid=${city.code}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      })

      const resEn = await fetch(`https://api.cdek.ru/v2/offices?lang=eng&cityid=${city.code}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      })

      if (!resRu.ok || !resEn.ok) throw new NotFoundError()

      const pickupPointsRu: PickupPointCdek = await resRu.json()
      const pickupPointsEn: PickupPointCdek = await resEn.json()

      const pickupPoints = pickupPointsRu.pvz
        ? pickupPointsRu.pvz.map((point) => {
            const { code, address, fullAddress, coordX, coordY, type } = point
            const pointEn = pickupPointsEn.pvz.find((el) => el.code === code)

            return {
              code,
              addressRu: fullAddress,
              addressEn: pointEn?.address ?? address,
              fullAddressRu: fullAddress,
              fullAddressEn: pointEn?.fullAddress ?? fullAddress,
              lat: coordX,
              lng: coordY,
              type,
              cityid: city?.code,
            }
          })
        : []

      console.log(
        `${index + 1}) Загрузка ПВЗ - ${city?.titleRu} (${
          pickupPoints.length
        } пунктов): ${Math.round(((index + 1) * 100) / cities.length)}%, осталось ${
          cities.length - (index - 1)
        } городов`
      )
      arr = [...arr, ...pickupPoints]
  }
  */

    let obj = { pickupPoints: pickupPoints }
    await saveJson({ path, data: obj })

    console.log("Загрузка ПВЗ завершена")
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

export const createPickupPointsForDelivery = async () => {
  try {
    await getCdekPickupPoints()
  } catch (err: unknown) {
    console.error("Unknown Error", err)
    throw new Error(JSON.stringify(err))
  }
}

export default createPickupPointsForDelivery
