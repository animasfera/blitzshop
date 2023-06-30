import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateShippingMethodSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateShippingMethodSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const shippingMethod = await db.shippingMethod.create({ data: input })

    return shippingMethod
  }
)
