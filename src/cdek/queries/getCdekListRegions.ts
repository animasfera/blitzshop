import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { Cdek, ApiError, HttpError } from "cdek"
import { z } from "zod"
import { LocaleEnum } from "db"

const GetCdekLocationRegions = z.object({
  // This accepts type of undefined, but is required at runtime
  // id: z.number().optional().refine(Boolean, "Required"),
  country_code: z.string().optional(), // .length(2)
})

export default resolver.pipe(
  resolver.zod(GetCdekLocationRegions),
  resolver.authorize(),
  async ({ country_code }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    if (!country_code) return []

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
      // @ts-ignore
      const regions: {
        country_code: string
        country: string
        region: string
        region_code: number
      }[] = await cdek.getRegions({
        country_codes: country_code ? [country_code] : [],
        lang: ctx.session.user?.locale === LocaleEnum.RU ? "rus" : "eng",
      })

      if (!regions) throw new NotFoundError()

      const result = regions.map((el) => ({ value: el.region_code ?? el.region, label: el.region }))

      return result
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
