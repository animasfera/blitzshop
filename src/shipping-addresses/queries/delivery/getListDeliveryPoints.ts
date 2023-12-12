import { Ctx } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

import getCdekListDeliveryPoints from "src/cdek/queries/getCdekListDeliveryPoints"
import getBoxberryListDeliveryPoints from "src/boxberry/queries/getBoxberryListDeliveryPoints"

const GetListDeliveryPoints = z.object({
  country_code: z.string().optional(),
  city_code: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(GetListDeliveryPoints),
  resolver.authorize(),
  async ({ country_code, city_code }, ctx: Ctx) => {
    let deliverypoints: { value: string; label: string }[] = []

    if (!country_code || !city_code) return []

    if (country_code === "KZ" || country_code === "RU" || country_code === "BY") {
      deliverypoints = await getCdekListDeliveryPoints({ country_code, city_code }, ctx)
    } else {
      deliverypoints = await getBoxberryListDeliveryPoints({ city_code }, ctx)
    }

    return deliverypoints.sort((a, b) => {
      if (a.label < b.label) return -1
      if (a.label > b.label) return 1

      return 0
    })
  }
)
