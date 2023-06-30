import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteShippingMethodSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteShippingMethodSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const shippingMethod = await db.shippingMethod.deleteMany({
      where: { id },
    })

    return shippingMethod
  }
)
