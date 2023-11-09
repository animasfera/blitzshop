import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { ShippingAddressPlain } from "../../shipping-addresses/schemas"
import { CurrencyEnum } from "@prisma/client"

const GetShippingMethodsByAddress = z.object({
  // This accepts type of undefined, but is required at runtime
  address: ShippingAddressPlain,
})

export default resolver.pipe(
  resolver.zod(GetShippingMethodsByAddress),
  resolver.authorize(),
  async ({ address }) => {
    // TODO do api calls

    let shippingMethodWithPrice = {
      id: 1,
      titleRu: "СДЭК",
      titleEn: "SDEK",
      currency: CurrencyEnum.EUR,
      price: 123,
    }

    return shippingMethodWithPrice
  }
)
