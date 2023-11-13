import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import queryString from "query-string"
import { Cdek, ApiError, HttpError } from "cdek"
import { z } from "zod"
import { LocaleEnum } from "db"

const GetCdekListAddresses = z.object({
  country_code: z.string().or(z.number()).optional(),
  region_code: z.number().optional(),
  city_code: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(GetCdekListAddresses),
  resolver.authorize(),
  async ({ country_code, region_code, city_code }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    if (!country_code || !region_code || !city_code) return []

    const id = process.env.CDEK_CLIENT_ID ?? "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI"
    const secret = process.env.CDEK_CLIENT_SECRET ?? "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG"

    // TODO: add text err + translate
    if (!id || !secret) throw new AuthenticationError()

    try {
      const credentials = await fetch(
        `https://api.cdek.ru/v2/oauth/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`,
        { method: "POST" }
      )

      if (!credentials.ok) {
        throw new NotFoundError()
      }

      const access: {
        access_token: string
        token_type: string
        expires_in: number
        scope: string
        jti: string
      } = await credentials.json()

      const queryParams = {
        lang: ctx.session.user?.locale === LocaleEnum.RU ? "rus" : "eng",
        country_codes: country_code,
        region_code: region_code,
      }

      const res = await fetch(
        `https://api.cdek.ru/v2/deliverypoints?${queryString.stringify(queryParams)}`,
        {
          headers: {
            Authorization: `Bearer ${access.access_token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!res.ok) throw new NotFoundError()

      const arr: {
        code: string
        location: {
          country_code: string
          region: string
          region_code: number
          city: string
          city_code: number
          longitude: number
          latitude: number
          address: string
          address_full: string
        }
      }[] = await res.json()

      const address = arr.filter((el) => el.location.city_code === city_code)

      let result: { value: string; label: string }[] = []

      for (let index = 0; index < address.length; index++) {
        const element = address[index]

        const exist = result.length === 0 ? false : result.some((el) => el.value === element?.code)

        if (!exist && element) {
          result.push({
            value: element.code,
            label: element.location.address,
          })
        }
      }

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
