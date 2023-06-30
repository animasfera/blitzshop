import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateShippingMethodSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateShippingMethodSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const shippingMethod = await db.shippingMethod.update({
      where: { id },
      data,
    })

    return shippingMethod
  }
)
