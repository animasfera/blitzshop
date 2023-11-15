import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateShippingAddressSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateShippingAddressSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const shippingAddress = await db.shippingAddress.update({
      where: { id },
      data,
      include: { country: true },
    })

    return shippingAddress
  }
)
