import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { Cdek, ApiError, HttpError } from "cdek"
import { z } from "zod"
import { LocaleEnum } from "db"

import { getUrlСountryFlag } from "src/core/helpers/getUrlСountryFlag"

const GetCdekLocationCountries = z.object({
  // This accepts type of undefined, but is required at runtime
  // id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetCdekLocationCountries),
  resolver.authorize(),
  async ({}, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    const cdek = new Cdek({
      account: process.env.CDEK_CLIENT_ID ?? "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI",
      password: process.env.CDEK_CLIENT_SECRET ?? "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG",
      url_base: "https://api.cdek.ru/v2",
      // TODO: api.edu.cdek.ru - не все методы работают
      /*
      process.env.NODE_ENV === "production"
        ? process.env.CDEK_URL_PROD
        : process.env.CDEK_URL_DEV,
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
        lang: ctx.session.user?.locale === LocaleEnum.ru ? "rus" : "eng",
      })

      if (!regions) throw new NotFoundError()

      let countries: {
        label: string
        value: string
        img: string
      }[] = []

      for (let index = 0; index < regions.length; index++) {
        const element = regions[index]

        const exist = countries.some((country) => country.value === element?.country_code)

        if (
          !exist &&
          (element?.country_code === "KZ" ||
            element?.country_code === "RU" ||
            element?.country_code === "BY")
        ) {
          countries.push({
            value: element?.country_code ?? "",
            label: element?.country ?? "",
            img: element?.country_code ? getUrlСountryFlag({ country: element?.country_code }) : "",
          })
        }
      }

      return countries
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
