import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { Cdek, ApiError, HttpError } from "cdek"
import { z } from "zod"
import { LocaleEnum } from "db"

const GetCdekLocationCities = z.object({
  country_code: z.string().optional(),
  region_code: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(GetCdekLocationCities),
  resolver.authorize(),
  async ({ country_code, region_code }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    if (!country_code || !region_code) return []

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
      const params = region_code
        ? { region_code: region_code }
        : { country_codes: country_code ? [country_code] : [] }

      const res = await cdek.getCities({
        ...params,
        lang: ctx.session.user?.locale === LocaleEnum.RU ? "rus" : "eng",
      })

      if (!res) throw new NotFoundError()

      const cities = res.map((el) => ({
        value: el.code ?? el.region_code,
        label: `${el.city ?? el.region}${el.sub_region ? ` (${el.sub_region})` : ""}`,
      }))

      return cities
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
