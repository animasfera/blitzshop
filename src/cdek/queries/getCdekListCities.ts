import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { Cdek, ApiError, HttpError } from "cdek"
import { z } from "zod"
import { LocaleEnum } from "db"
import { GetCities, GetPickupPoints } from "cdek/src/types/api/response"
import { Phone } from "cdek/src/types/api/base"

const GetCdekLocationCities = z.object({
  deliveryMethod: z.number(),
  country_code: z.string().optional(),
  region_code: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(GetCdekLocationCities),
  resolver.authorize(),
  async ({ deliveryMethod, country_code, region_code }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    if (!country_code || !region_code || deliveryMethod > 2) return []

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

      if (deliveryMethod === 1) {
        const res: GetPickupPoints[] = await cdek.getPickupPoints({
          ...params,
          region_code,
          country_code,
          lang: ctx.session.user?.locale === LocaleEnum.ru ? "rus" : "eng",
        })

        if (!res) throw new NotFoundError()

        console.log("cities res", res)

        let cities: {
          value: string | number
          label: string
        }[] = []

        for (let index = 0; index < res.length; index++) {
          const element = res[index]

          const exist = cities.some((el) => el.value === element?.location.city_code)

          if (!exist && !!element) {
            cities.push({
              value: element.location?.city_code ?? element.code,
              label: `${element.location.city}${
                element.location?.sub_region ? ` (${element.location.sub_region})` : ""
              }`,
            })
          }
        }

        return cities
      }

      const res: GetCities[] = await cdek.getCities({
        ...params,
        lang: ctx.session.user?.locale === LocaleEnum.ru ? "rus" : "eng",
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
