import { Ctx, NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

import getCdekListAddresses from "src/cdek/queries/getCdekListAddresses"

const GetListAddressesForDelivery = z.object({
  deliveryMethod: z.number(),
  country_code: z.string().or(z.number()).optional(),
  region: z.string().or(z.number()).optional(),
  city_code: z.number().or(z.number()).optional(),
})

export default resolver.pipe(
  resolver.zod(GetListAddressesForDelivery),
  resolver.authorize(),
  async ({ deliveryMethod, country_code, region, city_code }, ctx: Ctx) => {
    let addresses: { value: string; label: string }[] = []

    if (!country_code || !region || deliveryMethod > 2 || !city_code) return []

    if (country_code === "KZ" || country_code === "RU" || country_code === "BY") {
      // TODO: add text err + translate
      if (typeof region !== "number" || typeof city_code !== "number") throw new Error()

      addresses = await getCdekListAddresses({ country_code, region_code: region, city_code }, ctx)
    }
    /*
    else {
      // TODO: add text err + translate
      if (typeof region !== "string") throw new Error()

      cities = await getBoxberryListCities(
        {
          deliveryMethod,
          country_code,
          region,
        },
        ctx
      )
    }
    */

    return addresses.sort((a, b) => {
      if (a.label < b.label) return -1
      if (a.label > b.label) return 1

      return 0
    })
  }
)
