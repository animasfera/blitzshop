import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { ApiError, HttpError } from "cdek"
import { z } from "zod"

const GetCdekLocationCities = z.object({
  country_code: z.string().optional(),
  city_code: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetCdekLocationCities),
  resolver.authorize(),
  async ({ country_code, city_code }, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    if (!country_code || !city_code) return []

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

      const res = await fetch(`https://api.cdek.ru/v2/location/postalcodes?code=${city_code}`, {
        headers: {
          Authorization: `Bearer ${access.access_token}`,
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) throw new NotFoundError()

      const data: {
        code: number
        postal_codes: string[]
      } = await res.json()

      const postalCodes = data.postal_codes.map((code) => ({
        value: code,
        label: code,
      }))

      return postalCodes
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
