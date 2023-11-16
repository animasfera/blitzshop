import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

interface BoxberryRegion {
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
  country_code: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(GetBoxberryListRegions),
  resolver.authorize(),
  async ({ country_code }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    if (!country_code) return []

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
        const res: BoxberryRegion[] = await data.json()

        let regions: { value: string; label: string }[] = []

        for (let index = 0; index < res.length; index++) {
          const element = res[index]

          const exist = regions.some((el) => el.label === element?.Region)

          if (!exist && !!element?.Code && !!element?.Region) {
            regions.push({
              value: element.Code,
              label: element.Region,
            })
          }
        }

        return regions
      }
      throw new Error(`Error code: ${data.status}. Message: ${data.statusText}`)
    } catch (err) {
      console.error("Unknown Error", err)
      throw new Error(JSON.stringify(err))
    }
  }
)
