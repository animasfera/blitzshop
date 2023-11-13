import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

import { GetShippingCost } from "src/shipping-addresses/schemas"
import getCdekShippingCost from "src/cdek/queries/getCdekShippingCost"
import getBoxberryShippingCost from "src/boxberry/queries/getBoxberryShippingCost"

export default resolver.pipe(
  resolver.zod(GetShippingCost),
  resolver.authorize(),
  async ({ deliveryMethod, shippingAddress, packages }, ctx: Ctx) => {
    const { country_code, city_code, city, postal_code, address } = shippingAddress

    if (country_code === "KZ" || country_code === "RU" || country_code === "BY") {
      // @ts-ignore
      return await getCdekShippingCost({ deliveryMethod, shippingAddress, packages }, ctx)
    } else {
      // @ts-ignore
      return await getBoxberryShippingCost({ deliveryMethod, shippingAddress, packages }, ctx)
    }
  }
)
