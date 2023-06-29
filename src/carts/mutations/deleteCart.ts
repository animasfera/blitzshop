import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteCartSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteCartSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const cart = await db.cart.deleteMany({ where: { id } })

    return cart
  }
)
