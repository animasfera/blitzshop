import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateCartSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateCartSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const cart = await db.cart.create({ data: input })

    return cart
  }
)
