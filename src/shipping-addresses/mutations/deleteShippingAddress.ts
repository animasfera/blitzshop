import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteShippingAddressSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteShippingAddressSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const shippingAddress = await db.shippingAddress.deleteMany({
      where: { id },
    })

    return shippingAddress
  }
)
