import { AuthenticationError, NotFoundError } from "blitz"
import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import { Cdek, ApiError, HttpError } from "cdek"
import { z } from "zod"
import { CurrencyEnum } from "db"

interface CdekShippingCost {
  delivery_sum: number
  period_min: number
  period_max: number
  weight_calc: number
  calendar_min: number
  calendar_max: number
  services: { code: string; sum: number }[]
  total_sum: number
  currency: CurrencyEnum
  errors?: { code: string; message: string }[]
}

const GetCdekShippingCost = z.object({
  deliveryMethod: z.number(),
  shippingAddress: z.object({
    country_code: z.string(),
    city_code: z.number().optional(),
    city: z.string().optional(),
    postal_code: z.string().optional(),
    address: z.string().optional(),
  }),
  packages: z.array(
    z.object({
      weight: z.number(),
      height: z.number().optional(),
      length: z.number().optional(),
      width: z.number().optional(),
    })
  ),
})

export default resolver.pipe(
  resolver.zod(GetCdekShippingCost),
  resolver.authorize(),
  async ({ deliveryMethod, shippingAddress, packages }) => {
    const { country_code, city_code, city, postal_code, address } = shippingAddress

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

    const id = process.env.CDEK_CLIENT_ID ?? "EMscd6r9JnFiQ3bLoyjJY6eM78JrJceI"
    const secret = process.env.CDEK_CLIENT_SECRET ?? "PjLZkKBHEiLK3YsjtNrt3TGNG0ahs3kG"

    // TODO: add text err + translate
    if (!id || !secret) throw new AuthenticationError()

    if (deliveryMethod === 1) {
      try {
        const credentials = await fetch(
          `https://api.cdek.ru/v2/oauth/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`,
          { method: "POST" }
        )

        if (!credentials.ok) {
          throw new NotFoundError()
        }

        const currencyParam = {
          RUB: 1,
          USD: 3,
          EUR: 4,
        }

        const access: {
          access_token: string
          token_type: string
          expires_in: number
          scope: string
          jti: string
        } = await credentials.json()

        const res = await fetch(`https://api.cdek.ru/v2/calculator/tariff`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //
            type: 1, // 1 - "интернет-магазин" (По умолчанию) 2 - "доставка"
            currency: currencyParam[CurrencyEnum.EUR],
            tariff_code: 136, // склад-склад
            services: [
              {
                code: "INSURANCE",
                parameter: "2",
              },
            ],
            from_location: {
              code: 137,
              postal_code: "196084",
              country_code: "RU",
              city: "Санкт-Петербург",
              address: "ул. Заозерная, д. 4",
            },
            to_location: {
              /*
              code	Код населенного пункта СДЭК (метод "Список населенных пунктов")	integer
              postal_code	Почтовый индекс	string(255)
              country_code	Код страны в формате  ISO_3166-1_alpha-2 (по умолчанию RU) string(2)
              city	Название города	string(255)
              address	Полная строка адреса 	string(255)
              */
              code: city_code,
              postal_code,
              country_code,
              city,
              address,
            },
            packages,
          }),
        })

        const cdekShippingCost: CdekShippingCost = await res.json()
        return cdekShippingCost
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

    if (deliveryMethod === 2) {
      try {
        const credentials = await fetch(
          `https://api.cdek.ru/v2/oauth/token?client_id=${id}&client_secret=${secret}&grant_type=client_credentials`,
          { method: "POST" }
        )

        if (!credentials.ok) {
          throw new NotFoundError()
        }

        const currencyParam = {
          RUB: 1,
          USD: 3,
          EUR: 4,
        }

        const access: {
          access_token: string
          token_type: string
          expires_in: number
          scope: string
          jti: string
        } = await credentials.json()
        const res = await fetch(`https://api.cdek.ru/v2/calculator/tariff`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: 1, // 1 - "интернет-магазин" (По умолчанию) 2 - "доставка"
            currency: currencyParam[CurrencyEnum.EUR],
            tariff_code: 137, // склад-дверь
            services: [
              {
                code: "INSURANCE",
                parameter: "2",
              },
            ],
            from_location: {
              code: 137,
              postal_code: "196084",
              country_code: "RU",
              city: "Санкт-Петербург",
              address: "ул. Заозерная, д. 4",
            },
            to_location: {
              /*
              code	Код населенного пункта СДЭК (метод "Список населенных пунктов")	integer
              postal_code	Почтовый индекс	string(255)
              country_code	Код страны в формате  ISO_3166-1_alpha-2 (по умолчанию RU) string(2)
              city	Название города	string(255)
              address	Полная строка адреса 	string(255)
              */
              code: city_code,
              postal_code,
              country_code,
              city,
              address,
            },
            packages,
          }),
        })

        const cdekShippingCost: CdekShippingCost = await res.json()
        return cdekShippingCost
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

    throw new NotFoundError()
  }
)
