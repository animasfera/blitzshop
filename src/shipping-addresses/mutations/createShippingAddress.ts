import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateShippingAddressSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateShippingAddressSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const shippingAddress = await db.shippingAddress.create({ data: input })

    return shippingAddress
  }
)
