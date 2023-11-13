import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

const GetBoxberryListDeliveryPoints = z.object({
  city_code: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(GetBoxberryListDeliveryPoints),
  resolver.authorize(),
  async ({ city_code }, ctx: Ctx) => {
    if (!city_code) return []

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
        `${url}/export-api?method=DepartPoints&token=${token}&cityCode=${city_code}`,
        {}
      )

      if (data.ok) {
      }
      throw new Error(`Error code: ${data.status}. Message: ${data.statusText}`)
    } catch (err) {
      console.error("Unknown Error", err)
      throw new Error(JSON.stringify(err))
    }
  }
)
