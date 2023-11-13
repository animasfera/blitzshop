import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

import getCdekShippingCost from "src/cdek/queries/getCdekShippingCost"
import getBoxberryShippingCost from "src/boxberry/queries/getBoxberryShippingCost"

const GetShippingCost = z.object({
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
  resolver.zod(GetShippingCost),
  resolver.authorize(),
  async ({ deliveryMethod, shippingAddress, packages }, ctx: Ctx) => {
    const { country_code } = shippingAddress

    if (country_code === "KZ" || country_code === "RU" || country_code === "BY") {
      return await getCdekShippingCost({ deliveryMethod, shippingAddress, packages }, ctx)
    } else {
      return await getBoxberryShippingCost({ deliveryMethod, shippingAddress, packages }, ctx)
    }
  }
)
