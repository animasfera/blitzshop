import { Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

import getCdekListRegions from "src/cdek/queries/getCdekListRegions"
import getBoxberryListRegions from "src/boxberry/queries/getBoxberryListRegions"

const GetListRegionsForDelivery = z.object({
  // This accepts type of undefined, but is required at runtime
  country_code: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(GetListRegionsForDelivery),
  resolver.authorize(),
  async ({ country_code }, ctx: Ctx) => {
    let regions: { value: string | number; label: string }[] = []

    if (!country_code) return []

    if (country_code === "KZ" || country_code === "RU" || country_code === "BY") {
      regions = await getCdekListRegions({ country_code }, ctx)
    } else {
      regions = await getBoxberryListRegions({ country_code }, ctx)
    }

    return regions.sort((a, b) => {
      if (a.label < b.label) return -1
      if (a.label > b.label) return 1

      return 0
    })
  }
)
