import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateCartSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateCartSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const cart = await db.cart.update({ where: { id }, data })

    return cart
  }
)
