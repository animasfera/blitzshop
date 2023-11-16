import { Ctx, NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

import getCdekListPostalCodes from "src/cdek/queries/getCdekListPostalCodes"

const GetListPostalCodesForDelivery = z.object({
  // This accepts type of undefined, but is required at runtime
  country_code: z.string().optional(),
  city_code: z.number().or(z.string()).optional(),
})

export default resolver.pipe(
  resolver.zod(GetListPostalCodesForDelivery),
  resolver.authorize(),
  async ({ country_code, city_code }, ctx: Ctx) => {
    if (!country_code || !city_code) return []

    let postalCodes: { value: string; label: string }[] = []

    if (country_code === "KZ" || country_code === "RU" || country_code === "BY") {
      if (typeof city_code === "number")
        postalCodes = await getCdekListPostalCodes({ country_code, city_code }, ctx)
    }

    return postalCodes.sort((a, b) => {
      if (a.label < b.label) return -1
      if (a.label > b.label) return 1

      return 0
    })
  }
)
