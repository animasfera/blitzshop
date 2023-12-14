import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

import getCdekShippingCost from "src/cdek/queries/getCdekShippingCost"
import getBoxberryShippingCost from "src/boxberry/queries/getBoxberryShippingCost"
import { CurrencyEnum } from "@prisma/client"

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

interface ShippingCost {
  delivery_cost?: number
  service_cost?: number
  currency?: CurrencyEnum
  total_sum?: number
  error?: string
}

export default resolver.pipe(
  resolver.zod(GetShippingCost),
  resolver.authorize(),
  async ({ deliveryMethod, shippingAddress, packages }, ctx: Ctx) => {
    const { country_code } = shippingAddress

    let result: ShippingCost | null = null

    if (country_code === "KZ" || country_code === "RU" || country_code === "BY") {
      const cdekShippingCost = await getCdekShippingCost(
        { deliveryMethod, shippingAddress, packages },
        ctx
      )

      if (!cdekShippingCost) return null

      const { currency, delivery_sum, total_sum, services, errors } = cdekShippingCost

      if (errors && errors.length > 0) {
        return {
          error: errors.map(({ message }) => message).join(". "),
        }
      }

      let service_cost = 0

      for (let index = 0; index < services.length; index++) {
        const element = services[index]

        if (element?.sum) service_cost = service_cost + element.sum
      }

      result = !cdekShippingCost
        ? null
        : {
            delivery_cost: delivery_sum * 100,
            service_cost: service_cost * 100,
            currency,
            total_sum: total_sum * 100,
          }
    } else {
      // return await getBoxberryShippingCost({ deliveryMethod, shippingAddress, packages }, ctx)
      const boxberryShippingCost = await getBoxberryShippingCost(
        { deliveryMethod, shippingAddress, packages },
        ctx
      )

      if (!boxberryShippingCost) return null

      const { DelCost, Currency, ServiceCost, DutyAmount, Total } = boxberryShippingCost

      result = !boxberryShippingCost
        ? null
        : {
            delivery_cost: DelCost * 100,
            service_cost: ServiceCost + (DutyAmount ?? 0) * 100,
            currency: Currency,
            total_sum: Total * 100,
          }
    }

    return result
  }
)
