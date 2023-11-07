import { Ctx, NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

import getCdekListCities from "src/cdek/queries/getCdekListCities"
import getBoxberryListCities from "src/boxberry/queries/getBoxberryListCities"

const GetListCitiesForDelivery = z.object({
  deliveryMethod: z.number(),
  country_code: z.string().optional(),
  region: z.string().or(z.number()).optional(),
})

export default resolver.pipe(
  resolver.zod(GetListCitiesForDelivery),
  resolver.authorize(),
  async ({ deliveryMethod, country_code, region }, ctx: Ctx) => {
    let regions: { value: string | number; label: string }[] = []

    if (!country_code || !region || deliveryMethod > 2) return []

    if (country_code === "KZ" || country_code === "RU" || country_code === "BY") {
      // TODO: add text err + translate
      if (typeof region !== "number") throw new Error()

      regions = await getCdekListCities({ country_code, region_code: region }, ctx)
    } else {
      // TODO: add text err + translate
      if (typeof region !== "string") throw new Error()

      regions = await getBoxberryListCities({ deliveryMethod, country_code, region }, ctx)
    }

    return regions.sort((a, b) => {
      if (a.label < b.label) return -1
      if (a.label > b.label) return 1

      return 0
    })
  }
)
