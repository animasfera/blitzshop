import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateCartToItemSchema } from "../schemas"
import getCart from "../../carts/queries/getCart"
import { AuthorizationError, NotFoundError } from "blitz"

export default resolver.pipe(resolver.zod(UpdateCartToItemSchema), async ({ id, qty }, ctx) => {
  const cart = await getCart({}, ctx)
  const cartToItem = await db.cartToItem.findUnique({
    where: { id },
  })
  if (!cartToItem) {
    throw new NotFoundError()
  }
  if (cartToItem.cartId !== cart.id) {
    throw new AuthorizationError()
  }
  const cartToItemUpdated = await db.cartToItem.update({
    where: { id },
    data: { qty },
    include: { item: true, cart: true },
  })

  return cartToItemUpdated
})
