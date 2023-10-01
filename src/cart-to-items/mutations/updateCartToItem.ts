import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateCartToItemSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateCartToItemSchema),
  // resolver.authorize(),
  async ({ id, qty, cartId, itemId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const cartToItem = await db.cartToItem.update({
      where: { id },
      data: { qty, cartId, itemId },
      include: { item: { include: { amount: true } }, cart: { include: { amount: true } } },
    })

    return cartToItem
  }
)
