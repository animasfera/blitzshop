import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { Cdek, ApiError, HttpError } from "cdek"
import { z } from "zod"
import { LocaleEnum } from "db"
import { GetPickupPoints } from "cdek/src/types/api/response"

const GetCdekListDeliverypoints = z.object({
  country_code: z.string().optional(),
  city_code: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(GetCdekListDeliverypoints),
  resolver.authorize(),
  async ({ country_code, city_code }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    if (!country_code || !city_code) return []

    const cdek = new Cdek({
      account: process.env.CDEK_CLIENT_ID ?? "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
      password: process.env.CDEK_CLIENT_SECRET ?? "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG",
      url_base: "https://api.cdek.ru/v2",
      // TODO: api.edu.cdek.ru - не все методы работают
      /*
      process.env.NODE_ENV === "production"
        ? "https://api.cdek.ru/v2"
        : "https://api.edu.cdek.ru/v2",
      */
    })

    // TODO: add text err + translate
    if (!cdek) throw new AuthenticationError()

    try {
      const res: GetPickupPoints[] = await cdek.getPickupPoints({
        country_code,
        city_code,
        lang: ctx.session.user?.locale === LocaleEnum.ru ? "rus" : "eng",
      })

      if (!res) throw new NotFoundError()

      const deliverypoints = res.map((el) => ({
        value: el.code,
        label: el.location.address ?? el.location.address_full,
      }))

      return deliverypoints
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
)
