import { AuthenticationError, NotFoundError, Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db, { LocaleEnum } from "db"

import { Countries } from "src/auth/components/Countries"
import { getUrlСountryFlag } from "src/core/helpers/getUrlСountryFlag"

const GetBoxberryListCountries = z.object({
  // This accepts type of undefined, but is required at runtime
  // id: z.number().optional().refine(Boolean, "Required"),
})

interface BoxberryCountry {
  Code: string
  NameRu: string
  NameEng: string
  DeliveryTypes: Number[]
  DeliveryTimes: Number[]
  MaxWeightDDP: Number
  MaxWeightDDU: Number
  MaxWeightExpress: Number
  Standard: boolean
  Express: boolean
}

export default resolver.pipe(
  resolver.zod(GetBoxberryListCountries),
  resolver.authorize(),
  async ({}, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

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
      const data = await fetch(`${url}/export-api?token=${token}&method=Countries`, {})

      if (data.ok) {
        const res: {
          result: BoxberryCountry[]
          error: { isError: boolean; errorCode?: string; errorMessage?: string }
        } = await data.json()

        if (res.error.isError) {
          console.error("Unknown Error", res.error.errorMessage)
          throw new Error(`Error code: ${res.error.errorCode}. Message: ${res.error.errorMessage}`)
        }

        const countryList = res.result.map((el) => {
          const country = Countries.find(
            (country) => country.name.toLowerCase() === el.NameEng.toLowerCase()
          )

          const img = country?.code ? getUrlСountryFlag({ country: country.code }) : ""

          return {
            value: el.Code,
            label: ctx.session.user?.locale === LocaleEnum.RU ? el.NameRu : el.NameEng,
            img,
          }
        })

        const otherCountries = [
          {
            value: "051",
            label: ctx.session.user?.locale === LocaleEnum.RU ? "Армения" : "Armenia",
            img: getUrlСountryFlag({ country: "AM" }) ?? "",
          },
          {
            value: "417",
            label: ctx.session.user?.locale === LocaleEnum.RU ? "Киргизия" : "Kyrgyzstan",
            img: getUrlСountryFlag({ country: "KG" }) ?? "",
          },
          {
            value: "762",
            label: ctx.session.user?.locale === LocaleEnum.RU ? "Таджикистан" : "Tajikistan",
            img: getUrlСountryFlag({ country: "TJ" }) ?? "",
          },
        ]

        return [...countryList, ...otherCountries]
      }
      throw new Error(`Error code: ${data.status}. Message: ${data.statusText}`)
    } catch (err) {
      console.error("Unknown Error", err)
      throw new Error(JSON.stringify(err))
    }
  }
)
