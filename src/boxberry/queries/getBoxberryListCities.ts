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
  country_code: z.string().optional(),
  region: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(GetBoxberryListRegions),
  resolver.authorize(),
  async ({ deliveryMethod, country_code, region }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    if (!country_code || !region || deliveryMethod > 2) return []

    /*
    const token = process.env.BOXBERRY_OPEN_TOKEN
    const url = process.env.BOXBERRY_OPEN_URL
    */
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
      const data = await fetch(
        deliveryMethod === 1
          ? `${url}/export-api?token=${token}&method=DepartCities`
          : `${url}/export-api?token=${token}&method=ListCitiesFull&CountryCode=${country_code}`,
        {}
      )

      if (data.ok) {
        // : BoxberryCity[]
        const res = await data.json()

        const cities: { value: string; label: string }[] = res.result
          .filter((el) => el.Region === region)
          .map((el) => ({
            value: el.CityCode, // el.Code,
            label: el.UniqName,
          }))

        return cities
      }
      throw new Error(`Error code: ${data.status}. Message: ${data.statusText}`)
    } catch (err) {
      console.error("Unknown Error", err)
      throw new Error(JSON.stringify(err))
    }
  }
)
