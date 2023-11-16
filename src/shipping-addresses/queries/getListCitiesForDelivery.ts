import { Ctx, NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

import getCdekListCities from "src/cdek/queries/getCdekListCities"
import getBoxberryListCities from "src/boxberry/queries/getBoxberryListCities"

const GetListCitiesForDelivery = z.object({
  deliveryMethod: z.number().optional(),
  country_code: z.string().optional(),
  regionId: z.number().optional(),
  regionLabel: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(GetListCitiesForDelivery),
  resolver.authorize(),
  async ({ deliveryMethod, country_code, regionId, regionLabel }, ctx: Ctx) => {
    let regions: { value: string | number; label: string }[] = []

    if (!country_code || !regionId || !deliveryMethod || deliveryMethod > 2) return []

    if (country_code === "KZ" || country_code === "RU" || country_code === "BY") {
      regions = await getCdekListCities({ country_code, region_code: regionId }, ctx)
    } else {
      regions = await getBoxberryListCities(
        { deliveryMethod, country_code, region: regionLabel },
        ctx
      )
    }

    return regions.sort((a, b) => {
      if (a.label < b.label) return -1
      if (a.label > b.label) return 1

      return 0
    })
  }
)
