import { Ctx, NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

import getCdekListCountries from "src/cdek/queries/getCdekListCountries"
import getBoxberryListCountries from "src/boxberry/queries/getBoxberryListCountries"

const GetListCountriesForDelivery = z.object({
  // This accepts type of undefined, but is required at runtime
  deliveryMethod: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetListCountriesForDelivery),
  resolver.authorize(),
  async ({ deliveryMethod }, ctx: Ctx) => {
    if (deliveryMethod > 2) return []

    const cdekCountries = await getCdekListCountries({}, ctx)
    const boxberryCountries = await getBoxberryListCountries({ deliveryMethod }, ctx)

    return [...cdekCountries, ...boxberryCountries].sort((a, b) => {
      if (a.label < b.label) return -1
      if (a.label > b.label) return 1

      return 0
    })
  }
)
