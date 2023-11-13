import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

interface BoxberryCity {
  Code: string
  Name: string
  ReceptionLaP: string
  DeliveryLaP: string
  Reception: string
  PickupPoint: string
  CourierDelivery: string
  ForeignReceptionReturns: string
  Terminal: string
  Kladr: string
  Region: string
  CountryCode: string
  UniqName: string
  District: string
  Prefix: string
  CourierReception: string
}

const GetBoxberryListRegions = z.object({
  deliveryMethod: z.number(),
  country_code: z.string().or(z.number()).optional(),
  region: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(GetBoxberryListRegions),
  resolver.authorize(),
  async ({ deliveryMethod, country_code, region }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    if (!country_code || !region || deliveryMethod > 2) return []

    const isCountryCIS =
      country_code === "417" ||
      country_code === "051" ||
      country_code === "762" ||
      country_code === "860"

    if (!isCountryCIS) return []

    const token = process.env.BOXBERRY_OPEN_TOKEN
    const url = process.env.BOXBERRY_OPEN_URL

    if (!token) {
      // TODO: add translate text err
      throw new AuthenticationError("нет токена")
    }

    if (!url) {
      // TODO: add translate text err
      throw new NotFoundError()
    }

    try {
      const data = await fetch(
        `${url}?token=${token}&method=ListCitiesFull&CountryCode=${country_code}`,
        {}
      )

      if (data.ok) {
        const res: BoxberryCity[] = await data.json()
        const arr = res.filter((el) => region === el?.Region)

        let cities: { value: string; label: string }[] = []

        for (let index = 0; index < arr.length; index++) {
          const element = arr[index]

          const exist = cities.some((el) => el.value === element?.Code)

          if (!exist && !!element?.Code && !!element?.UniqName) {
            cities.push({
              value: element.Code,
              label: element.UniqName,
            })
          }
        }

        return cities
      }
      throw new Error(`Error code: ${data.status}. Message: ${data.statusText}`)
    } catch (err) {
      console.error("Unknown Error", err)
      throw new Error(JSON.stringify(err))
    }
  }
)
